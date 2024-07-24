import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import HomeworkState from './context/HomeworkState';

function App() {
  return (
    
    <HomeworkState>
      <Router>
        <Navbar/>
        <Routes>
        
          
          <Route exact path="/home" element={<Home />} />
          
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
         
        </Routes>
      </Router>
    </HomeworkState>
  );
}

export default App;
