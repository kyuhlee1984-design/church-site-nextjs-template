import { getSermons, getBanners, getLiveStream } from "./lib/notion";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
    const [allSermons, banners, liveStream] = await Promise.all([
        getSermons(),
        getBanners(),
        getLiveStream(),
    ]);
    // Get only the 6 most recent sermons
    const recentSermons = allSermons.slice(0, 6);
    
    return <HomeClient recentSermons={recentSermons} banners={banners} liveStream={liveStream} />;
}
