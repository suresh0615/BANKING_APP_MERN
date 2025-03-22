
import React from 'react';
import "./contact.css";

const Contact = () => {
  return (
    <div id="contact">
      <h1 className="sub-title">Contact<span>Me</span></h1>
      <div className="contain">
        <div className="row">
          <div className="contact-right">
            <h4 className="sub-title2">Any<span>Feedback</span></h4>
            <form name="submit-to-google-sheet">
              <input type="text" name="Name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
              <button type="submit" className="button">Submit</button>
            </form>
            <span id="msg"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
