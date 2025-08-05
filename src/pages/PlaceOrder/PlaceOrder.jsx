import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Extract userId from JWT token
const getUserIdFromToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.id;
  } catch {
    return null;
  }
};

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    setCartItems,
    url,
    token,
  } = useContext(StoreContext);

  // 📌 Handle form input changes
  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 📌 Place Order
  const placeOrder = async (e) => {
    e.preventDefault();

    const userId = getUserIdFromToken(token);
    if (!userId) {
      toast.error("Not authorized. Please login again.");
      navigate("/login");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        foodId: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        image: item.image,
      }));

    if (orderItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30,
      paymentMode: paymentMethod,
    };

    try {
      const endpoint =
        paymentMethod === "cod"
          ? `${url}/api/order/cash-order`
          : `${url}/api/order/place`;

      const res = await axios.post(endpoint, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        if (paymentMethod === "online" && res.data.session_url) {
          // ✅ Redirect to Stripe Checkout
          window.location.href = res.data.session_url;
        } else {
          // ✅ COD success
          toast.success("Order placed successfully!");
          setCartItems({});
          navigate("/order-success");
        }
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Server Error");
      }
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, cartItems, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* Step 1: Delivery Info */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <p className="subtitle">Please enter your delivery details below.</p>

        <input type="text" name="firstName" placeholder="First Name" required onChange={onChangeHandler} />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={onChangeHandler} />
        <input type="email" name="email" placeholder="Email Address" required onChange={onChangeHandler} />
        <input type="text" name="street" placeholder="Street" required onChange={onChangeHandler} />

        <div className="multi-field">
          <input type="text" name="city" placeholder="City" required onChange={onChangeHandler} />
          <input type="text" name="state" placeholder="State" required onChange={onChangeHandler} />
        </div>

        <div className="multi-field">
          <input type="text" name="zipCode" placeholder="Zip Code" required onChange={onChangeHandler} />
          <input type="text" name="country" placeholder="Country" required onChange={onChangeHandler} />
        </div>

        <input type="text" name="phone" placeholder="Phone Number" required onChange={onChangeHandler} />
      </div>

      {/* Step 2: Cart Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Summary</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details delivery-fee">
            <p>Delivery Fee</p>
            <p>₹30</p>
          </div>

          <hr />

          <div className="cart-total-details total">
            <b>Total</b>
            <b>₹{getTotalCartAmount() + 30}</b>
          </div>
        </div>

        {/* Step 3: Payment Method */}
        <div className="payment-method">
          <p className="title">Payment Method</p>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Step 4: Place Order Button */}
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
