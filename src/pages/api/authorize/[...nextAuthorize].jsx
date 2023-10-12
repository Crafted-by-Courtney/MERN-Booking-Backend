import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import databaseLink from "../../../utilities/database";
import bcrypt from "bcrypt";
import userM from "../../../models/userM";

export default NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    maxAge: 60 * 24 * 60 * 60, // 60 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await databaseLink();
        const user = await userM.findOne({ email: credentials.email });

        if (!user) {
          // Use a more descriptive error message, e.g., "User not found"
          throw new Error("Email-exists");
        }

        const passwordCheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordCheck) {
          // Use a more descriptive error message, e.g., "Incorrect password"
          throw new Error("Password-fail");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, newuser }) {
      // The user object is automatically returned; you can remove this block
      if (newuser) {
        user.id = newuser.id;
        user.token = newuser.role;
      }
      return user;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
