import React from 'react';
import { Link } from 'react-router-dom';
import "./ComponentStyles.css"

const NavigationBar = () => {
  return (
    <nav className='navigationBar'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
