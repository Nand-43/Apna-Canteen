import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "../styles/Home.module.css";
import HomeImg from "../../assets/hemoImg.png";

export default function Home(){

    const navigate = useNavigate();
    
    return(
        <section className={styles.home}>
            <div className={styles.left}>
                <p className={styles.tag}>
                🍽 Apna Canteen
                </p>
                <h1>
                    Skip the Queue,
                    <br/>
                    Order Food Online
                </h1>

                <p className={styles.description}>
                    Order fresh and delicious meals from your college canteen anytime, 
                    anywhere. Save time during breaks and enjoy a hassle-free pickup.
                </p>

                <div className={styles.buttons}>
                    <button className={styles.orderBtn}
                    onClick={() => navigate("/register")}>Order Now</button>
                    <button className={styles.menuBtn}>View Menu</button>
                </div>
            </div>

            <div className={styles.right}>
                <img src={HomeImg} alt="HomeImg" />
            </div>
        </section>
    )
}