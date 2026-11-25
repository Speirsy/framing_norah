// containers/ContactForm.js

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';
import PhoneLinks from '../components/PhoneLinks';
import { trackEvent } from '../utils/analytics';

const LOCATIONS = [
    'Glasgow - West',
    'Glasgow - South',
    'Glasgow - East',
    'Glasgow - Central',
    'Edinburgh',
    'Other',
];

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    // Honeypot: hidden from people, but spam bots fill in every field they find.
    const [website, setWebsite] = useState('');
    const [otherLocation, setOtherLocation] = useState('');
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
        if (!location) {
            errors.location = 'Please choose a location';
        } else if (location === 'Other' && !otherLocation.trim()) {
            errors.location = 'Please tell us where you are';
        }
        if (name.length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }

        if (website) {
            // Bot filled the hidden field: show the normal thank-you but send nothing.
            setSubmitted(true);
            return;
        }

        if (Object.keys(errors).length === 0) {
            // No errors, proceed with submission
            sendEmail();
        } else {
            // Errors found, update state to display error messages
            setErrors(errors);
        }
    };

    const locationText = location === 'Other' ? `Other - ${otherLocation.trim()}` : location;

    const sendEmail = () => {
        // Use your EmailJS Service ID, Template ID, and User ID
        emailjs.send('contact_service', 'contact_form', {
            from_name: name,
            from_email: email,
            reply_to: email,
            phone: phone,
            location: locationText,
            // Location is also put at the top of the message so it shows in the
            // email even if the EmailJS template has no {{location}} variable.
            message: `Location: ${locationText}\n\n${description}`
        }, '3nIfM1I_TSBAb6CzH')
            .then((response) => {
                // console.log('Email sent successfully:', response);
                trackEvent('generate_lead', { method: 'contact_form' });
                setSubmitted(true);
            })
            .catch((error) => {
                // console.error('Error sending email:', error);
                alert('Failed to submit form. Please try again later.');
            });
    };
    

    return (

        <div className='contact-form'>
            <p>Please tell us as much as you can about the work you would like us to do.</p>
             <p>It will help us to help you, and give you a more accurate estimate.</p>

              <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
               Alternatively, you can call or WhatsApp on <PhoneLinks />
             </p>

    <p>Click here for suggestions.-</p>
           <button onClick={() => setShowIdeas(!showIdeas)}>
    {showIdeas ? 'Hide suggestions' : 'Show suggestions'}
</button>
            {showIdeas && (
                <ul>
                    <li>What type of work you would like done?</li>
                    <li>How many frames you would like hung?</li>
                    <li>What are their approximate size and weight?</li>
                    <li>What are your walls made of - Dry Wall? Lath and Plaster? Brick?</li>
                    <li>Do you need the artwork adjusted in an existing frame?</li>
                    <li>Does your artwork need a re-mounted?</li>
                    <li>Does your frame need new glass? If so, approximately what size?</li>
                    <li>These are just a few scenarios that we can help with.</li>
                    <li>Feel free to tell us about the jobs you need done,in </li>
                    <li>great detail, in the job description box below.</li>
                    <li>We will assess and get back to you as soon as possible</li>

                </ul>
            )}
            {submitted ? (
                <div>
                    <h1>Thank you for your submission</h1>
                    <p>Here are the details you submitted:</p>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                    <p>Location: {locationText}</p>
                    <p>Description: {description}</p>
                    <p>We will be in touch with an estimate very soon. </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="contact-form__hp" aria-hidden="true">
                        <label>
                            Website
                            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </label>
                    </div>
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
                            Location:
                            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                                <option value="">Please choose…</option>
                                {LOCATIONS.map((loc) => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                            {errors.location && <span className="error">{errors.location}</span>}
                        </label>
                    </div>
                    {location === 'Other' && (
                        <div>
                            <label>
                                Where are you?
                                <input type="text" value={otherLocation} onChange={(e) => setOtherLocation(e.target.value)} placeholder="e.g. Paisley, Stirling, Perth" />
                            </label>
                        </div>
                    )}
                    <div>
                        <label>
                            Description:
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                        {Object.keys(errors).length > 0 && (
                            <p className="contact-form__summary" role="alert">
                                <strong>Not sent yet.</strong> {Object.values(errors).join('. ')}.
                            </p>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}

export default ContactForm;