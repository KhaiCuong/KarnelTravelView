import axios from "axios";


async function getListAccommodation() {
    const data = await axios.get("http://localhost:5158/api/Accommodation/GetAccommodations");
    return data.data;
}

async function deleteAccommodation(id) {
    const data = await axios.delete(`http://localhost:5158/api/Accommodation/DeleteAccommodation/${id}`);
    return data.data;
}

async function postAccommodation(accommodation) {
    const data = await axios.post("http://localhost:5158/api/Accommodation/AddAccommodation", accommodation);
    return data;
}

async function getAccommodationByID(id) {
    const data = await axios.get(`http://localhost:5158/api/Accommodation/GetAccommodation/${id}`);
    return data.data;
}

async function putAccommodation(id, accommodation) {
    const data = await axios.put(`http://localhost:5158/api/Accommodation/UpdateAccommodation/${id}`, accommodation);
    return data;
}

async function getLocations() {
    const data = await axios.get("http://localhost:5158/api/Location/GetLocations");
    return data.data;
}

export {
    getListAccommodation,
    deleteAccommodation,
    postAccommodation,
    getAccommodationByID,
    putAccommodation,
    getLocations,
};