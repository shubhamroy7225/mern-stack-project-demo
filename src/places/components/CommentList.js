import React from 'react';
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../shared/components/UIElements/Card/Card';
import  "./CommentList.css"
const CommentList = (props) => {
    console.log(props);
    return (
        <li className='user-items'>
            <div className="user-items__image">
                <div className="Avatar">
                <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.comment.userImage}`} alt={props.user}/>
                </div>
                <b>{props.comment.userName}</b><p></p>{props.comment.userComment}
            </div>
        </li>
    );
};

export default CommentList;