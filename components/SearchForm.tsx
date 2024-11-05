import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';
import Form from 'next/form';
import React from 'react';

const SearchForm = ({ query }: { query?: string }) => {
	return (
		<Form action='/' scroll={false} className='search-form'>
			<input
				name='query'
				defaultValue={query}
				placeholder='Search Startups'
				className='search-input'
			/>
			<div className='flex gap-2'>
				{query && <SearchFormReset />}
				<button type='submit' className='search-btn text-white'>
					<Search className='size-6' />
				</button>
			</div>
		</Form>
	);
};

export default SearchForm;
