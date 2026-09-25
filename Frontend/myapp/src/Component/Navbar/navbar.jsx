import React from "react";
import logo from "../../assets/canteenLogo.png";
import styles from "../styles/navbar.module.css";
function Navbar(){
    return (
        <header className={styles.navbar}>
         <div className={styles.logoSection}>
         <img src={logo} className={styles.logo} alt="Canteen-Logo"/>
         </div>
    <nav className={styles.navLinks}>
       <a href="#home">Home</a>
       <a href="#about">About</a>
       <a href="#contact">Contact</a>
       <a href="#feature">Feature</a>
       <a href="/login">Login</a>
       <a href="/rolebased">Register</a>
    </nav>
     </header>

    )
}

export default Navbar;