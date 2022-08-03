import React, { useState, useEffect } from 'react';
import './CartItem.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment, decrement, removeCartItem } from '../../states/userSlicer';

function CartItem(props) {
  const { cart } = useSelector((state) => state.user);

  const [totalprice, setTotalprice] = useState(0);

  console.log(props);

  const dispatch = useDispatch();

  const gettotal = () => {
    let price = parseInt(props.price);
    let quantity = parseInt(props.quantity);
    let total = price * quantity;
    setTotalprice(total);
  };

  const removecartitem = (item) => {
    dispatch(removeCartItem(item));
  };

  const increament = (item) => {
    dispatch(increment(item));
  };

  const decreament = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeCartItem(item));
    } else {
      dispatch(decrement(item));
    }
  };

  useEffect(() => {
    gettotal();
  }, [cart]);
  return (
    <tr>
      <td>
        <Link to={props.get_absolute_url}>
          <img
            src={props.get_image}
            alt="cart item display"
            style={{ height: '90px' }}
          />
        </Link>
      </td>
      <td>Ksh. {props.price}</td>
      <td>
        {props.quantity}
        <span className="mx-2 pl-2">
          <a
            className="btn btn-warning"
            onClick={(item) => {
              decreament(props.item);
            }}
          >
            -
          </a>
        </span>
        <span className="mx-2">
          <a
            className="btn btn-primary"
            onClick={(item) => {
              increament(props.item);
            }}
          >
            +
          </a>
        </span>
      </td>
      <td>Ksh. {totalprice}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={(item) => {
            removecartitem(props.item);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
