import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './login.css';
import axios from "axios";
// import UserDetails from "./userdetails";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            const response = await axios.post("https://banking-app-mern.onrender.com/login", { email, password });
            console.log("Response received:", response);
            if (response.data.status === "ok") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("loggedin", true);
                alert("Login Successful");
                // window.location.href = "./userdetails";
                navigate("/userdetails");
            } else {
                console.log(response.data.error);
                alert("Login failed: " + response.data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed");
        }
    }

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Login</div>
                <div className="form">
                    <form onSubmit={Submit}>
                        <div className="input-container">
                            <label>User Email: </label>
                            <input type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-container">
                            <label>Password: </label>
                            <input type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
