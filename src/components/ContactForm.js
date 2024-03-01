import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form validation here

    // Display the submitted details
    setSubmitted(true);
  };

  return (

    <div>
        <p>Please tells us as much as you can about the work you would like done.</p>
        <p>It will help us to give you a more accurate estimate.</p>
        <p>Things we are interested to hear about -</p>
        <ul>
            <li>How many items you would like hung or re-framed?</li>
            <li>What type of wall they are to be hung on?</li>
            <li>What type of frames you have</li>
            <li>What type of pictures you have</li>
            <li>What type of fixings you have</li>
            <li>What type of fixings you would like</li>
            <li>What type of wall you have</li>
            <li>What type of property you have</li> 
        </ul>
    
      {submitted ? (
        <div>

          <h1>Thank you for your submission</h1>
            <p>Here are the details you submitted:</p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Description: {description}</p>
          <p>We will be in touch with an estimate very soon. </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
