import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from "../../Context/StoreContext.jsx"; // ✅ curly braces for named export


const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Fresh and Tasty</h2>
      <div className='food-display-list'>
        {
          Array.isArray(food_list) && food_list.length > 0 ? (
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
          )
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
