import React from "react";

function CheckOutItem(props) {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <div className="d-flex">
        <img
          src={props.item.book.get_image}
          alt="cart item"
          style={{ height: "100px" }}
        />
        <div>
          <h6 className="my-0 mx-1">{props.item.book.name}</h6>
          <small className="text-muted mx-1">
            Quantity {props.item.quantity},@ KSH {props.item.book.price}
          </small>
        </div>
      </div>
      <span className="text-muted">
        KSH {parseInt(props.item.quantity) * parseInt(props.item.book.price)}
      </span>
    </li>
  );
}

export default CheckOutItem;
