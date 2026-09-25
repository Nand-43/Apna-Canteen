import {Routes, Route} from "react-router-dom";
import LandingPage from "./Component/Intro/landing.jsx";
import Home from "./Component/Intro/Home.jsx";
import About from "./Component/Intro/About.jsx";
import StudentRegister from "./Component/Pages/StudentRegister.jsx";
import AdminRegister from "./Component/Pages/AdminRegister.jsx";
import Login from "./Component/Pages/Login.jsx";
import RoleBased from "./Component/Pages/RoleBased.jsx";
import Student_dashBoard from "./Component/Student/Student_dashboard.jsx";
import AdminLayout from "./Component/Navbar/AdminLayout.jsx";
import Admin_dashboard from "./Component/Admin/Admin_dashboard.jsx";
import Admin_menu from "./Component/Admin/Admin_menu.jsx";
import AddMenu from "./Component/Menu_page/AddMenu.jsx";
import EditMenu from "./Component/Menu_page/EditMenu.jsx";
import Admin_orders from "./Component/Admin/Admin_orders.jsx";
import Admin_reports from "./Component/Admin/Admin_reports.jsx";
import CanteenStaff from "./Component/Admin/CanteenStaff.jsx";
import StudentList from "./Component/Admin/StudentList.jsx";
import AdminInfo from "./Component/Admin/Admin_account.jsx";
import StudentLayout from "./Component/Navbar/StudentLayout.jsx";
import StudentDashboard from "./Component/Student/Student_dashboard.jsx";
import StudentOrder from "./Component/Student/StudentOrder.jsx";
import StudentMenu from "./Component/Student/StudentMenu.jsx";
import OrderCart from "./Component/Student/OrderCart.jsx";
import Checkout from "./Component/Student/Checkout.jsx";
import StudentInfo from "./Component/Student/StudentAccount.jsx";

export default function App(){

   return(

    
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/rolebased" element={<RoleBased/>}/>
      <Route path="/student" element={<StudentRegister/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/student_dashboard" element={<Student_dashBoard/>}/>
      <Route path="/StaffRegister" element={<AdminRegister/>}/>
      <Route path="/admin_dashboard" element={<Admin_dashboard/>}/>

      <Route path="/admin" element={<AdminLayout/>}>
          
         <Route index element={<Admin_dashboard/>}/>

         <Route path="orders" element={<Admin_orders/>}/>

  
         <Route path="menu" element={<Admin_menu/>}/>
  
         <Route path="addmenu" element={<AddMenu/>}/>
         <Route path="editmenu" element={<EditMenu/>}/>
         <Route path="/admin/editmenu/:id" element={<EditMenu/>}/>
         <Route path="reports" element={<Admin_reports/>}/>


         <Route path="staff" element={<CanteenStaff/>}/>

         <Route path="student" element={<StudentList/>}/>

         <Route path="account" element={<AdminInfo/>}/>
      </Route>

      <Route path="/student" element={<StudentLayout/>}>
        <Route index path="dashboard" element={<StudentDashboard/>}/>
        <Route path="menu" element={<StudentMenu/>}/>
        <Route path="orders" element={<StudentOrder/>}/>
        <Route path="cart" element={<OrderCart/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="account" element={<StudentInfo/>}/>
      </Route>

     </Routes>
   )
}