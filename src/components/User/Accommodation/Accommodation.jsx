import React, { useEffect, useState } from 'react';
import { getAccommodationImageByID, getListAccommodation } from './Services/ApiService';
import './mainContent.css'
import { Room, ContentPaste } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useSearch } from "../contexts/SearchContext";




function Accommodation() {
    const [accommodation, setAccommodation] = useState([]);
    const [accommodationImage, setAccommodationImages] = useState([]);
    //let arrayImage = [];
    // useEffect(() => {
    //     getListAccommodation()
    //         .then(response => {
    //             //console.log("response", response.data.length);
    //             if (response.status === 200) {
    //                 setAccommodation(response.data);
    //                 for (let index = 0; index <= response.data.length; index++) {
    //                     console.log("accommodation_id", response);
    //                     getAccommodationImageByID(response.data[index].accommodation_id)
    //                         .then(response => {
    //                             console.log(`response ${index}`, response);
    //                             //console.log(`response image ${index}`, response.data[index]);
    //                             //console.log(`image by id ${response.data[index]}`, response.data[index]);
    //                             if (response.status === 200) {


    //                             }
    //                             console.log("image", response);
    //                              setImage([ ...image, response ]);
    //                             // arrayImage.push(response);
    //                             console.log("rrrr", response)
    //                         })
    //                         .catch(error => console.log("error", error));
    //                 }
    //                 //getAccommodationImageByID()
    //             }

    //         })
    //         .catch(error => console.log("error", error));
    // }, [])


    // useEffect(() => {
    //     const fetchAccommodationData = async () => {
    //         try {
    //             const response = await getListAccommodation();
    //             if (response.status === 200) {
    //                 setAccommodation(response.data);
    //                 for (let index = 0; index < response.data.length; index++) {
    //                     const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
    //                     if (imageResponse.status === 200 && imageResponse.data.length > 0) {
    //                         const firstImage = imageResponse.data[0];
    //                         setImage(prevImage => [...prevImage, firstImage]);
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //     };

    //     fetchAccommodationData();
    // }, []);

    useEffect(() => {
        const fetchAccommodationData = async () => {
            try {
                const response = await getListAccommodation();
                if (response.status === 200) {
                    setAccommodation(response.data);
                    const accommodationImages = [];

                    for (let index = 0; index < response.data.length; index++) {
                        console.log("response", response);
                        const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
                        console.log("imageResponse", imageResponse);
                        if (imageResponse.status === 200) {
                            accommodationImages[index] = imageResponse.data;
                        }
                    }

                    setAccommodationImages(accommodationImages);
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchAccommodationData();
    }, []);
    console.log("accommodationImage", accommodationImage);

    //console.log("image after set", arrayImage);
    return (
        <>
            <section className='main container section'>
                <div className="secTitle">
                    <h3 data-aos="fade-right" className="title">
                        Most visited destinations
                    </h3>
                </div>
                <div className="secContent grid">

                    {accommodation.map((item, index) => (
                        <div key={index} data-aos="fade-up-right" className='singleDestination'>
                            {accommodationImage[index] && (
                                <div className="imageDiv">
                                    <img src={`http://localhost:5158/${accommodationImage[index][0]}`} alt={item.accommodation_name} />
                                </div>
                            )}
                            {/* {image[index] && (
                                <div className="imageDiv">
                                    <img src={`http://localhost:5158/${image[index]}`} alt={item.accommodation_name} />
                                </div>
                            )} */}
                            {/* {image.map((item, index) => {
                                <div key={index} className="imageDiv" >
                                    <img src={`http://localhost:5158/${item}`} alt={item} />
                                </div>
                            })} */}
                            {/* {console.log("itemxxx", item)}
                            {
                                image[index].idKS === item.accommodation_id &&  <img src={`http://localhost:5158/${image[index].image[0]}`} alt={item} />
                            } */}
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