

import axios from "axios";

export const getListLocations = async () => {
  const data = await axios.get("http://localhost:5158/api/Location/GetLocations");
  return data.data;
};

export const deleteLocation = async (location_id) => {
  const data = await axios.delete(`http://localhost:5158/api/Location/DeleteEmployee/${location_id}`);
  return data.data;
};

export const getLocation = async (id) => {

    const response = await axios.get(`http://localhost:5158/api/Location/GetLocation/${id}`);
    return response.data.data;
};

 export const updateLocation = async (id, dataInput) => {
   const response = await axios.put(`http://localhost:5158/api/Location/UpdateLocation/${id}`, dataInput);
    return response.data.data;
};  
export const updateLocationImage = async (id, formData) => {
  const response = await axios.post(`http://localhost:5158/api/LocationImage/UpdateLocationImageById/${id}`, formData);
   return response.data.data;
};  
export const getLocationImage = async (id) => {
  const response = await axios.put(`http://localhost:5158/api/LocationImage/GetLocationImagesByLocationId/${id}`);
   return response.data.data;
}; 
