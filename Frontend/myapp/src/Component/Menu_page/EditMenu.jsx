import React from 'react'
import axios from "axios"
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from "../styles/EditMenu.module.css";

function EditMenu(){
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dish_name: "",
    category: "",
    description: "",
    price: "",
    availability: true
  });
  const navigate = useNavigate(); 
  const {id} =  useParams();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async() => {
    const accessToken = localStorage.getItem("accessToken");
    

    const response = await axios.get(`http://localhost:5000/menuRoutes/singleMenu/${id}`,
      {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    console.log("Single menu response:", response.data);

    setFormData(response.data.item);
  }

  const handleChange = async(e) => {
    const {name, value, files} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "availability" ? value === "true" : files ? files[0]: value,
    })
  )
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

    const accessToken = localStorage.getItem("accessToken");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    await axios.put(`http://localhost:5000/menuRoutes/updateMenu/${id}`,
      data,
      {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    fetchItem();
    navigate("/admin/menu");
  }
  catch(err){
    console.log("Update menu error:", err);
  }
  }

  const DeleteItem = async() => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.delete(`http://localhost:5000/menuRoutes/deleteMenu/${id}`, 
      {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      }
      
    )
    fetchItem();
    navigate('/admin/menu');
  }


  return (
     <div className={styles.page}>

            {/* HEADER */}

            <div className={styles.header}>

                <div>
                    <p className={styles.breadcrumb}>
                        Menu Management / Edit Item
                    </p>

                    <h1>Edit Menu Item</h1>

                    <p>
                        Update the details, price,
                        availability or image of this item.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate("/admin/menu")}
                >
                    ← Back to Menu
                </button>

            </div>


            {/* FORM */}

            <form
                className={styles.formCard}
                onSubmit={handleSubmit}
            >

                {/* LEFT SIDE */}

                <div className={styles.formContent}>

                    <div className={styles.section}>

                        <h2>Basic Information</h2>

                        <p className={styles.sectionDescription}>
                            Edit the information shown to students.
                        </p>


                        <div className={styles.field}>

                            <label>Dish Name</label>

                            <input
                                type="text"
                                name="dish_name"
                                value={formData?.dish_name || ""}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className={styles.field}>

                            <label>Category</label>

                            <select
                                name="category"
                                value={formData?.category || ""}
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

                                <option value="Beverages">
                                    Beverages
                                </option>

                                <option value="Dessert">
                                    Dessert
                                </option>

                            </select>

                        </div>


                        <div className={styles.field}>

                            <label>Description</label>

                            <textarea
                                name="description"
                                rows="5"
                                value={
                                    formData?.description || ""
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className={styles.field}>

                            <label>Price</label>

                            <div className={styles.priceInput}>

                                <span>₹</span>

                                <input
                                    type="number"
                                    name="price"
                                    min="1"
                                    value={
                                        formData?.price || ""
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* AVAILABILITY */}

                    <div className={styles.section}>

                        <h2>Availability</h2>

                        <div className={styles.availability}>

                            <div>

                                <strong>
                                    {formData.availability
                                        ? "Item is available"
                                        : "Item is unavailable"}
                                </strong>

                                <p>
                                    Students can
                                    {formData.availability
                                        ? " order "
                                        : "not order "}
                                    this item.
                                </p>

                            </div>


                            <select
                                name="availability"
                                value={
                                    formData.availability
                                        ? "true"
                                        : "false"
                                }
                                onChange={handleChange}
                                className={
                                    formData.availability
                                        ? styles.available
                                        : styles.unavailable
                                }
                            >

                                <option value="true">
                                    Available
                                </option>

                                <option value="false">
                                    Unavailable
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className={styles.actions}>

                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() =>
                                navigate("/admin/menu")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className={styles.imageSection}>

                    <h2>Food Image</h2>

                    <p className={styles.sectionDescription}>
                        Current image of this menu item.
                    </p>


                    {formData.image ? (

                        <div className={styles.imagePreview}>

                            <img
                                src={
                                    formData.image instanceof File
                                        ? URL.createObjectURL(
                                            formData.image
                                        )
                                        : `http://localhost:5000/uploads/menu/${formData.image}`
                                }
                                alt={formData.dish_name}
                            />

                        </div>

                    ) : (

                        <div className={styles.noImage}>
                            📷
                            <span>No image available</span>
                        </div>

                    )}


                    <label className={styles.uploadButton}>

                        Change Image

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />

                    </label>


                    <p className={styles.imageHint}>
                        Upload JPG, JPEG or PNG
                    </p>


                    {/* DELETE */}

                    <div className={styles.dangerZone}>

                        <h3>Danger Zone</h3>

                        <p>
                            Deleting this menu item cannot
                            be undone.
                        </p>

                        <button
                            type="button"
                            onClick={DeleteItem}
                            className={styles.deleteButton}
                        >
                            🗑 Delete Item
                        </button>

                    </div>

                </div>

            </form>

        </div>
  )
}

export default EditMenu
