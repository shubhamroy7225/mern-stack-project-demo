import React, { useContext } from "react";
import PlaceIcon from "@material-ui/icons/Place";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Button from "../shared/components/FormElements/Button/Button";
import Card from "../shared/components/UIElements/Card/Card";
import { Container, Row, Col } from "react-grid-system";
import "./Dashboard.css";
import { AuthContext } from "../shared/components/context/auth-context";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
const DashboardList = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let dashboard = [
    {
      name: "Add Place",
      link: "/place/new",
      icon: <PlaceIcon style={{ fontSize: 100,color:"black" }} />,
    },
    {
      name: "My Place",
      link: `/${auth.userId}/places`,
      icon: <PlaceIcon style={{ fontSize: 100,color:"black" }} />,
    },
    {
      name: " Edit Profie",
      link: `/user/${auth.userId}/profile`,
      icon: <PersonIcon style={{ fontSize: 100,color:"black" }} />,
    },
    {
      name: "Change Password",
      link: `/user/${auth.userId}/password`,
      icon: <LockOpenIcon style={{ fontSize: 100,color:"black" }} />,
    },
    {
      name: "Logout",
      icon: <LockIcon style={{ fontSize: 100,color:"black" }} />,
    },
  ];
  if (!isLoading) {
    return (
      <>
        {error && <ErrorModal error={error} onClear={clearError} />}
        <Container>
          <Row>
            {dashboard.map((item) => {
              return (
                <Col sm={4} md={4}>
                  <div
                    style={{
                      margin: "1rem",
                    }}
                  >
                    <Link to={item.link}  style={{textDecoration:'none'}}>
                      {!item.link ? (
                        <Card>
                          <div
                            className="user-item__info"
                            onClick={auth.logout}
                          >
                            <center>
                              {" "}
                              <p>{item.icon}</p>
                              <h3 style={{color:'black'}}>{item.name}</h3>
                            </center>
                          </div>
                        </Card>
                      ) : (
                        <Card>
                          <div className="user-item__info">
                            <center>
                              <p>{item.icon}</p>
                              <h3 style={{color:'black',textDecoration:'none'}}>{item.name}</h3>
                            </center>
                          </div>
                        </Card>
                      )}
                    </Link>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  } else {
    return <LoadingSpinner asOverlay />;
  }
};
export default DashboardList;
