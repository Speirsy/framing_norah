import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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



const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact/locations" element={<Locations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/form" element={<BlogForm />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;