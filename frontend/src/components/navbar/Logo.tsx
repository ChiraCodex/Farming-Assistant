import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo2.png'
function logo() {
  return (
    <div className='uppercase text-2xl font-black font-chitos text-springBeige w-40 cursor-pointer hover:text-neonGreen'>
      <Link to={'/'}><img src={Logo} alt="" /></Link>
      <Link to={'/'}>AgriTrack</Link>
    </div>
  )
}

export default logo
