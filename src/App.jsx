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
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'

   function App() {
    //const [count, setCount] = useState(0) 
    return ( <> <h1 className="flex justify-center items-center">
       Welcome to the Fyodor Dostoevsky Fansite!</h1> 
       <Navbar /> <Routes> <Route path="/books" element={<BookLinks />} /> <Route path="/about" element={<DostoevskyProfile />} /> </Routes> <Mainimg /> <Footer /> </> 
       
    
  )
   }
export default App
