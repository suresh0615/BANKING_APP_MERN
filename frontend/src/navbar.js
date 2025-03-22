import React, { useState } from 'react';
import img from "./bank.jpg";
import SignUpForm from './home';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;     
        <img src={img}  height="50" width="50" alt="logo"/>
      </div>
      <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
        <img src={img}  height="50" width="50" alt="logo"/>
        <a href="#/login">LogIn</a>
        <a href='#/createaccount'>Create Account</a>
        <a href='#/deposit'>Deposit</a>
        <a href='#/withdraw'>Withdraw</a>
        <a href='/#userdetails'>details</a>
        {/* <a href="#/alldata">Admin Dasboard</a>  */}
        <div className="customer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
           <a href="#">Customer service </a>
            {isOpen && (
              <div className="dropdownContent">
                <a href="/#contact">Contact us</a>
                <a href="#">Having issues?</a>
             </div>
             )}
        </div>
      </div>
      <div> 
      </div>
    </div>
    </>
  );
}

export default Navbar;
  