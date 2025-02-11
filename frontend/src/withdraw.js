import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './App.module.css';

export default function Withdraw() {
  const [amounts, setAmounts] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:8000/user-action", { token });
        setUserBalance(response.data.balance);
      } catch (error) {
        setError(`Error fetching balance: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBalance();
    }
  }, [token]);

  const handleTransactions = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Please login");
      setSuccessMessage("");
      return;
    }

    if (!amounts) {
      setError("Please enter the amount.");
      setSuccessMessage("");
      return;
    }

    const amountValue = Number(amounts);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount to withdraw.");
      setSuccessMessage("");
      return;
    }

    if (userBalance === null) {
      setError("Balance is still being fetched.");
      setSuccessMessage("");
      return;
    }

    if (amountValue > userBalance) {
      setError(`Insufficient balance. Your balance is $${userBalance}.`);
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/user-action", { token, amount: amountValue });
      setSuccessMessage(`Successfully withdrew $${amountValue}. Current balance: $${response.data.data}`);
      setUserBalance(response.data.data);
      setError("");
    } catch (error) {
      setError(`Error withdrawing: ${error.message}`);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }

    setAmounts("");
  };

  return (
    <>
      <div className={styles.withdraw}>
        <div className={styles.balance}>
          Current Balance: {loading ? "Fetching balance..." : userBalance !== null ? `$${userBalance}` : "Fetching balance..."}
        </div>
        <input
          className={styles.input}
          type="number"
          value={amounts}
          onChange={(e) => setAmounts(e.target.value)}
          placeholder="Enter amount"
        />
        <button className={styles.btn} type="submit" onClick={handleTransactions} disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
      <div className={styles.success}>
      {error && <p className={styles['error-message']}>{error}</p>}
      {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
      </div>
    </>
  );
}
