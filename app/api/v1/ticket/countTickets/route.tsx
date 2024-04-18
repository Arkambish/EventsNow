import connectMongoDB from "../../../../../lib/mongo/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import BuyTicket from "@/models/buyTicket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    connectMongoDB();

    const { eventId } = req.query;

    // Aggregate to sum up the quantity field for tickets associated with the eventId
    const totalTicketsBorrowed = await BuyTicket.aggregate([
      {
        $match: { eventId }, // Filter by eventId
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" }, // Sum up the quantity field
        },
      },
    ]);

    // Extract the total quantity from the aggregation result
    const totalQuantity =
      totalTicketsBorrowed.length > 0 ? totalTicketsBorrowed[0].total : 0;

    res.json({ totalTicketsBorrowed: totalQuantity });
  } catch (error) {
    console.error("Error counting tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
