import React, { useEffect, useState } from 'react';
import { getAccommodationImageByID, getListAccommodation } from './Services/ApiService';
import './mainContent.css'
import { Room, ContentPaste } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Accommodation() {
    const [accommodation, setAccommodation] = useState([]);
    const [image, setImage] = useState([]);


    useEffect(() => {
        getListAccommodation()
            .then(response => {
                console.log("response", response.data.length);
                if (response.status === 200) {
                    setAccommodation(response.data);
                    for (let index = 0; index <= response.data.length; index++) {
                        console.log("accommodation_id", response);
                        getAccommodationImageByID(response.data[index].accommodation_id)
                            .then(response => {
                                console.log("image by id", response.data[0]);
                                if (response.data === 200) {
                                    setImage(response.data[0]);
                                }
                            })
                            .catch(error => console.log("error", error));
                    }
                    //getAccommodationImageByID()
                }

            })
            .catch(error => console.log("error", error));
    }, [])
    return (
        <>
            <section className='main container section'>
                <div className="secTitle">
                    <h3 data-aos="fade-right" className="title">
                        Most visited destinations
                    </h3>
                </div>
                <div className="secContent grid">
                    <img src={`http://localhost:5158/${image}`} alt={image} />

                    {accommodation.map((item, index) => (
                        <div key={index} data-aos="fade-up-right" className='singleDestination'>
                            {image.map((item, index) => {
                                <div div className="imageDiv" >
                                    <img src={`http://localhost:5158/${image}`} alt={item} />
                                </div>
                            })}

                            <div className="cardInfo">
                                <h4 className="destTitle"> 
                                    {item.accommodation_name}
                                </h4>
                                <span className="continent flex">
                                    <Room className="icon" />
                                    <span className="name">
                                        {item.location_id}
                                    </span>
                                </span>

                                <div className="fees flex">
                                    <div className="grade">
                                        <span>
                                            {item.type === true ? "Resort" : "Hotel"}
                                            {/* <small> +1</small> */}
                                        </span>
                                    </div>
                                    <div className="price">
                                        <h5>{item.price}</h5>
                                    </div>
                                </div>

                                <div className="description">
                                    <p>{item.description}</p>
                                </div>

                                <button className='btn flex'>
                                    DETAILS <ContentPaste className='icon' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
        </>
    );
}

export default Accommodation;