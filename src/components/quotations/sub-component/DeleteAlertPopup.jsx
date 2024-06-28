import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteBooking, clearIsBookingDeleted, fetchBookings } from '../../../Redux/Slices/QuotationSlice'
import { toast } from 'react-toastify'

const DeleteAlertPopup = ({ handlePopup, CurrentBooking }) => {

  console.log("id ----> ", CurrentBooking.id)
  const dispatch = useDispatch()

  const OnDeleted = () => {
    dispatch(DeleteBooking(CurrentBooking.id))
  }
  const IsBookingDeleted = useSelector(state => state.Quotation.IsBookingDeleted)
  useEffect(() => {
    if (IsBookingDeleted.data) {
      toast.success('Deleted Successful')
      dispatch(clearIsBookingDeleted())
      handlePopup()
      dispatch(fetchBookings({ type: "" }));
    }
  }, [IsBookingDeleted.data])


  useEffect(() => {
    if (IsBookingDeleted.error) {
      toast.error(IsBookingDeleted.error?.message)
      dispatch(clearIsBookingDeleted())
    }
  }, [IsBookingDeleted.error])
  
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
                  <p>You want to Delete this Quotation!</p>
                </div>
                <div className="form-btn">
                  <button type="button" className="btn primary-btn" onClick={OnDeleted}>Yes Delete it!</button>
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