"use client";
import { useState, useEffect } from "react";
import { fetchBooks } from "@/actions/fetch-books";
import Books from "@/components/books";
import { LoadMoreBook } from "@/components/load-more-book";
import { Book } from "@/types";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const ProductsPage = () => {

  // const books = await fetchBooks(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [books, setBooks] = useState<Book[] | null>([]);

  useEffect(() => {
    const callApi = async () => {
      const fetchedBooks = await fetchBooks(1, "");
      setBooks(fetchedBooks);
    };
    callApi();
  }, []);

  const handleSearch = async () => {
    const fetchedBooks = await fetchBooks(1, searchKeyword);
    setBooks(fetchedBooks);
  };
  
  return (
    <div>
      <div className="container flex-1 mt-3">
        <div className=" flex ">
          <input
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            style={{border:'1px solid black'}}
            id="search_input"
            className=" rounded-md flex-1 px-3 text-sm text-black outline-0 rounded-l-sm"
            type="search"
            placeholder="Keyword ..."
          />
          <button
            id="search"
            className="bg-[#0d5cb6] flex outline-0 w-28 items-center justify-center h-10 text-sm"
            onClick={() => handleSearch()}
          >
            <img
              className="w-5 mr-2"
              src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
              alt=""
            />
            Search
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 min-h-screen max-w-5xl">
        <Books books={books} />
        <LoadMoreBook />
      </div>
    </div>
  );
};

export default ProductsPage;
