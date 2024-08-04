import connectDB from "@/config/connectDB";
import User from "@/models/User";
import { generateToken, setTokenCookie } from "@/utils/generateToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 *  Method: POST
 *  route : /api/auth/login
*/
export const POST = async (request) => {
    await connectDB();
    try {
      const { email, password } = await request.json();
  
      const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password)
      
      if (!user || !isMatch) {
        return new NextResponse("Invalid Credentials", { status: 400 })
      } 
  
      if (user) {
        const token = generateToken(user._id);
        const response = new NextResponse(
          JSON.stringify({ user: user.email }),
          { status: 200 }
        );
        setTokenCookie(response, token);
        return response;
      } else {
        return new NextResponse("Failed to create user", { status: 500 });
      }
    } catch (error) {
      console.log(error);
      return new Response("Something went wrong => Login User", {
        status: 500,
      });
    }
  };