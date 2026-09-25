import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
import styles from "../styles/StudentCart.module.css";

function OrderCart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <div className={styles.page}>

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div>
          <h2>Your cart is empty 🛒</h2>

          <button onClick={() => navigate("/student/menu")}>
            Browse Menu
          </button>
        </div>
      ) : (
        <>

          {cart.map((item) => (
            <div
              key={item.id}
              className={styles.cartItem}
            >

              
                <img  className={styles.foodImage} src={`http://localhost:5000/uploads/menu/${item.image}`} alt="" />
              

              <div>
                <h3>{item.dish_name}</h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>


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


              <strong>
                ₹{Number(item.price) * item.quantity}
              </strong>


              <button className={styles.removeButton}
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>

            </div>
          ))}


          <div className={styles.summary}>

            <h2>
              Total: ₹{totalPrice.toFixed(2)}
            </h2>

            <button
              onClick={() => navigate("/student/checkout")}
            >
              Place Order
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default OrderCart;