import React from "react";
const MultipleImageUpload = (props) => {
    return (
      <div className="form-control">
        <input
          type="file"
          class="form-control"
          multiple
          onChange={props.onChangeHandler}
        />
      </div>
    );
  };
  
  export default MultipleImageUpload;