import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from "../../Context/StoreContext.jsx";

import { Link } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Straight from the River</h1>
      <p className="explore-menu-text">
Fresh, locally sourced fish, cleaned and prepared with care to ensure premium taste and quality. Perfect for healthy, delicious meals — straight from the water to your kitchen.
      </p>
      <div className="both-flex">
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            return (
              <Link
                key={index}
                to={`/category/${item.menu_name}`} // 👈 dynamic route
                className="explore-menu-list-item-link"
              >
                <div
                  className={`explore-menu-list-item ${isActive ? 'active-item' : ''}`}
                  onClick={() => setCategory(item.menu_name)}
                >
                  <img
                    src={item.menu_image}
                    alt={item.menu_name}
                    className={isActive ? 'active' : ''}
                  />
                  <p>{item.menu_name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
