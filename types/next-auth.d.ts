declare module "next-auth" {
    interface Session {
        accessToken?: string;
        idToken?: string;
    }

    interface User {
        id?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        idToken?: string;
    }
}
