import React, {useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {FiMoon, FiSun} from "react-icons/fi";
import {MDBBtn} from "mdb-react-ui-kit";
import {appVer} from "../../info";

export default function BtnThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkTheme') !== 'false';
  });

  useEffect(() => {
    //監聽darkMode值是否有變化，有則儲存進localStorage
    localStorage.setItem('darkTheme', JSON.stringify(darkMode));
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-mdb-theme',
      darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-mdb-theme',
      darkMode ? 'dark' : 'light');
  };

  return (
    <a href='#' className='nav-link text-secondary' onClick={toggleTheme}>
      切換主題
    </a>
  )
}