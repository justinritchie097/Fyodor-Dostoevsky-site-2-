import { useState } from 'react';

import './App.css';
import './index.css';
import Navbar from './Navbar.jsx';
import Mainimg from './Mainimg.jsx';
import Footer from './Footer.jsx';
import BookLinks from './BookLinks.jsx';
import DostoevskyProfile from './About.jsx';

import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Home from './home.jsx';
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/books" element={<BookLinks />} />

        <Route path="/about" element={<DostoevskyProfile />} />
      </Routes>
      <Home />
      <Footer />
    </>
  );
}
export default App;
