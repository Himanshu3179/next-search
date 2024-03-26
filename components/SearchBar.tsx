"use client"
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();



    const handleSearch = useDebouncedCallback((term: string) => {
        console.log("searching...", term)
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
            params.delete('page')
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className='fixed flex gap-2 top-0 shadow-neutral-900 shadow-xl p-5 border  backdrop-blur-md rounded-b-md z-[2]
         max-w-md w-full
         items-center
        '>
            <Input placeholder="Search Items (by name, description, price)..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                className='backdrop-blur-md bg-transparent '
            />
            {/* <Button variant={"default"} className=''>Search</Button> */}
            <Search />
        </div>
    )
}

export default SearchBar