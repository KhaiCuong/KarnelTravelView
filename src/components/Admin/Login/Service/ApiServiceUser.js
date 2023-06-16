import axios from "axios";

async function GetUsers(){
    const data = await  axios.get('http://localhost:5158/api/User/GetUsers');
    return data.data;

}

// async function GetUser(id){
//     const data = await  axios.get(`http://localhost:5158/api/User/GetUser/${id}`);
//     return data.data;

// }
export default GetUsers;
  
