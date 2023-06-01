import { React, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";

const TouristSpotManager = () => {
  const [spots,setspots] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5158/api/TouristSpot/GetTouristSpots')
    .then(t => {setspots(t);
    console.log("t",t);}
    )
    .then(error => console.log(error));
  },[])
  console.log("tour" ,spots);
  return (
    <section>
      <div className="container-fluid">
        <table class="table table-light">
          <thead class="thead background-primary text-white">
            <tr>
              <th scope="col">Tourist Spot Id</th>
              <th scope="col">Tourist Spot Name</th>
              <th scope="col">Location</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th colSpan={3} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

             {/* { spots.data.data.map((item, index) => { 
                return    <>   
                <tr key={index}>                  
                <th scope="row">{item.touristSpot_id}</th>
                <td>{item.touristSpot_id}</td>
                <td>{item.location_id}</td>
                <td>{item.price}</td>
                <td>{item.status_TouristSpot}</td>
                <td>
                  <a href="" className="btn btn-warning background-blue">
                    Image
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
              })} */}
              
            
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TouristSpotManager;
