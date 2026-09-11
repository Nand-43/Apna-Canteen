import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/Login.module.css";

export default function Login(){

    const navigate = useNavigate();

    const [error, setError] =useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");
        setLoading(true);
        try{
            const response = await axios.post("http://localhost:5000/authRoutes/login", {
                email:  formData.email,
                password: formData.password
            }
        );

        const data = response.data;

        console.log("login response:", data);

        localStorage.setItem(
            "accessToken",
            data.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            data.refreshToken
        )

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setMessage("Login successful!")

        if(data.user.role === "student"){
            navigate("/student/dashboard");
        }
        else if(data.user.role === "admin"){
            navigate("/admin")
        }  


        }
        catch(err){

            console.log("Login error: ", err);

            setError(
                err.response?.data?.error ||
                "Login failed. Please check your email and password"
            );
        }
            finally{
                setLoading(false);
            
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.icon}>
                  🔐
                </div>
                  
                  <h2 className={styles.title}>Welcome Back!</h2>

                  <p className={styles.subtitle}>Welcome back to Apna Canteen.</p>
         
            
                    <div className={styles.trust}>
                           <span>⚡ Fast</span>
                           <span>•</span>
                          <span>🔒 Secure</span>
                           <span>•</span>
                          <span>🍽️ Easy</span>
                    </div>
            <form onSubmit={handleSubmit} className={styles.form}>

                 <div className={styles.inputGroup}>
                <label >Email:</label>

                <input 
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email} 
                onChange={handleChange}
                autoComplete= "email"
                required
                />

               </div>
                  
                <div className={styles.inputGroup}>
                <label>Password</label>

                <input type="password"
                name="password" 
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete= "current-password"
                required/>
                </div>

               {
                error && (
                    <p className={styles.error}>
                        {error}
                    </p>
                )
               }

               {
                message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )
               }
                <button type="submit" 
                className={styles.loginButton}
                disabled={loading}>
                    {
                        loading ? "Logging in..." : "Login"
                    }
                </button>
            </form>

            <p className={styles.registerText}>
                Don't have an account?
                <span onClick={() => navigate("/rolebased")}>Register</span>
            </p>
        </div>
           </div> 
    )
}