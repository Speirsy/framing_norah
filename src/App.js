import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Auth listener
import { auth } from './firebase'; // Import your Firebase config
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import ErrorPage from "./components/ErrorPage";
import Locations from "./components/Locations";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogDetails from "./components/BlogDetails";
import LoginForm from "./components/LoginForm"; // Add a login form for you to log in

const App = () => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if logged in
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact/locations" element={<Locations />} />
        
        {/* Public blog list */}
        <Route path="/blog" element={<Blog />} />

        {/* Show BlogForm only if the user is authenticated */}
        {user ? (
          <Route path="/blog/form" element={<BlogForm />} />
        ) : (
          <Route path="/blog/form" element={<LoginForm />} /> // Show login form if not authenticated
        )}

        {/* Blog details page for everyone */}
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* Error page for unmatched routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
