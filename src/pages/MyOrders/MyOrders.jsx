import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from "../../Context/StoreContext.jsx"; // ✅ curly braces for named export

import { assets } from '../../assets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token} = useContext(StoreContext);

 const fetchOrders = async () => {
  try {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Correct header format
        },
      }
    );
    setData(response.data.data);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
  }
};


  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
