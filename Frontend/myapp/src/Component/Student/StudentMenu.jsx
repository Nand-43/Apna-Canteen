import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../styles/StudentMenu.module.css";
import {useCart} from "../Context/CartContext.jsx";

export default function StudentMenu(){

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search , setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { addToCart } = useCart();

    const fetchMenu = async() => {

        try{

        const token = localStorage.getItem('accessToken');

        const response  = await axios.get("http://localhost:5000/menuRoutes/accessMenu",
            {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        );

        console.log("Student Menu:", response.data.menu);

        setMenu(response.data.menu);
    }
    catch(err){
        console.log("Not able to fetched the menu", err);

        setError("Unable to load the menu");
    }

    finally{
        setLoading(false);
    }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleAddOrder = async(dishId) => {
        try{
            const token = localStorage.getItem("accessToken");
            
            const response = await axios.post("http://localhost:5000/orderRoutes/create",
                
                 {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Order placed", response.data.order);
            alert("Order placed successfuly");
        }
        catch(err){
             console.log(err);
             alert("Failed to place order")
        }
    }

    

    const categories = [
        "All",
        ...new Set(menu.map((item) => item.category))
    ];

    const filteredMenu = menu.filter((item) => {

        const matchesSearch  = item.dish_name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    })


    return (
      <div className={styles.page}>

       <section className={styles.menuHeader}>
        <div>
            <p className={styles.subtitle}> 🍽Apna Canteen Menu</p>
            <h1>What are you
                <br/>
                Craving today?
            </h1>


            <p className={styles.description}> Choose from fresh and delicious food
                prepared specially for your college day.
            </p>

        </div>

        <div className={styles.headerEmoji}>🍝</div>
       </section>

       <div className={styles.searchBox}>
        <span>
            🔍
        </span>

        <input type="text" 
        placeholder="Search your favourite food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
        />
       </div>


       <div className={styles.categories}>

        {categories.map((category) => (
            <button
            key={category}
            
            className={
                selectedCategory === category
                ? styles.categoryActive 
                : styles.categoryButton
            }

            onClick={() => setSelectedCategory(category)}
            > 
                {category}
            </button>
        ))}

       </div>


       <section className={styles.menuSection}>
        <div className={styles.sectionHeader}>
            <div>

                <p className={styles.sectionSubtitle}>
                    FRESHLY PREPARED
                </p>

                <h2>
                    {selectedCategory === "All"
                    ? "Today's Menu" :
                    selectedCategory
                    }
                </h2>
            </div>


            <span
            className={styles.itemCount}
            >{filteredMenu.length} items</span>
        </div>


        {
            loading && (
                <div className={styles.message}>
                    <p>Loading delicious food... 🍳</p>
                </div>
            )
        }

        {
            !loading && error && (
                <div className={styles.message}>
                    <p>{error}</p>
                </div>
            )
        }

        {
            !loading && !error && filteredMenu.length === 0 && (
               <div className={styles.emptyMenu}>

                <div> 🍽</div>
                <h3>No food Found</h3>
                <p>Try another food name or category </p>
               </div>
               
            )
        }

        {!loading && !error && filteredMenu.length > 0 && (
            <div className={styles.foodGrid}>
                {
                    filteredMenu.map((item) => (
                        <div 
                        className={styles.foodCard}
                        key={item.id}
                        >

                            <div className={styles.imageWrapper}>
                                <img src={item.image 
                                    ? `http://localhost:5000/uploads/menu/${item.image}`
                                    : "/food-placeholder.png"
                                    
                                    } alt={item.dish_name}
                                    className={styles.foodImage}
                                
                                />

                                <span className={styles.categoryTag}> {item.category}</span>
                            </div>

                            <div className={styles.foodInfo}>
                               <h3>{item.dish_name}</h3>

                               <p>{item.description}</p>

                               <div className={styles.foodBottom}>
                                <strong>
                                    {item.price}
                                </strong>

                                

                                <button className={styles.addButton} onClick={() => addToCart(item)}>
                                    Add +
                                </button>
                               </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )}
       </section>
      </div>
    )
}