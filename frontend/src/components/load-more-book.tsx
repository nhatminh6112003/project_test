"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchBeers } from "@/actions/fetch-products";
import { Beer, Book } from "@/types";
import { Beers } from "@/components/beers";
import { fetchBooks } from "@/actions/fetch-books";
import Books from "./books";

export function LoadMoreBook() {
  const [beers, setBeers] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    await delay(2000);
    const nextPage = (page % 10) + 1;
    setIsLoading(true);
    let newProducts = (await fetchBooks(nextPage)) ?? [];
    setIsLoading(false);
    console.log("TCL: loadMoreBeers -> newProducts", newProducts);
    setBeers((prevProducts: Book[]) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBeers();
    }
  }, [inView]);

  return (
    <>
      <Books books={beers} />

      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {isLoading && <Spinner />}
      </div>
    </>
  );
}
