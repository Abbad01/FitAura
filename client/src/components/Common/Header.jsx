import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'


const Header = () => {
  return (
    <div>
         {/* top bar
         nav bar 
         cart drawer */}
         <Topbar/>
         <Navbar/>
    </div>
  )
}

export default Header