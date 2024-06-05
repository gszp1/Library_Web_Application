import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavigationBar from './component/NavigationBar';
import HomePage from './page/homePage/HomePage';
import ContactPage from './page/contactPage/ContactPage';
import ResourcesPage from './page/resourcesPage/ResourcesPage';
import AdminPanelPage from './page/AdminPanelPage/AdminPanelPage';
import AccountPage from './page/AccountPage/AccountPage';
import "./AppStyles.css";

function App() {
  return (
    <Router>
      <div className='appBackground'>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/adminPanel" element={<AdminPanelPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
