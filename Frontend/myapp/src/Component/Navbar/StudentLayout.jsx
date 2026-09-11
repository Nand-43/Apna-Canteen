import {Outlet} from "react-router-dom";
import StudentNavbar from "../Student/Student_Navbar.jsx";


function StudentLayout(){
    return (

        <div>
            <StudentNavbar/>
            
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default StudentLayout;