import React from 'react';
import './BookCard.css';
import { Link } from 'react-router-dom';

function BookCard(props) {
  return (
    <div className="col-lg-3 col-md-3 col-sm-4">
      <div className="card">
        <img
          src={props.get_image}
          className="card-img-top"
          style={{ height: '200px' }}
          alt="Book Display"
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">KSH. {props.price}</p>

          <Link to={props.get_absolute_url} className="btn btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
