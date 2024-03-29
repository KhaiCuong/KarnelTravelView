import axios from "axios";

async function getListAccommodation() {
    const data = await axios.get("http://localhost:5158/api/Accommodation/GetAccommodations");
    return data.data;
}

async function getAccommodationByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Accommodation/GetAccommodation/${id}`);
    return data.data;
}

// image
async function getAccommodationImageByID(id) {
    const data = await axios.get(`http://localhost:5158/api/AccommodationImage/GetImagesByTouristSpotId/${id}`);
    return data.data;
}
export {
    getListAccommodation,
    getAccommodationByID,
    getAccommodationImageByID,
};