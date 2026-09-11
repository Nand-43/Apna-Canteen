import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../styles/Admin_dashboard.module.css";

export default function Admin_dashboard() { 

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const navigate = useNavigate();

    const fetchDashboard = async () => {
        try{
            const accessToken = localStorage.getItem("accessToken");

            const response = await axios.get(
                "http://localhost:5000/adminRoutes/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                } 
            );

            setDashboardData(response.data )
        }
        catch(err){

            console.log("Dashboard error:", err);

            setError(
                err.response?.data?.error ||
                "Failed to load dashboard"
            );

        }

        finally{
            setLoading(false);
        }
    }

    const updateStatus = async (orderId, newStatus) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        await axios.patch(
            `http://localhost:5000/orderRoutes/updateStatus/${orderId}/status`,
            {
                status: newStatus
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        fetchDashboard();
 
    } catch (err) {
        console.log("Status update error:", err);
    }
};
    

    const today = new Date();

    if(loading){
        return <h2>Loading dashboard...</h2>
    }

    if(error){
        return <h2>{error}</h2>
    }

    return (
        <div className={styles.dashboard}>


            <div className={styles.header}>

                <div>
                    <h1>Good Morning, Admin 👋</h1>

                    <p>
                        Here's what's happening at Apna Canteen today.
                    </p>
                </div>

                <div className={styles.date}>
                    <span>📅</span>
                    <span>{today.toLocaleDateString()}</span>
                </div>

            </div>


            <div className={styles.statsGrid}>

                <div className={styles.statCard}>

                    <div className={styles.statTop}>
                        <span className={styles.statIcon}>🛒</span>
                        <span className={styles.statLabel}>
                            Today's Orders
                        </span>
                    </div>

                    <h2>{dashboardData.todayOrders}</h2>

                    <p className={styles.positive}>
                        ↑ 12% from yesterday
                    </p>

                </div>


                <div className={styles.statCard}>

                    <div className={styles.statTop}>
                        <span className={styles.statIcon}>⏳</span>
                        <span className={styles.statLabel}>
                            Pending Orders
                        </span>
                    </div>

                    <h2>{dashboardData.pendingOrders}</h2>

                    <p className={styles.warning}>
                        Need attention
                    </p>

                </div>


                <div className={styles.statCard}>

                    <div className={styles.statTop}>
                        <span className={styles.statIcon}>₹</span>
                        <span className={styles.statLabel}>
                            Today's Revenue
                        </span>
                    </div>

                    <h2>{dashboardData.todayRevenue}</h2>

                    <p className={styles.positive}>
                        Today's Revenue
                    </p>

                </div>


                <div className={styles.statCard}>

                    <div className={styles.statTop}>
                        <span className={styles.statIcon}>🎓</span>
                        <span className={styles.statLabel}>
                            Total Students
                        </span>
                    </div>

                    <h2>{dashboardData.totalStudents}</h2>

                    <p className={styles.neutral}>
                        Registered students
                    </p>

                </div>

            </div>


            <div className={styles.mainGrid}>

                <section className={styles.section}>

                    <div className={styles.sectionHeader}>

                        <div>
                            <h2>Order Overview</h2>
                            <p>Today's order status</p>
                        </div>

                        <span className={styles.today}>
                            Today
                        </span>

                    </div>


                    <div className={styles.orderStatusGrid}>

                        <div className={styles.orderStatus}>
                            <span>🕐</span>
                            <h3>{dashboardData.pendingOrders}</h3>
                            <p>Pending</p>
                        </div>

                        <div className={styles.orderStatus}>
                            <span>👨‍🍳</span>
                            <h3>{dashboardData.preparingOrders}</h3>
                            <p>Preparing</p>
                        </div>

                        <div className={styles.orderStatus}>
                            <span>📦</span>
                            <h3>{dashboardData.readyOrders}</h3>
                            <p>Ready</p>
                        </div>

                        <div className={styles.orderStatus}>
                            <span>✓</span>
                            <h3>{dashboardData.completedOrders}</h3>
                            <p>Completed</p>
                        </div>

                    </div>

                </section>



                <section className={styles.quickSection}>

                    <h2>Quick Actions</h2>

                    <button>
                        
                        <span onClick={() => navigate("/admin/menu")}>➕</span>
                        Add Menu Item
                        
                    </button>

                    <button>

                        <span  >🛒</span>
                        View Orders
                        
                    </button>

                    <button>
                        
                        <span>📦</span>
                        Manage Inventory
                        
                    </button>

                </section>

            </div>


            <section className={styles.recentOrders}>

                <div className={styles.sectionHeader}>

                    <div>
                        <h2>Recent Orders</h2>
                        <p>Latest orders placed by students</p>
                    </div>

                    <button className={styles.viewAll}>
                        View All →
                    </button>

                </div>


                <div className={styles.orderTable}>

                     <h2> Orders</h2>


        <div className={styles.tableHeader}>
            <span>Order ID</span>
            <span>Student ID</span>
            <span>Items</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Status</span>
            </div>
            

                        {dashboardData.recentOrders.map((order) => (
                           <div className={styles.tableRow}
                           key={order.id}>

                            <span>#{order.id}</span>
                            <span>{order.student_id}</span>
                            <span>{order.dish_name}</span>
                            <span>{order.quantity}</span>
                            <span>{order.total_price}</span>

                            <span
                            className={`${styles.status} ${
                                styles[order.status]
                            }`}
                            >
                                {order.status}
                                </span>

                                <div className={styles.action}>

                                    {order.status === "pending" && (
                                    <button 
                                    className={styles.statusButton}
                                    onClick ={()=> updateStatus(order.id, "preparing")}>
                                        Start preparing
                                    </button>
                                )}

                                {order.status === "preparing" && (

                                    <button 
                                    className={styles.statusButton}
                                    onClick ={()=> updateStatus(order.id, "ready")}>
                                        Mark Ready
                                    </button>
                                )}

                                {order.status === "ready" && (
                                    <button 
                                    className={styles.statusButton} 
                                    onClick ={()=> updateStatus(order.id, "completed")}>
                                        Complete Order
                                    </button>
                                )}

                                {order.status === "completed" && (
                                   <span className={styles.done} >✔ Done</span>
                                )}


                                </div>
                                
                                </div>
                          
                        ))}

                    

                </div>

            </section>

        </div>
    );
}