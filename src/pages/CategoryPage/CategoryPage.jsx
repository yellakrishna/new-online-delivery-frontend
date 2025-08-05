import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { food_list } = useContext(StoreContext);

  const categoryItems = food_list.filter(
    (item) => item.category?.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="category-page">
      <div className="category-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="category-title">{categoryName}</h2>
        <p className="item-count">{categoryItems.length} items available</p>
      </div>

      <section className="category-right">
        {categoryItems.length > 0 ? (
          categoryItems.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
            />
          ))
        ) : (
          <div className="no-items-found">
            <p>😕 No items found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
