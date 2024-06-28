import React, { useState, useEffect } from "react";
import Select from "react-select";
import { addIcon, removeIcon } from "../../../assets/images";
import { Uploader } from "../../image-uploder";
import { useDispatch, useSelector } from "react-redux";
import {
  EditService,
  clearIsServiceAdd,
  GetAllService,
  clearIsServiceEdit
} from "../../../Redux/Slices/ServiceSlice";
import { toast } from "react-toastify";
import { GetAllCategory } from "../../../Redux/Slices/CategorySlice";
import { ValidateService } from "../../../utils/Validation";
import ErrorMessage from "../../../utils/ErrorMessage";

const PopupEditService = ({ handlePopup, serviceId, CurrentService }) => {
  const options = [
    { value: "Blind Cleaning", label: "Blind Cleaning" },
    { value: "Commercial Cleaning", label: "Commercial Cleaning" },
  ];
  const dispatch = useDispatch();
  const CategoryList = useSelector((state) => state.Category.CategoryList);
  const [error, setError] = useState({ isValid: false });
  const [inputService, setInputService] = useState({
    service_name: "",
  });
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [imagesFiles, setImagesFiles] = useState({ file: null, url: "" });

  useEffect(() => {
    dispatch(GetAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(CategoryList.data.categories)) {
      let newCategory = CategoryList?.data?.categories.map((item) => {
        let newdata = { value: item.id, label: item.category_name, data: item };
        return newdata;
      });
      setCategoryList(newCategory);
    }
  }, [CategoryList]);


  const handleSubmit = () => {
    const items = [];
    inputFields.map((item) => item.value && items.push(item.value));
    const AddServiceData = {
      service_name: inputService.service_name,
      service_description: JSON.stringify(items),
      category_id: selectedCategory.value,
    };
    const form = new FormData();

    for (const key in AddServiceData) {
      if (AddServiceData.hasOwnProperty(key)) {
        form.append(key, AddServiceData[key]);
      }
    }
    const send_data = {
      serviceId: CurrentService.id,
      form: form
    }

    imagesFiles.file && form.append("service_image", imagesFiles.file);

    const Values = {
      ...AddServiceData,
      service_description: JSON.stringify(items.filter(item => console.log("--", item, item !== ""))),
      service_image: imagesFiles.file || imagesFiles.url
    }
    const errorMessage = ValidateService(Values);
    setError(errorMessage);

    if (errorMessage?.isValid) {
      dispatch(EditService(send_data));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target
    setError(p => {
      const obj = { ...p }
      obj?.errors && delete obj?.errors[name]
      return obj
    })
    setInputService({
      ...inputService,
      [name]: value,
    });
  };

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

  const IsServiceEdit = useSelector((state) => state.Service.IsServiceEdit);
  useEffect(() => {
    if (IsServiceEdit.data) {
      toast.success("Service Update Successful");
      handlePopup();
      dispatch(clearIsServiceEdit())
      dispatch(GetAllService())
    }
  }, [IsServiceEdit.data]);

  useEffect(() => {
    if (IsServiceEdit.error) {
      toast.error(IsServiceEdit.error.message);
      dispatch(clearIsServiceEdit())
    }
  }, [IsServiceEdit.error]);

  /* Already filled data */
  useEffect(() => {
    if (CurrentService) {
      setInputService((p) => ({ ...p, service_name: CurrentService.service_name }));
      setImagesFiles({ file: null, url: CurrentService.service_image });
      let value = {
        value: CurrentService.categories.id,
        label: CurrentService.categories.category_name
      }
      setSelectedCategory(value)

      let Items = []
      CurrentService.service_description.map((name) => Items.push({ value: name }))
      setInputFields([...Items, { value: '' }])
    }
  }, [CurrentService]);

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
                    <label className="form-label">Select Category</label>
                    <div className="select-box">
                      <Select
                        options={categoryList}
                        value={selectedCategory}
                        onChange={(e) => {
                          setError(p => {
                            const obj = { ...p }
                            obj?.errors && delete obj?.errors['category_id']
                            return obj
                          })
                          setSelectedCategory(e);
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
                      value={inputService.service_name}
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

export default PopupEditService;
