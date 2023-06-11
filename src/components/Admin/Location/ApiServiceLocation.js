

import axios from "axios";

export const getListLocations = async () => {
  const data = await axios.get("http://localhost:5158/api/Location");
  return data.data;
};

export const deleteLocation = async (location_id) => {
  const data = await axios.delete(`http://localhost:5158/api/Location/${location_id}`);
  return data.data;
};

export const getLocation = async (id) => {

    const response = await axios.get(`http://localhost:5158/api/Location/${id}`);
    return response.data.data;
};

 export const updateLocation = async (id, dataInput) => {
   const response = await axios.put(`http://localhost:5158/api/Location/${id}`, dataInput);
    return response.data.data;
};  
export const updateLocationImage = async (id, formData) => {
  const response = await axios.put(`http://localhost:5158/api/LocationImage/${id}`, formData);
   return response.data.data;
};  
export const getLocationImage = async (id) => {
  const response = await axios.put(`http://localhost:5158/api/LocationImage/${id}`);
   return response.data.data;
}; 
