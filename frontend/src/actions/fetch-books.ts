"use client";
import { Book } from "./../types/index";

export async function fetchBooks(page: number, keyword = "") {
  const perPage = 3;
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/books/list?page=${page}&perPage=${perPage}&keyword=${keyword}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data?.data as Book[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
