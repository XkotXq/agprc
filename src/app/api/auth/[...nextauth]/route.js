import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;


        const res = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
        if (!res || res.rowCount === 0) {
          return null;
        }

        const admin = res.rows[0];

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) return null;

        return { id: admin.id, email: admin.email, role: admin.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, email: token.email, role: token.role };
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
