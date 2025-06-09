import Logo from "./navbar/Logo"
import Nav from "./navbar/Nav"

function Navbar() {
  return (
    <div className="flex justify-between items-center mx-4 my-4">
      <Logo/>
      <Nav/>
    </div>
  )
}

export default Navbar
