import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectionToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import { User } from 'next-auth';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials?: Record<"email" | "password", string>): Promise<User|null> {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        await connectionToDatabase();
        try {
          const user = await UserModel.findOne({
            email: credentials.email
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.fullname = user.fullname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.fullname = token.fullname;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge:30*24*60*60
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};