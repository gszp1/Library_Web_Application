import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './component/NavigationBar';
import HomePage from './page/homePage/HomePage';
import ContactPage from './page/contactPage/ContactPage';
import ResourcesPage from './page/resourcesPage/ResourcesPage';
import AdminPanelPage from './page/AdminPanelPage/AdminPanelPage';
import AccountPage from './page/AccountPage/AccountPage';
import ResourcePage from './page/resourcesPage/ResourcePage';
import "./AppStyles.css";
import RegistrationPage from './page/RegistrationPage/RegistrationPage';
import LoginWindow from './component/LoginWindow';

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loginWindowOpened, setLoginWindowOpened] = useState(false);
  const loginWindowRef = useRef(null);
  const location = useLocation();

  const openLoginWindow = () => setLoginWindowOpened(true);
  const closeLoginWindow = () => setLoginWindowOpened(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginWindowRef.current && !loginWindowRef.current.contains(event.target)) {
        closeLoginWindow();
      }
    };

    if (loginWindowOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loginWindowOpened]);

  useEffect(() => {
  }, [location]);

  return (
    <>
      <div className='appBackground'>
        <NavigationBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          openLoginWindow={openLoginWindow}
        />
        <Routes>
          <Route path="/" element={<ResourcesPage searchKeyword={searchKeyword}/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage searchKeyword={searchKeyword}/>} />
          <Route path="/resources/:resourceId" element={<ResourcePage />} />
          <Route path="/register" element={<RegistrationPage/>} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/adminPanel" element={<AdminPanelPage />} />
        </Routes>
      </div>
      {loginWindowOpened && <LoginWindow ref={loginWindowRef} closeLoginWindow={closeLoginWindow} />}
    </>
  );
}

function AppRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppRouter;