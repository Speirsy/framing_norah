import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';
import emailjs from 'emailjs-com';
jest.mock('emailjs-com', () => ({ send: jest.fn().mockResolvedValue({}) }));
test('enquiry still submits the existing EmailJS fields and shows confirmation', async () => {
  emailjs.send.mockResolvedValue({});
  render(<ContactForm />);
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Customer' } });
  fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.test' } });
  fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: '01234567890' } });
  fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test enquiry' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(await screen.findByText('Thank you for your submission')).toBeInTheDocument();
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(emailjs.send.mock.calls[0][2]).toEqual({ from_name: 'Test Customer', from_email: 'test@example.test', reply_to: 'test@example.test', phone: '01234567890', message: 'Test enquiry' });
});
