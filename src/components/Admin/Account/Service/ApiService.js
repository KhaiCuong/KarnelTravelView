import axios from "axios";

async function getUser(){
    const data = await  axios.get('http://localhost:5158/api/User/GetUsers');
    return data.data;

}
export default getUser;