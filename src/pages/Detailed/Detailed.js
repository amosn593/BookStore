import React, { useState, useEffect } from 'react';
import { toast } from 'bulma-toast';
import './Detailed.css';
import useAxios from '../../Data/useAxios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../states/userSlicer';
import Spinner from '../../components/Spinner/Spinner';

function Detailed() {
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(null);

  const { category_slug } = useParams();
  const { product_slug } = useParams();

  const dispatch = useDispatch();

  const api = useAxios();

  const changequantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const addtocart = (e) => {
    e.preventDefault();

    if (isNaN(quantity) || quantity < 1) {
      setQuantity(1);
    }
    const item = {
      book: book,
      quantity: quantity,
    };
    dispatch(addToCart(item));
    toast({
      message: 'The Book was added to the Cart successfully.',
      type: 'is-success',
      dismissible: true,
      pauseOnHover: true,
      duration: 2000,
      position: 'bottom-right',
    });
  };

  const getbook = async () => {
    try {
      setLoading(true);
      const resp = await api.get(
        `/api/v1/products/${category_slug}/${product_slug}/`,
      );
      if (resp.status === 200) {
        setBook(resp.data);
        setLoading(false);
      } else {
        setBook(null);
        setLoading(false);
      }
    } catch (err) {
      setBook(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getbook();
    window.scroll(0, 0);
    return () => {
      setBook(null); // prevent memory leak
    };
  }, []);

  return (
    <div className="container mt-3">
      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="row mb-4">
          <div className="col-md-8">
            <img
              src={book.get_image}
              alt="product display"
              style={{ width: '100%', height: '650px' }}
            />
          </div>
          <div className="col-md-4 overflow-hidden">
            <h2 className="text-center pt-2">Information</h2>
            <h6 className="">{book.name}</h6>
            <p>{book.description}</p>
            <p>
              <strong>Price: </strong>Ksh {book.price}
            </p>
            <form
              className="d-flex"
              onSubmit={(e) => {
                addtocart(e);
              }}
            >
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  name="count"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    changequantity(e);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-warning mx-1">
                  Add To Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="mt-5 py-3 text-danger text-center">
          Sorry, Book Not Found
        </p>
      )}
    </div>
  );
}

export default Detailed;
