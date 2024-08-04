import connectDB from "@/config/connectDB"
import protect from "@/middleware/protect"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

/**
 * method: POST
 * route : /api/post/question
*/
export const POST = async(request) => {
    await connectDB()
    try {
        const user = await protect(request)
        const userId = user._id.toString()
        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: "User ID not found" }),
                { status: 400 }
            );
        }

        const { title, content, tags } = await request.json()
        console.log(tags)
        const question = await Post.create({
            question: { title },
            content,
            userId,
            tags
        })

        return new NextResponse(
            JSON.stringify({ data: {
                id: question.id
            } }),
            { status: 201 }
        ); 
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong => POST Question", {
            status: 500,
        });
    }
}