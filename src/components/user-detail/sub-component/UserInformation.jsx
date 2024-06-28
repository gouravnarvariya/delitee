import React, { useEffect, useState } from "react";
import { UserImage } from "../../../assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails } from "../../../Redux/Slices/UserSlice";
import { FormatTimeStamp } from "../../../utils/FormatDate";

const UserInformation = () => {


  const location = useLocation()
  const UserId = location?.state?.user_id


  const dispatch = useDispatch()

  const [UserDetails, setUserDetails] = useState(null)

  const UserInfo = useSelector(state => state.User.UserInfo)
  console.log("UserInfo", UserInfo)

  useEffect(() => {
    dispatch(GetUserDetails(UserId))
  }, [])
  useEffect(() => {
    if (UserInfo.data) {
      setUserDetails(UserInfo.data)
   
    }
  }, [UserInfo.data])


  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="userinfo-head">
            <h2>User Information</h2>
          </div>
          <div className="ordr-infrmtion">
            <div className="usrprfl-srcen">
              <div className="userprfl-frame">
                <span style={{ backgroundImage: `url(${UserDetails?.profile_img})` }}></span>
              </div>
            </div>
            <div className="userdtl-card">
              <div className="brnd-vndrnmbr">
                <p>Name</p>
                <h4>{UserDetails?.full_name}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Date Of Registration</p>
                <h4>{FormatTimeStamp(UserDetails?.createdAt)}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Phone No.</p>
                <h4>{UserDetails?.phone}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Email</p>
                <h4>{UserDetails?.email}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Address</p>
                <h4>Pune</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
