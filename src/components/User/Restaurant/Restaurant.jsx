import React, { useEffect, useState } from 'react';

import './mainContent.css'
import { Room, ContentPaste } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getListRestaurantforUser, getRestaurantImageByID, getRestaurantImageByIDforUser } from '../Service/ApiService';

function Restaurant() {
    const [restaurant, setRestaurant] = useState([]);
    const [image, setImage] = useState([]);


    useEffect(() => {
        getListRestaurantforUser()
            .then(response => {
                // console.log("response", response.data.length);
                if (response.status === 200) {
                    setRestaurant(response.data);
                    for (let index = 0; index <= response.data.length; index++) {
                        // console.log("restaurant_id", response);
                        getRestaurantImageByIDforUser(response.data[index].restaurant_id)
                            .then(response => {
                                // console.log("image by id", response);
                                if (response.status === 200) {
                                    setImage(response.data);
                                }
                            })
                            .catch(error => console.log("error", error));
                    }
                    //getRestaurantImageByID()
                }

            })
            .catch(error => console.log("error", error));
    }, [])


    console.log(image);

    return (
        <>
            <section className='main container section'>
                <div className="secTitle">
                    <h3 data-aos="fade-right" className="title">
                        Most visited restaurant
                    </h3>
                </div>
                <div className="secContent grid">
                    

                    {restaurant.map((item, index) => (
                        <div key={index} data-aos="fade-up-right" className='singleDestination'>
                            {image.map((itemxx, index) => {
                                console.log(itemxx)
                                 return(<div className="imageDiv">
                                        <img src={`http://localhost:5158/${itemxx}`} alt={image} />
                                       
                                </div>)
                            })}

                            <div className="cardInfo">
                                <h4 className="destTitle"> 
                                    {item.restaurant_name}
                                </h4>
                                <span className="continent flex">
                                    <Room className="icon" />
                                    <span className="name">
                                        {item.location_id}
                                    </span>
                                </span>

                                <div className="fees flex">
                                    <div className="grade">
                                       
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

export default Restaurant;