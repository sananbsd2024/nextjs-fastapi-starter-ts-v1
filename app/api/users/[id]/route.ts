import { connectToDatabase } from "../../app/lib/mongodb";
import User from "../../app/models/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();

    const id = req.url.split("/users/")[1];

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User retrieved successfully!", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user." }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    await connectToDatabase();
    const id = req.url.split("/users/")[1];
    const updates = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updates
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found for update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully!", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    await connectToDatabase();
    const id = req.url.split("/users/")[1];

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found for deletion." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
};
