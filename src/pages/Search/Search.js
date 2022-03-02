import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { BaseAxios } from "../../Data/Axios";
import BookCard from "../../components/BookCard/BookCard";

function Search() {
  const [searchResult, setSearchResult] = useState([]);

  const [searchParams] = useSearchParams();

  const searchQuery = window.location.search;

  const query = searchParams.get("q");

  const getsearchresult = async () => {
    try {
      const resp = await BaseAxios.post(`/api/v1/productsearch/${query}/`);
      if (resp.status === 200) {
        setSearchResult(resp.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getsearchresult();
  }, [searchQuery]);

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <h2 className="text-center py-4">Latest Novels</h2>
      </div>
      <div className="container">
        <div className="row mb-4 mt-3">
          {searchResult.map((book, index) => {
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

export default Search;
