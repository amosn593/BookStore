import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './Home.css';
import useAxios from '../../Data/useAxios';
import Search from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';

function Home() {
  document.title = 'Home | BookStore';
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(null);

  const api = useAxios();

  const getbooks = async () => {
    setLoading(true);
    const resp = await api.get('/api/v1/latest-products/');
    if (resp.status === 200) {
      setBooks(resp.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    getbooks();
    return () => {
      setBooks({}); // prevent memory leak
    };
  }, []);
  return (
    <div className="container-fluid">
      <div className="container bg-dark py-4 mt-3 mb-5">
        <h4 className="text-center mb-4 home_intro">
          Welcome to Online BookStore
        </h4>
        <p className="text-center text-muted mb-5">The Best Online BookStore</p>
      </div>
      <div className="container text-center">
        <Search />
      </div>
      <div className="col-md-12">
        <h2 className="text-center py-4">Latest Books</h2>
      </div>
      <div className="container">
        <div className="row mb-4 mt-3">
          {loading ? (
            <Spinner />
          ) : (
            books.map((book, index) => {
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

export default Home;
