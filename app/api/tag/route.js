import connectDB from "@/config/connectDB"
import protect from "@/middleware/protect"
import Tag from "@/models/Tag"
import { NextResponse } from "next/server"

/**
 * method: POST
 * route : /api/tag
*/
export const POST = async(request) => {
    await connectDB()

    try {
        const user = await protect(request)
        if (!user) {
            return;
        }

        const { description, slug, name } = await request.json();
        if (!description || !slug || !name) {
            return new NextResponse("Required Fields", { status: 401 })
        }

        const tag = new Tag({
            description,
            slug,
            name
        })
        await tag.save()

        return new NextResponse(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong => POST Tag", {
            status: 500,
        });
    }
}

/**
 * method: GET
 * route : /api/tag
*/
export const GET = async(request) => {
    await connectDB()

    try {
        const tags = await Tag.find({})

        return new NextResponse(
            JSON.stringify(tags),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong => POST Tag", {
            status: 500,
        });
    }
}