import React from "react";
import Select from "react-select";
import { Uploader } from "../../image-uploder";
const PopupEditAllergy = ({ handlePopup }) => {
  const options = [
    { value: "Blind Cleaning", label: "Blind Cleaning" },
    { value: "Commercial Cleaning", label: "Commercial Cleaning" },
  ];
  return (
    <>
      <div className="main-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-header">
                <div className="popup-heading">
                  <h3>Edit Service</h3>
                </div>
              </div>
              <div className="popup-body">
                <div className="form-main">
                <div className="form-inputs">
                    <label className="form-label">
                     Select Category
                    </label>
                    <div className="select-box">
                      <Select options={options}/>
                    </div>
                  </div> 
                <div className="form-inputs">
                    <label className="form-label">
                     Service Title
                    </label>
                      <input type="text" placeholder="Enter Service Title" />
                  </div> 

                   <div className="form-inputs">
                    <label className="form-label">
                    Description
                    </label>
                    <textarea rows="4" cols="50" >Enter Description here...</textarea>  
                  </div>  

                  <div className="form-inputs">
              <label className="form-label">Service Image</label>
              {/* <Uploader /> */}
            </div>

                  <div className="form-btn">
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={handlePopup}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn primary-btn">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  );
};



export default PopupEditAllergy