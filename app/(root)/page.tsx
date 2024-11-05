// import { auth } from '@/auth';
import SearchForm from '@/components/SearchForm';
import StartupCard, { StartupCardType } from '@/components/StartupCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;
	const params = { search: query || null };

	// const session = await auth();
	// console.log(session?.id);

	const { data: startups } = await sanityFetch({ query: STARTUPS_QUERY, params });

	return (
		<>
			<section className='blue_container'>
				<h1 className='heading'>
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>

				<p className='sub-heading !max-w-3xl'>
					Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions
				</p>

				<SearchForm query={query} />
			</section>

			<section className='section_container'>
				<p className='text-30-semibold'>
					{query ? `Search results for "${query}"` : 'All Startups'}
				</p>

				<ul className='mt-7 card_grid'>
					{startups?.length > 0 ? (
						startups.map((startup: StartupCardType) => (
							<StartupCard key={startup?._id} post={startup} />
						))
					) : (
						<p className='no-results'>No startups found</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</>
	);
}
