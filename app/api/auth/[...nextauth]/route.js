import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
const handler = NextAuth({
  providers: [

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    

  
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});



export { handler as GET, handler as POST };