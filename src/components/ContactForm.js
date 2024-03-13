import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showIdeas, setShowIdeas] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        

        // Form validation
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!/^\d+$/.test(phone)) {
            errors.phone = 'Phone must be numeric';
        }
        if (name.length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }

        if (Object.keys(errors).length === 0) {
            // No errors, proceed with submission
            sendEmail();
        } else {
            // Errors found, update state to display error messages
            setErrors(errors);
        }
    };

    const sendEmail = () => {
        // Use your EmailJS Service ID, Template ID, and User ID
        emailjs.send('contact_service', 'contact_form', {
            from_name: name,
            from_email: email,
            phone: phone,
            message: description
        }, '3nIfM1I_TSBAb6CzH')
            .then((response) => {
                console.log('Email sent successfully:', response);
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('Failed to submit form. Please try again later.');
            });
    };
    

    return (
        <div>
            <p>Please tell us as much as you can about the work you would like done.</p>
            <p>It will help us to give you a more accurate estimate.</p>
            <p>Things we are interested to hear about -</p>
            <button onClick={() => setShowIdeas(!showIdeas)}>
                {showIdeas ? 'Hide' : 'Reveal'} ideas
            </button>
            {showIdeas && (
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
            )}
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
                    <div>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </label>
                    </div>
                    <div>
                        <label>
                            Phone:
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <span className="error">{errors.phone}</span>}
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ContactForm;