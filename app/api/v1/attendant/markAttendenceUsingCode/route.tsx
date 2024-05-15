import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const {ticketCode } = await req.json();
     try{
        connectMongoDB();
        const ticketDetails= await BuyTicket.findOne({ticketCode:ticketCode}).populate('ticketId');
        if(!ticketDetails){
            return NextResponse.json({message:"Invalid Ticket Code"},{status:400});
        }
        const attendant = await Attendant.create({
            ticketType:ticketDetails.ticketId.classType,
            eventId:ticketDetails.eventId,
            userId:ticketDetails.userId
        });
        if(!attendant){
            return NextResponse.json({message:"attendant Creation Failed"},{status:400});
        }
        return NextResponse.json(attendant,{status:201});
     } catch(e){
        return NextResponse.json({message:"ticket Creation Failed"},{status:400});
     }}