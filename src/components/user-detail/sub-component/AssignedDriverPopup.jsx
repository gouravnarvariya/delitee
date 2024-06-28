import React, { useEffect, useState } from "react";
import Select from "react-select";
import { GetAllWorkers } from "../../../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AssignBooking, clearIsBookingAssigned } from "../../../Redux/Slices/QuotationSlice";
import { toast } from "react-toastify";

const AssignedDriverPopup = ({
  handlePopup,
  setAcceptedOrderDetails,
  acceptedOrderDetails,
  setRefresh
}) => {
  const options = [
    { value: "Ravi Patel", label: "Ravi Patel" },
    { value: "Kunal Rastogi", label: "Kunal Rastogi" },
    { value: "Asif Khan", label: "Asif Khan" },
  ];

  const dispatch = useDispatch()
  const [selectedDriverValue, setSelectedDriverValue] = useState(null);

  const handleSubmit = () => {
    const body = {
      emp_id: selectedDriverValue,
      bookingId: acceptedOrderDetails.id
    }
    dispatch(AssignBooking(body))
  };
  const IsBookingAssigned = useSelector((state) => state.Quotation.IsBookingAssigned);

  useEffect(() => {
    if (IsBookingAssigned.data) {
      toast.success("Booking Assigned")
      dispatch(clearIsBookingAssigned())
      handlePopup()
      setRefresh(p => !p)
    }
  }, [IsBookingAssigned.data])

  useEffect(() => {
    if (IsBookingAssigned.error) {
      toast.error(IsBookingAssigned.error?.message)
      dispatch(clearIsBookingAssigned())
      handlePopup()
    }
  }, [IsBookingAssigned.error])

  const handleCancel = () => {
    setAcceptedOrderDetails(null)
    handlePopup()
  };

  const WorkerList = useSelector((state) => state.User.WorkerList);
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    dispatch(GetAllWorkers());
  }, [dispatch]);

  useEffect(() => {
    if (WorkerList.data) {
      const options = []
      WorkerList.data.map((item) => {
        options.push({ value: item.id, label: item.full_name })
      })
      setWorkerList(options);
    }
  }, [WorkerList.data]);

  return (
    <>
      <div className="main-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-header">
                <div className="popup-heading">
                  <h3>Assigned Worker</h3>
                </div>
              </div>
              <div className="popup-body">
                <div className="form-main">
                  <div className="form-inputs">
                    <label className="form-label">
                      Select Worker<i>*</i>
                    </label>
                    <div className="select-box">
                      <Select
                        value={options.find(
                          (item) => item.value === selectedDriverValue
                        )}
                        onChange={(e) => {
                          setSelectedDriverValue(e.value);
                        }}
                        options={workerList}
                      />
                    </div>
                  </div>
                  <div className="form-btn">
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="btn primary-btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handleCancel}></div>
      </div>
    </>
  );
};

export default AssignedDriverPopup;
