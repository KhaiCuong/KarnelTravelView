import axios from "axios";

async function getListTransport() {
    const data = await axios.get("http://localhost:5158/api/Transport/GetTransports");
    return data.data;
}

async function getTransportByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Transport/GetTransportById/${id}`);
    return data.data;
}

// image
// async function getAccommodationImageByID(id) {
//     const data = await axios.get(`http://localhost:5158/api/AccommodationImage/GetImagesByTouristSpotId/${id}`);
//     return data.data;
// }



export {
    getListTransport,
    getTransportByID,
    
};