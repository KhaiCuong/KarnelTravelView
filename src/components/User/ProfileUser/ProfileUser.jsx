import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { GetUser } from "../../Admin/Account/Service/ApiServiceUser";
import "./ProfileUser.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";

function PersonalProfile(props) {
  const { id } = useParams();

  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileDataById = async () => {
      try {
        const response = await GetUser(id);
        setProfile(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfileDataById();
  }, []);

  console.log("profile", profile);
  const handleDetailProfile = (id) => {
    setProfile(id);
    navigate(`/profileuser/detail/${id}`);
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      {/* <h2 className="text-center font-weight-bold">{profile.user_name}</h2> */}
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">
                    Name {profile.user_name}{" "}
                  </MDBTypography>
                  <MDBCardText>{profile.role}</MDBCardText>
                 
                  {/* <button className="btn btn-warning updatebtn"
                  //  onClick={()=>{
                  //   handleUpdateProfile(profile.user_id);
                  // }}
                  >
                    Update Account
                  </button> */}
                  
                  
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email:</MDBTypography>
                        <MDBCardText className="text-muted">
                          {profile.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {profile.phone_number}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Address</MDBTypography>
                      <MDBCardText className="text-muted">
                        {profile.address}
                      </MDBCardText>
                    </MDBCol>

                    <hr className="mt-0 mb-4" />
                    {/* <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Update Account</MDBTypography>
                      
                      </MDBCol> */}
                    {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          123 456 789
                        </MDBCardText>
                      </MDBCol> */}
                    {/* </MDBRow> */}

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default PersonalProfile;
