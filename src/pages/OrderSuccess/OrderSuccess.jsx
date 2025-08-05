// src/pages/OrderSuccess/OrderSuccess.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your order. We'll deliver it soon.</p>
      <Link to="/" style={{ color: 'blue', fontWeight: 'bold' }}>Go to Home</Link>
    </div>
  );
};

export default OrderSuccess;
