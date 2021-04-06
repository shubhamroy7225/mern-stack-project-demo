import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Map from "../../shared/components/UIElements/Map/Map";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import "./PlaceItem.css";
import { useParams } from "react-router";
const PlaceItem = (props) => {
  console.log(props);
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(props.rating);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const ratingHandler = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}/reviews`,
        "PATCH",
        JSON.stringify({
          id:props.id,
          rating: rating,
        }),
        {
          "Content-Type": "application/json",
          Authorization: auth.token,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
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
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            {isLoading && <LoadingSpinner asOverlay />}
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {auth.token && (
              <ReactStars
                count={5}
                value={rating}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            )}
            {auth.token && (
              <Button inverse onClick={ratingHandler}>
                SUBMIT RATING
              </Button>
            )}
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.createId && (
              <Button to={`/place/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.createId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
