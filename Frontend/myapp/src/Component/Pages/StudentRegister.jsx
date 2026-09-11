import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/StudentRegister.module.css";

export default function StudentRegister(){

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);   
  const [formData, setFormData] = useState({
    college_name: "",
    student_id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    year: "",
    photo: null
  })

  const handleChange =(e) => {
    const {name, value, files} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files? files[0] : value
    })); 

  }
    const handleSubmit = async (e) => {
      e.preventDefault();

      setMessage("");
      setError("");

  
        if (
        !formData.college_name.trim() ||
        !formData.student_id.trim() ||
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.password.trim() ||
        !formData.phone.trim() ||
        !formData.department ||
        !formData.year
    ) {
        setError("Please fill all required fields.");
        return;
    }
    setLoading(true);

    try{

    
        const data = new FormData();

         data.append("college_name",formData.college_name);
         data.append("student_id", formData.student_id);
         data.append("name", formData.name);
         data.append("email", formData.email); 
         data.append("password", formData.password);
         data.append("phone", formData.phone);
         data.append("department", formData.department);
         data.append("year", formData.year);

         if(formData.photo){
          data.append("photo", formData.photo);  
         }

         data.append("role", "student");

         const response = await axios.post(
          "http://localhost:5000/authRoutes/register",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
         );

         setMessage(response.data.message);

         setTimeout(() => {
          navigate("/login");

         }, 1500);
      }
      catch(err){
        setError(
          err.response?.data?.error ||
          "Registration failed. Please try again."
        )
      }
      finally{
        setLoading(false);
      }
    }
  

  return (
    <div className={styles.container}>
    <div className={styles.registerCard}>
      <div className={styles.header}>
    <h1>
      Student Registeration
    </h1>

    <p>
      Create your Apna Canteen student account
    </p>
    </div>

    <form onSubmit={handleSubmit}> 
      <div className={styles.inputGroup}>
        <label>College Name</label>

        <input type="text"
        name="college_name" 
        placeholder="Enter Your College Name"
        value={formData.college_name}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Student ID</label>

        <input type="text"
        name="student_id" 
        placeholder="Enter your student ID"
        value={formData.student_id}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Full Name</label>

        <input type="text"
        name="name" 
        placeholder="Enter Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Email</label>

        <input type="email"
        name="email" 
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Password</label>

        <input type="password"
        name="password" 
        placeholder="Enter Your Password"
        value={formData.password}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Phone No</label>

        <input type="tel"
        name="phone" 
        placeholder="Enter Your Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Department</label>

        <select name="department"
        value={formData.department}
        onChange={handleChange}
        required
        >

         <option value="">
           Select Department
         </option>

         <option value="11th">
            11th 
          </option>

          <option value="12th">
           12th
          </option>

         <option value="BSC IT">
          BSC IT
         </option>

         <option value="BSC CSS">
          BSC CSS
         </option>

         <option value="BCom">
          BCom
         </option>

         <option value=" BA">
          BA
         </option>

         <option value="BMS">
          BMS
         </option>

         <option value="Other">
          Other
         </option>

        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Year</label>

       <select name="year"
        value={formData.year}
        onChange={handleChange}
        >
          <option value="">
            Select Year
          </option>

          <option value="First Year">
            First Year
          </option>

          <option value="Second Year">
            Second Year
          </option>

          <option value="Third Year">
            Third Year
          </option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Photo</label>

        <input type="file"
        name="photo" 
        accept="image/*"
        onChange={handleChange}
       required
        />
      </div>

      <div className={styles.role}>
        🎓 Registering as:
                        <strong> Student</strong>

                    </div>


             

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className={styles.success}>
                            {message}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Student Account"
                        }

                    </button>
      
    </form>

    <p className={styles.loginText}>

                    Already have an account?

                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>

                </p>

    </div>
    </div>
  )
}