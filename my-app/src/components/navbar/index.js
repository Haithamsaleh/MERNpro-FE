//import './App.css';
import React from 'react'
import {Route,Routes,Link} from "react-router-dom";
import Home from './../Home';
import Books from './../Books';
import Arthers from './../Arthers';
import Navbar from './../navbar';
import Login from './../Login';
import Singup from './../Singup';
import logo from './logotf2.png'

const NavBar = () => {
  return (

    <>
  
    <div className="container">
      <ul>

     <li> <img src={logo} width="100" height="50" alt="Logo" /></li>

     <li><Link to="/">home</Link></li>
     <li><Link to="/Books">Books</Link></li>
     <li><Link to="/Arthers">Arthers</Link></li>

     <li> <Link to="/Singup">Sign up</Link></li>
     
     
     <li><Link to="/Login">login</Link></li>
     
    
     {/* <button className='submit1'  onClick={()=>{localStorage.removeItem("newUser")}}>logout</button> */}
    
     </ul>
     </div>
  
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Books" element={<Books/>} />
          <Route path="/Arthers" element={<Arthers/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/Singup" element={<Singup/>} />
     </Routes>
  
     </>
  
    
     
  
  
  
    
    )
  
  
  
  }
  
export default NavBar;
