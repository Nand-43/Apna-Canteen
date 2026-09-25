import {Outlet} from "react-router-dom";
import StudentNavbar from "../Student/Student_Navbar.jsx";
import {CartProvider} from "../Context/CartContext.jsx";

function StudentLayout(){
    return (

        <CartProvider>
            <StudentNavbar/>
            
            <main>
                <Outlet/>
            </main>
        </CartProvider>
    )
}

export default StudentLayout;