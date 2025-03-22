import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./App.module.css";

const SignUpForm = () => {

  return (
    <>
      <div className={styles.homepage}>
        <div className={styles.marquee}>
          <marquee behavior="scroll" direction="right"><span>BANK </span>OF INDIA</marquee>
        </div>

        <form className={styles.form1}>
          <Link className={styles.link} to="/createaccount">Create Account</Link>
          <Link className={styles.link} to="/login">Login</Link>
        </form>
        <div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
