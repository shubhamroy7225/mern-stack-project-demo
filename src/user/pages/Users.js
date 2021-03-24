import React from 'react';
import UsersList from '../components/UsersList';


const Users = props => {
    const users=[
        {id:'u1',img:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',name:'shubham',place:3},
       

    ]
    return (
        <div>
            <UsersList items={users} />
        </div>
    );
};



export default Users;