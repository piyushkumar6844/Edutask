import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleuser = () => {
    
    navigate('./user');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Edutask</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link active" to="/about">About</Link> */}
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form>
          ) : (
            <form className="d-flex">
            
            {/* <button onClick={handleuser} className="btn btn-primary mx-2" >User</button>, */}
            <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
