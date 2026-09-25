import React from 'react';
import styles from "../styles/Admin_menu.module.css";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Admin_menu = () => {

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
  }, [])

  const navigate = useNavigate();

  const fetchMenu = async () => {
    try{
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:5000/menuRoutes/accessMenu",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      );
      console.log("Backend response", response.data)
      setMenuItems(response.data.menu);
    }
    catch(err){
      console.log("Menu error:", err);

      setError(
        err.response?.data?.error ||
        "Failed to load menu"
      );
    }

    finally{
      setLoading(false);
    }
  };

  const updateToggle = async(id, e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:5000/menuRoutes/toggleButton/${id}`,
        { 
          
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      fetchMenu();
    } catch (err) {
      console.error("Toggle availability error:", err);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading menu...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{error}</h2>
      </div>
    );
  } 
  return (
    <div className={styles.menuPage}> 
      <div className={styles.header}>
        <div>
          <h1>Menu Management</h1>

          <p>
            Manage food items, prices and availability.
          </p>
        </div>

        <button className={styles.button}
        onClick={() => navigate("/admin/addmenu")}
        >➕ Add Menu Item</button>
      </div>


       <div className={styles.menuGrid}>
        {menuItems.map((item) => (

          <div  
          className={styles.menuCard}
          key={item.id}
          >
            <div className={styles.imageWrapper}>
            <img
            src={`http://localhost:5000/uploads/menu/${item.image}`}
          alt={item.dish_name}
            />
            </div>

            <div>
            <h1>{item.dish_name}</h1>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <div>
              <strong>
                {item.price}
              </strong>

              <span>
                {item.availability ? "Available" : "Unavailable"}
              </span>
            </div>

            <div>
              <button onClick={() => navigate(`/admin/editmenu/${item.id}`)}>Edit</button>
              <button onClick={(e) => updateToggle(item.id,e)}>{item.availability ? "Disable" : "Enable"}</button>
            </div>
          </div>
          </div>    

          
))}
       </div>
    </div>
  )
}

export default Admin_menu  