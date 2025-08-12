import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from "../../Context/StoreContext.jsx";
import { Link, useNavigate } from 'react-router-dom';

const FoodItem = ({ image, name, id }) => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  const handleClick = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // Show error if details missing
  if (!id || !image || !name) {
    return (
      <div className="food-item error">
        <p>⚠️ Something went wrong while loading this item.</p>
      </div>
    );
  }

  return (
    <div className="food-item">
      <Link
        to={`/food/${id}`}
        className="food-item-link"
        onClick={handleClick}
      >
        <div className="food-item-img-container">
          {loading && <div className="circle-loader"></div>}
          
          <img
            className={`food-item-image ${loading ? 'hidden' : ''}`}
            src={image}
            alt={`Image of ${name}`}
            onLoad={() => setLoading(false)}
            onError={(e) => {
              setLoading(false);
              e.target.src = assets.fallback_image;
            }}
          />

          {!loading && <button className="food-item-btn">Order Now</button>}
        </div>
        <div className="food-item-info">
          <p className="food-item-name">{name}</p>
          <img className="food-item-rating" src={assets.rating_starts} alt="Rating" />
        </div>
      </Link>
    </div>
  );
};

export default FoodItem;
