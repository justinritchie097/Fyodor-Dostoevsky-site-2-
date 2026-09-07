import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import './index.css'
import Navbar from './Navbar.jsx'
import Mainimg from './Mainimg.jsx'
import Footer from './Footer.jsx'
function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="flex justify-center items-center"> Welcome to the Fyodor Dostoevsky Fansite!</h1>
    <Navbar />

      <Mainimg />
      <Footer />
    </>
  )
}

export default App
