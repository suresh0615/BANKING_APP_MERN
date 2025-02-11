import './app.css'; 
import Navbar from './navbar';
import Deposite1 from './deposite';
import Footer from './footer';
import Withdraw from './withdraw';
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import SignUpForm from './home';
import AllData from './alldata';
import Login from './login';
import CreateAccount from './createaccount';
import UserDetails from './userdetails';
import Contact from './contact';


export default function Banking() {


  const isloggedin= window.localStorage.getItem("loggedin");
  return (
    <>
      <HashRouter>
        
        <Navbar />
        <Routes>
          <Route path='/' element={<SignUpForm />} />
          <Route path='/login' element={isloggedin==="true" ? 
          <UserDetails/> :<Login/>} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/deposit' element={<Deposite1 />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/alldata' element={<AllData />} /> 
          <Route path='/userdetails' element={<UserDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<Navigate to="/" />} /> 
        </Routes>
        {/* <Footer /> */}
      </HashRouter>
    </>
  );
}
