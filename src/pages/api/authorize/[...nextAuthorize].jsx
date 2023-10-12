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
        try {
          await databaseLink();
          const user = await userM.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Email-exists");
          }

          const passwordCheck = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordCheck) {
            throw new Error("Password-fail");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (newuser) {
          user.id = newuser.id;
          user.token = newuser.role;
          return user;
        } else {
          return user;
        }
      } catch (error) {
        throw error;
      }
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      try {
        if (user) {
          token.id = user.id;
          token.role = user.role;
          return token;
        } else {
          return token;
        }
      } catch (error) {
        throw error;
      }
    },

    async session({ session, user, token }) {
      try {
        session.user.id = token.id;
        session.user.role = token.role;
        return session;
      } catch (error) {
        throw error;
      }
    },
  },
});
