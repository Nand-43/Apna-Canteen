import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/StudentNavbar.module.css";
function Student_Navbar(){
    const navigate = useNavigate();
    const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        navigate("/login");
    }
    return(

        
            <nav className={styles.navbar}>
                <div
                className={styles.logo}
                onClick={() => navigate("/student/dashboard")}
                >
                    <div className={styles.logoIcon}>🍴</div>

                    <div>
                        <h2>Apna Canteen</h2>
                        <span>Fresh • Fast • Easy</span>
                    </div>

                </div>


             <div className={styles.navLinks}>
                <NavLink
                to="/student/dashboard"
                className={navLinkClass}
                >
                    🏠
                    <span>
                        Home
                    </span>
                </NavLink>

                <NavLink
                className={navLinkClass}
                to="/student/menu"
                >
                    🍝
                    <span>Menu</span>
                </NavLink>

                <NavLink
                className={navLinkClass}
                to="/student/orders"
                >
                    📦<span>My Orders</span>
                </NavLink>

                <NavLink
                className={navLinkClass}
                to="/student/cart"
                >
                    <span className={styles.cartWapper}>
                        🛒
                        <span className={styles.cartBadge}>0</span>
                    </span>

                    <span>Cart</span>
                </NavLink>

                <NavLink
                to="navLinkClass"
                className={navLinkClass}>
                    👤<span>Profile</span>
                </NavLink>
             </div>

             <button
             className={styles.logoutButton}
             onClick={handleLogout}>Logout</button>

            </nav>
           
        
    )
}

export default Student_Navbar;