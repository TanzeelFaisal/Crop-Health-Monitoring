import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <h3>Contact Us</h3>
      <p>Email: example@example.com</p>
      <p>Phone: 123-456-7890</p>
      {/* Add any other contact information or links */}
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#f4f4f4',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
};

export default Footer;
