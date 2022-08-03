import React, { useState, useEffect } from 'react';
import './category.css';
import useAxios from '../../Data/useAxios';
import BookCard from '../../components/BookCard/BookCard';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(null);

  const pathname = window.location.pathname;

  const { category_slug } = useParams();

  const api = useAxios();

  const getcategory = async () => {
    try {
      setLoading(true);
      const resp = await api.get(`/api/v1/products/${category_slug}/`);
      if (resp.status === 200) {
        setCategory(resp.data[0].products);
        setLoading(false);
      }
    } catch (err) {
      setCategory([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    getcategory();
  }, [pathname]);

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <h2 className="text-center py-4">Latest {pathname}</h2>
      </div>
      <div className="container">
        <div className="row mb-4 mt-3">
          {loading ? (
            <Spinner />
          ) : (
            category.map((book, index) => {
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

export default Category;
