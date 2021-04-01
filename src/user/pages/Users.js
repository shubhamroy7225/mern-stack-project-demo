import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
const Users = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:5001/api/users",
          "GET"
        );
        setUsers(response);
      } catch (err) {}
    };
    getAllUsers();
  }, [sendRequest]);

  return (
    <div>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && users && <UsersList items={users} />}
    </div>
  );
};

export default Users;
