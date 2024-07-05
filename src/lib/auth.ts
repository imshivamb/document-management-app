import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"
import { ExtendedSession } from "./types"
import { users } from "./db"  // Import your users table
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
      
        const user = await db.select().from(users).where(eq(users.email, credentials.email)).get()
      
        if (!user) {
          return null
        }
      
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
      
        if (!isPasswordValid) {
          return null
        }
      
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub!,
        },
      } as ExtendedSession;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth/signin", 
  },
}