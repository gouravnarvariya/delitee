import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  GetAllCategory,
  clearIsCategoryAdd,
} from "../../../Redux/Slices/CategorySlice";
import { toast } from "react-toastify";
import ErrorMessage from "../../../utils/ErrorMessage";
import { ValidateCategory } from "../../../utils/Validation";

const AddCategoryPopup = ({ handlePopup }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState({ isValid: false });
  const [Inp, setInp] = useState({
    category_name: "",
    category_description: ""
  });

  const handleChange = ({ target }) => {
    const { name, value } = target
    setError(p => {
      const obj = { ...p }
      obj?.errors && delete obj?.errors[name]
      return obj
    })
    setInp({
      ...Inp,
      [name]: value,
    });
  };


  const IsCategoryAdd = useSelector((state) => state.Category.IsCategoryAdd);

  const handleSubmit = () => {
    const Values = {
      ...Inp,
    }
    const errorMessage = ValidateCategory(Values);
    setError(errorMessage);

    if (errorMessage?.isValid) {
      dispatch(AddCategory(Values));
    }
  };


  useEffect(() => {
    if (IsCategoryAdd.data) {
      toast.success("Category Added Successfully");
      dispatch(clearIsCategoryAdd());
      dispatch(GetAllCategory());
      handlePopup()
    }
  }, [IsCategoryAdd.data]);
  return (
    <>
      <div className="main-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-header">
                <div className="popup-heading">
                  <h3>Add Category</h3>
                </div>
              </div>
              <div className="popup-body">
                <div className="form-main">
                  <div className="form-inputs">
                    <label className="form-label">Category Title</label>
                    <div className="service-addinput">
                      <input
                        type="text"
                        placeholder="Enter Category Title"
                        value={Inp.category_name}
                        name="category_name"
                        onChange={handleChange}
                      />
                    </div>
                    <ErrorMessage error={error} title={'category_name'} />
                  </div>
                  <div className="form-inputs">
                    <label className="form-label">Category Description</label>
                    <div className="service-addinput">
                      <input
                        type="text"
                        placeholder="Enter Category Description"
                        value={Inp.category_description}
                        name="category_description"
                        onChange={handleChange}
                      />
                    </div>
                    <ErrorMessage error={error} title={'category_description'} />
                  </div>
                  <div className="form-btn">
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={handlePopup}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn primary-btn"
                      onClick={handleSubmit}
                    >
                      Save
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

export default AddCategoryPopup;
