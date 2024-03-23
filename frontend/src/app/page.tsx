"use client";
import { useState, useEffect } from "react";
import { fetchBooks } from "@/actions/fetch-books";
import Books from "@/components/books";
import { Book } from "@/types";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  useEffect(() => {
    const callApi = async () => {
      const fetchedBooks = (await fetchBooks(1, "")) ?? [];
      setBooks(fetchedBooks);
    };
    callApi();
  }, []);

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    const fetchedBooks = (await fetchBooks(1, keyword)) ?? [];
    setBooks(fetchedBooks);
    setIsLoading(false);
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBooks = async () => {
    setIsLoading(true);
    await delay(1000);
    const nextPage = (page % 7) + 1;
    let newProducts = (await fetchBooks(nextPage)) ?? [];
    setIsLoading(false);
    setBooks((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBooks();
    }
  }, [inView]);
  return (
    <div>
      <div className="container flex-1 mt-3">
        {/* <div className=" flex ">
          <input
            onChange={(e) => {
              const keyword = e.target.value;
              if (searchTimeout) clearTimeout(searchTimeout);
              const newTimeout = setTimeout(() => {
                handleSearch(keyword);
              }, 1000);
              setSearchTimeout(newTimeout);
            }}
            style={{ border: "1px solid black" }}
            id="search_input"
            className=" rounded-md flex-1 px-3 text-sm text-black outline-0 rounded-l-sm"
            type="search"
            placeholder="Keyword ..."
          />
          <button
            id="search"
            className="bg-[#0d5cb6] flex outline-0 w-28 items-center justify-center h-10 text-sm"
            onClick={(e) => {}}
          >
            <img
              className="w-5 mr-2"
              src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
              alt=""
            />
            Search
          </button>
        </div> */}
      </div>
      <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">
        <Books books={books} />
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
