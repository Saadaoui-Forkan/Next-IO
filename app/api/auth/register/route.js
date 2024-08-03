import connectDB from "@/config/connectDB";
import User from "@/models/User";
import { generateToken, setTokenCookie } from "@/utils/generateToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 *  Method: POST
 *  route : /api/auth/register
*/
export const POST = async (request) => {
  await connectDB();
  try {
    const { name, email, password } = await request.json();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return new Response("User Already Exist", { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    if (savedUser) {
      const token = generateToken(savedUser._id);
      const response = new NextResponse(
        JSON.stringify({ user: savedUser.email }),
        { status: 200 }
      );
      setTokenCookie(response, token);
      return response;
    } else {
      return new NextResponse("Failed to create user", { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong => Register User", {
      status: 500,
    });
  }
};
