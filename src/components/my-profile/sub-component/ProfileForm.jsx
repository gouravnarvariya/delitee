import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword, GetProfileDetails, UpdateUsers, clearPasswordChanged } from "../../../Redux/Slices/UserSlice";
import ErrorMessage from "../../../utils/ErrorMessage";
import { toast } from "react-toastify";
import { ValidateChangePassword, ValidateUpdate } from "../../../utils/Validation";
import { useNavigate } from "react-router-dom";
const ProfileForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState({ isValid: false });


  const ProfileInfo = useSelector(state => state.User.ProfileInfo)
  const UpdateUser = useSelector(state => state.User.UpdateUser)
  const ChangePass = useSelector(state => state.User.PasswordChanged)
  // console.log("ChangePass:" , ChangePass)


  const navigate = useNavigate()

  const [Inp, setInp] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [inputs, setInputs] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: ""
  });

  const dispatch = useDispatch()
  
  const handleButtonClick = () => {
    if (!clicked) {
    console.log("second")
      setIsVisible(true);
      setClicked(true);
    }else {
      const errorMessage = ValidateChangePassword(inputs)
      console.log(errorMessage)
      setError(errorMessage)
      console.log("error:" , error)
      if(errorMessage.isValid) {
      const obj = {
        currentPassword:inputs.old_password,
        newPassword:inputs.new_password
      }
      dispatch(ChangePassword(obj))
      }


    }
  }; 

  
  const handlePasswordChange = ({ target }) => {
    const { name, value } = target
    setError(p => {
      const obj = { ...p }
      obj?.errors && delete obj?.errors[name]
      return obj
    })
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs)
  };


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
    console.log(Inp)
  };

  const handleSubmit = () => {
    const errorMessage = ValidateUpdate(ProfileInfo?.data,Inp)
      console.log(errorMessage)
    if(errorMessage.isValid) {
      const forms = new FormData()
      forms.append('full_name',Inp.full_name)
      forms.append('email',Inp.email)
      forms.append('phone',Inp.phone)
      dispatch(UpdateUsers({forms}))
    } else {
      setError(errorMessage)
    }
  }






  useEffect(() => {
    dispatch(GetProfileDetails())
  }, [])

  useEffect(() => {
    if (ProfileInfo.data) {
      // console.log('ProfileInfo.data', ProfileInfo.data)
      const { full_name, phone, email } = ProfileInfo.data
      setInp({ full_name, phone, email })
    }
  }, [ProfileInfo.data])


useEffect(() => {
  if (UpdateUser?.data) {
    if (UpdateUser?.message === 'Profile updated successfully') {
      toast.success("Profile updated successfully");
      setError()
    }
  }
}, [UpdateUser]); // Add UpdateUser as a dependency

useEffect(() => {
  if (ChangePass?.message?.message==="password changed successfully") {
    setInputs({
      old_password: "",
      new_password: "",
      confirm_new_password: ""
    })
    toast.success('Password Changed !')
    setIsVisible(false);
    setClicked(false);
    setError()
  }
  return () => {
    dispatch(clearPasswordChanged())
  }
}, [ChangePass.message])

useEffect(() => {
  if (ChangePass?.error) {
    setInputs({
      old_password: "",
      new_password: "",
      confirm_new_password: ""
    })
    toast.error(ChangePass?.error ||"something happen try again")
  }
  return () => {
    dispatch(clearPasswordChanged())
  }
}, [ChangePass.error])



  return (
    <>
      <div className="form-flex">
        <div className="form-inner-flx">
          <div className="card">
            <div class="card-header">
              <h3>Profile Detail</h3>
            </div>
            <div className="card-body">
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
                      <ErrorMessage error={error} title={'full_name'} />
                    </div>
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
                    Cancel
                  </button>
                  <button type="button" 
                  onClick={handleSubmit}
                  className="btn primary-btn">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-inner-flx">
          <div className="card">
            <div class="card-header">
              <h3>Change Password</h3>
            </div>
            <div className="card-body">
              {isVisible && (
                <div className="form-flex">
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        Current Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="old_password"
                        className="form-control"
                        placeholder="**********"
                        value={inputs.old_password}
                        onChange={handlePasswordChange}
                      />
                      <ErrorMessage error={error} title={'old_password'} />
                    </div>
                    
                  </div>
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        New Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        className="form-control"
                        placeholder="**********"
                        value={inputs.new_password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <ErrorMessage error={error} title={'new_password'} />

                  </div>
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        Confirm Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="confirm_new_password"
                        className="form-control"
                        placeholder="**********"
                        value={inputs.confirm_new_password}
                        onChange={handlePasswordChange}

                      />
                    </div>
                    <ErrorMessage error={error} title={'confirm_new_password'} />

                  </div>
                </div>
              )}
              <div className="frm-btn-main">
                <div className="changepassword-link">
                  <button
                    type="button"
                    className="btn primary-btn"
                    onClick={handleButtonClick}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
