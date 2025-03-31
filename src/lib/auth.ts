import dbConnect from '@/db/db';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import googlelogin from '../app/api/googlelogin/route';

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
      await googlelogin(user);
      return true;
    },
  },
});
