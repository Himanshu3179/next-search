"use client"
import React, { useEffect, useState } from 'react'
import { PaginationDemo } from './Pagination';

type Item = {
    imageCredit: {
        artist: string;
        link: string;
    };
    tags: string[];
    imageUrl: string;
    filename: string;
    imageHash: string;
    price: number;
    name: string;
    description: string;
    slug: string;
    added: number;
    manufacturer: string;
    itemType: string;
    productImg: string;
};

const AllItems = ({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) => {
    const [items, setItems] = useState<Item[]>([]);

    async function fetchItems() {
        const res = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                skip: (currentPage - 1) * 20,
                take: 20,
                search: query,
            }),
        });
        const data = await res.json();
        setItems(data);
    }

    useEffect(() => {
        
        fetchItems();

    }, [query, currentPage]);


    if (!items.length) return (
        <div className='pt-28 h-full '>
            <p className='text-sm font-bold text-center'>No items found</p>
        </div>
    )
    return (

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-24 pb-96'>
            {items.map((item) => (
                <div key={item.slug} className='border p-3 flex flex-col rounded-md'>
                    <h1 className='font-semibold'>{item.name}</h1>
                    <p className='text-neutral-400 text-sm mt-2 h-full'>{item.description}</p>
                    <p className='text-2xl mt-3 text-end bg-neutral-800 
                    rounded-md px-2 text-neutral-100 font-semibold
                    ml-auto'>{'$ '}{item.price}</p>
                </div>
            ))}

        </div>


    )
}

export default AllItems