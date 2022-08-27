import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://laodeaksar.eu.org/static/images/me.png',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions)
