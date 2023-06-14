import { React, useEffect, useState } from 'react'
import './mainContent.css'
import { Data } from '../../fakeData/FakeInfoDest'
import { Room, ContentPaste } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { getImageByTouristSpotID, getListTour, getListTouristSpotTourByTourID } from '../User/Tour/Services/ApiService';

const MainContent = ({ children }) => {
  const [tour, setTour] = useState([]);
  //const [tourImage, setTourImage] = useState([]);
  const [touristSpot, setTouristSpot] = useState([]);
  const [touristSpotImage, setTouristSpotImage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const tourResponse = await getListTour();

        //console.log("tourResponse", tourResponse.data);
        if (tourResponse.status === 200) {
          setTour(tourResponse.data);
          //console.log("tourResponse.data.length", tourResponse.data.length);

          // array 
          const touristSpotImageArray = [];

          for (let index = 0; index < tourResponse.data.length; index++) {
            const touristSpotResponse = await getListTouristSpotTourByTourID(tourResponse.data[index].tour_id);

            console.log("touristSpotResponse", touristSpotResponse);

            if (touristSpotResponse.status === 200) {

              const imageResponse = await getImageByTouristSpotID(touristSpotResponse.data[0].touristSpot_id);

              console.log("imageResponse", imageResponse);

              if (imageResponse.status === 200) {
                touristSpotImageArray[index] = imageResponse.data;
              }
              console.log("touristSpotImageArray", touristSpotImageArray);
            }
          }
          setTouristSpotImage(touristSpotImageArray);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTourData();
  }, []);
  // console.log("Tour", tour);
  console.log("image", touristSpotImage);

  const handleDetailTour = (id) => {
    navigate(`detail/${id}`)
  }

  return (
    <>
      <main>{children}</main>
      <section className='main container section'>
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        <div className="secContent grid">
          {tour.map((item, index) => (
            <div key={index} data-aos="fade-up-right" className='singleDestination'>
              {touristSpotImage[index] && (
                <div className="imageDiv" >
                  <img src={`http://localhost:5158/${touristSpotImage[index][0]}`} alt={item} />
                </div>
              )}

              <div className="cardInfo">
                <h4 className="destTitle">
                  {item.tour_name}
                </h4>
                <span className="continent flex">
                  <Room className="icon" />
                  <span className="name">
                    {item.depature_date.split("T")[0]}
                  </span>
                </span>

                <div className="fees flex">
                  <div className="grade">
                    <span>
                      {item.times} hours
                    </span>
                  </div>
                  <div className="price">
                    <h5>{item.price}</h5>
                  </div>
                </div>

                <div className="description">
                  <p>{item.description}</p>
                </div>

                <button className='btn flex' onClick={() => handleDetailTour(item.tour_id)}>
                  DETAILS <ContentPaste className='icon' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>

  )
}

export default MainContent
