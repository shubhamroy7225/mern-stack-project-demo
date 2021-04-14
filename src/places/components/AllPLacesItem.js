import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import "./PlaceItem.css";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
const AllPlaceItem = (props) => {
  const { isLoading, error, clearError } = useHttpClient();
  let newArray = [];
  props.image.map((img) => {
    let obj = {};
    obj.original = process.env.REACT_APP_ASSET_URL + "/" + img.original;
    obj.thumbnail = process.env.REACT_APP_ASSET_URL + "/" + img.original;
    newArray.push(obj);
  });
  let imgUrl = newArray[0].original;

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <li className="place-item">
        <Card>
          <img src={imgUrl} alt="" className="place-item-image" />
          <div className="place-item__image">
            {isLoading && <LoadingSpinner asOverlay />}
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <Button inverse to={`/places/details/${props.id}`}>
              VIEW DETAIL
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};
export default AllPlaceItem;
