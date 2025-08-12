import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from "../../Context/StoreContext.jsx";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Loading until food_list is fetched
  useEffect(() => {
    if (Array.isArray(food_list) && food_list.length > 0) {
      setLoading(false);
    }
  }, [food_list]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Fresh and Tasty</h2>
      <div className='food-display-list'>
        <div className="food-grid">
          {loading ? (
            <div className="circular-loader"></div>
          ) : Array.isArray(food_list) && food_list.length > 0 ? (
            food_list
              .filter(item => category === "All" || category === item.category)
              .map(item => (
                <FoodItem
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  id={item._id}
                />
              ))
          ) : (
            <p className='no-food-message'>No food items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
