import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import './index.css'
import Navbar from './Navbar.jsx'
import Mainimg from './Mainimg.jsx'
import Footer from './Footer.jsx'
import BookLinks from './BookLinks.jsx'
import DostoevskyProfile from './About.jsx'
import { BrowserRouter as Router, Route, Routes,Link, useLocation, Navigate} from 'react-router-dom'
import Home from './home.jsx'
   function App() {
       const location = useLocation();
     
    //const [count, setCount] = useState(0) 
    return ( <> 
      <Navbar />
        <Routes> 
         <Route path="/Fyodor-Dostoevsky-site-2-/" element={<Home />} />
         <Route path="/books" element={<BookLinks />}  />
         <Route path="/about" element={<DostoevskyProfile />} /> 
        
         </Routes> 
          

<Footer />
       </> 
       
    
  )
   }
export default App
