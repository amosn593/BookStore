import React, { useState, useEffect } from "react";
import "./Detailed.css";
import { BaseAxios } from "../../Data/Axios";
import { useParams } from "react-router-dom";

function Detailed(props) {
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { category_slug } = useParams();
  const { product_slug } = useParams();

  const changequantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const addtocart = (e) => {
    e.preventDefault();

    console.log(quantity);
  };

  useEffect(() => {
    const getbook = async () => {
      const resp = await BaseAxios.get(
        `/api/v1/products/${category_slug}/${product_slug}/`
      );
      if (resp.status === 200) {
        setBook(resp.data);
      }
    };
    getbook();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row mb-4">
        <div className="col-md-8">
          <img src={book.get_image} alt="product display" />
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
    </div>
  );
}

export default Detailed;
