import React, {useState } from 'react';

const MultipleImagesUpload = () => {
    const [imgCollection,setImgCollection]=useState('')
    const onFileChange=(e)= {
        setImgCollection()
    }

    const onSubmit=(e)=> {
        e.preventDefault()

        var formData = new FormData();
        for (const key of Object.keys(state.imgCollection)) {
            formData.append('imgCollection', state.imgCollection[key])
        }
        
    }
    return (
        <div className="container">
                <div className="row">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default MultipleImagesUpload;