import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "../AdminManager.css";
import getUser, { GetUsers } from "./Service/ApiServiceUser";

function AccountManager() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUsers()
      .then((pro) => setUser(pro.data))
      .catch((error) => console.log(error));
  }, [user]);

  const handleDeleteAccommodation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // if (result.isConfirmed) {
      //   deleteUser(id)
      //     .then((pro) => {
      //       console.log("pro", pro);
      //       if (pro.status === 200) {
      //         deleteAccommodationImage(id)
      //           .then((response) => {
      //             console.log("deleted Image", response);
      //             if (response.status === 200) {
      //               Swal.fire(
      //                 "Deleted!",
      //                 "Your file has been deleted.",
      //                 "success"
      //               );
      //               setAccommodation(
      //                 accommodation.filter((item) => item.id !== id)
      //               );
      //             }
      //           })
      //           .catch((error) => console.log("error", error));
      //       }
      //     })
      //     .catch((error) => console.log("error", error));
      // }
    });
  };

  // const handleUpdateAccommodation = (id) => {
  //   navigate(`updateAccommodation/${id}`);
  // };

  const handleDetailUser = (id) => {
    navigate(`detailUser/${id}`);
  };
  return (
    <section>
      <h2 class="text-center font-weight-bold">List of User</h2>

      <div className="container-fluid">
        <div>
          <button
            className="btn background-green text-white"
            onClick={() => {
              navigate("/admin/accommodation/createAccommodation");
            }}
          >
            {" "}
          </button>
        </div>
        {user != null && user.length > 0 ? (
          <table class="table  mt-3 mb-3">
            <thead class="thead background-primary text-white">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">User Name</th>
                <th scope="col">Phone number</th>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
                <th scope="col">Total payment</th>
                <th scope="col">Charge card</th>
                <th scope="col">Status User</th>
                <th scope="col"> Email</th>
                {/* <th scope="col">location_id</th> */}

                <th colSpan={3} scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th scope="row">{item.user_id}</th>
                      <td>{item.user_name}</td>
                      <td>{item.phone_number}</td>
                      {/* <td>{item.type === true ? "Resort" : "Hotel"}</td> */}
                      <td>{item.address}</td>
                      <td>{item.role}</td>
                      <td>{item.total_payment}</td>
                      <td>{item.charge_card}</td>
                      <td>{item.status_User.toString()}</td>

                      <td>{item.email}</td>
                      <td>
                        <button
                          className="btn btn-warning background-blue"
                          onClick={() => {
                            handleDetailUser(item.user_id);
                          }}
                        >
                          Detail
                        </button>
                      </td>
                      {/* <td>
                      <button className="btn btn-warning background-green" onClick={() => { handleUpdateAccommodation(item.accommodation_id) }}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning background-red" onClick={() => handleDeleteAccommodation(item.accommodation_id)}>
                        Delete
                      </button>
                    </td> */}
                    </tr>
                  </>
                );
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

export default AccountManager;
