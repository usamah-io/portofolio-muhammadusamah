import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new NextResponse("Missing Video ID", { status: 400 });
  }

  const rangeHeader = request.headers.get("range");

  // URLs to try for raw MP4 stream
  const urlsToTry = [
    `https://lh3.googleusercontent.com/d/${id}`,
    `https://drive.google.com/uc?export=download&confirm=t&id=${id}`,
    `https://drive.google.com/uc?export=download&id=${id}`,
    `https://drive.google.com/uc?id=${id}&export=download`,
  ];

  let rawResponse: Response | null = null;

  for (const targetUrl of urlsToTry) {
    try {
      const headers: HeadersInit = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      };

      if (rangeHeader) {
        headers["Range"] = rangeHeader;
      }

      const res = await fetch(targetUrl, {
        headers,
        redirect: "follow",
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type") || "";

      // Check if we got an actual video/binary stream (not HTML warning page)
      if (res.ok && !contentType.includes("text/html")) {
        rawResponse = res;
        break;
      }

      // If Google returned an HTML page ("Google Drive can't scan this file for viruses")
      if (contentType.includes("text/html")) {
        const htmlText = await res.text();
        const confirmMatch =
          htmlText.match(/confirm=([a-zA-Z0-9_-]+)/) ||
          htmlText.match(/download_warning[^\"]*value=[\"]?([a-zA-Z0-9_-]+)/) ||
          htmlText.match(/uuid=([a-zA-Z0-9_-]+)/);

        if (confirmMatch && confirmMatch[1]) {
          const confirmedUrl = `https://drive.google.com/uc?export=download&confirm=${confirmMatch[1]}&id=${id}`;
          const confirmedRes = await fetch(confirmedUrl, {
            headers,
            redirect: "follow",
            cache: "no-store",
          });

          if (
            confirmedRes.ok &&
            !confirmedRes.headers.get("content-type")?.includes("text/html")
          ) {
            rawResponse = confirmedRes;
            break;
          }
        }
      }
    } catch (err) {
      console.warn(`Attempt failed for ${targetUrl}:`, err);
    }
  }

  if (!rawResponse || !rawResponse.body) {
    return new NextResponse("Video stream unavailable", { status: 404 });
  }

  // Construct response with HTTP 206 Partial Content / Range support
  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "video/mp4");
  responseHeaders.set("Accept-Ranges", "bytes");
  responseHeaders.set("Cache-Control", "public, max-age=86400");

  const contentRange = rawResponse.headers.get("content-range");
  const contentLength = rawResponse.headers.get("content-length");

  if (contentRange) {
    responseHeaders.set("Content-Range", contentRange);
  }
  if (contentLength) {
    responseHeaders.set("Content-Length", contentLength);
  }

  const isPartial = Boolean(rangeHeader || contentRange || rawResponse.status === 206);
  const status = isPartial ? 206 : 200;

  return new NextResponse(rawResponse.body, {
    status,
    headers: responseHeaders,
  });
}
