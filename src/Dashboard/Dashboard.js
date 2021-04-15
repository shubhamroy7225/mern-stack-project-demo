import React, { useContext } from "react";
import Button from "../shared/components/FormElements/Button/Button";
import Card from "../shared/components/UIElements/Card/Card";
import { Container, Row, Col } from "react-grid-system";
import "./Dashboard.css";
import { AuthContext } from "../shared/components/context/auth-context";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
const Dashboard = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
let dashboard = [
  {
    name: "Add Place",
    link: "/place/new",
  },
  {
    name: "My Place",
    link:`/${auth.userId}/places`,
  },
  {
    name: " Edit Profie",
    link: `/user/${auth.userId}/profile`,
  },
  {
    name: "Change Password",
    link:`/user/${auth.userId}/password`
  },
  {
    name: "Logout",
  },
];
if(!isLoading){
  return (
    <>
    {error && <ErrorModal error={error} onClear={clearError} />}
    
      <h1>Dashboard</h1>
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
                  <Card>
                    <div className="user-item__info">
                      {item.name === 'Logout'?
                      <Button inverse to={item.link} onClick={auth.logout}>
                      {item.name}
                      </Button>:
                      <Button inverse to={item.link}>
                        {item.name}
                        </Button>}
                    </div>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  )}else{
    return <LoadingSpinner asOverlay />
  }
};
export default Dashboard;
