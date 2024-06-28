import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserImage } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { WorkerBookings } from "../../../Redux/Slices/QuotationSlice";
import { FormatTimeStamp } from "../../../utils/FormatDate";
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
  {
    id: 5,
    user: "Charlie Brown",
  },

];

const WorkerWorkingList = () => {
  const [orderList, setOrderList] = useState(orders);
  const location = useLocation()
  const WorkerId = location?.state?.workerId

  const dispatch = useDispatch()
  const [workerBookingsList, setWorkerBookingsList] = useState([])
  const WorkerBookingsList = useSelector(state => state.Quotation.WorkerBookingsList)


  useEffect(() => {
    dispatch(WorkerBookings({ workerId: WorkerId }))
  }, [])
  useEffect(() => {
    if (WorkerBookingsList.data) {
      setWorkerBookingsList(WorkerBookingsList.data.assignedBookings)
    }
  }, [WorkerBookingsList.data])

  return (
    <>
    {workerBookingsList.length >0 ? 
      <div className="responsive-table ">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-150px">User Detail</th>
              <th className="w-150px ">Contact Detail</th>
              <th className="w-100px text-center">Date</th>
              <th className="w-100px text-center">Service Type</th>
            </tr>
          </thead>
          <tbody className="">
            {workerBookingsList &&
              workerBookingsList.map((item, index) => {
                const {
                  id, 
                  user_info,
                  address,
                  booking_date,
                  booking_time,
                  provided_services,
                } = item.bookingDetails;
                const serviceNames = provided_services.map(service => service.service_name).join(', ');
                return (
                  <tr key={item.orderId} className="">
                    <td className="w-10px">{index + 1}</td>
                    <td className="">
                      <div className="usrdtls-td">
                        <div className="userprfl-bg">
                          <span
                            style={{ backgroundImage: `url(${user_info?.profile_img})` }}
                          >
                          </span>
                        </div>
                        <div className="prd-descrp">
                          <span className="d-block fw-bold titl-view">
                            {user_info.full_name}
                          </span>
                          <span className="d-block fw-normal">
                            Order id: #{id?.slice(0, 6)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="prd-contect">
                        <span className="d-block  titl-view fw-normal">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          {user_info?.phone}
                        </span>
                        <span className="d-block fw-normal">
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                          {user_info?.email}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">{FormatTimeStamp(booking_date)}</td>

                    <td className="text-center">{serviceNames}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
        :
        <DataNotAvailable/>
    }
    </>
  );
};

export default WorkerWorkingList;
