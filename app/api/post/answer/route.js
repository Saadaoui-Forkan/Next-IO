import connectDB from "@/config/connectDB";
import protect from "@/middleware/protect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

/**
 * method: POST
 * route : /api/post/answer
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

        const { content, question } = await request.json()
        await Post.create({
            parent: question,
            content,
            userId
        })

        await Post.findByIdAndUpdate(question, {
            $inc: {
                'question.answersCount': 1
            }
        }, { new: true })

        return new NextResponse(
            JSON.stringify({ success: true }),
            { status: 201 }
        ); 
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong => POST Answer", {
            status: 500,
        });
    }
}