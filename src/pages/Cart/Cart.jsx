import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from "../../Context/StoreContext.jsx";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const cartProducts = food_list.filter(item => cartItems[item._id] > 0);

  return (
    <div className="cart-page">
      {/* Cart Items */}
      <div className="cart-items-container">
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => (
            <div className="cart-item-card" key={item._id}>
              <div className="cart-item-image">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <div className="quantity">Qty: {cartItems[item._id]}</div>
                <p className="item-total">Total: ₹{item.price * cartItems[item._id]}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Total */}
      {cartProducts.length > 0 && (
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : 30}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}</b>
          </div>
          <button
            className="checkout-btn"
            onClick={() => navigate('/order')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
