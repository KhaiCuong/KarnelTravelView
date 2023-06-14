import axios from "axios";

// Tour API
async function getListTour() {
    const data = await axios.get("http://localhost:5158/api/Tour/GetTours");
    return data.data;
}

async function getTourByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Tour/GetTour/${id}`)
    return data.data;
}


// touristSpot API
async function getListTouristSpot() {
    const data = await axios.get("http://localhost:5158/api/TouristSpot/GetTouristSpots");
    return data.data;
}

// touristSpotTour API
async function getListTouristSpotTourByTourID(id) {
    const data = await axios.get(`http://localhost:5158/api/TouristSpotTour/GetListByTourId/${id}`);
    return data.data;
}

// touristSpotImage API
async function getImageByTouristSpotID(id) {
    const data = await axios.get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${id}`);
    return data.data;
}

export {
    getListTour,
    getListTouristSpot,
    getListTouristSpotTourByTourID,
    getImageByTouristSpotID,
    getTourByID,
}