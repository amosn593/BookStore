import React, { useState, useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard";
import "./Home.css";
import { BaseAxios } from "../../Data/Axios";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getbooks = async () => {
      const resp = await BaseAxios.get("/api/v1/latest-products/");
      if (resp.status === 200) {
        setBooks(resp.data);
      }
    };
    getbooks();
  }, []);
  return (
    <div className="container-fluid">
      <div className="container bg-dark py-4 mt-3 mb-5">
        <h4 className="text-center mb-4 home_intro">
          Welcome to Online BookStore
        </h4>
        <p className="text-center text-muted mb-5">The Best Online BookStore</p>
      </div>
      <div className="col-md-12">
        <h2 className="text-center py-4">Latest Books</h2>
      </div>
      <div className="container">
        <div className="row mb-4 mt-3">
          {books.map((book, index) => {
            return (
              <BookCard
                get_image={book.get_thumbnail}
                name={book.name}
                price={book.price}
                get_absolute_url={book.get_absolute_url}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
