import { NextResponse } from "next/server";
import Organization from "@/models/organizationModel";
import connectMongoDB from "@/lib/mongo/mongodb";

export async function POST(req: Request) {
    
    try {
        const reqData = await req.json();
        console.log(reqData)
    
        await connectMongoDB();
    
        const data = await Organization.deleteOne({ _id: reqData.id });
      
       
        return NextResponse.json({ message: "success" });
    } catch (error) {
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
    }