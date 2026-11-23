import React from 'react';
import { trackEvent } from '../utils/analytics';

// One place for the phone number, so it's tappable everywhere it appears.
export const PHONE_DISPLAY = '07989 226593';
const PHONE_TEL = 'tel:+447989226593';
// Pre-filled opening line for WhatsApp. Kept short and general so it suits
// every page; the WhatsApp Business greeting message asks for job details.
const WHATSAPP_GREETING = "Hi, I'm interested in picture hanging or one of your other services.";
const WHATSAPP_URL = `https://wa.me/447989226593?text=${encodeURIComponent(WHATSAPP_GREETING)}`;

function PhoneLinks({ className }) {
  return (
    <span className={className}>
      <a href={PHONE_TEL} onClick={() => trackEvent('contact_click', { method: 'phone' })}>
        {PHONE_DISPLAY}
      </a>
      {' · '}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('contact_click', { method: 'whatsapp' })}
      >
        WhatsApp
      </a>
    </span>
  );
}

export default PhoneLinks;
