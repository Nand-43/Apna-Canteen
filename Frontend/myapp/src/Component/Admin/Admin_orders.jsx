import React from 'react';
import {useState, useEffect} from "react";
import axios from "axios";
import styles from "../styles/AdminOrder.module.css";

export default function Admin_orders(){

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [])

  const fetchOrder = async() => {
    try{
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("http://localhost:5000/orderRoutes/all", {
      headers:{
        Authorization: `Bearer ${token}`
      }

    });
     console.log("Student Orders", response.data.orders);
    setOrders(response.data.orders);
  }
  catch(err){
    console.log("Unable to fetch orders:",
      err.response?.data || err
    );

    setError("Unable to load orders. Please try again.");
  }
  finally{
    setLoading(false);
  }
  }

  const formatData = (date) => {
    if(!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    const normalizedStatus = status?.trim().toLowerCase();

    switch(normalizedStatus){
      case "pending":
        return styles.pending;
      case "preparing":
        return styles.preparing;
      case "ready":
        return styles.ready;
      case "completed":
        return styles.completed;
      case "cancelled":
        return styles.cancelled;
        
      default:
        return styles.unknown;  
    }
  };

  return(
   <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <span className={styles.eyebrow}>CANTEEN MANAGEMENT</span>
        <h1>Student Orders</h1>
        <p>View and manage orders placed by students.</p>
      </div>

      <div className={styles.orderCount}>
        <span>Total Orders</span>
        <strong>{orders.length}</strong>
      </div>
    </div>

    {loading ? (
      <div className={styles.message}>
        <div className={styles.loader}>
          <p>Loading orders...</p>
        </div>
      </div>
    ) :  error ? (
      <div className={styles.message}>
        <p>{error}</p>
        <button onClick={fetchOrder} >Try Again</button>
      </div>
    ) : orders.length === 0 ? (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📃</div>
          <h2>No orders yet</h2>
          <p>Student orders will appear here once they place an order.</p>
      </div>
    ) : (
      <div className={styles.orderList}>
        {orders.map((order) => (
          <article className={styles.orderCard}>
            <div key={order.id} className={styles.cardHeader}>
              <div>
                <span className={styles.orderLabel}>ORDER</span>
                <h2>#{order.id}</h2>
              </div>

              <span className={`${styles.status} ${getStatusClass(
                order.status
              )}`}>
                {order.status || "Unknown"}
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.foodSection}>
                {order.dish_image ? (
                  <img 
                  className={styles.foodImage}
                  src={`http://localhost:5000/uploads/menu/${order.dish_image}`} alt="" />
                ) : (
                  <div className={styles.imagePlaceholder}>🍽</div>
                )}

                <div className={styles.foodInfo}>
                  <span className={styles.foodLabel}>
                    Food Item
                  </span>
                  <h3>{order.dish_name || "Food item"}</h3>
                    <p>Quantity: {order.quantity ?? "-"}</p>
                </div>
              </div>

              <div className={styles.studentSection}>
                <span className={styles.foodLabel}>Student Details</span>
                <h3>{order.student_name || "Student"}</h3>
                <p>{order.email || "Email not available"}</p>
                {order.phone && <p>{order.phone}</p>}
              </div>

              <div className={styles.priceSection}>
                <span className={styles.foodLabel}>
                  Total
                </span>
                <strong>
                    ₹{Number(order.total_price || 0 ).toFixed(2)}
                </strong>
                <p>{formatData(order.created_at)}</p>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span>Order #{order.id}</span> 
              <span className={styles.footerStatus}>Current Status: {order.status || "Unknown"} </span>
            </div>
          </article>
        ))}
      </div>
    ) }
   

   </div>

  )
}