import axios from "axios";


async function getListRestaurantforUser() {
    const data = await axios.get("http://localhost:5158/api/Restaurant/GetRestaurants");
    return data.data;
}

async function getRestaurantByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Restaurant/GetRestaurantById/${id}`);
    return data.data;
}

async function deleteRestaurant(id) {
    const data = await axios.delete(`http://localhost:5158/api/Restaurant/DeleteRestaurant/${id}`);
    return data.data;
}

async function postRestaurant(restaurant) {
    const data = await axios.post("http://localhost:5158/api/Restaurant/AddRestaurant", restaurant);
    return data;
}

async function putRestaurant(id, restaurant) {
    const data = await axios.put(`http://localhost:5158/api/Restaurant/UpdateRestaurant/${id}`, restaurant);
    return data;
}

async function getLocations() {
    const data = await axios.get("http://localhost:5158/api/Location/GetLocations");
    return data.data;
}

async function postRestaurantImg(id,image) {
    const data = await axios.post(`http://localhost:5158/api/ResImg/PostImages?Restaurant_id=${id}` , image);
    return data.data;
}

async function getRestaurantImageByID(id) {
    const data = await axios.get(`http://localhost:5158/api/ResImg/GetImagesByRestaurantId/${id}`);
    return data.data;
}

async function putRestaurantImage(id, images) {
    const data = await axios.post(`http://localhost:5158/api/ResImg/UpdateImageById/${id}`, images);
    return data.data;
}

async function deleteRestaurantImage(id) {
    const data = await axios.delete(`http://localhost:5158/api/ResImg/DeleteImages/${id}`);
    return data.data;
}


export {
    getListRestaurantforUser,
    getRestaurantByID,
    deleteRestaurant,
    postRestaurant,
    putRestaurant,
    getLocations,
    postRestaurantImg,
    getRestaurantImageByID,
    putRestaurantImage,
    deleteRestaurantImage,
};