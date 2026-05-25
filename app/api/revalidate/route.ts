import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    // This secret should be stored securely in your Vercel Environment Variables
    // e.g. REVALIDATE_SECRET=my-super-secret-token
    const validSecret = process.env.REVALIDATE_SECRET || 'my-super-secret-token';

    if (secret !== validSecret) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        // Revalidate all major paths
        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/community');
        revalidatePath('/live');
        revalidatePath('/ministries');
        revalidatePath('/next-gen');
        revalidatePath('/offering');
        revalidatePath('/sermons');
        revalidatePath('/em');

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
