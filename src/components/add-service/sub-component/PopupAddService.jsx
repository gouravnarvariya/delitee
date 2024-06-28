import React, { useState, useEffect } from "react";
import Select from "react-select";
import { addIcon, removeIcon } from "../../../assets/images";
import { Uploader } from "../../image-uploder";
import { useDispatch, useSelector } from "react-redux";
import { AddService, clearIsServiceAdd, GetAllService } from "../../../Redux/Slices/ServiceSlice";
import { toast } from "react-toastify";
import { GetAllCategory } from "../../../Redux/Slices/CategorySlice";
import ErrorMessage from "../../../utils/ErrorMessage";
import { ValidateService } from "../../../utils/Validation";

const PopupAddService = ({ handlePopup }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState({ isValid: false });
  const [Inp, setInp] = useState({
    service_name: "",
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

  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [categoryList, setCategoryList] = useState([]);
  const [imagesFiles, setImagesFiles] = useState({ file: null, url: "" });
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(GetAllCategory());
  }, [dispatch]);

  const CategoryList = useSelector((state) => state.Category.CategoryList);

  useEffect(() => {
    if (Array.isArray(CategoryList.data.categories)) {
      let newCategory = CategoryList?.data?.categories.map((item) => {
        let newdata = { value: item.id, label: item.category_name, data: item };
        return newdata;
      });
      setCategoryList(newCategory);
    }
  }, [CategoryList]);

  const handleAddInput = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    const newFields = inputFields.slice();
    newFields.splice(index, 1);
    setInputFields(newFields);
  };

  const handleInputChange = (index, event) => {
    setError(p => {
      const obj = { ...p }
      obj?.errors && delete obj?.errors['service_description']
      return obj
    })
    const newFields = inputFields.slice();
    newFields[index].value = event.target.value;
    setInputFields(newFields);
  };


  const handleSubmit = () => {
    const items = [];
    inputFields.map((item) => item.value && items.push(item.value));
    const AddServiceData = {
      service_name: Inp.service_name,
      service_description: JSON.stringify(items),
      category_id: categoryId,
    };

    const form = new FormData();
    for (const key in AddServiceData) {
      if (AddServiceData.hasOwnProperty(key)) {
        form.append(key, AddServiceData[key]);
      }
    }
    imagesFiles.file && form.append("service_image", imagesFiles.file);

    const Values = {
      ...AddServiceData,
      service_description: JSON.stringify(items),
      service_image: imagesFiles.file
    }
    const errorMessage = ValidateService(Values);
    setError(errorMessage);

    if (errorMessage?.isValid) {
      dispatch(AddService(form));
    }

  };

  const IsServiceAdd = useSelector((state) => state.Service.IsServiceAdd);

  useEffect(() => {
    if (IsServiceAdd.data) {
      toast.success("Added Successful", IsServiceAdd);
      dispatch(clearIsServiceAdd())
      dispatch(GetAllService())
      handlePopup();
    }
  }, [IsServiceAdd.data]);


  useEffect(() => {
    if (IsServiceAdd.error) {
      toast.error(IsServiceAdd.error?.message)
      dispatch(clearIsServiceAdd())
    }
  }, [IsServiceAdd.error]);

  return (
    <>
      <div className="main-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-header">
                <div className="popup-heading">
                  <h3>Add Service</h3>
                </div>
              </div>
              <div className="popup-body">
                <div className="form-main">
                  <div className="form-inputs">
                    <label className="form-label">Select Category</label>
                    <div className="select-box">
                      <Select
                        options={categoryList}
                        value={categoryList.find(
                          (item) => item.label === categoryValue
                        )}
                        onChange={(e) => {
                          setCategoryValue(e.label);
                          setCategoryId(e.value);

                          setError(p => {
                            const obj = { ...p }
                            obj?.errors && delete obj?.errors['category_id']
                            return obj
                          })
                        }}
                      />
                    </div>
                    <ErrorMessage error={error} title={'category_id'} />
                  </div>
                  <div className="form-inputs">
                    <label className="form-label">Service Title</label>
                    <input
                      type="text"
                      placeholder="Enter Service Title"
                      value={Inp.service_name}
                      name="service_name"
                      onChange={handleChange}
                    />
                    <ErrorMessage error={error} title={'service_name'} />
                  </div>

                  <div className="form-inputs">
                    <label className="form-label">Description</label>
                    {inputFields.map((inputField, index) => (
                      <div className="service-addinput" key={index}>
                        <input
                          type="text"
                          placeholder="Enter text here.."
                          value={inputField.value}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {index === inputFields.length - 1 ? (
                          <img
                            src={addIcon}
                            alt="Add"
                            onClick={handleAddInput}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <img
                            src={removeIcon}
                            alt="Remove"
                            onClick={() => handleRemoveInput(index)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </div>
                    ))}
                    <ErrorMessage error={error} title={'service_description'} />
                  </div>

                  <div className="form-inputs">
                    <label className="form-label">Service Image</label>
                    <Uploader
                      imagesFiles={imagesFiles}
                      setImagesFiles={setImagesFiles}
                      setErrorImage={setError} title={'service_image'} error={error}
                    />
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
                      // disabled={s == ''}

                      className="btn primary-btn"
                      onClick={handleSubmit}
                    >
                      Add
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

export default PopupAddService;
