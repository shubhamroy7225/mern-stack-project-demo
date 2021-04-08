import React,{useState} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Card from "../../shared/components/UIElements/Card/Card";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import RatingPlace from "./RatingPlace";
import Map from "../../shared/components/UIElements/Map/Map";
import Button from "../../shared/components/FormElements/Button/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import "./PlaceItem.css";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import UserComment from "./UserComment";
const AllPlaceItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    let newArray = [];
  props.image.map((img) => {
    let obj = {}
    obj.original = process.env.REACT_APP_ASSET_URL+'/'+img.original
    obj.thumbnail = process.env.REACT_APP_ASSET_URL+'/'+img.original
    newArray.push(obj)
  });

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
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
      <li className="place-item">
        <Card>
          <ImageGallery items={newArray} />
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
            <RatingPlace rating={props.rating} id={props.id} />
            <UserComment id={props.id} />
          </div>
        </Card>
      </li>
    </>
  );
};
export default AllPlaceItem;
