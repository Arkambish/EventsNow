import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../../../lib/mongo/mongodb";
import buyTicket from "@/models/buyTicket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongoDB(); // Connect to your MongoDB database

    if (req.method === "GET") {
      const { eventId } = req.query;

      // Fetch total revenue for the specified event ID
      const tickets = await buyTicket.find({ eventId });
      const totalRevenue = tickets.reduce(
        (acc: number, ticket: { price: number }) => acc + ticket.price,
        0
      );

      res.status(200).json({ totalRevenue });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
