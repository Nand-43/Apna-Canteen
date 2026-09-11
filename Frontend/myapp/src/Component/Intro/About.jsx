import React from "react";
import styles from "../styles/About.module.css";
import aboutImg from "../../assets/aboutImg1.png";
export default function About(){
    return (
        <section className={styles.about}> 
            <h2>About Apna Canteen</h2>

            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={aboutImg} alt="About Canteen"/>
                </div>

                <div className={styles.content}>
                    <h3>Making college Food Ordering Simple</h3>

                    <p>
                        Apna Canteen is a smart online food ordering platform designed
                        especially for college students. It allows students to browse the
                        menu, place orders online, and collect food without standing in
                        long queues.
                    </p>

                    <p>
                        Our goal is to make food ordering faster, more convenient, and
                        enjoyable while helping the college canteen manage orders
                        efficiently.
                    </p>
                </div>
            </div> 
        </section>
    )
}