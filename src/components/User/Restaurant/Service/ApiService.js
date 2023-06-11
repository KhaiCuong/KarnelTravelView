import axios from "axios";


async function getListRestaurantUser() {
    const data = await axios.get("http://localhost:5158/api/Restaurant/GetRestaurants");
    return data.data;
}

async function getRestaurantByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Restaurant/GetRestaurantById/${id}`);
    return data.data;
}

// Image
async function getRestaurantImageByID(id) {
    const data = await axios.get(`http://localhost:5158/api/ResImg/GetImagesByRestaurantId/${id}`);
    return data.data;
}

export {
    getListRestaurantUser,
    getRestaurantByID,
    getRestaurantImageByID,
};