"use client"
import React, { useCallback, useEffect, useState } from 'react';

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

interface AllItemsProps {
    query: string;
    currentPage: number;
}

const AllItems: React.FC<AllItemsProps> = ({ query, currentPage }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
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
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [query, currentPage]); // add dependencies here

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    if (isLoading) {
        return (
            <div className='pt-28 h-full '>
                <p className='text-sm font-bold text-center'>Loading...</p>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className='pt-28 h-full '>
                <p className='text-sm font-bold text-center'>No items found</p>
            </div>
        );
    }

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
    );
};

export default AllItems;
