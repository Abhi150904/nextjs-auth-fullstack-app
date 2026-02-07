import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();

export async function POST(req: Request) {
  try {

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and new password are required" },
        { status: 400 }
      );
    }

    // Find user with this reset token
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset fields
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
