import { useState } from "react";
import axios from "axios";

function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [usertype, setUsertype] = useState('');
    const [secretkey, setSecretkey] = useState("");

    const styles = {
        app: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
        },
        loginForm: {
            width: '300px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f0f0f0',  // Add your desired background color here
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
        },
        inputContainer: {
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '3px',
        },
        select: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '3px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            background: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
        },
        successMessage: {
            textAlign: 'center',
            color: 'green',
        },
        radioContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
        },
        radio: {
            marginLeft: '10px',
        }
    };

    async function create(e) {
        e.preventDefault();

        // if (usertype === "Admin" && secretkey !== "Secretkeys") {
        //     alert("Invalid Admin secret key");
        //     return;
        // }

        if (!usertype) {
            alert("Select user type");
            return;
        }

        if (name === "") {
            alert("Please enter name");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        if (!phone || phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        if (!age || age.length > 2) {
            alert('Please enter a valid age (less than 100)');
            return;
        }

        if (!gender) {
            alert('Please select gender');
            return;
        }

        if (!password || password.length < 8) {
            alert('Please enter an 8-digit password');
            return;
        }

        try {
            const response = await axios.post("https://banking-backend-k0h9.onrender.com/createaccount", { 
                name, email, phone, age, gender, password, usertype, secretkey 
            });
            console.log(response.data);
            alert("Account created successfully");
            setShow(false);
        } catch (error) {
            alert("Error while creating account: " + (error.response?.data?.error || error.message));
        }

        console.log('Create Account Consoles end');
    }

    function reset() {
        setName('');
        setEmail('');
        setPhone('');
        setAge('');
        setGender('');
        setPassword('');
        setSecretkey('');
        setShow(true);
    }

    const Logout = () => {
        window.localStorage.clear();
    }

    return (
        <div style={styles.app}>
            <div style={styles.loginForm}>
                <div style={styles.title}>Create Account</div>
                <div>
                    {show ? (
                        <form onSubmit={create}>
                            <div style={styles.radioContainer}>
                                Register as
                                <label style={styles.radio}>
                                    <input type="radio" name="Usertype" value='User' onChange={(e) => setUsertype(e.target.value)} /> User
                                </label>
                                <label style={styles.radio}>
                                    <input type="radio" name="Usertype" value='Admin' onChange={(e) => setUsertype(e.target.value)} /> Admin
                                </label>
                            </div>
                            {usertype === "Admin" && (
                                <div style={styles.inputContainer}>
                                    <label style={styles.label}>Secretkey: </label>
                                    <input type="text" placeholder="Secretkey" value={secretkey} onChange={(e) => setSecretkey(e.target.value)} style={styles.input} />
                                </div>
                            )}
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Name: </label>
                                <input type="text" name="uname" value={name} onChange={e => setName(e.target.value)} style={styles.input} required />
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Email: </label>
                                <input type="text" name="uname" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} required />
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Phone: </label>
                                <input type="text" name="uname" value={phone} onChange={e => setPhone(e.target.value)} style={styles.input} required />
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Age: </label>
                                <input type="number" name="uname" value={age} onChange={e => setAge(e.target.value)} style={styles.input} required />
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Gender: </label>
                                <select id="Size" name="Size" value={gender} onChange={e => setGender(e.target.value)} style={styles.select} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Password: </label>
                                <input type="password" name="pass" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} required />
                            </div>
                            <div style={styles.buttonContainer}>
                                <button type="submit" style={styles.button}>Create Account</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h4 style={styles.successMessage}>Successfully created</h4>
                            <div style={styles.buttonContainer}>
                                <button onClick={reset} style={styles.button}>Create another Account</button>
                                <button onClick={Logout} style={styles.button}>Logout</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
