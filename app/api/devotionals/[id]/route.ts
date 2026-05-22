import { NextRequest, NextResponse } from "next/server";
import { getDevotionalContent } from "@/app/lib/notion";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        
        if (!id) {
            return NextResponse.json({ error: "Missing page ID" }, { status: 400 });
        }

        const content = await getDevotionalContent(id);
        
        return NextResponse.json({ content });
    } catch (error) {
        console.error("Error in devotional API route:", error);
        return NextResponse.json({ error: "Failed to fetch devotional content" }, { status: 500 });
    }
}
