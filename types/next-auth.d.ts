// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		id: string;
	}

	interface JWT {
		id: string;
	}
}