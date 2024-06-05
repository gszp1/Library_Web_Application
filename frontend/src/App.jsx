import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HomePage from './HomePage';
import ContactPage from './ContactPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
