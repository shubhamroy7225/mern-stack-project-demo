import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from "../../shared/components/UIElements/Avatar/Avatar"
import Card from "../../shared/components/UIElements/Card/Card"
import "./UserItem.css"
const UserItem = (props) => {
   
    return (
        <li className='user-item'>
                <Card className="user-item__content">
                <Link to={`${props.id}/places`}>
            <div className="user-item__image">
                {/* <img src={props.image} alt=""/> */}
                <Avatar image={props.image} alt={props.user}/>
                </div>
                <div className="user-item__info">
                <h2>{props.user}</h2>
                <h3>{props.places} {props.places < 1 ?'place':'places'}</h3>
            </div>
            </Link>
            </Card>
            
        </li>
    );
};

export default UserItem;