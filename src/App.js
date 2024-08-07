import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import ErrorPage from "./components/ErrorPage";

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;