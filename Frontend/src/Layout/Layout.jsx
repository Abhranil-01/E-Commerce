import React, { Suspense } from 'react'
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
    <Suspense fallback='Loading...'>
    <Outlet/>
    </Suspense>
     
      <ShowHide>
      <Footer/>
      </ShowHide>
    </>
  )
}

export default Layout
