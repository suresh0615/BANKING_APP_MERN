import React, { useState} from "react";
import axios from 'axios';
import styles from './App.module.css';  

export default function Deposite1() {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem("token"); 

    const handleTransactions = (e) => {
        e.preventDefault();

        if(!token) {
            alert("please login")
        }
        if (!amount) {
            setError("Please enter the amount.");
            return;
        }

        const amountValue = Number(amount);
        if (amountValue <= 0 || isNaN(amountValue)) {
            setError("Please enter a valid amount.");
            return;
        }

        axios
            .post("http://localhost:8000/deposit", { token, amount })
            .then((res) => {
                if (res.data.status === "ok") {
                    setSuccessMessage(`Successfully deposited $${amountValue}. Current balance: $${res.data.data}`);
                    setError("");
                } else {
                    setError(`Error: ${res.data.data}`);
                }
            })
            .catch((err) => {
                setError(`Error: ${err.message}`);
            });
    };

    return (
        <>
            <div className={styles.withdraw}>
                <input
                    className={styles.input}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button className={styles.btn} type="submit" onClick={handleTransactions}>
                    Deposit
                </button>
            </div>
            <div className={styles.success}>
            {error && <p className={styles['error-message']}>{error}</p>}
            {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
            </div>
        </>
    )
}
