import { getLiveStream } from "../../lib/notion";
import LiveClient from "./LiveClient";

export const revalidate = 60;

export default async function LivePage() {
    const liveStream = await getLiveStream();
    return <LiveClient liveStream={liveStream} />;
}
