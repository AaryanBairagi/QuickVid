import { currentUser, getAuth } from "@clerk/nextjs/server";
import { VideoData } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "../../../configs/db";


export async function GET(req){
    try{
        const {userId} = getAuth(req);
        console.log("Fetching videos for Clerk User:" , userId);

        if(!userId){
            return NextResponse.json({error:error.message},{status:401});
        }

        const user = await currentUser();
        const createdBy =   user?.fullName || 
                            user?.username || 
                            user?.primaryEmailAddress?.emailAddress || 
                            "Unknown User";
        
        const videos = await db.select().from(VideoData).where(eq(VideoData.createdBy,createdBy));

        return NextResponse.json({ success:true , videos });
    }catch(error){
        console.log("Error fetching the user videos : " , error);
        return NextResponse.json({error:error.message},{status:500});
    }
}