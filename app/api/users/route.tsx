import { connectToDatabase } from "@/app/dbConnect";
import User from '@/app/db/Schema/UserSchema'
import { NextResponse } from "next/server";

// Connect to the database
connectToDatabase();

// POST handler to add a new user
export async function POST(request: Request) {
  try {
    const { fname, lname, email, phone, city, gender }: {
      fname: string;
      lname: string;
      email: string;
      phone: string;
      city: string;
      gender: string;
    } = await request.json();

    const regDate = new Date();

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "This Email already exists.",
      });
    }

    // Create and save a new user
    const newUser = new User({
      fname,
      lname,
      email,
      phone,
      city,
      gender,
      createAt: regDate,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "New User Saved in the Database!",
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
}

// GET handler to fetch all users
export async function GET() {
  try {
    // Fetch all users from the database
    const allUsers = await User.find();

    return NextResponse.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      success: false,
      message: "Unable to fetch users. Please try again later.",
    });
  }
}
