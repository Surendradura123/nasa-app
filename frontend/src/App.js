import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mars from './pages/Mars';
import Epic from './pages/Epic';
import Neo from './pages/Neo';
import Library from './pages/Library';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/epic" element={<Epic />} />
        <Route path="/neo" element={<Neo />} />
        <Route path="/library" element={<Library />} />
       
      </Routes>
    </Router>
  );
}

export default App;
