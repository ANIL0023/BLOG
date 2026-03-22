import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firebaseToken: { label: "Firebase Token", type: "text" }
      },
      async authorize(credentials) {
        if (credentials?.firebaseToken) {
          try {
            const { adminAuth } = await import('@/lib/firebase-admin');
            const decodedToken = await adminAuth.verifyIdToken(credentials.firebaseToken);
            if (!decodedToken || !decodedToken.email) return null;
            
            await connectDB();
            let user = await User.findOne({ email: decodedToken.email });
            if (!user) {
              const randomPass = Math.random().toString(36).slice(-10);
              const hashedPass = await bcrypt.hash(randomPass, 10);
              user = await User.create({
                name: decodedToken.name || decodedToken.email.split('@')[0],
                email: decodedToken.email,
                image: decodedToken.picture || '',
                password: hashedPass
              });
            }
            return { id: user._id.toString(), name: user.name, email: user.email, image: user.image };
          } catch (error) {
            console.error('Firebase token verification failed:', error);
            return null;
          }
        }

        if (!credentials?.email || !credentials?.password) return null;
        
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) return null;

        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
