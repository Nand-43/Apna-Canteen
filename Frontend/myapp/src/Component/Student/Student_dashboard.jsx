import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/StudentDashboard.module.css";
import axios from "axios";
function StudentDashboard() {
  const navigate = useNavigate();
  
  const [menu, setMenu] = useState([]);
  const [orders, setOrders ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderError, setOrderError] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [error, setError] = useState("");


  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Name", user)
  useEffect(() => {
    fetchMenu();
    fetchOrder();
  },[]);

  const fetchMenu= async () => {
      try{
        
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`http://localhost:5000/menuRoutes/accessMenu`,{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
        );

        console.log("Its working", response.data.menu)
        setMenu(response.data.menu);
        
      }
      catch(err){
        console.log("Menu Error: ", err);
        setError("Unable to laod today's menu");
      }
      finally{
        setLoading(false);
      }
    };
    
    const fetchOrder = async() => {
      console.log("FetchOrder called");
      try{
        const token = localStorage.getItem("accessToken");
 
        const response = await axios.get(
          `http://localhost:5000/orderRoutes/myOrders`, 
          {
            headers: {
              Authorization:  `Bearer ${token}`
            }
          }
        );

        console.log("Order response", response);
        console.log("Orders column ", response.data.orders)

        setOrders(response.data.orders);
        
      } 
      catch(err){
        console.log("Order fetch error: ", err);
        setOrderError("Unable to laod your orders")
      }
      finally{
        setLoadingOrders(false);
      }
    };

    

    const statusSteps = [
      "pending",
      "preparing",
      "ready",
      "completed"
    ];


  return (    
   <div className={styles.page}>

    <section className={styles.topSection }>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeContent}>
            <p className={styles.smallTitle}>Welcome {user.name}</p>

            <h1>Hungry?
              <br/>
              We've got you covered.
            </h1>

            <p className={styles.welcomeText}>Order your favourite food from the cannteen
              without waiting in the queue.
            </p>

            <button
            className={styles.primaryButton}
            onClick={() => navigate("/student/menu")}>
              Explore Menu 
            </button>
        </div>

        <div> 🍽</div>

      </div>

       <div className={styles.healthCard}>

          <div className={styles.healthContent}>

            <div>

              <p className={styles.healthTitle}>
                🌱 DAILY FOOD INSIGHT
              </p>

              <h2>
                Eat Smart, Feel Better
              </h2>

              <p className={styles.healthMessage}>
                Discover simple food tips and make
                better choices during your busy college day.
              </p>

              <button
                className={styles.healthButton}
                onClick={() => navigate("/student/menu")}
              >
                Explore Menu →
              </button>

            </div>

            <div className={styles.healthEmoji}>
              🥗
            </div>

          </div>

        </div>
          </section>
       

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionSubtitle}>People's Favourites</p>

            <h2>Today's Kitchen</h2>

          </div>

          <button 
          className={styles.viewAll}
          onClick={() => navigate("/student/menu")}>
            View All➡
          </button>
        </div>
      
     <div className={styles.foodGrid}>


      {loading && (
        <p>Loading menu...</p>
      )}

      {
        error && (
          <p>{error}</p>
        )
      }

      {
        !loading && !error && menu.length === 0 && (
          <p>No food available right now. </p>
        )
      }

      {!loading && !error && menu.slice(0,4).map((item) =>(
       
       <div className={styles.foodCard} key={item.id}>
         <img 
         src={`http://localhost:5000/uploads/menu/${item.image}`}
         className={styles.menuImage}
         />

         <div className={styles.foodInfo}>
          <span className={styles.category}>
            {item.category}
          </span>

          <h3>{item.dish_name}</h3>

          <p>{item.description}</p>

          <div className={styles.foodBottom}>
            <strong>{item.price}</strong>

            <button>
              Add +
            </button>
          </div>
         </div>
       </div>

      
      ))}
     </div>
     </section>
  

    <section className={styles.orderSection}>

  <div className={styles.sectionHeader}>
    <div>
      <p className={styles.sectionSubtitle}>ORDER TRACKING</p>
      <h2>📦 Current Order</h2>
    </div>

    <button
      className={styles.viewAll}
      onClick={() => navigate("/student/orders")}
    >
      View Orders →
    </button>
  </div>

  {loadingOrders && (
    <div className={styles.orderMessage}>
      <p>Loading your order...</p>
    </div>
  )}

  {orderError && (
    <div className={styles.orderMessage}>
      <p>{orderError}</p>
    </div>
  )}

  {!loadingOrders && !orderError && orders.length === 0 && (
    <div className={styles.emptyOrder}>
      <div className={styles.emptyOrderIcon}>🍽️</div>

      <h3>No active orders</h3>

      <p>
        You haven't placed an order yet.
        Grab something delicious from the menu!
      </p>

      <button
        onClick={() => navigate("/student/menu")}
        className={styles.orderFoodButton}
      >
        Order Food →
      </button>
    </div>
  )}

  {!loadingOrders && !orderError && orders.length > 0 && orders.map((currentOrder) => {
  
    const currentStatus = currentOrder.status?.trim().toLowerCase();
     const currentStatusIndex = statusSteps.indexOf(currentStatus);

     return (

    <div className={styles.orderCard}>

      <div className={styles.orderMain}   key={currentOrder.id}>

        <div className={styles.orderImage}>
          {currentOrder.dish_image ? (
                            <img 
                            className={styles.foodImage}
                            src={`http://localhost:5000/uploads/menu/${currentOrder.dish_image}`} alt="" />
                          ) : (
                            <div className={styles.imagePlaceholder}>🍽</div>
                          )}
        </div>

        <div className={styles.orderDetails}>

          <div className={styles.orderTop}>
            <div>
              <span className={styles.orderNumber}>
                ORDER #{currentOrder.id}
              </span>

              <h3>{currentOrder.dish_name}</h3>
            </div>

            <span className={styles.statusBadge}>
              {currentOrder.status}
            </span>
          </div>

          <div className={styles.orderInfo}>
            <span>
              Quantity: <strong>{currentOrder.quantity}</strong>
            </span>

            <span className={styles.orderPrice}>
              ₹{currentOrder.total_price}
            </span>
          </div>

        </div>
        

      </div>
      


      <div className={styles.statusTracker}>

        {
          statusSteps.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;

            return(
              <React.Fragment key={status}>
                <div
                className={`${styles.statusSteps} ${
                  isCompleted ? styles.statusCompleted : ""
                } ${
                  isCurrent ? styles.statusCurrent : ""
                }`}
                >

                  <div className={styles.statusDot}>
                    {isCompleted || isCurrent ? "✔" : ""}
                  </div>

                  <span>
                    {status === "pending" && "Pending"}
            {status === "preparing" && "Preparing"}
            {status === "ready" && "Ready"}
            {status === "completed" && "Completed"}
                  </span>

                  {isCurrent && (
                    <small>Current</small>
                  )}
                </div> 

                {index < statusSteps.length - 1 && (
                  <div
                  className={`${styles.statusLine} ${
                    index < currentStatusIndex ? styles.statusLineCompleted : ""
                  }`}

                  />
                )
                }
              </React.Fragment>
            )
          })
        
          
        }

        
      </div>


      <div className={styles.orderFooter}>

       <p>
  🔔{" "}
  {currentOrder.status === "pending" &&
    "Your order has been received and is waiting to be prepared."}

  {currentOrder.status === "preparing" &&
    "Your delicious food is being prepared right now! 🍳"}

  {currentOrder.status === "ready" &&
    "Your order is ready for pickup! 🎉"}

  {currentOrder.status === "completed" &&
    "Your order has been completed. Enjoy your meal! 😋"}
</p>

        <button
          onClick={() => navigate("/student/orders")}
          className={styles.trackButton}
        >
          Track Order →
        </button>

      </div>

    </div>
     );
  }
)
}




</section>
   </div>
  );
}

export default StudentDashboard;