import { useEffect, useState } from "react";
import {doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface Book {
  id: string;
}

const BookGrid = () => {
  let [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let list: Book[] = [];
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setBooks(list);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    try{
        await deleteDoc(doc(db, "books", id));
        setBooks(books.filter(book => book.id !== id))
    }
    catch(err) {
        console.log(err);
    }
  }

  console.log(books);
  return (
    <div>
      {books.map((book) => (
        <>
        <p key={book.id}>{book.title}</p> 
        <button onClick={() => handleDelete(book.id)}>Delete</button>
        </>
      ))}
    </div>
  );
};

export default BookGrid;