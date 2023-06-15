import axios from "axios";

async function getListAccommodation() {
    const data = await axios.get("http://localhost:5158/api/Accommodation/GetAccommodations");
    return data.data;
}

async function GetTouristSpots() {
    const data = await axios.get("http://localhost:5158/api/TouristSpot/GetTouristSpots");
    return data.data;
}

async function getListTour() {
    const data = await axios.get("http://localhost:5158/api/Tour/GetTours");
    return data.data;
}

async function getListRestaurant() {
    const data = await axios.get("http://localhost:5158/api/Restaurant/GetRestaurants");
    return data.data;
}

async function getListTransport() {
    const data = await axios.get("http://localhost:5158/api/Transport/GetTransports");
    return data.data;
}


async function getListBooking() {
    const data = await axios.get("http://localhost:5158/api/Booking/GetBookings");
    return data.data;
}







export {
    getListAccommodation,
    GetTouristSpots,
    getListTour,
    getListRestaurant,
    getListTransport,
    getListBooking

};