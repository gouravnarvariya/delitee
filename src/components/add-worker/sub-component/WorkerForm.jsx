import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValidateEmployee } from "../../../utils/Validation";
import { AddWorker, clearEmployeeAddUser } from "../../../Redux/Slices/UserSlice";
import { toast } from "react-toastify";
import ErrorMessage from "../../../utils/ErrorMessage";
import { useNavigate } from "react-router-dom";
const WorkerForm = () => {

  const dispatch = useDispatch();

  const [error, setError] = useState({ isValid: false });

  const EmployeeSignUp = useSelector(state => state.User.EmployeeSignUp)

  const navigate = useNavigate();

  console.log("EmployeeSignUp :", EmployeeSignUp)

  const [Inp, setInp] = useState({
    full_name: "",
    email: "",
    phone:""
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

  const handleSubmit = () => {
    const Values = {
      ...Inp,
    }
    const errorMessage = ValidateEmployee(Values);
    setError(errorMessage);

    if (errorMessage?.isValid) {
      dispatch(AddWorker(Values));
    }
  };

  useEffect(() => {
    if (EmployeeSignUp.data) {
      toast.success("Employee Added Successfully");
      dispatch(clearEmployeeAddUser());
      setInp({
        full_name: "",
        email: "",
        phone:""
      })
    }
  }, [EmployeeSignUp.data]);

console.log(error)
  return (
    <>
      <div className="form-main">
        <div className="form-flex">
          <div className="form-inner-flx">
            <div className="form-inputs">
              <label className="form-label">
                Full Name<i>*</i>
              </label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                placeholder="Enter full name here"
                value={Inp.full_name}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage error={error} title={'full_name'} />
          </div>
          <div className="form-inner-flx">
            <div className="form-inputs">
              <label className="form-label">
                Phone No.<i>*</i>
              </label>
              <input
                type="num"
                name="phone"
                className="form-control"
                placeholder="Enter phone no. here"
                value={Inp.phone}
                onChange={handleChange}
              />
               <ErrorMessage error={error} title={'phone'} />
            </div>
          </div>
          <div className="form-inner-flx">
            <div className="form-inputs">
              <label className="form-label">
                Email<i>*</i>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email name here"
                value={Inp.email}
                onChange={handleChange}
              />
               <ErrorMessage error={error} title={'email'} />
            </div>
          </div>
        </div>

        <div className="form-btn">
          <button type="button"
          onClick={()=>{navigate(-1)}}
           className="btn secondary-btn">
            Close
          </button>
          <button type="button" 
          onClick={handleSubmit}
          className="btn primary-btn">
            Add
          </button>
        </div>
      </div>
    </>
  );
};
export default WorkerForm;
