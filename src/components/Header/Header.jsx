import {React, useEffect, useState} from 'react'
import './header.css';
import {FlightOutlined, Cancel, Apps} from '@mui/icons-material';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {

  useEffect(() => {
    AOS.init({duration:3000})
},[])

  const [active, setActive] = useState('navBar');

  //handle show navigation toggle navbar
  const showNavigation = () => {
    // Cập nhật lại giá trị active add class navBar + activeNavbar
    setActive('navBar activeNavbar')
  }

  // remove navbar
  const closeNavbar = () => {
    // update class navBar
    setActive('navBar')
  }

  return (
    <section className='navbarSection'>
          <header className='header flex'>
            <div className="logoDiv">
              <a href='' className='logo flex'>
                <h1><FlightOutlined className='icon'/> Karnel Travel </h1>
              </a>
            </div>

            <div className={active}>
              <ul className='navLists flex'>
                <li className='navItem'>
                  <a href=''>Home</a>
                </li>

                <li className='navItem'>
                  <a href=''>Services</a>
                </li>

                <li className='navItem'>
                  <a href=''>Shop</a>
                </li>

                <li className='navItem'>
                  <a href=''>About</a>
                </li>

                <li className='navItem'>
                  <a href=''>Pages</a>
                </li>

                <li className='navItem'>
                  <a href=''>News</a>
                </li>

                <li className='navItem'>
                  <a href=''>Contacts</a>
                </li>
                <button className='btn'>
                  <a href=''>
                  Book Now
                  </a>
                </button>
              </ul>
              <div onClick={closeNavbar} className="closeNavbar">
                <Cancel className='icon'/>
              </div>
            </div>
            <div onClick={showNavigation} className="toggleNavbar">
                <Apps className='icon'/>
            </div>
          </header>
    </section>
  )
}

export default Header
