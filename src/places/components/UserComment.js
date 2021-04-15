import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import CommentList from "./CommentList";
import { useParams } from "react-router";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
const UserComment = (props) => {
  const auth = useContext(AuthContext);
  const placeId = useParams().placeId;
  const id = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [comments, setComments] = useState();
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState({
    userId: "",
    comment: "",
  });

  const changedHandler = (event) => {
    setComment({
      ...comment,
      userId: auth.userId,
      comment: event.target.value,
    });
  };

  useEffect(() => {
    const getPlaceByPlaceId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
          "GET"
        );
        console.log(response);
        setComments(response.comments);
      } catch (err) {}
    };
    getPlaceByPlaceId();
    setUpdate(false);
  }, [sendRequest, update, placeId]);

  // useEffect(() => {
  //   if ( props.createId) {
  //     const getAllPlacesByUserId = async () => {
  //       try {
  //         const response = await sendRequest(
  //           `${process.env.REACT_APP_BACKEND_URL}/places/user/${
  //             props.createId
  //           }`,
  //           "GET"
  //         );
  //         response.map((place) => {
  //           return setComments(place.comments);
  //         });
  //       } catch (err) {}
  //     };
  //     getAllPlacesByUserId();
  //   } else {
  //     setComments(props.comment);
  //   }
  //   setUpdate(false);
  // }, [sendRequest, id, update,props.createId]);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places/comments",
        "POST",
        JSON.stringify({ comment, id: placeId }),
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
      {auth.token && (
        <Card>
          <div className="comment">
            {isLoading && <LoadingSpinner asOverlay />}
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
        </Card>
      )}
      {comments &&
        comments.map((comment, index) => {
          return <CommentList key={index} comment={comment} />;
        })}
    </>
  );
};

export default UserComment;
