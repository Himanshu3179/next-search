// pages/api/items.js
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { skip = 0, take = 10, search } = body;
    const filePath = path.join(process.cwd(), "app/items.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    let allItems = JSON.parse(fileContents);

    if (search) {
      const searchQuery = search.toLowerCase();
      const filteredItems = allItems.filter(
        (item: { name: string; description: string; price: number }) => {
          return (
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery) ||
            item.price.toString().includes(searchQuery)
          );
        }
      );
      allItems = filteredItems;
    }

    const paginatedItems = allItems.slice(
      Number(skip),
      Number(skip) + Number(take)
    );

    return NextResponse.json(paginatedItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
