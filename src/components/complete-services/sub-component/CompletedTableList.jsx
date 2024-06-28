import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserImage } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../Redux/Slices/QuotationSlice";
import { FormatTimeStamp } from "../../../utils/FormatDate";
import { DataNotAvailable } from "../../modals";

const CompletedTableList = () => {

  const dispatch = useDispatch()
  const [bookingList, setBookingList] = useState([]);

  const QuotationList = useSelector((state) => state.Quotation.QuotationList);

  useEffect(() => {
    dispatch(fetchBookings({ type: "COMPLETED" }));
  }, [dispatch]);

  useEffect(() => {
    if (QuotationList.data) {
      setBookingList(QuotationList.data.bookings)
    };
  }, [QuotationList.data])


  return (
    <>
    {
      bookingList?.length>0 ? 
      <div className="responsive-table stkytable-action">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-200px">User Detail</th>
              <th className="w-175px">Contact Detail</th>
              <th className="w-150px  text-center">Address</th>
              <th className="w-150px text-center">Date</th>
              <th className="w-150px text-center">Service Type</th>
              <th className="w-100px text-center">Assign Worker</th>
              <th className="w-100px text-center">Service Status</th>
            </tr>
          </thead>
          <tbody className="">
            {bookingList &&
              bookingList.map((item, index) => {
                let profile = item.user_info.profile_img
                let full_name = item.user_info.full_name
                let phone = item.user_info.phone
                let email = item.user_info.email
                let addressInfo = item.address.address_Info
                console.log("item.address.address_Info", addressInfo)
                const serviceNames = item.provided_services.map(service => service.service_name).join(', ');

                return (
                  <tr key={item.orderId} className="">
                    <td className="w-10px">{index + 1}</td>
                    <td className="">
                      <div className="usrdtls-td">
                        <div className="userprfl-bg">
                          <span
                            style={{ backgroundImage: `url(${profile})` }}
                          ></span>
                        </div>
                        <div className="prd-descrp">
                          <span className="d-block fw-bold titl-view">
                            {full_name}
                          </span>
                          <span className="d-block fw-normal">
                            Order id: #{item.id.slice(0, 6)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="prd-contect">
                        <span className="d-block  titl-view fw-normal">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          {phone}
                        </span>
                        <span className="d-block fw-normal">
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                          {email}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">{addressInfo}</td>

                    <td className="text-center">{FormatTimeStamp(item.createdAt)}</td>
                    <td className="text-center">{serviceNames}</td>

                    <td className="text-center">{item?.emp_info?.full_name}</td>
                    <td className="text-center">
                      <span className="badge badge-success">Completed</span>
                    </td>
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

export default CompletedTableList;
