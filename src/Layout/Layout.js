import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
function Layout({children}) {
  return (
    <>
      <div className=" flex justify-center bg-fixed text-white"> 
          
          {children}
          
      </div>
    </>
  )
}

export default Layout