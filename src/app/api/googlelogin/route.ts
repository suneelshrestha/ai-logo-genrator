import dbConnect from '@/db/db';
import User from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';

export default async function googlelogin(credential: any) {
  try {
    await dbConnect();
    try {
      //   const userExists = await User.findOne({email: credential.email});
      const userExists = await User.findOne({email: credential.email});

      if (!userExists) {
        const newUser = new User({
          name: credential.name,
          email: credential.email,
          image: credential.image,
          password: credential.sub,
        });
        await newUser.save();
        return NextResponse.json({newUser});
      }
      return NextResponse.json({userExists});
    } catch (error) {
      return NextResponse.json({message: 'error finding user'});
    }
    // console.log('the provide emeil is', credential.email, credential.password);
  } catch (error) {
    return NextResponse.json({message: 'Error connectong to db'});
  }
}
