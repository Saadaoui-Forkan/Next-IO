import connectDB from "@/config/connectDB";
import Post from "@/models/Post";
import Tag from "@/models/Tag";
import { NextResponse } from "next/server";

/**
 * method: GET
 * route : /api/post/:id
*/
export const GET = async(request, { params }) => {
    await connectDB()
    try {
        const question = await Post.findById(params.id)
            .populate('user', 'name')
            .populate('tags', 'name slug')
            .exec()

        const answers = await Post.find({parent: params.id})
            .populate('user', 'name')
            .exec()

        return new NextResponse(
            JSON.stringify({ data: {
                ...question.toJSON(), answers
            }}),
            { status: 201 }
        ); 
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong => POST Answer", {
            status: 500,
        });
    }
}