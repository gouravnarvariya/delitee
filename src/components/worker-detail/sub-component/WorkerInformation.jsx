import React, { useEffect, useState } from 'react'
import { UserImage } from "../../../assets/images";
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDetails } from '../../../Redux/Slices/UserSlice';
import { useLocation } from 'react-router-dom';
import { FormatTimeStamp } from '../../../utils/FormatDate';
const WorkerInformation = () => {

  const location = useLocation()
  const WorkerId = location?.state?.workerId

  const dispatch = useDispatch()

  const [WorkerDetails, setWorkerDetails] = useState(null)

  const UserInfo = useSelector(state => state.User.UserInfo)

  useEffect(() => {
    dispatch(GetUserDetails(WorkerId))
  }, [])

  useEffect(() => {
    if (UserInfo.data) {
      setWorkerDetails(UserInfo.data)
    }
  }, [UserInfo.data])


  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="userinfo-head">
            <h2>Worker Information</h2>
          </div>
          <div className="ordr-infrmtion">
            <div className="usrprfl-srcen">
              <div className="userprfl-frame">
              <span style={{ backgroundImage: `url(${WorkerDetails?.profile_img})` }}></span>
              </div>
            </div>
            
            <div className="userdtl-card">
              <div className="brnd-vndrnmbr">
                <p>Name</p>
                <h4>{WorkerDetails?.full_name}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Date Of Registration</p>
                <h4>{FormatTimeStamp(WorkerDetails?.createdAt)}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Phone No.</p>
                <h4>{WorkerDetails?.phone}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Email</p>
                <h4>{WorkerDetails?.email}</h4>
              </div>
              {/* <div className="brnd-vndrnmbr">
                <p>Address</p>
                <h4>Pune</h4>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkerInformation