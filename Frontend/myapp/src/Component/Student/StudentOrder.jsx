import styles from "../styles/StudentOrder.module.css";
import {useState, useEffect } from "react";
import axios from "axios";

export default function StudentOrder(){
 
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrder = async(req,res) => {
        try{

            const token = localStorage.getItem("accessToken");

            const response = await axios.get("http://localhost:5000/orderRoutes/myOrders",
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Student Orders: ", response.data.orders);

            setOrders(response.data.orders);
        }
        catch(err){
            console.log("Order Error: ",err);
            
            setError("Unable to load your orders.")
        }
        finally{
            setLoading(false);
        }
    }

    const fetchMenu = async() => {
       const token = localStorage.getItem("accessToken");

       const response = await axios.get("http://localhost:5000/menuRoutes/accessMenu", {
        headers:{
            Authorization: `Bearer ${token}`
        },
       })

       setMenu(response.data.menu);
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className={styles.page}>
            <section className={styles.header}>
               <div>
                <p className={styles.subtitle}>APNA CANTEEN</p>
                <h1>My Orders</h1>
                <p className={styles.description}>Track your orders and check your previosu purchase.</p>
                </div>
                <div className={styles.headerEmoji}>
                    📦
                </div>
                    
            </section> 

            <section className={styles.orderSection}>
                <div className={styles.sectionHeader}>
                    <div>
                        <p className={styles.sectionSubtitle}>YOUR ORDERS</p>
                        <h2>Order History</h2>
                        </div>
                        <span
                        className={styles.orderCount}
                        >
                            {orders.length} orders
                        </span>
                        </div>

                        {
                            loading && (
                                <div>
                                    <p>Loading your orders... 📦</p>
                                </div>
                            )
                        }


                        {
                            !loading && error && (
                                <div>
                                    <p>{error}</p>
                                </div>
                            )
                        }

                        {
                            !loading && !error && orders.length === 0 && (
                                <div className={styles.emptyOrders}>
                                    <div className={styles.emptyIcon}>🛒</div>
                                        <h3>No orders yet</h3>
                                        <p>Your orders will appear here once you orders something from the canteen.</p>
                                    
                                </div>
                            )
                        }


                        {
                            !loading && !error && orders.length > 0 && (
                                <div className={styles.ordersList}>
                                    {orders.map((order) => (
                                        <div  className={styles.orderCard}>

                                           <div className={styles.orderTop} key = {order.id}>
                                            <div className={styles.orderFood}>
                                                <div className={styles.orderImage}>

                                                  {order.dish_image ? (
                                                <img 
                                                 className={styles.foodImage}
                                                src={`http://localhost:5000/uploads/menu/${order.dish_image}`} alt="" />
                                                ) : (
                                                <div className={styles.imagePlaceholder}>🍽</div>
                                                )}
                                                </div>

                                                <div>
                                                    <h3>{order.dish_name}</h3>

                                                    <p>Order #{order.id}</p>
                                                </div>
                                            </div>

                                            <span className={styles.statusBadge}>
                                                {order.status}
                                            </span>


                                           </div>

                                           <div className={styles.orderDetails}>
                                            <div>
                                                <span>Quantity</span>
                                                <strong>{order.quantity}</strong>
                                            </div>

                                            <div>
                                                <span>Total</span>
                                                <strong>{order.total_price}</strong>
                                            </div>

                                           </div>

                                           

                                        </div>

                                    ))}
                                </div>
                            )
}               
                
            </section>
        </div>
    )
}