import { getLiveStream } from "../../lib/notion";
import LiveClient from "./LiveClient";

export const revalidate = 3600; // Revalidate every 1 hour

export default async function LivePage() {
    const liveStream = await getLiveStream();
    return <LiveClient liveStream={liveStream} />;
}
