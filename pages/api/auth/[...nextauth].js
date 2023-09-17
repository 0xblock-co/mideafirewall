import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, metadata) {
      if (account.provider === "linkedin") {
        console.log("user", user);
        console.log("metadata", metadata);

        // Handle the callback here
        return true;
      }
      return false;
    },
  },
});
