import axios from "axios";

async function GetTouristSpots() {
    const data = await axios.get("http://localhost:5158/api/TouristSpot/GetTouristSpots");
    return data.data;
}

async function GetTouristSpotById(id) {
    const data = await axios.get(`http://localhost:5158/api/TouristSpot/GetTouristSpotById/${id}`);
    return data.data;
}

// image
async function GetImagesByTouristSpotId(id) {
    const data = await axios.get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${id}`);
    return data.data;
}
export {
    GetTouristSpots,
    GetTouristSpotById,
    GetImagesByTouristSpotId,
};