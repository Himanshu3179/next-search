"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from "react";
export function PaginationDemo(

) {


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handlePage(page: number) {
        const params = new URLSearchParams(searchParams);
        if (page > 1) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleNext() {
        const params = new URLSearchParams(searchParams);
        const page = Number(params.get('page')) || 1;

        params.set('page', (page + 1).toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function handlePrevious() {
        const params = new URLSearchParams(searchParams);
        const page = Number(params.get('page')) || 1;
        if (page > 2) {
            params.set('page', (page - 1).toString());
        }
        else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    return (

        <Pagination className=" fixed  bottom-5 backdrop-blur-lg z-[2] w-fit px-5 py-3 rounded-lg border shadow-inner shadow-neutral-200
            cursor-pointer 
            select-none
            ">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => handlePage(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => handlePage(2)}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => handlePage(3)}>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={handleNext} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>

    )
}
{/* <PaginationItem>
<PaginationPrevious href="#" />
</PaginationItem>
<PaginationItem>
<PaginationLink href="#">1</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#" isActive>
2
</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#">3</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationEllipsis />
</PaginationItem>
<PaginationItem>
<PaginationNext href="#" />
</PaginationItem> */}