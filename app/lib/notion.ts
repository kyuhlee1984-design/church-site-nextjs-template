import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface Sermon {
    id: string;
    title: string;
    speaker: string;
    date: string;
    youtubeUrl: string;
    description: string;
}

export const getSermons = async (): Promise<Sermon[]> => {
    const databaseId = process.env.NOTION_SERMONS_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_SERMONS_DB_ID");
        return [];
    }

    try {
        const response = await notion.dataSources.query({
            data_source_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const getPropertyText = (prop: any) => {
                if (!prop) return "";
                if (prop.type === "title") return prop.title[0]?.plain_text || "";
                if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text || "";
                return "";
            };

            const getPropertyDate = (prop: any) => {
                if (!prop || prop.type !== "date" || !prop.date) return "";
                return prop.date.start;
            };

            const getPropertyUrl = (prop: any) => {
                if (!prop || prop.type !== "url") return "";
                return prop.url || "";
            };

            return {
                id: page.id,
                title: getPropertyText(page.properties.Title),
                speaker: getPropertyText(page.properties.Speaker),
                date: getPropertyDate(page.properties.Date),
                youtubeUrl: getPropertyUrl(page.properties.YoutubeURL) || getPropertyUrl(page.properties.VideoURL),
                description: getPropertyText(page.properties.Description),
            };
        });
    } catch (error) {
        console.error("Error fetching sermons from Notion:", error);
        return [];
    }
};

export interface Banner {
    id: string;
    title: string;
    imageUrl: string;
    order: number;
}

export const getBanners = async (): Promise<Banner[]> => {
    const databaseId = process.env.NOTION_BANNERS_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_BANNERS_DB_ID");
        return [];
    }

    try {
        const response = await (notion.dataSources as any).query({
            data_source_id: databaseId,
            filter: {
                property: "Active",
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: "Order",
                    direction: "ascending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const title = page.properties.Title?.title?.[0]?.plain_text || "";
            const files = page.properties.Images?.files || [];
            const imageUrl = files[0]?.file?.url || files[0]?.external?.url || "";
            const order = page.properties.Order?.number || 0;

            return { id: page.id, title, imageUrl, order };
        }).filter((b: Banner) => b.imageUrl);
    } catch (error) {
        console.error("Error fetching banners from Notion:", error);
        return [];
    }
};

export interface LiveStream {
    id: string;
    title: string;
    youtubeUrl: string;
}

export const getLiveStream = async (): Promise<LiveStream | null> => {
    const databaseId = process.env.NOTION_LIVESTREAM_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_LIVESTREAM_DB_ID");
        return null;
    }

    try {
        const response = await (notion.dataSources as any).query({
            data_source_id: databaseId,
            filter: {
                property: "Hide",
                checkbox: {
                    equals: false,
                },
            },
        });

        if (response.results.length === 0) return null;

        const page: any = response.results[0];
        const title = page.properties.Title?.title?.[0]?.plain_text || "";
        const youtubeUrl = page.properties["Youtube Live Link"]?.url || "";

        if (!youtubeUrl) return null;
        return { id: page.id, title, youtubeUrl };
    } catch (error) {
        console.error("Error fetching livestream from Notion:", error);
        return null;
    }
};

export interface ChurchEvent {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    category: string;
}

export const getEvents = async (): Promise<ChurchEvent[]> => {
    const databaseId = process.env.NOTION_EVENTS_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_EVENTS_DB_ID");
        return [];
    }

    try {
        const response = await (notion as any).dataSources.query({
            data_source_id: databaseId,
            filter: {
                property: "Active",
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: "Date",
                    direction: "ascending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const title = page.properties.Title?.title?.[0]?.plain_text || "";
            const date = page.properties.Date?.date?.start || "";
            // User named the column "Thumnail" (misspelled) instead of "Image"
            const files = page.properties.Thumnail?.files || page.properties.Image?.files || [];
            const imageUrl = files[0]?.file?.url || files[0]?.external?.url || "";
            const description = page.properties.Description?.rich_text?.[0]?.plain_text || "";
            const category = page.properties.Category?.select?.name || "";

            return { id: page.id, title, date, imageUrl, description, category };
        });
    } catch (error) {
        console.error("Error fetching events from Notion:", error);
        return [];
    }
};

export interface ChurchAlbum {
    id: string;
    title: string;
    date: string;
    coverImage: string;
    gallery: string[];
}

export const getAlbums = async (): Promise<ChurchAlbum[]> => {
    const databaseId = process.env.NOTION_ALBUMS_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_ALBUMS_DB_ID");
        return [];
    }

    try {
        const response = await (notion as any).dataSources.query({
            data_source_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const title = page.properties.Title?.title?.[0]?.plain_text || "";
            const date = page.properties.Date?.date?.start || "";
            
            const coverFiles = page.properties["Cover Image"]?.files || [];
            const coverImage = coverFiles[0]?.file?.url || coverFiles[0]?.external?.url || "";
            
            // User named the column "File_Media" instead of "Gallery"
            const galleryFiles = page.properties.File_Media?.files || page.properties.Gallery?.files || [];
            const gallery = galleryFiles.map((f: any) => f.file?.url || f.external?.url || "").filter(Boolean);

            return { id: page.id, title, date, coverImage, gallery };
        });
    } catch (error) {
        console.error("Error fetching albums from Notion:", error);
        return [];
    }
};

export interface Devotional {
    id: string;
    title: string;
    date: string;
    summary: string;
}

export const getDevotionals = async (): Promise<Devotional[]> => {
    const databaseId = process.env.NOTION_DEVOTIONALS_DB_ID;

    if (!databaseId) {
        console.error("Missing NOTION_DEVOTIONALS_DB_ID");
        return [];
    }

    try {
        const response = await (notion as any).dataSources.query({
            data_source_id: databaseId,
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const title = page.properties.Title?.title?.[0]?.plain_text || "";
            const date = page.properties.date?.date?.start || "";
            const summary = page.properties["요약"]?.rich_text?.[0]?.plain_text || "";

            return { id: page.id, title, date, summary };
        });
    } catch (error) {
        console.error("Error fetching devotionals from Notion:", error);
        return [];
    }
};

export const getDevotionalContent = async (pageId: string): Promise<string> => {
    try {
        const mdblocks = await n2m.pageToMarkdown(pageId);
        const mdString = n2m.toMarkdownString(mdblocks);
        return mdString.parent || "";
    } catch (error) {
        console.error("Error fetching devotional content from Notion:", error);
        return "";
    }
};
