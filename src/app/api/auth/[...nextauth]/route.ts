import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Indispensable pour le déploiement (Vercel/Production)
  trustHost: true, 
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user }: { user: any }) {
      const allowed = process.env.ALLOWED_EMAILS?.split(",") || [];
      return allowed.includes(user.email);
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };