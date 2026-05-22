import { getEvents, getAlbums, getDevotionals, ChurchEvent, ChurchAlbum, Devotional } from "@/app/lib/notion";
import CommunityClient from "./CommunityClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CommunityPage() {
    const [events, albums, devotionals] = await Promise.all([
        getEvents(),
        getAlbums(),
        getDevotionals(),
    ]);

    return <CommunityClient events={events} albums={albums} devotionals={devotionals} />;
}
