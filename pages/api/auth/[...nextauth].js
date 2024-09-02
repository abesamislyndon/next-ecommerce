import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in route
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
};

export default NextAuth(authOptions);
