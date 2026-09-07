 import BookLinks from './BookLinks.jsx'
 
 import { BrowserRouter,Link } from 'react-router-dom'
 function Navbar() {


return (
    <>
    <div className="flex justify-around ">
       
<Link to="/books">
  <nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
    Books
  </nav>
</Link>


<Link to="/about">
  <nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
    About
  </nav>
</Link>
<a href="https://www.youtube.com/watch?v=ckzmEoIhqJs" target="_blank" rel="noopener noreferrer">
  <nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
    
       Documentary
    
</nav>
</a>
</div>
</>
)
}
export default Navbar