import axios from "axios";

async function getListBookings() {
    const data = await axios.get("http://localhost:5158/api/Booking/GetBookings");
    return data.data;
}


async function getUser(id) {
    const data = await axios.get(`http://localhost:5158/api/User/GetUser/${id}`);
    return data.data;
}

async function getBookingByUserId(id) {
    const data = await axios.get(`http://localhost:5158/api/Booking/GetBookingByUserId/${id}`);
    return data.data;
}

async function getAccommodation(id) {
    const data = await axios.get(`http://localhost:5158/api/Accommodation/GetAccommodation/${id}`);
    return data.data;
}

async function getRestaurant(id) {
    const data = await axios.get(`http://localhost:5158/api/Restaurant/GetRestaurantById/${id}`);
    return data.data;
}

async function getTransport(id) {
    const data = await axios.get(`http://localhost:5158/api/Transport/GetTransportById/${id}`);
    return data.data;
}

async function getTouristSpot(id) {
    const data = await axios.get(`http://localhost:5158/api/TouristSpot/GetTouristSpotById/${id}`);
    return data.data;
}

async function getTour(id) {
    const data = await axios.get(`http://localhost:5158/api/Tour/GetTour/${id}`);
    return data.data;
}

async function postFeedback(info) {
    const data = await axios.post("http://localhost:5158/api/Feedback/AddFeedback", info);
    return data.data;
}


async function getFeedbackList(info) {
    const data = await axios.get("http://localhost:5158/api/Feedback/GetFeedbacks");
    return data.data;
}


async function getBookingByBookingId(id) {
    const data = await axios.get(`http://localhost:5158/api/Booking/GetBookingByBookingId/${id}`);
    return data.data;
}

export {
    getListBookings,
    getUser,
    getBookingByUserId,
    getAccommodation,
    getRestaurant,
    postFeedback,
    getFeedbackList,
    getBookingByBookingId,
    getTransport,
    getTour,
    getTouristSpot,
}