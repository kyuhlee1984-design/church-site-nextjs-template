import { getBanners, getAlbums, getDevotionals, getBulletins, Banner, ChurchAlbum, Devotional, Bulletin } from "@/app/lib/notion";
import CommunityClient from "./CommunityClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CommunityPage() {
    const [banners, albums, devotionals, bulletins] = await Promise.all([
        getBanners(),
        getAlbums(),
        getDevotionals(),
        getBulletins(),
    ]);

    return <CommunityClient banners={banners} albums={albums} devotionals={devotionals} bulletins={bulletins} />;
}
