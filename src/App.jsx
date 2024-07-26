import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import DetailPage from './DetailPage.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './layout/v_navbar.jsx';
import Footer from './layout/v_footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div className="app-container">
        <CustomNavbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
);
