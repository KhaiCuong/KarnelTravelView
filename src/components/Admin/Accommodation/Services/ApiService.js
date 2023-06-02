import axios from "axios";


async function getListAccommodation() {
    const data = await axios.get("http://localhost:5158/api/Accommodation/GetAccommodations");
    return data.data;
}

async function deleteAccommodation(id) {
    const data = await axios.delete(`http://localhost:5158/api/Accommodation/DeleteAccommodation/${id}`);
    return data.data;
}

export {
    getListAccommodation,
    deleteAccommodation
};