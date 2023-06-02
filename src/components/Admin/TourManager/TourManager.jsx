import { React, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";

const TourManager = () => {
  const [tours,setTours] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5158/api/Tour/GetTours')
    .then(t => {setTours(t);
    console.log("t",t);}
    )
    .then(error => console.log(error));
  },[])
  console.log("tour" ,tours);
  return (
    <section>
      <div className="container-fluid">
        <table class="table table-light">
          <thead class="thead background-primary text-white">
            <tr>
              <th scope="col">Tour Id</th>
              <th scope="col">Tour Name</th>
              <th scope="col">Depature date</th>
              <th scope="col">Price</th>
              <th scope="col">Status Tour</th>
              <th colSpan={3} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

             {/* { tours.data.data.map((item, index) => { 
                return    <>   
                <tr key={index}>                  
                <th scope="row">{item.tour_id}</th>
                <td>{item.tour_name}</td>
                <td>{item.depature_date}</td>
                <td>{item.price}</td>
                <td>{item.status_tour}</td>
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
             
      
        

              })} */}
              
            
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TourManager;
