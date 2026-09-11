import React from "react";
import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock} from "react-icons/fa";
import styles from "../styles/Contact.module.css";

export default function Contact(){
    return (
        <section className={styles.contact} id="contact">
            
                <h2>📍Visit Us</h2>

                <p className={styles.subtitle}>
                    Have questions? We'd love to hear from you.
                </p>

                <div className={styles.container}>

                <div className={styles.left}>
                    <div className={styles.info}>
                         <FaMapMarkerAlt className={styles.icon}/>
                        <div>

                        <h3>Address</h3>
                        <p>Vivek College Canteen</p>
                        <p>Goregaon East, Mumbai</p>
                    </div>
                    </div>
                 
          
                <div className={styles.info}>
                    <FaPhoneAlt className={styles.icon}/>

                    <div>
                        <h3>Phone</h3>
                        <p>+91 8104046042</p>
                    </div>
                </div>

                <div className={styles.info}>
                    <FaEnvelope className={styles.icon}/>
                    <div>
                    <h3>Email</h3>
                    <p>apnacanteen@gmail.com</p>
                </div>
            </div>


            <div className={styles.info}>
               <FaClock className={styles.icon}/>
                <div>
                    <h3>Working Hours</h3>
                    <p>Mon - Sat</p>
                    <p>8:00 AM - 5:00 PM</p>
                </div>
            </div>

         </div>

         <div className={styles.right}>
            <form>

                <input type="text"
                placeholder="name" 
                />

                <input type="email"
                placeholder="email" 
                />

                <textarea 
                rows="5"
                placeholder="Your Message">

                </textarea>

                <button type="submit">
                    Send Message
                </button>
            </form>
         </div>
         </div>

        </section>
    )
}