import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/db/db';
import User from '@/models/user.model';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {name, email, password} = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({success: false, message: 'All fields are required'}, {status: 400});
    }

    const user = await User.findOne({email});
    if (user) {
      return NextResponse.json({message: 'User already exists'}, {status: 402});
    }

    const hpassword = await bcrypt.hashSync(password);
    // If the user does not exist, create a new user
    const newUser = new User({
      name,
      email,
      password: hpassword,
    });

    await newUser.save();

    return NextResponse.json({success: true, message: 'User created successfully', user: newUser}, {status: 200});
  } catch (error) {
    return NextResponse.json({success: false, message: 'Error creating user', error}, {status: 500});
  }
}
