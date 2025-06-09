import { useState } from "react";
import { FaHamburger, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"


function Nav() {
   const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  
  return (
    <>
    <div className="hidden md:flex">
      <ul className='flex items-center ml-8 gap-8 font-semibold'>
        <li className="hover:bg-springBeige hover:text-jungleGreen rounded-xl px-1 cursor-pointer active:bg-springBeige active:text-jungleGreen">
          <Link to={'/about-us'}>Who we Are</Link>
        </li>
        <li className="hover:bg-springBeige hover:text-jungleGreen rounded-xl px-1 cursor-pointer"><Link to={'/solutions'}>What we Do</Link></li>
        <li className="hover:bg-springBeige hover:text-jungleGreen rounded-xl px-1 cursor-pointer"><Link to={'/sign-up'}>Get Started</Link></li>
      </ul>
    </div>
        
            
            <div className="md:hidden flex flex-col justify-end absolute right-2 mr-6 top-20 z-100 ">
              <button onClick={handleClick}>
                {click ? <div className="text-2xl relative -right-40">
                  <FaTimes />
                </div> : <div className="text-2xl relative right-8">
                  <FaHamburger />
                </div> }
                {click && (
            <div
              className=" md:hidden bg-jungleGreen/50 backdrop-blur rounded-xl border-4 right-0 z-10 w-40 m-6 top-20 flex flex-col py-4 justify-center items-center  "
            >
                <ul className='grid items-center ml-8 gap-8 font-semibold'>
        <li className="hover:bg-springBeige hover:text-jungleGreen  px-1 cursor-pointer active:bg-springBeige active:text-jungleGreen">
          <Link to={'/about-us'}>Who we Are</Link>
        </li>
        <li className="hover:bg-springBeige hover:text-jungleGreen  px-1 cursor-pointer"><Link to={'/solutions'}>What we Do</Link></li>
        <li className="hover:bg-springBeige hover:text-jungleGreen  px-1 cursor-pointer"><Link to={'/sign-up'}>Get Started</Link></li>
      </ul>
            </div>
          )}
              </button>
            </div>
            
            
</>
  )
}

export default Nav
