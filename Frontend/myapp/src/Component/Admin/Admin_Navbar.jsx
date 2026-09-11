import react from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "../styles/AdminNavbar.module.css";
export default function AdminNavbar(){
 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refrestToken");
        localStorage.removeItem("user");

        navigate("/login");
    }

    return(
        
            <nav className={styles.navbar}>

               <div className={styles.logo}
               onClick={() => navigate("/Admin_dashboard")}
               >
                <span className={styles.logoIcon}>🍽</span>
                <span>Apna Canteen</span>
               </div>

               <div className={styles.navLinks}>
                <NavLink 
                to="/admin" end
                className={({isActive}) => 
                isActive ? styles.active : styles.link
            }
                >
                    Dashboard
                </NavLink>

                <NavLink 
                to="/admin/orders"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
            }>
                    Orders
                </NavLink>

                 <NavLink
                 to="/admin/menu"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
            }
            >
                    Menu
                </NavLink>

                 <NavLink 
                 to="/admin/inventory"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
            }
            >
                    Inventory
                </NavLink>

                 <NavLink 
                 to="/admin/staff"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
            }
            >
                    Staff
                </NavLink>

                 <NavLink to="/admin/student"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
                }
                 >
                    Students
                </NavLink>

                 <NavLink 
                 to="/admin/reports"
                 className={({isActive}) => 
                isActive ? styles.active : styles.link
                }
                 >
                    Reports
                </NavLink>
               </div>

               <div className={styles.rightSection}>
                <div styles={styles.profile}>
                    <span className={styles.profileIcon}>👤</span>
                    <span>Admin</span>
                </div>

                <button
                className={styles.logout}
                onClick={handleLogout}
                >
                    Logout
                </button>
               </div>


            </nav>
        
    )
}