import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteAlertPopup, PopupEditService } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllService,
  DeleteService,
} from "../../../Redux/Slices/ServiceSlice";
import { toast } from "react-toastify";
import { ClearToggle, ToggleEvery } from "../../../Redux/Slices/CommonSlice";

const orders = [
  {
    ServiceName: "Office Cleaning",
  },
  {
    ServiceName: "House Cleaning",
  },
  {
    ServiceName: "Carpet Cleaning",
  },
];
const changeidFor = (id) => {
  if (id) {
    return id.slice(0, 5) + "...";
  } else {
    return "";
  }
};
const AddServiceList = () => {
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState(null);
  const ServiceList = useSelector((state) => state.Service.ServiceList);
  const IsServiceDelete = useSelector((state) => state.Service.IsServiceDelete);

  const [serviceList, setServiceList] = useState([]);

  const [showEditPopService, setShowEditPopService] = useState(false);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    if (ServiceList.data) {
      setServiceList(ServiceList.data);
    }
  }, [ServiceList]);

  console.log("serviceList ", serviceList)

  const deleteService = () => {
    dispatch(DeleteService(serviceId));
  };

  useEffect(() => {
    if (IsServiceDelete.data) {
      toast.success("Service Delete Successful");
      handleDeletePopup();
      dispatch(GetAllService());
    }
  }, [IsServiceDelete.data]);

  const handleDeletePopup = () => {
    setShowDeletePop((p) => !p);
  };

  const handlePopup = () => {
    setShowEditPopService((p) => !p);
  };
  const setItemForEdit = (item) => {
    setServiceId(item.id)
    setSelectedService(item)
    handlePopup()
  }

  useEffect(() => {
    dispatch(GetAllService());
  }, [dispatch]);


  const GetToggle = useSelector((state) => state.Common.GetToggle)

	const toggleUser = (id) => {
		const findIndex = serviceList.findIndex((u) => u.id === id);
		if (findIndex !== -1) {
			const newArr = [...serviceList];
			newArr[findIndex] = {
				...newArr[findIndex],
				active_status: newArr[findIndex].active_status === 'ACTIVE' ? 'IN-ACTIVE' : 'ACTIVE'
			};
			setServiceList(newArr); 
			dispatch(ToggleEvery({ table_name: 'services', status: newArr[findIndex].active_status, item_id:  id }));
      console.log("newarr-------------", newArr)
			console.log("userlist-------------", serviceList)
		} else {
			alert('User not found');
		} 
	  }

	useEffect(() => {
		if (GetToggle.success) {
			dispatch(ClearToggle())
		}
	}, [GetToggle.success])
  
  return (
    <>
      <div className="responsive-table">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-250px">Service Title</th>
              <th className="w-175px text-end">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {serviceList &&
              serviceList.map((item, index) => {
                console.log("item" , item)
                return (
                  <tr key={item.orderId||index} className="">
                    <td className="w-10px">{ index + 1||changeidFor(item.id)}</td>
                    <td className=""> {item.service_name}</td>
                    <td className="">
                      <div class="action-main">
                        <div class="svcrd-togl me-2">
                          <div class="tgl-sld">
                            <label>
                              <input type="checkbox"
                              onChange={() => toggleUser(item.id)}
                              defaultChecked={item.active_status==='ACTIVE'}
                              />
                              <span>
                                <i></i>
                              </span>
                            </label>
                          </div>
                        </div>
                        <a
                          class="action-btn edit-btn"
                          to=""
                          onClick={() => setItemForEdit(item)}
                        >
                          <span>
                            <svg
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.43 4.23466L11.1683 0.972166C11.0598 0.863674 10.931 0.777613 10.7893 0.718897C10.6476 0.66018 10.4957 0.629959 10.3423 0.629959C10.1888 0.629959 10.0369 0.66018 9.8952 0.718897C9.75347 0.777613 9.6247 0.863674 9.51623 0.972166L0.514264 9.97486C0.405329 10.0829 0.318962 10.2116 0.260184 10.3533C0.201407 10.4951 0.171391 10.6471 0.171881 10.8005V14.063C0.171881 14.3728 0.294942 14.6699 0.513993 14.8889C0.733044 15.108 1.03014 15.2311 1.33992 15.2311H4.60242C4.75586 15.2316 4.90788 15.2015 5.04962 15.1428C5.19136 15.084 5.32001 14.9976 5.42808 14.8887L14.43 5.88671C14.5385 5.77824 14.6246 5.64947 14.6833 5.50774C14.742 5.36601 14.7723 5.2141 14.7723 5.06068C14.7723 4.90727 14.742 4.75536 14.6833 4.61363C14.6246 4.4719 14.5385 4.34312 14.43 4.23466ZM4.60242 14.063H1.33992V10.8005L7.76417 4.37628L11.0267 7.63878L4.60242 14.063ZM11.8523 6.81238L8.58983 3.55062L10.3419 1.79856L13.6044 5.06032L11.8523 6.81238Z"
                                fill="#407BFF"
                              ></path>
                            </svg>
                          </span>
                        </a>
                        <a
                          class="action-btn deleat-btn"
                          to=""
                          onClick={() => {
                            setServiceId(item.id);
                            handleDeletePopup();
                          }}
                        >
                          <span>
                            <svg
                              width="15"
                              height="16"
                              viewBox="0 0 16 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.9376 3.23185H11.7719V2.59869C11.7719 2.09492 11.5717 1.61178 11.2155 1.25556C10.8593 0.899342 10.3761 0.699219 9.87238 0.699219H6.07343C5.56965 0.699219 5.08651 0.899342 4.73029 1.25556C4.37407 1.61178 4.17395 2.09492 4.17395 2.59869V3.23185H1.00816C0.840234 3.23185 0.679188 3.29856 0.560448 3.4173C0.441708 3.53604 0.375 3.69709 0.375 3.86501C0.375 4.03293 0.441708 4.19398 0.560448 4.31272C0.679188 4.43146 0.840234 4.49817 1.00816 4.49817H1.64132V15.895C1.64132 16.2309 1.77473 16.553 2.01221 16.7904C2.24969 17.0279 2.57179 17.1613 2.90763 17.1613H13.0382C13.374 17.1613 13.6961 17.0279 13.9336 16.7904C14.1711 16.553 14.3045 16.2309 14.3045 15.895V4.49817H14.9376C15.1056 4.49817 15.2666 4.43146 15.3854 4.31272C15.5041 4.19398 15.5708 4.03293 15.5708 3.86501C15.5708 3.69709 15.5041 3.53604 15.3854 3.4173C15.2666 3.29856 15.1056 3.23185 14.9376 3.23185ZM5.44027 2.59869C5.44027 2.43077 5.50697 2.26972 5.62571 2.15098C5.74446 2.03224 5.9055 1.96554 6.07343 1.96554H9.87238C10.0403 1.96554 10.2013 2.03224 10.3201 2.15098C10.4388 2.26972 10.5055 2.43077 10.5055 2.59869V3.23185H5.44027V2.59869ZM13.0382 15.895H2.90763V4.49817H13.0382V15.895ZM6.70658 7.66396V12.7292C6.70658 12.8972 6.63988 13.0582 6.52114 13.1769C6.4024 13.2957 6.24135 13.3624 6.07343 13.3624C5.9055 13.3624 5.74446 13.2957 5.62571 13.1769C5.50697 13.0582 5.44027 12.8972 5.44027 12.7292V7.66396C5.44027 7.49604 5.50697 7.33499 5.62571 7.21625C5.74446 7.09751 5.9055 7.0308 6.07343 7.0308C6.24135 7.0308 6.4024 7.09751 6.52114 7.21625C6.63988 7.33499 6.70658 7.49604 6.70658 7.66396ZM10.5055 7.66396V12.7292C10.5055 12.8972 10.4388 13.0582 10.3201 13.1769C10.2013 13.2957 10.0403 13.3624 9.87238 13.3624C9.70445 13.3624 9.5434 13.2957 9.42466 13.1769C9.30592 13.0582 9.23922 12.8972 9.23922 12.7292V7.66396C9.23922 7.49604 9.30592 7.33499 9.42466 7.21625C9.5434 7.09751 9.70445 7.0308 9.87238 7.0308C10.0403 7.0308 10.2013 7.09751 10.3201 7.21625C10.4388 7.33499 10.5055 7.49604 10.5055 7.66396Z"
                                fill="#DE5753"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showEditPopService && (
        <PopupEditService
          CurrentService={selectedService}
          handlePopup={handlePopup}
          serviceId={serviceId}
        />
      )}
      {showDeletePop && (
        <DeleteAlertPopup
          handlePopup={handleDeletePopup}
          deleteService={deleteService}
        />
      )}
    </>
  );
};

export default AddServiceList;
