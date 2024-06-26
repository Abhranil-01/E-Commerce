import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShowHide({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/addtocart' || location.pathname === '/checkout') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div>
      {showNavbar && children}
    </div>
  );
}

export default ShowHide;
