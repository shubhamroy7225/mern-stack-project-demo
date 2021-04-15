import React, { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Map from "../../shared/components/UIElements/Map/Map";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import "./PlaceDetails.css";
import { useHistory, useParams } from "react-router";
import RatingPlace from "./RatingPlace";
import UserComment from "./UserComment";
const PlaceDetails = (props) => {
  console.log(props)
  const history = useHistory()
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [placeData, setPlaceData] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const id = useParams().userId;
  useEffect(() => {
    const getPlaceByPlaceId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
          "GET"
        );
        //setPlaceData(response.image);

        setPlaceData(response);
        console.log(response);
      } catch (err) {}
    };
    getPlaceByPlaceId();
  }, [sendRequest, placeId]);

  let newArray = [];
  if (placeData) {
    placeData.image.map((img) => {
      let obj = {};
      obj.original = process.env.REACT_APP_ASSET_URL + "/" + img.original;
      obj.thumbnail = process.env.REACT_APP_ASSET_URL + "/" + img.original;
      newArray.push(obj);
    });
  }
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteWarningHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "DELETE",
        null,
        {
          Authorization: auth.token,
        }
      );
      //placeData.onDelete(placeData.placeId);
        history.push('/')
    } catch (err) {}
  };

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  if (placeData) {
    return (
      <>
        {error && <ErrorModal error={error} onClear={clearError} />}
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={placeData.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
          <div className="map-container">
            <Map center={placeData.location} zoom={16}></Map>
          </div>
        </Modal>
        <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteWarningHandler}
          header="Are you sure?"
          footerClass="place-item__modal-actions"
          footer={
            <>
              <Button invarse onClick={cancelDeleteWarningHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteWarningHandler}>
                DELETE
              </Button>
            </>
          }
        >
          <p>
            Do you want to proced and delete this place? please note that it
            cannot be undone thereafter.
          </p>
        </Modal>
       <center> <li className="place-item">
       {isLoading && <LoadingSpinner asOverlay />}
          <Card>
            <ImageGallery items={newArray} />
            <div className="place-item__image">
            </div>
            <div className="place-item__info">
              <h2>{placeData.title}</h2>
              <h3>{placeData.yourexprience}</h3>
              <p>{placeData.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === placeData.creator && (
                <Button to={`/place/${placeId}`}>EDIT</Button>
              )}

              {auth.userId === placeData.creator && (
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              )}
            </div>
            {auth.token && <hr />}
            <RatingPlace
              rating={placeData.total_rating}
            />
            {auth.token && <hr />}
            <UserComment comment={placeData.comments} createId={placeData.creator}/>
          </Card>
        </li></center>
      </>
    );
  } else {
    return <LoadingSpinner asOverlay />;
  }
};
export default PlaceDetails;
