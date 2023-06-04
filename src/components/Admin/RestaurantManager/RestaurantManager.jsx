import { React, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";

const RestaurantManager = () => {
  const [restaurants,setRestaurants] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5158/api/Restaurant/GetRestaurants')
    .then(r => {setRestaurants(r);
    console.log("r",r);}
    )
    .then(error => console.log(error));
  },[])
  console.log("restaurant" ,restaurants);
  return (
    <section>
      <div className="container-fluid">
        <table class="table table-light">
          <thead class="thead background-primary text-white">
            <tr>
              <th scope="col">Restaurant Id</th>
              <th scope="col">Restaurant Name</th>
              <th scope="col">Rate</th>
              <th scope="col">Desciption</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th colSpan={3} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

              { restaurants.data.data.map((item, index) => { 
                return    <>   
                <tr key={index}>                  
                <th scope="row">{item.restaurant_id}</th>
                <td>{item.restaurant_name}</td>
                <td>{item.rate}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.status_Restaurant}</td>
                <td>
                  <a href="" className="btn btn-warning background-blue">
                    Detail
                  </a>
                </td>
                <td>
                  <a href="" className="btn btn-warning background-green">
                    Update
                  </a>
                </td>
                <td>
                  <a href="" className="btn btn-warning background-red">
                    Delete
                  </a>
                </td>
                </tr></>        
             
      
        

              })} 
              
            
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RestaurantManager;
