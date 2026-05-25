import { getSermons, getLiveStream } from "./lib/notion";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // Revalidate every 1 hour

export default async function HomePage() {
    const [allSermons, liveStream] = await Promise.all([
        getSermons(),
        getLiveStream(),
    ]);
    // Get only the 6 most recent sermons
    const recentSermons = allSermons.slice(0, 6);
    
    return <HomeClient recentSermons={recentSermons} liveStream={liveStream} />;
}
