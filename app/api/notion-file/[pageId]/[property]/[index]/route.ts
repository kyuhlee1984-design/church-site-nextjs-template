import { NextResponse } from 'next/server';
import { Client } from "@notionhq/client";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { pageId: string, property: string, index: string } }) {
    const { pageId, property, index: indexStr } = await params;
    const index = parseInt(indexStr || '0', 10);

    if (!pageId || !property) {
        return new NextResponse('Missing pageId or property', { status: 400 });
    }

    try {
        const notion = new Client({ auth: process.env.NOTION_TOKEN });
        const page: any = await notion.pages.retrieve({ page_id: pageId });
        
        // Property is automatically URL decoded by Next.js in params
        const propData = page.properties[property];
        if (!propData) {
            return new NextResponse('Property not found', { status: 404 });
        }

        const files = propData.files;
        if (!files || files.length <= index) {
            return new NextResponse('File not found at index', { status: 404 });
        }

        const file = files[index];
        const fileUrl = file.file?.url || file.external?.url;

        if (!fileUrl) {
            return new NextResponse('File URL missing', { status: 404 });
        }

        // We use path parameters so the CDN caches each image individually.
        return NextResponse.redirect(fileUrl, {
            status: 302,
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
            }
        });
    } catch (error) {
        console.error('Notion Proxy Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
