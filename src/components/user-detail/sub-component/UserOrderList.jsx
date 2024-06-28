import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AssignedDriverPopup from "./AssignedDriverPopup";
import { useDispatch, useSelector } from "react-redux";
import { UserBookings } from "../../../Redux/Slices/QuotationSlice";
import { DateForDMY } from "../../../utils/FormatDate";
import { DataNotAvailable } from "../../modals";
const orders = [
  {
    id: 1,
    user: "John Doe",
  },
  {
    id: 2,
    user: "Jane Smith",
  },
  {
    id: 3,
    user: "Bob Johnson",
  },
  {
    id: 4,
    user: "Alice Williams",
  },
];

const UserOrderList = () => {
  const [Refresh, setRefresh] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const UserId = location?.state?.user_id
  const [orderList, setOrderList] = useState(orders);

  const [showAssignedDriverPop, setshowAssignedDriverPop] = useState(false);

  const handleDeletePopup = () => {
    setShowDeletePop((p) => !p);
  };

  const [acceptedOrderDetails, setAcceptedOrderDetails] = useState(null);

  const handlePopup = () => {
    setshowAssignedDriverPop((p) => !p);
  };

  const dispatch = useDispatch()
  const [userBookingsList, setUserBookingsList] = useState([])
  const [CurrentBooking, setCurrentBooking] = useState(null)

  const UserBookingsList = useSelector(state => state.Quotation.UserBookingsList)


  useEffect(() => {
    dispatch(UserBookings({ userId: UserId }))
  }, [Refresh])

  useEffect(() => {
    if (UserBookingsList.data) {
      setUserBookingsList(UserBookingsList.data.bookings)
    }
  }, [UserBookingsList.data])

console.log(UserBookingsList.data)
  // const OnDeletedClicked = (item) => {
  //   setCurrentBooking(item)
  //   handleDeletePopup()
  // }

  const OnView = (item) => {
    navigate("/booking-detail", { state: { data: item } })

    console.log("item=====", item)
  }

  console.log(userBookingsList)

  return (
    <>
    {userBookingsList?.length>0 ?
      <div className="responsive-table ">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-50px">Booking Id</th>
              <th className="w-150px text-center">Booking  Date</th>
              <th className="w-70px text-center">Service Type</th>
              <th className="w-150px text-center">Worker Status</th>
              <th className="w-70px text-center">Worker Name</th>

              <th className="w-150px text-center">Booking Status</th>
              <th className="w-70px text-end">Action</th>
            </tr>
          </thead>
          <tbody className="">
            
            {  userBookingsList.map((item, index) => {

                const {
                  id,
                  user_info,
                  address,
                  booking_date,
                  booking_time,
                  provided_services,
                } = item;
                const serviceNames = provided_services.map(service => service.service_name).join(', ');

                return (
                  <tr key={item.orderId} className="">
                    <td className="w-10px">{index + 1}</td>
                    <td className="">
                      <span className=""> #{id.slice(0, 6)}</span>
                    </td>
                    <td className="text-center">
                      {DateForDMY(booking_date)}</td>
                    <td className="text-center">{serviceNames}</td>
                    {!item.assigned ?
                      <td className="text-center">
                        {acceptedOrderDetails?.id !== item.id && (
                          <div className="ordrstats-acprjct">
                            <span
                              onClick={() => {
                                setAcceptedOrderDetails(item);
                              }}
                              className="ordrstats-icon acept-icon"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                                opacity="0.8"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
                              </svg>
                            </span>
                            <span
                              className="ordrstats-icon rejct-icon"
                              onClick={handleDeletePopup}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                opacity="0.8"
                              >
                                <path
                                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                  fill="red"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        )}

                        {acceptedOrderDetails &&
                          acceptedOrderDetails.id === item.id &&
                          (
                            <div className="asigneddrvr-main">
                              <span
                                className="asigneddrvr-btn"
                                onClick={handlePopup}
                              >
                                Assign Driver
                              </span>
                            </div>
                          )}
                      </td>
                      :
                      <td className="text-center">
                        <div className="asigneddrvr-main">
                          <span
                            className="asigneddrvr-btn"
                          >
                            Assigned
                          </span>
                        </div>
                      </td>}

                    <td className="text-center">
                      <div className="driveraster-assign">
                        <span className={`${item.assigned ? "" : "text-danger"}`}>
                          {item.assigned ? item?.emp_info?.full_name : "Not Assigned"}
                        </span>
                      </div>
                    </td>
                    <td className="text-center ">
                      <span className="badge badge-primary">{item.status}</span>
                    </td>

                    <td className="">
                      <div class="action-main">
                        <a
                          class="action-btn view-btn"
                          onClick={() => OnView(item)}
                        >
                          <span>
                            <svg
                              width="22"
                              height="17"
                              viewBox="0 0 22 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.1656 8.58936C21.1356 8.51036 20.4106 6.63136 18.7988 4.74836C16.6512 2.23936 13.9387 0.913361 10.9531 0.913361C7.96754 0.913361 5.25501 2.23936 3.10742 4.74836C1.49565 6.63136 0.767228 8.51336 0.740694 8.58936C0.701759 8.69167 0.681641 8.80239 0.681641 8.91436C0.681641 9.02633 0.701759 9.13705 0.740694 9.23936C0.770652 9.31836 1.49565 11.1964 3.10742 13.0794C5.25501 15.5874 7.96754 16.9134 10.9531 16.9134C13.9387 16.9134 16.6512 15.5874 18.7988 13.0794C20.4106 11.1964 21.1356 9.31836 21.1656 9.23936C21.2045 9.13705 21.2246 9.02633 21.2246 8.91436C21.2246 8.80239 21.2045 8.69167 21.1656 8.58936ZM10.9531 15.3134C8.31849 15.3134 6.01682 14.1944 4.11146 11.9884C3.32966 11.0801 2.66453 10.0443 2.13676 8.91336C2.66439 7.7823 3.32953 6.74654 4.11146 5.83836C6.01682 3.63236 8.31849 2.51336 10.9531 2.51336C13.5878 2.51336 15.8894 3.63236 17.7948 5.83836C18.5781 6.74632 19.2447 7.78208 19.7738 8.91336C19.1566 10.2594 16.4681 15.3134 10.9531 15.3134ZM10.9531 4.11336C10.1405 4.11336 9.34617 4.39488 8.67051 4.92231C7.99486 5.44974 7.46825 6.19939 7.15728 7.07648C6.84631 7.95357 6.76494 8.91869 6.92347 9.84979C7.082 10.7809 7.47331 11.6362 8.04791 12.3075C8.62251 12.9788 9.35459 13.4359 10.1516 13.6211C10.9486 13.8063 11.7747 13.7113 12.5254 13.348C13.2762 12.9847 13.9178 12.3695 14.3693 11.5801C14.8208 10.7907 15.0617 9.86271 15.0617 8.91336C15.0606 7.64073 14.6274 6.4206 13.8571 5.52071C13.0868 4.62082 12.0424 4.11468 10.9531 4.11336ZM10.9531 12.1134C10.4114 12.1134 9.88182 11.9257 9.43138 11.5741C8.98095 11.2224 8.62987 10.7227 8.42256 10.1379C8.21525 9.55322 8.161 8.90981 8.26669 8.28907C8.37238 7.66833 8.63325 7.09815 9.01631 6.65062C9.39938 6.20309 9.88743 5.89832 10.4188 5.77485C10.9501 5.65137 11.5008 5.71475 12.0013 5.95695C12.5018 6.19915 12.9296 6.6093 13.2306 7.13554C13.5315 7.66177 13.6922 8.28046 13.6922 8.91336C13.6922 9.76205 13.4036 10.576 12.8899 11.1761C12.3763 11.7762 11.6796 12.1134 10.9531 12.1134Z"
                                fill="#5b5b5b"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              }) }
              </tbody>
              </table>
              </div>
              :
              <DataNotAvailable /> 
        
      }
      {showAssignedDriverPop && (
        <AssignedDriverPopup
          setAcceptedOrderDetails={setAcceptedOrderDetails}
          acceptedOrderDetails={acceptedOrderDetails}
          handlePopup={handlePopup}
          setRefresh={setRefresh}
        />
      )}
    
    </>
  );
};

export default UserOrderList;
