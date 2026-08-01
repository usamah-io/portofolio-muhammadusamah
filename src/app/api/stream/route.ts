import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return new NextResponse("Missing File ID", { status: 400 });
  }

  // Primary direct video stream from Google Drive storage CDN
  const driveStreamUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

  try {
    const response = await fetch(driveStreamUrl);

    if (!response.ok) {
      // Fallback to Google Drive uc export download if primary link is blocked
      const fallbackUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const fallbackResponse = await fetch(fallbackUrl);

      if (!fallbackResponse.ok) {
        return new NextResponse("Video stream unavailable", { status: fallbackResponse.status });
      }

      return new NextResponse(fallbackResponse.body, {
        headers: {
          "Content-Type": "video/mp4",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error streaming video via proxy:", error);
    return new NextResponse("Error streaming video", { status: 500 });
  }
}
