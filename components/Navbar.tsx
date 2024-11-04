import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
	const session = await auth();

	return (
		<header className='px-5 py-2 bg-white shadow-sm font-work-sans'>
			<nav className='flex justify-between items-center'>
				<Link href='/'>
					<div className='flex justify-between items-center gap-2'>
						<Image src='/logo.png' alt='logo' width={30} height={30} />
						<p className='text-xl font-bold'>Startups</p>
					</div>
				</Link>

				<div className='flex items-center gap-5 text-black'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span>Create</span>
							</Link>

							<form
								action={async () => {
									'use server';
									await signOut({ redirectTo: '/' });
								}}
							>
								<button type='submit'>Logout</button>
							</form>

							<Link href={`/user/${session?.user?.id}`}>
								<span className='font-bold'>{session?.user?.name}</span>
							</Link>
						</>
					) : (
						<form
							action={async () => {
								'use server';
								await signIn('github');
							}}
						>
							<button type='submit'>Login</button>
						</form>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
