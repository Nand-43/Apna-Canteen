import React from "react";
import {Outlet} from "react-router-dom";
import Admin_Navbar from "../Admin/Admin_Navbar.jsx";

export default function AdminLayout(){
    return (
        <div>
            <Admin_Navbar/>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}