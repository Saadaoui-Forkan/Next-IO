import connectDB from "@/config/connectDB"
import protect from "@/middleware/protect"
import User from "@/models/User"
import { NextResponse } from "next/server"

/**
 *  Test If Route Is Protected
*/
export const GET = async (request) => {
    await connectDB()
    try {
        const user = await protect(request)

        const me = await User.findById(user._id ).select("-password")

        return NextResponse.json(me, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}