import axios from "axios";


async function getListRestaurant() {
    const data = await axios.get("http://localhost:5158/api/Restaurant/GetRestaurants");
    return data.data;
}
async function getListAccommodation() {
    const data = await axios.get("http://localhost:5158/api/Accommodation/GetAccommodations");
    return data.data;
}


export {
    getListRestaurant,
    getListAccommodation
};