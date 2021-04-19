import React, { useContext, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import ReactStars from "react-rating-stars-component";
import Button from "../../shared/components/FormElements/Button/Button";
import "./PlaceItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router";
const RatingPlace = (props) => {
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(props.rating);
  const [reviews, setReviews] = useState(props.reviews);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const ratingHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}/reviews`,
        "PATCH",
        JSON.stringify({
          id: placeId,
          rating: rating,
        }),
        {
          "Content-Type": "application/json",
          Authorization: auth.token,
        }
      );
      store.addNotification({
        title: "Wonderful!",
        message: "Your Rating Submitted Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="rating_manage">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="rating_manage1">
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
            edit={auth.token ? (props.valid ? false : true) : false}
          />
           <div className="rating">{reviews ? reviews: null} {reviews <= 1?'Review':'Reviews'}</div>
           {auth.token ? (
          props.valid ? null : (
            <Button inverse onClick={ratingHandler}>
              SUBMIT RATING
            </Button>
          )
        ) : null}
        </div>

       
      </div>
    </>
  );
};
export default RatingPlace;
