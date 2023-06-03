import React, { useEffect, useState } from 'react';
import { getListAccommodation, deleteAccommodation } from './Services/ApiService';
import Swal from 'sweetalert2';

function ListAccommodation() {
  const [accommodation, setAccommodation] = useState([]);
  useEffect(() => {
    getListAccommodation()
      .then(pro => setAccommodation(pro.data))
      .catch(error => console.log(error));
  }, [accommodation]);

  const handleDeleteAccommodation = (id) => {
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
        deleteAccommodation(id)
          .then(pro => {
            console.log("pro", pro);
            if (pro.status === 200) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              setAccommodation(accommodation.filter((item) => item.id !== id));
            }
          })
          .catch(error => console.log(error));
      }
    })
  }
  return (
    <section>
      <div className="container-fluid">
        {accommodation != null && accommodation.length > 0 ? (
          <table class="table table-light">
            <thead class="thead background-primary text-white">
              <tr>
                <th scope="col">Accommodation Id</th>
                <th scope="col">Accommodation Name</th>
                <th scope="col">Rate</th>
                <th scope="col">Type</th>
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

              {accommodation.map((item, index) => {
                return <>
                  <tr key={index}>
                    <th scope="row">{item.accommodation_id}</th>
                    <td>{item.accommodation_name}</td>
                    <td>{item.rate}</td>
                    <td>{item.type.toString()}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.status_Accommodation.toString()}</td>
                    <td>{item.discount}</td>
                    <td>{item.location_id}</td>
                    <td>
                      <button className="btn btn-warning background-blue">
                        Detail
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning background-green">
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning background-red" onClick={() => handleDeleteAccommodation(item.accommodation_id)}>
                        Delete
                      </button>
                    </td>
                  </tr></>
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted">No accommodations found.</p>
            {/* You can add additional instructions or call-to-action here */}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListAccommodation;