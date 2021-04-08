import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import CommentList from "./CommentList";
import { useParams } from "react-router";
const UserComment = (props) => {
  const auth = useContext(AuthContext);
  const id = useParams().userId
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [comments, setComments] = useState([]);
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
    const getAllPlacesByUserId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${id}`,
          "GET"
        );
        console.log(response);
        response.map((place) => {
          return setComments(place.comments);
        });
      } catch (err) {}
    };
    getAllPlacesByUserId();
  }, [sendRequest, id, update]);
  console.log(comments);
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
    <Card>
      {auth.token && (<div className="comment">
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
      </div>)}
      {comments &&
        comments.map((comment, index) => {
          return <CommentList key={index} comment={comment} />;
        })}
    </Card>
  );
};

export default UserComment;
