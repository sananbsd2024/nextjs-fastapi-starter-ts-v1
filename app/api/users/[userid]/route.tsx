import { connectToDatabase } from "@/app/utils/db/dbConnect";
import User from '@/app/utils/Schema/UserSchema'
import { NextResponse } from "next/server";

// Connect to the database
connectToDatabase();

// GET handler: Fetch user by ID
export async function GET(
  request: Request,
  { params }: { params: { userid: string } }
) {
  const userId = params.userid;

  try {
    // Fetch the user from the database
    const result = await User.findOne({ _id: userId });

    if (!result) {
      return NextResponse.json({
        success: false,
        message: "User not found.",
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({
      success: false,
      message: "Could not fetch data! Try again later.",
    });
  }
}

export async function PUT(
    request: Request,
    { params }: { params: { userid: string } }
  ) {
    const userId = params.userid;
  
    try {
      // Parse the request body
      const {
        fname,
        lname,
        email,
        phone,
        city,
        gender,
      }: {
        fname: string;
        lname: string;
        email: string;
        phone: string;
        city: string;
        gender: string;
      } = await request.json();
  
      // Update the user by ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fname, lname, email, phone, city, gender },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return NextResponse.json({
          success: false,
          message: "User not found or could not be updated.",
        });
      }
  
      return NextResponse.json({
        success: true,
        message: "User updated successfully.",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({
        success: false,
        message: "Could not update data! Try again later.",
      });
    }
  }
  

// // PUT handler: Update user by ID
// export async function PUT(
//   request: Request,
//   { params }: { params: { userid: string } }
// ) {
//   const userId = params.userid;
//   const {
//     NewFname,
//     NewLname,
//     NewsEmail,
//     NewsPhone,
//     NewsCity,
//     NewsGender,
//   }: {
//     NewFname: string;
//     NewLname: string;
//     NewsEmail: string;
//     NewsPhone: string;
//     NewsCity: string;
//     NewsGender: string;
//   } = await request.json();

//   try {
//     // Update the user and return the updated document
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         fname: NewFname,
//         lname: NewLname,
//         email: NewsEmail,
//         phone: NewsPhone,
//         city: NewsCity,
//         gender: NewsGender,
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return NextResponse.json({
//         success: false,
//         message: "User not found or could not be updated.",
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "User updated successfully.",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json({
//       success: false,
//       message: "Could not update data! Try again later.",
//     });
//   }
// }

// DELETE handler: Remove user by ID
export async function DELETE(
  request: Request,
  { params }: { params: { userid: string } }
) {
  const userId = params.userid;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found or already deleted.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({
      success: false,
      message: "Could not delete user! Try again later.",
    });
  }
}
