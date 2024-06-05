import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavigationBar from './component/NavigationBar';
import HomePage from './page/homePage/HomePage';
import ContactPage from './page/contactPage/ContactPage';
import ResourcesPage from './page/resourcesPage/ResourcesPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
