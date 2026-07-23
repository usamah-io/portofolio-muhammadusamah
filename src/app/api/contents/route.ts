import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import fs from "fs/promises";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src/data/content.json");

const ADMIN_EMAIL = "muhammadusamahabdurrahman@gmail.com";

// Helper to read content.json
async function readContentFile() {
  const data = await fs.readFile(contentFilePath, "utf8");
  return JSON.parse(data);
}

// Helper to write content.json
async function writeContentFile(content: any) {
  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2), "utf8");
}

export async function GET() {
  try {
    const content = await readContentFile();
    // Return articles from 'id' language as default references
    const articles = content.id.articles.items || [];
    return NextResponse.json({ success: true, articles });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { tag, title, platform, link } = await req.json();
    if (!tag || !title || !platform || !link) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const content = await readContentFile();
    const currentItemsId = content.id.articles.items || [];
    
    if (currentItemsId.length >= 6) {
      return NextResponse.json({ success: false, error: "Maksimal 6 konten" }, { status: 400 });
    }

    const newId = `art-${Date.now()}`;
    const newItem = { id: newId, tag, title, platform, link };

    // Synchronize to both translation sets
    content.id.articles.items = [...currentItemsId, newItem];
    content.en.articles.items = [...(content.en.articles.items || []), newItem];

    await writeContentFile(content);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { id, tag, title, platform, link } = await req.json();
    if (!id || !tag || !title || !platform || !link) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const content = await readContentFile();
    
    // Helper to update array
    const updateItems = (items: any[]) => 
      items.map(item => item.id === id ? { ...item, tag, title, platform, link } : item);

    content.id.articles.items = updateItems(content.id.articles.items || []);
    content.en.articles.items = updateItems(content.en.articles.items || []);

    await writeContentFile(content);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const content = await readContentFile();
    
    // Filter out item from both languages
    content.id.articles.items = (content.id.articles.items || []).filter((item: any) => item.id !== id);
    content.en.articles.items = (content.en.articles.items || []).filter((item: any) => item.id !== id);

    await writeContentFile(content);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
