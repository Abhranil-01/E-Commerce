import React, { Suspense } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ShowHide from "../Show and Hide/ShowHide";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import AutoSlider from "../Components/AutoSlider/AutoSlider";

function Layout() {
  const location = useLocation();
  const showSlider = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <ShowHide>
        <Navbar />
      </ShowHide>
      {showSlider && <AutoSlider />}
      <Suspense>
        <Outlet />
      </Suspense>
      <ShowHide>
        <Footer />
      </ShowHide>
    </>
  );
}

export default Layout;
