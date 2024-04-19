export const dynamic = "force-dynamic";

import {NextRequest , NextResponse} from "next/server";
import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import Revenuee from "@/models/revenueModel";

type Params = {
  id: string;
};

export async function GET (request: Request, {params}: {params : any}){
    try {
        const id = params.id;
        await connectMongoDB();

        const revenueDoc =  await Revenuee.find({eventId: id}).populate("userId");
        if(!revenueDoc || revenueDoc.length === 0){
            return NextResponse.json([]);
        }
    } catch (error) {
        return new NextResponse("Error in fetching data" + error, {status: 500});
    }
}