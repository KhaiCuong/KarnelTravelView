import {React, useEffect} from 'react'
import './footer.css'
import SeaVideo from '../../assets/sea.mp4'
import { NearMeOutlined, FlightOutlined, Twitter, YouTube,
    Facebook, Instagram, CardTravel, KeyboardArrowRight
} from '@mui/icons-material'

import AOS from 'aos';
import 'aos/dist/aos.css';


const Footer = () => {
  
  useEffect(() => {
    AOS.init({duration:3000})
},[])
  return (
    <section className='footer'>
        <div className="videoDiv">
          <video src={SeaVideo} autoPlay muted loop type="video/mp4"></video>
        </div>

        <div className="secContent container">
          <div className="contactDiv flex">
            <div data-aos="fade-right" className="text">
              <small>KEEP IN TOUCH</small>
              <h2>Travel with us</h2>
            </div>

            <div data-aos="fade-right" className="inputDiv flex">
              <input type="text" placeholder='Enter Email Address'/>
              <button className='btn flex' type='submit'>
                Send <NearMeOutlined className='icon'/>
              </button>
            </div>
          </div>
          <div className="footerCard flex">
            <div className="footerIntro flex">
              <div className="logoDiv">
                <a href="" className='logo flex'>
                  <FlightOutlined className='icon'/>Travel</a>
              </div>

              <div data-aos="fade-right" className="footerParagraph">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
              </div>
              <div data-aos="fade-up-right" className="footerSocials">
                <Twitter className='icon'/>
                <YouTube className='icon'/>
                <Facebook className='icon'/>
                <Instagram className='icon'/>
                <CardTravel className='icon'/>
              </div>
            </div>

          <div data-aos="zoom-in-up" data-aos-duration="5000" className="footerLink grid">
              
            {/* Group title 1 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  Our Agency
                </span>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Services
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Insurance
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Agency
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Tourism
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Payment
                </li>
              </div>

            {/* Group title 2 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  Partners
                </span>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Bookings
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Rentcars
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  HotelWorld
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Trivago
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Payment
                </li>
              </div>

              {/* Group title 3 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  Last Minute
                </span>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Da Nang
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Ha Noi
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Seoul
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Hoi An
                </li>

                <li className="footerList flex">
                  <KeyboardArrowRight className='icon'/>
                  Busan
                </li>
              </div>
          </div>
          

            <div className="footerDiv flex">
              <small>CopyRights &hearts; Group 2</small>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Footer
