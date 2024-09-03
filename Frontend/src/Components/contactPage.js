import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page" style={{width: '100%'}}>
      <div className="contact-container" style={{width: '100%'}}>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Phone:</strong> +123 456 789 101 <br /> +321 101 987 654</p>
          <p><strong>E-mail:</strong> contact@cropeye.com</p>
          <p><strong>Address:</strong> 123 Main Street, San Francisco, CA 94103</p>
          <p><strong>Social:</strong></p>
          <div className="social-icons">
            <img src="/images/social-icon-1.png" alt="Twitter" />
            <h4>Facebook</h4>
            <img src="/images/social-icon-2.png" alt="Instagram" />
            <h4>Instagram</h4>
          </div>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <input type="text" name="firstName" placeholder="First Name" />
            </div>
            <div className="form-group">
              <input type="text" name="lastName" placeholder="Last Name"  />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="E-mail" />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Type your message here..."></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
