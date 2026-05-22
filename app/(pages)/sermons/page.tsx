import { getSermons } from "../../lib/notion";
import SermonClient from "./SermonClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function SermonsPage() {
    const sermons = await getSermons();
    
    return <SermonClient initialSermons={sermons} />;
}
