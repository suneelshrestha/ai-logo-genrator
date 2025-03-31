import dbConnect from '@/db/db';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {NextResponse} from 'next/server';

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'your@email.com'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          // Find user by email
          const user = await User.findOne({email: credentials.email});
          if (!user) {
            throw new Error('User not found');
          }

          // Validate password
          const isValid = await bcrypt.compare(credentials.password as string, user.password as string);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          return user;
        } catch (error: any) {
          console.error('Auth Error:', error.message);
          return null; // Return null to indicate authentication failure
        }
      },
    }),
  ],
  callbacks: {
    async signIn({user}) {
      try {
        await dbConnect();
        const userExists = await User.findOne({email: user.email});

        if (!userExists) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          await newUser.save();
        }
        return true; // Return true to indicate successful sign-in
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false; // Return false to indicate sign-in failure
      }
    },
  },
});
