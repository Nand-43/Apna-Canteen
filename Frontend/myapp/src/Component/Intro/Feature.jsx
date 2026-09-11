import React from "react";
import styles from "../styles/Feature.module.css";

export default function Feature(){
    return(
      <section className={styles.feature} id="feature">
        <h2 className={styles.heading}>Why Choose Apna Canteen</h2>

        <p className={styles.subHeading}>
            We make ordering food easier, faster, and more convenient for every student.
        </p>

        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.icon}>🛒</div>
                <h3>Easy Ordering</h3>
                <p>
                    Browser the menu and place your order in just a few clicks.
                </p>
            </div>

            <div className={styles.card}>
                <div className={styles.icon}> ⏱</div>
                    <h3>Skip the Queue</h3>
                    <p>
                        Save your valuable break time by ordering online.
                    </p>

               
            </div>

             <div className={styles.card}>
          <div className={styles.icon}>🍔</div>
          <h3>Fresh Food</h3>
          <p>
            Enjoy freshly prepared meals made with quality ingredients.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>💳</div>
          <h3>Cash on Pickup</h3>
          <p>
            Pay safely using cash at pickup.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>📦</div>
          <h3>Order Tracking</h3>
          <p>
            Get notified when your order is ready for collection.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>📱</div>
          <h3>Mobile Friendly</h3>
          <p>
            Order anytime from your smartphone, tablet, or laptop.
          </p>
        </div>
        </div>
      </section>
    )
}