import connectMongoDB from "@/lib/mongo/mongodb";
import Attendant from "@/models/attendees";
import BuyTicket from "@/models/buyTicket";

import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


export async function POST(req: NextRequest) {
    const {ticketCode } = await req.json();
    console.log(ticketCode);
     try{
        connectMongoDB();
        console.log("ashan")
        const ticketDetails= await BuyTicket.findOne({ticketCode:ticketCode}).populate('ticketId');
        // .populate('ticketId');
        console.log("ashan")
        console.log(typeof(ticketDetails.ticketId));
        console.log(ticketDetails)
        // if(!ticketDetails){
        //     console.log("ashan")
        //     return NextResponse.json({message:"Invalid Ticket Code "},{status:400});
        // }
        console.log("ashan")
        console.log(NextResponse.json(ticketDetails));      
        // if(ticketDetails.isAttendenceMarked){
        //     return NextResponse.json({message:"Ticket Already Marked"},{status:400});
        // }
        // const attendant = await Attendant.create({
            
        //     ticketType:ticketDetails.ticketId.classType,
        //     eventId:ticketDetails.eventId,
        //     userId:ticketDetails.userId
        // });
        // if(!attendant){
        //     return NextResponse.json({message:"attendant Creation Failed"},{status:400});
        // }
        // const updateBuyTicket =await BuyTicket.findByIdAndUpdate(ticketDetails._id, {
        //     $set: {
        //         isAttendenceMarked:true,
        //     },
        //   });

        // return NextResponse.json(attendant,{status:201,});
        return NextResponse.json(ticketDetails,{status:201});
        // return NextResponse.json({message:"attendance marked successfully"},{status:200});
     } catch(e){
        return NextResponse.json({message:"Invalid Ticket Code"},{status:400});
     }}