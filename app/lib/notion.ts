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
    seriesTitle?: string;
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

            const getPropertyCheckbox = (prop: any) => {
                if (!prop || prop.type !== "checkbox") return false;
                return prop.checkbox === true;
            };

            return {
                id: page.id,
                title: getPropertyText(page.properties.Title),
                speaker: getPropertyText(page.properties.Speaker),
                date: getPropertyDate(page.properties.Date),
                youtubeUrl: getPropertyUrl(page.properties.YoutubeURL) || getPropertyUrl(page.properties.VideoURL),
                description: getPropertyText(page.properties.Description),
                seriesTitle: getPropertyText(page.properties['시리즈타이틀']),
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
    date?: string;
    order: number;
    description?: string;
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
            sorts: [
                {
                    property: "Start Date",
                    direction: "ascending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const title = page.properties.Title?.title?.[0]?.plain_text || "";
            const files = page.properties.Images?.files || [];
            const imageUrl = files[0]?.file?.url || files[0]?.external?.url || "";
            
            const startDate = page.properties["Start Date"]?.date?.start || "";
            const endDate = page.properties["End Date"]?.date?.start || "";
            
            let dateStr = "";
            if (startDate && endDate && startDate !== endDate) {
                dateStr = `${startDate} ~ ${endDate}`;
            } else if (startDate) {
                dateStr = startDate;
            } else if (endDate) {
                dateStr = endDate;
            }

            const order = page.properties.Order?.number || 0;
            const description = page.properties.Description?.rich_text?.[0]?.plain_text || "";

            return { id: page.id, title, imageUrl, date: dateStr, order, description };
        });
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

export interface Bulletin {
    id: string;
    date: string;
    fileUrl: string;
}

export const getBulletins = async (): Promise<Bulletin[]> => {
    const databaseId = process.env.NOTION_BULLETINS_DB_ID || "369d4bd5-7a29-8094-b25a-000b508bb53e";

    try {
        const response = await (notion as any).databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const date = page.properties.Date?.date?.start || "";
            const files = page.properties["Files & media"]?.files || [];
            const fileUrl = files[0]?.file?.url || files[0]?.external?.url || "";

            return { id: page.id, date, fileUrl };
        });
    } catch (error) {
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
                const date = page.properties.Date?.date?.start || "";
                const files = page.properties["Files & media"]?.files || [];
                const fileUrl = files[0]?.file?.url || files[0]?.external?.url || "";

                return { id: page.id, date, fileUrl };
            });
        } catch (innerError) {
            console.error("Error fetching bulletins from Notion:", innerError);
            return [];
        }
    }
};
