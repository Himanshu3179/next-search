
import AllItems from "@/components/AllItems";
import { PaginationDemo } from "@/components/Pagination";

import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (

    <div className="h-full relative w-full flex justify-center items-center">
      <ScrollArea className="h-[100%] w-full px-5">
        <AllItems
          query={query}
          currentPage={currentPage}
        />
      </ScrollArea>
      <PaginationDemo />
    </div>

  );
}
