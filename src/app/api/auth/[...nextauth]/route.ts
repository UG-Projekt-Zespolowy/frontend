import NextAuth from "next-auth/next"
import KeycloakProvider from "next-auth/providers/keycloak"
import type { Session } from "next-auth"

const handler = NextAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.accessToken) {
                (session as Session & { accessToken?: string }).accessToken = token.accessToken as string;
            }
            return session;
        },
    },
})

export { handler as GET, handler as POST }
