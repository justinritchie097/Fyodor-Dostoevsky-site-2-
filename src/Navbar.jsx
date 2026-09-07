 import BookLinks from './BookLinks.jsx'
 function Navbar() {


return (
    <div className="flex justify-around ">
        
<a href="https://www.barnesandnoble.com/search?q=fyodor%20dostoevsky"><nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
Books
  
  
</nav>
</a>
<a href="https://www.britannica.com/biography/Fyodor-Dostoyevsky/Early-works"><nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
    
        About
</nav></a>
<a href="https://www.youtube.com/watch?v=ckzmEoIhqJs"><nav className="border-double border-4 border-light-blue-500 p-8 font-extrabold bg-blue-500 rounded-full py-3 px-6">
    
        Biography
    
</nav></a>
</div>
)

}
export default Navbar