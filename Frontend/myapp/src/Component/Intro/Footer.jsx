import React from "react";
import styles from "../styles/Footer.module.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        <div>

          <h2>🍽 Apna Canteen</h2>

          <p>
            Making college food ordering
            quick, easy, and hassle-free.
          </p>

        </div>

        <div>

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Features</a>
          <a href="/">Contact</a>

        </div>

        <div>

          <h3>Contact</h3>

          <p>📍 Goregaon East, Mumbai</p>
          <p>📞 +91 9876543210</p>
          <p>📧 apnacanteen@gmail.com</p>

        </div>

        <div>

          <h3>Follow Us</h3>

          <div className={styles.social}>

            <FaInstagram/>

            <FaFacebook/>

            <FaLinkedin/>

          </div>

        </div>

      </div>

      <hr />

      <p className={styles.copy}>
        © 2026 Apna Canteen. All Rights Reserved.
      </p>

    </footer>
  );
}