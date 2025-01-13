import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return NextResponse.json({ message: "Users retrieved successfully!", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const { fname, lname, email, phone, city, gender } = await req.json();

    if (!fname || !lname || !email || !phone || !city || !gender) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newUser = new User({ fname, lname, email, phone, city, gender });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
};
