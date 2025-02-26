import { connectionToDatabase } from '@/lib/db';
import UserModel from '@/models/User';

export async function POST(request: Request) {
  await connectionToDatabase();

  try {
    const { email, code } = await request.json();
    console.log(email)
    
    const decodedEmail = decodeURIComponent(email);
    const user = await UserModel.findOne({ email:decodedEmail });

    console.log(user);
    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Mark user as verified
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}
