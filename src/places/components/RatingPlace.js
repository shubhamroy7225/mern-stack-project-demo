import React, { useContext, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import ReactStars from "react-rating-stars-component";
import Button from "../../shared/components/FormElements/Button/Button";
import "./PlaceItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
const RatingPlace = (props) => {
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(props.rating);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
          />
          <div className="rating">{rating ? rating.toFixed(2) : null}</div>
        </div>
        {auth.token && (
          <Button inverse onClick={ratingHandler}>
            SUBMIT RATING
          </Button>
        )}
      </div>
    </>
  );
};
export default RatingPlace;
