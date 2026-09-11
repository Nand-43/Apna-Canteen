import React from "react";
import Navbar from "../../Component/Navbar/navbar.jsx";
import Home from "../../Component/Intro/Home.jsx";
import About from "../../Component/Intro/About.jsx";
import Feature from "../../Component/Intro/Feature.jsx";
import Contact from "../../Component/Intro/Contact.jsx";
import Footer from "../../Component/Intro/Footer.jsx";

function LandingPage() {
  return (
    <div>
     <Navbar/>

     <Home/>

     <About/>

     <Feature/>

     <Contact/>

     <Footer/>
     </div>
  
  )
}

export default LandingPage;
