import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteRestaurant, getListRestaurant } from './Service/ApiService';


function ListRestaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getListRestaurant()
      .then(pro => setRestaurant(pro.data))
      .catch(error => console.log(error));
  }, [restaurant]);

  const handleDeleteRestaurant = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRestaurant(id)
          .then(pro => {
            console.log("pro", pro);
            if (pro.status === 200) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              setRestaurant(restaurant.filter((item) => item.id !== id));
            }
          })
          .catch(error => console.log(error));
      }
    })
  }
  const handleUpdateRestaurant = (id) => {
    navigate(`updateRestaurant/${id}`);
  };

  const handleDetailRestaurant = (id) => {
    navigate(`detailRestaurant/${id}`);
  }
  return (
    <section>
      <div className="container-fluid">
        {restaurant != null && restaurant.length > 0 ? (
          <table class="table table-blue">
            <thead class="thead background-primary text-white">
              <tr>
                <th scope="col">Restaurant Id</th>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Rate</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Discount</th>
                <th scope="col">location_id</th>

                <th colSpan={3} scope="col" className='text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {restaurant.map((item, index) => {
                return <>
                  <tr key={index}>
                    <th scope="row">{item.restaurant_id}</th>
                    <td>{item.restaurant_name}</td>
                    <td>{item.rate}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.status_Restaurant.toString()}</td>
                    <td>{item.discount}</td>
                    <td>{item.location_id}</td>
                    <td>
                      <button className="btn btn-warning background-blue" onClick={() => handleDetailRestaurant(item.restaurant_id)} >
                        Detail
                      </button>
                    </td>
                    {/* <td>
                      <button className="btn btn-warning background-green" onClick={() => handleUpdateRestaurant(item.restaurant_id)} >
                        Update
                      </button>
                    </td> */}
                    <td>
                      <button className="btn btn-warning background-red" onClick={() => handleDeleteRestaurant(item.restaurant_id)}>
                        Delete
                      </button>
                    </td>
                  </tr></>
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted">No Restaurant was found.</p>
            {/* You can add additional instructions or call-to-action here */}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListRestaurant;