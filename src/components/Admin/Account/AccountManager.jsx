import { React, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import getUser from "./Service/ApiService";

const AccountManager = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUser()
      .then((u) => setUser(u.data))
      .catch((error) => console.log(error));
  }, []);
  console.log("user", users);
  return (
    <section>
      <div className="container-fluid">
        <table class="table table-light">
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
              <th scope="col">Email</th>
             
              <th colSpan={3} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <th scope="row">{item.user_id}</th>
                    <td>{item.user_name}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.address}</td>
                    <td>{item.role}</td>
                    <td>{item.total_payment}</td>
                    <td>{item.charge_card}</td>
                    <td>{item.status_User.toString()}</td>
                    <td>{item.email}</td>
                   

                    <td>
                      <a href="" className="btn btn-warning background-blue">
                        Detail
                      </a>
                    </td>
                   
                    
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AccountManager;
