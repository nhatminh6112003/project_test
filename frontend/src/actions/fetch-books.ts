"use client";
import { Book } from "./../types/index";

export async function fetchBooks(page: number, keyword = "") {
  const perPage = 4;
  const apiUrl = `http://localhost:5000/books?page=${page}&perPage=${perPage}&keyword=${keyword}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("TCL: fetchBooks -> data", data);
    return data?.data as Book[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
