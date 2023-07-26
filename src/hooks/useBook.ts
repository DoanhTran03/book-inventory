import { useEffect, useState } from "react";
import {doc, deleteDoc, collection, getDocs, addDoc, FieldValue } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Book {
  id: string
  title: string;
  author: string,
  description: string
  timeStamp: FieldValue,
  bookURL: string
}

export interface newBook {
  title: string;
  author: string,
  description: string
  timeStamp: FieldValue,
  bookURL: string
}

const useBook = () => {
  let [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let list: any[] = [];
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setBooks(list);
    };
    fetchBooks();
  }, []);

  const addNewBook = async (newBook: newBook) => {
      await addDoc(collection(db, "books"), newBook);
  };

  const handleDelete = async (id: string) => {
    const oriBooks = [...books];
    try{
        await deleteDoc(doc(db, "books", id));
        setBooks(books.filter(book => book.id !== id))
    }
    catch(err) {
        alert(err);
        setBooks(oriBooks);
    }
  }
  return {books, addNewBook, handleDelete}
}
export default useBook;

