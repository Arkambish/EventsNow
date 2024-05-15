import connectMongoDB from "@/lib/mongo/mongodb";
import BuyTicket from "@/models/buyTicket";
import { NextResponse } from "next/server";
const mongoose = require("mongoose");



export const GET = async () =>{
    connectMongoDB();
    console.log("connected");
    try {
        
        const allTicketCodes = await BuyTicket.distinct("ticketCode");
        console.log(allTicketCodes);
        return NextResponse.json({ success: true, data: allTicketCodes });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}