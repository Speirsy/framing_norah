// component/Contact.js
import React from 'react';
import ContactForm from '../containers/ContactForm';

const Contact = () => {
  return (
    <>
      <div className= 'centered'>
        <h2>Contact Us</h2>
        <p>For any inquiries, please fill out the form below.</p>
        <ContactForm />
        <h3>Alternatively you can call us on 07989226593</h3>
        <h3>or email us at john@framingnorah.com</h3>
      </div>
    </>
  );
};

export default Contact;