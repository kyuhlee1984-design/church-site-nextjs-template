import { getSermons } from "../../lib/notion";
import SermonClient from "./SermonClient";

export const revalidate = 3600; // Revalidate every 1 hour

export default async function SermonsPage() {
    const sermons = await getSermons();
    
    return <SermonClient initialSermons={sermons} />;
}
