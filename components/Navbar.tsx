import { auth, signIn, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgePlus, LogOut } from 'lucide-react';
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
								<span className='max-sm:hidden'>Create</span>
								<BadgePlus className='size-6 sm:hidden' />
							</Link>

							<form
								action={async () => {
									'use server';
									await signOut({ redirectTo: '/' });
								}}
							>
								<button type='submit'>
									<span className='max-sm:hidden'>Logout</span>
									<LogOut className='logout_btn_icon size-6 sm:hidden' />
								</button>
							</form>

							<Link href={`/user/${session?.id}`} className='flex items-center gap-2'>
								<span className='font-bold max-sm:hidden'>{session?.user?.name}</span>
								<Avatar className='size-[30px]'>
									<AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
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
