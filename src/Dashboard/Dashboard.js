import React, { useContext, useState, useEffect } from "react";
import Button from "../shared/components/FormElements/Button/Button";
import Card from "../shared/components/UIElements/Card/Card";
import { Container, Row, Col } from "react-grid-system";
import "./Dashboard.css";
import { AuthContext } from "../shared/components/context/auth-context";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import AllPlaceList from "../places/components/AllPlaceList";
import DashBoardList from "./DashboardList";
import Avatar from "../shared/components/UIElements/Avatar/Avatar";
const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState([]);
  const [creator, setCreator] = useState([]);
  const [user, setUser] = useState();
  
  
  useEffect(() => {
    if (auth.userId) {
      const getUserByUserId = async () => {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
            "GET"
          );
          console.log(response);
          setUser(response);
        } catch (err) {}
      };
      getUserByUserId();
    }
  }, [sendRequest, auth.userId]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/places",
          "GET"
        );
        console.log(response);
        setPlaces(response);
        response.map((item) => {
          setCreator(creator.push(item.creator));
        });
      } catch (err) {}
    };
    getAllUsers();
  }, [sendRequest]);

  if (!isLoading) {
    return (
      <>
        {error && <ErrorModal error={error} onClear={clearError} />}
        <Container
          style={{
            background: "white",
            padding: "10px",
          }}
        >
          <Card>
            <div className="container-card">
              <Row>
               
                    <Col sm={2} md={2}>
                      <div
                        style={{
                          margin: "1rem",
                        }}
                      >
                        <h1>Dashboard</h1>
                       </div>
                    </Col>
              </Row>
              <div className="container-user-profie">
                {user && <p>{user.name}</p>}
                <div className="user-item__image">
                  {user && (
                    <Avatar
                      image={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}
                      alt={props.user}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>
          {/* <AllPlaceList items={places} /> */}
          <DashBoardList />
        </Container>
      </>
    );
  } else {
    return <LoadingSpinner asOverlay />;
  }
};
export default Dashboard;
