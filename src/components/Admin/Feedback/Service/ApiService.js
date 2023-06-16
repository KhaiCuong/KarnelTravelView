import axios from "axios";

async function getListFeedback() {
    const data = await axios.get("http://localhost:5158/api/Feedback/GetFeedbacks");
    return data.data
}

export{
    getListFeedback,

}