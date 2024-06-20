import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ShowHide from '../Show and Hide/ShowHide'
import ScrollToTop from '../ScrollToTop/ScrfollToTop'
function Layout() {
  return (
    <>
    <ScrollToTop/>
    <ShowHide>
    <Navbar/>
    </ShowHide>
      <Outlet/>
      <ShowHide>
      <Footer/>
      </ShowHide>
    </>
  )
}

export default Layout
