import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetAllWorkers, clearIsUserDeleted } from '../../../Redux/Slices/UserSlice'
import { toast } from 'react-toastify'

const DeleteAlertPopup = ({ handlePopup, CurrentWorker }) => {

  const dispatch = useDispatch()

  const OnDeleted = () => {
    dispatch(DeleteUser(CurrentWorker.id))
  }
  const IsUserDeleted = useSelector(state => state.User.IsUserDeleted)
  useEffect(() => {
    if (IsUserDeleted.data) {
      toast.success('Deleted Successful')
      dispatch(clearIsUserDeleted())
      handlePopup()
      dispatch(GetAllWorkers());
    }
  }, [IsUserDeleted.data])


  useEffect(() => {
    if (IsUserDeleted.error) {
      toast.error(IsUserDeleted.error?.message)
      dispatch(clearIsUserDeleted())
    }
  }, [IsUserDeleted.error])

  return (
    <>
      <div className="main-popup deleat-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-body">
                <div className='alert-descrp'>
                  <div className='alert-icon'>
                    <span>!</span>
                  </div>
                  <h3>Are you sure?</h3>
                  <p>You want to Delete this Worker!</p>
                </div>
                <div className="form-btn">
                  <button type="button" className="btn primary-btn" onClick={OnDeleted}>Yes </button>
                  <button
                    type="button"
                    className="btn secondary-btn"
                    onClick={handlePopup}
                  >No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  )
}

export default DeleteAlertPopup