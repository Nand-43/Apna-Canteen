import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RoleSelection.module.css";

export default function RoleSelection() {

  const navigate = useNavigate();

  return (

    <div className={styles.container}>

      

      <div className={styles.left}>

        <div className={styles.overlay}></div>

        <div className={styles.content}>

          <h1>🍽️ Apna Canteen</h1>

          <p className={styles.subtitle}>
            Smart College Food Ordering System
          </p>

          <div className={styles.line}></div>

          <div className={styles.feature}>
            <span>✔</span>
            <p>Skip Long Queues</p>
          </div>

          <div className={styles.feature}>
            <span>✔</span>
            <p>Fresh & Hygienic Meals</p>
          </div>

          <div className={styles.feature}>
            <span>✔</span>
            <p>Live Order Tracking</p>
          </div>

          <div className={styles.feature}>
            <span>✔</span>
            <p>Quick Pickup</p>
          </div>

          <div className={styles.quote}>
            "Food is ready when you are."
          </div>

        </div>

      </div>

     
      <div className={styles.right}>

        <div className={styles.card}>

          <h2>Create Account</h2>

          <p className={styles.choose}>
            Choose how you want to continue
          </p>

          <div
            className={styles.roleCard}
            onClick={() => navigate("/student")}
          >

            <div>

              <h3>🎓 Student</h3>

              <p>
                Order food online from your college canteen.
              </p>

            </div>

            <span className={styles.arrow}>→</span>

          </div>

          <div
            className={styles.roleCard}
            onClick={() => navigate("/StaffRegister")}
          >

            <div>

              <h3>👨‍🍳 Canteen Staff</h3>

              <p>
                Manage menu, orders and students.
              </p>

            </div>

            <span className={styles.arrow}>→</span>

          </div>

        </div>

      </div>

    </div>

  );
}