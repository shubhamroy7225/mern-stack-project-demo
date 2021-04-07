import React from 'react';
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../shared/components/UIElements/Card/Card';
import  "./CommentList.css"
const CommentList = (props) => {
    console.log(props);
    return (
        <li className='user-items'>
            <Card>
            <div className="user-items__image">
                <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.comment.userImage}`} alt={props.user}/>
                <h2>{props.comment.userName}</h2>
                </div>
                <div className="user-items__info">
                <h2>{props.comment.userComment}</h2>
            </div>
            </Card>  
        </li>
    );
};

export default CommentList;