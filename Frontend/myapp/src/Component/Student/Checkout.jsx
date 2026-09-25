import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
import styles from "../styles/Checkout.module.css";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    clearCart
  } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      for (const item of cart) {
        const response = await axios.post(
          "http://localhost:5000/orderRoutes/create",
          {
            dish_id: item.id,
            quantity: item.quantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Order created:", response.data.order);
      }

      clearCart();

      alert("Order placed successfully! 🎉");

      navigate("/student/orders");

    } catch (err) {
      console.log(
        "Failed to place an order:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.error ||
        "Failed to place order."
      );
    }
  };
 
  if (cart.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyIcon}>🛒</div>

        <h2>Your cart is empty</h2>

        <p>
          Add some delicious food from the menu before checking out.
        </p>

        <button
          className={styles.browseButton}
          onClick={() => navigate("/student/menu")}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>

     
      <section className={styles.header}>
        <div>
          <p className={styles.subtitle}>🍽️ APNA CANTEEN</p>

          <h1>Checkout</h1>

          <p className={styles.description}>
            Review your order before placing it.
          </p>
        </div>

        <div className={styles.headerEmoji}>
          🧾
        </div>
      </section>


   
      <div className={styles.checkoutContainer}>

       
        <div className={styles.leftSection}>

          
          <section className={styles.card}>

            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardSubtitle}>
                  YOUR ORDER
                </p>

                <h2>Order Summary</h2>
              </div>

              <span className={styles.itemCount}>
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )} items
              </span>
            </div>


            <div className={styles.itemsList}>

              {cart.map((item) => (

                <div
                  className={styles.checkoutItem}
                  key={item.id}
                >

                  
                  <div className={styles.imageWrapper}>

                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/menu/${item.image}`
                          : "/food-placeholder.png"
                      }
                      alt={item.dish_name}
                      className={styles.foodImage}
                    />

                  </div>


                  
                  <div className={styles.itemInfo}>

                    <h3>{item.dish_name}</h3>

                    <p>
                      ₹{Number(item.price).toFixed(2)} per item
                    </p>


                  
                    <div className={styles.quantityControls}>

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>


                
                  <div className={styles.itemPrice}>

                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                    <button
                      className={styles.removeButton}
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>


          
          <section className={styles.card}>

            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardSubtitle}>
                  CUSTOMER DETAILS
                </p>

                <h2>Student Information</h2>
              </div>

              <span className={styles.userIcon}>
                👤
              </span>
            </div>


            <div className={styles.studentDetails}>

              <div className={styles.detailBox}>
                <span>Name</span>
                <strong>{user?.name || "Student"}</strong>
              </div>

              <div className={styles.detailBox}>
                <span>Student ID</span>
                <strong>
                  {user?.student_id || "Not available"}
                </strong>
              </div>

              <div className={styles.detailBox}>
                <span>Email</span>
                <strong>
                  {user?.email || "Not available"}
                </strong>
              </div>

            </div>

          </section>


         
          <section className={styles.card}>

            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardSubtitle}>
                  PICKUP
                </p>

                <h2>Pickup Information</h2>
              </div>

              <span className={styles.userIcon}>
                📍
              </span>
            </div>


            <div className={styles.pickupBox}>

              <div className={styles.pickupIcon}>
                🍽️
              </div>

              <div>
                <h3>College Canteen</h3>

                <p>
                  Collect your order from your college
                  canteen after it is ready.
                </p>
              </div>

            </div>

          </section>


        
          <section className={styles.card}>

            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardSubtitle}>
                  PAYMENT
                </p>

                <h2>Payment Method</h2>
              </div>

              <span className={styles.userIcon}>
                💳
              </span>
            </div>


            <div className={styles.paymentOption}>

              <div className={styles.paymentRadio}>
                ✓
              </div>

              <div>
                <h3>Pay at Canteen</h3>

                <p>
                  Pay when you collect your order.
                </p>
              </div>

            </div>

          </section>

        </div>


        <aside className={styles.orderTotal}>

          <div className={styles.totalHeader}>
            <p>ORDER TOTAL</p>

            <h2>Summary</h2>
          </div>


          <div className={styles.priceRows}>

            <div>
              <span>Items</span>
              <strong>
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </strong>
            </div>

            <div>
              <span>Subtotal</span>

              <strong>
                ₹{totalPrice.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>Pickup From</span>

              <strong>Canteen 👍</strong>
            </div>

          </div>


          <div className={styles.divider}></div>


          <div className={styles.grandTotal}>

            <span>Total</span>

            <strong>
              ₹{totalPrice.toFixed(2)}
            </strong>

          </div>


          <button
            className={styles.placeOrderButton}
            onClick={createOrder}
          >
            Confirm & Place Order
            <span>→</span>
          </button>


          <button
            className={styles.backButton}
            onClick={() => navigate("/student/cart")}
          >
            ← Back to Cart
          </button>


          <p className={styles.note}>
            🔒 Your order will be securely sent to the
            canteen for preparation.
          </p>

        </aside>

      </div>

    </div>
  );
}

export default Checkout;