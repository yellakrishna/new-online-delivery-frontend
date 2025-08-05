import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../Context/StoreContext.jsx";
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list = [], addToCart, removeFromCart, cartItems = {}, url } = useContext(StoreContext);

  const foodItem = food_list.find(item => item._id === id);
  if (!foodItem) return <div className="food-details-error">⚠️ Food item not found!</div>;

  const quantity = cartItems?.[id] || 0;

  return (
    <div className="food-details-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="food-details-wrapper">
        {/* Image */}
        <div className="food-image-container">
<img src={foodItem.image} alt={foodItem.name} />

        </div>

        {/* Info */}
        <div className="food-info">
          <h1>{foodItem.name}</h1>
          <p className="description">{foodItem.description}</p>
          <p className="price">₹{foodItem.price}</p>

          {/* Quantity Controls */}
          <div className="quantity-selector">
            <button onClick={() => removeFromCart(id)} disabled={quantity === 0}>−</button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>

          {/* Go to Cart */}
          <button className="add-to-cart-btn" onClick={() => navigate('/cart')}>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
