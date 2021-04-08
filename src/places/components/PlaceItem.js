import React, { useContext, useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
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
import CommentList from "./CommentList";
const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(props.rating);
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState({
    userId: "",
    comment: "",
  });
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const id = useParams().userId;

  let newArray = [];
  props.image.map((img) => {
    let obj = {}
    obj.original = process.env.REACT_APP_ASSET_URL+'/'+img.original
    obj.thumbnail = process.env.REACT_APP_ASSET_URL+'/'+img.original
    newArray.push(obj)
  });

  useEffect(() => {
    const getAllPlacesByUserId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${id}`,
          "GET"
        );
        response.map((place) => {
          return setComments(place.comments);
        });
      } catch (err) {}
    };
    getAllPlacesByUserId();
  }, [sendRequest, id, update]);

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
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}/reviews`,
        "PATCH",
        JSON.stringify({
          id: props.id,
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
  const changedHandler = (event) => {
    setComment({
      ...comment,
      userId: auth.userId,
      comment: event.target.value,
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setUpdate(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places/comments",
        "POST",
        JSON.stringify({ comment, id: props.id }),
        {
          "Content-Type": "application/json",
          Authorization: auth.token,
        }
      );
      setUpdate(true);
    } catch (err) {}
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
        <ImageGallery 
              items={newArray}
            />
          <div className="place-item__image">
            {isLoading && <LoadingSpinner asOverlay />}
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
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
          {auth.token && <hr />}
          <div className="rating_manage">
            <div className="rating_manage1">
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
                <div className="rating">
                  {rating ? rating.toFixed(2) : null}
                </div>
              )}
            </div>
            {auth.token && (
              <Button inverse onClick={ratingHandler}>
                SUBMIT RATING
              </Button>
            )}
          </div>
          {auth.token && <hr />}
          {auth.token && (
            <div className="comment">
              <form onSubmit={authSubmitHandler}>
                <div className="add_comments">
                  <input
                    type="text"
                    onChange={changedHandler}
                    placeholder="Please enter your comment..."
                  />
                  <Button inverse type="submit">
                    ADD COMMENT
                  </Button>
                </div>
              </form>
            </div>
          )}
          {comments &&
            comments.map((comment, index) => {
              return <CommentList key={index} comment={comment} />;
            })}
        </Card>
      </li>
    </>
  );
};
export default PlaceItem;
