import React from "react";

import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={
        <Button success onClick={props.onClear}>
          Okay
        </Button>
      }
    >
      <h2
        style={{
          color: "red",
        }}
      >
        {props.error}
      </h2>
    </Modal>
  );
};

export default ErrorModal;
