import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import heroImage from '/361.jpg'; // ✅ Update to your image path

const Header = () => {
    return (


        <header
            className="hero"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            {/* Overlay for dark effect */}
            <div className="hero__overlay"></div>


            {/* Content */}
            <div className="hero__content">
                <h1 className="animated-gradient-title">
                    Fresh Fish Delivery in{" "}
                    <span className="highlight-gradient">Alampur</span>
                </h1>
                <p>
                    Enjoy fresh, high-quality fish delivered straight to your door.  
                    Healthy, delicious, and just a click away.
                </p>
                <Link to="/menu">
                    <button className="hero__btn">View Menu</button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
