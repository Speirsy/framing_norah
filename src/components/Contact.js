// component/Contact.js
import React from 'react';
import ContactForm from '../containers/ContactForm';

const Contact = () => {
  return (
    <>
      <div className='centered'>
        <h2>Contact Us</h2>
        <p>For any inquiries, please fill out the form below.</p>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;