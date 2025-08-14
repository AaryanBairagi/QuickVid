import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '../../../configs/db'; 
import { VideoData } from '../../../configs/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req) {
try {
    console.log('DELETE /api/delete-video called');

    const { userId } = getAuth(req);
    console.log('userId from getAuth:', userId);

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { videoId } = await req.json();
    console.log('Deleting videoId:', videoId);

    // Directly try deletion if the video exists
    const video = await db.select().from(VideoData).where(eq(VideoData.id, videoId)).limit(1);
    console.log('Video found in DB:', video);

    if (!video.length) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // ❗ Skipping the owner check — directly delete
    await db.delete(VideoData).where(eq(VideoData.id, videoId));
    console.log('✅ Video deleted successfully');

    return NextResponse.json({ message: 'Video deleted' });
    } catch (err) {
        console.error('🔥 Error deleting video:', err);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}




// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import { db } from '../../../configs/db'; 
// import { VideoData } from '../../../configs/schema';

// export async function DELETE(req) {
// try {
//     const { userId } = auth();
//     if (!userId) 
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//     const { videoId } = await req.json();

//     // Check ownership for security
//     const video = await db
//         .select()
//         .from(VideoData)
//         .where(VideoData.id.equals(videoId))
//         .limit(1);

//     if (!video.length || video[0].createdBy !== userId) {
//         return NextResponse.json({ error: 'Video not found or access denied' }, { status: 403 });
//     }

//     // Delete the video
//     await db.delete(VideoData).where(VideoData.id.equals(videoId));

//     return NextResponse.json({ message: 'Video deleted' });
//     } catch (err) {
//         console.error('Error deleting video:', err);
//         return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
//     }
// }
