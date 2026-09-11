import React from 'react'
import {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "../styles/AddMenu.module.css";
function AddMenu(){

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const [menuData, setMenuData] = useState({
      dish_name: "",
      category: "",
      description: "",
      price: "",
      availability: true,
      image: null
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
        const {name,  value, files} = e.target;
        setMenuData((prev) => ({
            ...prev,
           [name]: files ? files[0] :value
        })
        )
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

          setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        const data = new FormData;

        data.append("dish_name", menuData.dish_name);
        data.append("description", menuData.description);
        data.append("category", menuData.category);
        data.append("price", menuData.price);
        data.append("availability", menuData.availability);
        data.append("image", menuData.image);

      const add = await axios.post("http://localhost:5000/menuRoutes/createMenu",
        data, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(add.data);
      navigate("/admin/menu");
      }

      catch(err){
       console.log("Add menu error", err);
    }
    finally{
      setLoading(false);
    }
    }

    
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Add Menu Item</h1>
          <p>Add a new food item to your canteen menu.</p>
        </div>

        <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate("/admin/menu")}
        >
            ⬅ Back to Menu
        </button>
      </div>

      <div className={styles.formCard}>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Basic Information</h2>
          <p className={styles.sectionDescription}>Enter the details of the food item.</p>

          <div className={styles.formGrid}>

 
           <div className={styles.field}>
            <label >Dish Name</label>
            <input name="dish_name" 
                 placeholder="Dist Name" 
                   value={menuData.dish_name}
                   onChange={handleChange}
                   required
            />
           </div>

             <div className={styles.field}>
             <label>Category</label>

            <select
            name="category"
            value={menuData.category}
            onChange={handleChange}
            required
            >
           <option value="">
            Select category
            </option>

            <option value="Breakfast">
             Breakfast
            </option>

            <option value="Lunch">
             Lunch
            </option>

            <option value="Snacks">
             Snacks
            </option>


            <option value="Dessert">
             Dessert
            </option>
            </select>
            </div>


             <div className={styles.fieldFull}>
             <label>Description</label>

            <textarea
            name="description"
             placeholder="Describe the food item..."
             value={menuData.description}
             onChange={handleChange}
              rows="4"
            />
            </div>

            </div>

            </div>


                    

                    <div className={styles.section}>

                        <h2>Price & Availability</h2>

                        <p className={styles.sectionDescription}>
                            Set the price and availability of this item.
                        </p>

                        <div className={styles.priceAvailability}>

                            <div className={styles.field}>
                                <label>Price</label>

                                <div className={styles.priceInput}>
                                    <span>₹</span>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="0"
                                        min="1"
                                        value={menuData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>


                            <div className={styles.availabilityBox}>

                                <div>
                                    <strong>Available for ordering</strong>

                                    <p>
                                        Students can order this item
                                    </p>
                                </div>

                                <label className={styles.switch}>
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        checked={menuData.availability}
                                        onChange={(e) =>
                                            setMenuData((prev) => ({
                                                ...prev,
                                                availability:
                                                    e.target.checked
                                            }))
                                        }
                                    />

                                    <span className={styles.slider}></span>
                                </label>

                            </div>

                        </div>

                    </div>


                    

                    <div className={styles.section}>

                        <h2>Food Image</h2>

                        <p className={styles.sectionDescription}>
                            Upload an image of the food item.
                        </p>

                        <label className={styles.uploadBox}>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />

                            <span className={styles.uploadIcon}>
                                📷
                            </span>

                            <strong>
                                Click to upload image
                            </strong>

                            <small>
                                PNG, JPG or JPEG
                            </small>

                            {menuData.image && (
                                <span className={styles.fileName}>
                                    {menuData.image.name}
                                </span>
                            )}

                        </label>

                    </div>


                    <div className={styles.formActions}>

                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => navigate("/admin/menu")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Menu Item"
                            }
                        </button>

                    </div>

            
         </form>
        </div>
        </div>
 

  
  )
}

export default AddMenu
