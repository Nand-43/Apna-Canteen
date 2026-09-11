import {useState}  from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/AdminRegister.module.css";

export default function AdminRegister(){
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFromData] = useState({
        college_name: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        photo: "",
        staffCode: "",
    })

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        setFromData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))


    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if(
            !formData.college_name.trim() ||
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.phone.trim() ||
            !formData.photo||
            !formData.staffCode.trim()
        ){
            setError("Please fill all the required fields.")
        }

        setLoading(true);

        try{

            const data = new FormData();

            data.append("college_name", formData.college_name);
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("phone", formData.phone);
            data.append("staffCode", formData.staffCode);
            if(formData.photo){
                data.append("photo", formData.photo)
            } 

            data.append("role", "admin");
            console.log("selected photo ", formData.photo);

            const response = await axios.post(
                "http://localhost:5000/authRoutes/register",
                data,
                {
                    header:{
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
                "Registeration failed. Please try again."
            )
        }

        finally{
            setLoading(false);
        }
    }

    return(
        <div className={styles.page}>
            <div className={styles.container}>

            <div className={styles.header}>
                <div className={styles.logo}>🍽

                </div>
            

            <h1>Canteen Staff Registration</h1>

            <p>
                Create an authorized account to manage canteen operations.
            </p>

            </div>

            <div className={styles.verification}>
                <div className={styles.securityIcon}>
                    🔐
                </div>

                <div>
                    <h3>Staff Verification Required</h3>

                    <p>
                        Enter the verification code provided by 
                        your college to create a staff account.
                    </p>
                </div>
            </div>

            <h3 className={styles.sectionTitle}>
                Personal Information
            </h3>

           <form onSubmit={handleSubmit} className={styles.form}>

            

           <div className={styles.inputGroup}>
                <label>
                  College Name:
                </label>
                
                <input type="text"
                name="college_name"
                placeholder="Enter your College Name"
                value={formData.college_name}
                onChange={handleChange} 
                required/>
            </div>

            <div className={styles.inputGroup}>
                <label>
                  Name:
                </label>
                
                <input type="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange} 
                required/>
            </div>

            <div className={styles.inputGroup}>
                <label>
                   Email:
                </label>
                
                <input type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange} 
                required/>
            </div>

            <div className={styles.inputGroup}>
                <label>
                  Password:
                </label>
                
                <input type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange} 
                required/>
            </div>

            <div className={styles.inputGroup}>
                <label>
                Phone:
                </label>
                
                <input type="tel"
                name="phone"
                placeholder="Enter your phone No."
                value={formData.phone}
                onChange={handleChange} 
                required/>
            </div>

            <div className={`${styles.inputGroup} ${styles.staffCode}`}>
                <label>
                    Staff Verification Code:
                </label>
                
                <input type="password"
                name="staffCode"
                value={formData.staffCode}
                onChange={handleChange} 
                required
                />

            </div>

            <div className={`${styles.inputGroup} ${styles.photo}`}>

                
                <label>
                    Profile Photo:
                </label>
               
                <input type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange} 
                required
                />
            </div>

            <div className={styles.role}>
                👨‍🍳 Registering as: <strong>Canteen Staff</strong>
            </div>

            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}

            {
                message && (
                    <p className={styles.success}>
                        {message}
                    </p>
                )
            }

            <button type="submit"
            className={styles.button}
            disabled={loading}
            >
                {loading 
                ? "Creating Account..." 
                 : "Create Staff Account"}
                </button>
            
           </form>

           <p className={styles.loginText}>
            Already have a staff account?

            <span onClick={() => navigate("/login")}>
                Login
            </span>
        </p>

        </div>
        </div>
    )
} 
