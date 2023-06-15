import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLocation, getListLocations, updateLocation } from "./ApiServiceLocation";
import { TourContext } from "../contexts/TourContext";
import Swal from "sweetalert2";

function ListLocations(props) {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;

  useEffect(() => {
    getListLocations()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteLocation = (location_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteLocation(location_id)
          .then(() => {
            setLocations(locations.filter((item) => item.location_id !== location_id));
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleUpdateLocation = (location_id) => {
    navigate(`update/${location_id}`);
  };

  const handleGetPageCreate = () => {
    navigate(`/admin/location/create`);
  };

  const handleGetPageDetail = (item) => {
    navigate(`/admin/location/detail/${item}`);
  };

  const toggleStatus = (location_id) => {
    const updatedLocations = locations.map((item) => {
      if (item.location_id === location_id) {
        return {
          ...item,
          status_Location: !JSON.parse(item.status_Location),
        };
      }
      return item;
    });

    setLocations(updatedLocations);

    // Gửi yêu cầu PUT để cập nhật giá trị status_Location lên server
    const updatedLocation = updatedLocations.find((item) => item.location_id === location_id);
    const data = {
      ...updatedLocation,
      status_Location: updatedLocation.status_Location.toString(), // Chuyển đổi lại thành chuỗi
    };

    updateLocation(location_id, data)
      .then(() => {
        console.log("Location status updated successfully.");
      })
      .catch((error) => {
        console.log("Failed to update location status:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div>
        <h3 style={{ textAlign: "center" }}>List Locations</h3>
        <div>
          <button className="btn background-green text-white" onClick={handleGetPageCreate}>
            Create
          </button>
        </div>
        {locations.length > 0 ? (
          <table className="table table-hover">
            <thead className="thead background-primary text-white">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th style={{ paddingLeft: "9%" }}>Action</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {locations.map((item, index) => (
                <tr key={index}>
                  <td>{item.location_id}</td>
                  <td>{item.location_name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className={`btn ${item.status_Location ? "btn-light-green" : "btn-light-red"} btn-sm`}
                      onClick={() => toggleStatus(item.location_id)}
                    >
                      {item.status_Location ? "Mở" : "Tắt"}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleDeleteLocation(item.location_id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setItemTour(item.location_id);
                        handleUpdateLocation(item.location_id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setItemTour(item.location_id);
                        handleGetPageDetail(item.location_id);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data to show</div>
        )}
      </div>
    </div>
  );
}

export default ListLocations;
