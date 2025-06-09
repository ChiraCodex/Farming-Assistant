import { FaEnvelopeOpenText, FaGooglePlay, FaPhone, FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { Link } from "react-router-dom"


function Footer() {
  return (
    <div>
      <footer className="text-sm">
      <div className="flex justify-between w-[96vw] bg-springBeige text-jungleGreen p-4 pt-20 mt-10">
          <div>
          <div className="flex gap-4 items-start">
          <FaPhone/>
          <p>0100 200 300 <br/> 0722 100 300</p>
        </div>
        <div className="flex items-start gap-4 mt-4">
          <FaEnvelopeOpenText/> 
          <p>agritrack@co.ke <br/> info@agritrack.co.ke</p>
        </div>
        </div>

        <div>
          <p className="font-bold">
            Quick Links
          </p>
          <ul>
            <li className="text- hover:underline decoration-2 decoration-someBrown"><Link to={'/weather'}>Weather Forecast</Link></li>
            <li className="text- hover:underline decoration-2 decoration-someBrown"><Link to={'/markets'}>Market Price</Link></li>
            <li className="text- hover:underline decoration-2 decoration-someBrown"><Link to={'/about-us'}>FAQ's</Link></li>
            <li className="text- hover:underline decoration-2 decoration-someBrown"><Link to={'/home'}>Career's</Link></li>
            <li className="text- hover:underline decoration-2 decoration-someBrown"><Link to={'/solutions'}>Download App</Link></li>


          </ul>
        </div>

        <div className="grid gap-2">
          <a className=" hover:text-someBrown " href="/home"><FaWhatsapp/></a>
          <a className=" hover:text-someBrown " href="#"><FaTwitter/></a>
          <a className=" hover:text-someBrown " href="#"><FaTelegram/></a>
          <a className=" hover:text-someBrown " href="#"><FaGooglePlay/></a>
        </div>
      </div>
      </footer>
    </div>
  )
}

export default Footer
