// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetBookingsDetails, fetchBookings } from "../../../Redux/Slices/QuotationSlice";
// import { useLocation } from "react-router-dom";

// const BookingInformation = () => {
//   const location = useLocation()
//   const BookingId = location?.state?.data?.id

//   console.log("BookingId", BookingId)

//   const dispatch = useDispatch()
//   const [serviceList, setServiceList] = useState([])

//   console.log("serviceList", serviceList)

//   const BookingInfo = useSelector((state) => state.Quotation.BookingInfo)

//   useEffect(() => {
//     dispatch(GetBookingsDetails(BookingId))
//   }, [dispatch])

//   useEffect(() => {
//     if (BookingInfo.data) {
//       setServiceList(BookingInfo.data)
//     }
//   }, [BookingInfo.data])

//   console.log("bookinglist==============", BookingInfo)
//   const { provided_services = [] } = serviceList;
//   const serviceNames = provided_services.map(service => service.service_name).join(', ');

//   return (
//     <>
//       <div className="card">
//         <div className="card-body">
//           <div className="userinfo-head">
//             <h2>Booking Information</h2>
//           </div>
//           <div className="ordr-infrmtion usr-main-flx">
//             <div className="userdtl-card user-flx">
//               <div className="brnd-vndrnmbr">
//                 <p>Booking Id</p>
//                 <h4>Id #1234</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Address</p>
//                 <h4>{serviceList?.address?.address_Info}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Email Address</p>
//                 <h4>{serviceList?.user_info?.email}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Contact No.</p>
//                 <h4>{serviceList?.user_info?.phone}</h4>
//               </div>
//             </div>
//             <div className="userdtl-card user-flx">
//               <div className="brnd-vndrnmbr">
//                 <p>Service Type</p>
//                 <h4>{serviceNames}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Service Date</p>
//                 <h4>{serviceList?.booking_date}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Service Status</p>
//                 <h4>{serviceList?.status}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Worker Name</p>
//                 <h4>{serviceList?.emp_info?.full_name}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default BookingInformation;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetBookingsDetails } from "../../../Redux/Slices/QuotationSlice";

const BookingInformation = () => {
  const location = useLocation()
  const BookingId = location?.state?.data?.id
  const [bookingInfoList, setBookingInfoList] = useState([])
  const dispatch = useDispatch()

  const BookingInfo = useSelector((state) => state.Quotation.BookingInfo)

  useEffect(() => {
    dispatch(GetBookingsDetails(BookingId))
  }, [dispatch])

  useEffect(() => {
    if (BookingInfo.data) {
      setBookingInfoList(BookingInfo.data)
    }
  }, [BookingInfo.data])

  const { provided_services = [] } = bookingInfoList;
  const serviceNames = provided_services.map(service => service.service_name).join(', ');
  const serviceIds = provided_services.map(service => service.id).join(', ');

  console.log("services===============", provided_services)

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="userinfo-head">
            <h2>Booking Information</h2>
          </div>
          <div className="ordr-infrmtion usr-main-flx">
            <div className="userdtl-card user-flx">
              <div className="brnd-vndrnmbr">
                <p>Booking Id</p>
                <h4>#{bookingInfoList.id}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Address</p>
                <h4>{bookingInfoList?.address?.address_Info}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Email Address</p>
                <h4>{bookingInfoList?.user_info?.email}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Contact No.</p>
                <h4>{bookingInfoList?.user_info?.phone}</h4>
              </div>
            </div>
            <div className="userdtl-card user-flx">
              <div className="brnd-vndrnmbr">
                <p>Service Date</p>
                <h4>{bookingInfoList?.booking_date}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Worker Name</p>
                <h4>{bookingInfoList?.emp_info?.full_name}</h4>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="responsive-table">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-250px">Service Name</th>
              <th className="w-175px text-start">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {provided_services &&
              provided_services.map((item, index) => {
                const status = item.booking_details.status !== 'COMPLETED' ? bookingInfoList.status : item.booking_details.status
                return (
                  <tr key={index} className="">
                    <td className="w-10px">{index + 1}</td>
                    <td className=""> {item.service_name}</td>
                    <td className="">
                      <h4>
                        <span className="badge badge-primary">{status}</span>
                      </h4>
                      { }</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingInformation;
