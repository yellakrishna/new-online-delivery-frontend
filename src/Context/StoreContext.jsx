import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets"; // Your static menu list
import axios from "axios";

export const url = import.meta.env.VITE_API_URL;

// Create Context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


  const [food_list, setFoodList] = useState([]);
  
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // 📌 Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
      }
    }
  };

  // 📌 Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error(
          "Error removing from cart:",
          error.response?.data || error.message
        );
      }
    }
  };

  // 💰 Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((product) => product._id === itemId);
      if (item) {
        totalAmount += item.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // 🛍 Get total cart item count (for Navbar badge)
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // 📥 Fetch all food items
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error.message);
    }
  };

  // 📦 Load cart data for logged-in user
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart:", error.response?.data || error.message);
    }
  };

  // 🔄 Load food list and cart data on mount
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
    };
    loadData();
  }, []);

  // Provide all state & functions to children
  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems, // ✅ Added
    token,
    setToken,
    loadCartData,
    setCartItems
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
