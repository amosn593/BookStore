import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Search.css';
import useAxios from '../../Data/useAxios';
import BookCard from '../../components/BookCard/BookCard';
import SearchComponent from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(null);

  const [searchParams] = useSearchParams();

  const api = useAxios();

  const searchQuery = window.location.search;

  const query = searchParams.get('q');

  const getsearchresult = async () => {
    try {
      setLoading(true);
      const resp = await api.post(`/api/v1/productsearch/${query}/`);
      if (resp.status === 200) {
        setSearchResult(resp.data);
        setLoading(false);
      }
    } catch (err) {
      setSearchResult([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getsearchresult();
    window.scroll(0, 0);
  }, [searchQuery]);

  return (
    <div className="container-fluid">
      <div className="container bg-dark py-4 mt-3 mb-5">
        <h4 className="text-center mb-4 home_intro">
          Welcome to Online BookStore
        </h4>
        <p className="text-center text-muted mb-5">The Best Online BookStore</p>
      </div>
      <div className="container text-center">
        <SearchComponent />
      </div>
      <div className="col-md-12">
        <h2 className="text-center py-4">
          Search Results ({searchResult.length})
        </h2>
      </div>
      <div className="container">
        <div className="row mb-4 mt-3">
          {loading ? (
            <Spinner />
          ) : (
            searchResult.map((book, index) => {
              return (
                <BookCard
                  get_image={book.get_thumbnail}
                  name={book.name}
                  price={book.price}
                  get_absolute_url={book.get_absolute_url}
                  key={index}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
