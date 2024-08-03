import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const protect = async (request) => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value;
  
    if (!token) {
      throw new Error('Not authorized, no token');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId)
  
      if (!user) {
        throw new Error('Not authorized, user not found');
      }
  
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Not authorized, token failed');
    }
  };
  
  export default protect;