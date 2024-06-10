import React from 'react';
import { Link } from 'react-router-dom';
import "./ComponentStyles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFolder, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function NavigationBar({searchKeyword, setSearchKeyword, openLoginWindow}) {
  return (
    <nav className='navigationBar'>
      <div className="appLogo">
        <Link to="/">
            <FontAwesomeIcon icon={faBook} className='appLogoIcon'/>
            {" WebLibrary"}
        </Link>
      </div>
      <div className='searchBar'>
        <input
          type="text"
          value={searchKeyword}
          placeholder="Search..."
          onChange={e => setSearchKeyword(e.target.value)}
        />
      </div>
      <ul className='pageLinks'>
        <li>
          <Link to="/resources">
            <FontAwesomeIcon icon={faFolder} className='icon'/>
              {" Resources"}
          </Link>
        </li>
        <li>
          {localStorage.getItem('WebLibToken') !== null ? (
            <Link to="/account">
              <FontAwesomeIcon icon={faUser} className='icon'/>
              {" Account"}
            </Link>
          ) : (
            <p onClick={openLoginWindow}>
              <FontAwesomeIcon icon={faUser} className='icon'/>
              {" Login"}
            </p>
          )}
        </li>
        <li>
          <Link to="/contact">
            <FontAwesomeIcon icon={faEnvelope} className='icon'/>
            {" Contact"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
