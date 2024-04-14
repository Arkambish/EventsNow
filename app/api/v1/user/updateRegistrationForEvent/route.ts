import connectMongoDB  from "@/lib/mongo/mongodb";
import RegisteredUser from "@/models/registeredUserModel";


export async function POST(req: Request) {
    try {
        connectMongoDB();
        const data = await req.json();
    
        const updatedRegistration = await RegisteredUser.findByIdAndUpdate(
            data.regUserId,
            { $set: { eventUpdates:data.eventUpdates, marketingUpdates:data.marketingUpdates } }
        );
    
        if (!updatedRegistration) {
        return Response.json("No User");
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ message: "Internal Server Error" });
    }
    }