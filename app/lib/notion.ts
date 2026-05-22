import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
