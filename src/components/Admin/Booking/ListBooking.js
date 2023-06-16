import React, { useEffect } from 'react';
import { getListBookings, getTour, getTouristSpot, getUser } from './Services/ApiServices';
import { useState } from 'react';
import { getAccommodation, getBookingByBookingId, getRestaurant, getTransport } from '../../User/Contact/Services/ApiService';

function ListBooking(props) {
    const [booking, setBooking] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [user, setUser] = useState([]);
    const [type, setType] = useState([]);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const bookingResponse = await getListBookings();
                setBookingList(bookingResponse.data);

                let book = [];
                let userl = [];
                let typee = [];
                for (let index = 0; index < bookingResponse.data.length; index++) {
                    const bkId = await getBookingByBookingId(bookingResponse.data[index].booking_id);
                    if (bkId.status === 200) {
                        if (bkId.data.accommodation_id != null) {
                            const Accres = await getAccommodation(bkId.data.accommodation_id);
                            if (Accres.status === 200) {
                                book[index] = {
                                    name: Accres.data.accommodation_name,
                                    price: Accres.data.price,
                                }
                                typee[index] = "Accommodation"
                            }
                        }
                        if (bkId.data.restaurant_id != null) {
                            const Resres = await getRestaurant(bkId.data.restaurant_id);
                            if (Resres.status === 200) {
                                book[index] = {
                                    name: Resres.data.restaurant_name,
                                    price: Resres.data.price,
                                }
                                typee[index] = "Restaurant"

                            }
                        }
                        if (bkId.data.transport_id != null) {
                            const ResTrans = await getTransport(bkId.data.transport_id);
                            if (ResTrans.status === 200) {
                                book[index] = {
                                    name: ResTrans.data.transport_name,
                                    price: ResTrans.data.price,
                                }
                                typee[index] = "Transport"

                            }
                        }
                        if (bkId.data.touristSpot_id != null) {
                            const ResSpot = await getTouristSpot(bkId.data.touristSpot_id);
                            if (ResSpot.status === 200) {
                                book[index] = {
                                    name: ResSpot.data.touristSpot_name,
                                    price: ResSpot.data.price,
                                }
                                typee[index] = "tourist Spot"

                            }
                        }
                        if (bkId.data.tour_id != null) {
                            const ResTour = await getTour(bkId.data.tour_id);
                            if (ResTour.status === 200) {
                                book[index] = {
                                    name: ResTour.data.touristSpot_name,
                                    price: ResTour.data.price,
                                }
                                typee[index] = "Tour";
                            }
                        }

                        const resUser = await getUser(bkId.data.user_id);
                        if (resUser.status === 200) {
                            userl[index] = resUser.data.user_name;
                        }
                    }

                }
                setBooking(book);
                setUser(userl);
                setType(typee);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchBookingData();
    }, []);
    return (
        <div>
            <section>
                <h2 className="text-center font-weight-bold">List of Booking</h2>
                <div className="container-fluid">
                    <table className="table mt-3 mb-3">
                        <thead className="thead background-primary text-white">
                            <tr>
                                <th scope="col">Booking ID</th>
                                <th scope="col">User</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Service Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Service Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-dark">
                            {booking.length > 0 && booking != null ? (
                                booking.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index} >
                                                <th>{bookingList[index].booking_id}</th>
                                                <th>{user[index]}</th>
                                                <th>{booking[index].name}</th>
                                                <td>{type[index]}</td>
                                                <td>{bookingList[index].quantity}</td>
                                                <td>{booking[index].price}</td>
                                            </tr>
                                        </>
                                    );
                                })
                            ) : (
                                <div>No product to show</div>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ListBooking;