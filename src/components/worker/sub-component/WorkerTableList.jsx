import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteAlertPopup } from "./index";
import { UserImage } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { GetAllWorkers } from "../../../Redux/Slices/UserSlice";
import { FormatTimeStamp } from "../../../utils/FormatDate";
import { ClearToggle, ToggleEvery } from "../../../Redux/Slices/CommonSlice";
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
  {
    id: 6,
    user: "Eva Davis",
  },
  {
    id: 7,
    user: "Frank White",
  },
  {
    id: 8,
    user: "Grace Miller",
  },
  {
    id: 9,
    user: "Henry Wilson",
  },
  {
    id: 10,
    user: "Ivy Robinson",
  },
];

const UserOrderList = () => {
  const [orderList, setOrderList] = useState(orders);

  const [showDeletePop, setShowDeletePop] = useState(false);

  const handleDeletePopup = () => {
    setShowDeletePop((p) => !p);
  };

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const WorkerList = useSelector((state) => state.User.WorkerList);
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    dispatch(GetAllWorkers());
  }, [dispatch]);

  useEffect(() => {
    if (WorkerList.data) {
      setWorkerList(WorkerList.data);
    }
    if (WorkerList.error) {
      setWorkerList([]);
    }
  }, [WorkerList.data, WorkerList.error]);

  const [CurrentWorker, setCurrentWorker] = useState(null)
  const OnDeleteClicked = (item) => {
    setCurrentWorker(item)
    handleDeletePopup()
  }

  const OnView = (id) => {
    navigate('/worker-detail', { state: { workerId: id } })
  }


  const GetToggle = useSelector((state) => state.Common.GetToggle)

	const toggleUser = (id) => {
		const findIndex = workerList.findIndex((u) => u.id === id);
		if (findIndex !== -1) {
			const newArr = [...workerList];
			newArr[findIndex] = {
				...newArr[findIndex],
				active_status: newArr[findIndex].active_status === 'ACTIVE' ? 'IN-ACTIVE' : 'ACTIVE'
			};
			setWorkerList(newArr); 
			dispatch(ToggleEvery({ table_name: 'user', status: newArr[findIndex].active_status, item_id:  id }));

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
    {
      workerList?.length>0 ?
      <div className="responsive-table ">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-175px">Worker Detail</th>
              <th className="w-175px ">Contact Detail</th>
              <th className="w-150px text-center">Registration Date</th>
              <th className="w-70px text-end">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {workerList &&
              workerList.map((item, index) => {
                return (
                  <tr key={item.orderId||index} className="">
                    <td className="w-10px">{index + 1}</td>
                    <td className="">
                      <div className="usrdtls-td">
                        <div className="userprfl-bg">
                          <span
                            style={{
                              backgroundImage: `url(${item.profile_img})`,
                            }}
                          ></span>
                        </div>
                        <div className="prd-descrp">
                          <span className="d-block fw-bold titl-view">
                            {item.full_name}
                          </span>
                          {/* <span className="d-block fw-normal">
													Order id: #12450
												</span> */}
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="prd-contect">
                        <span className="d-block  titl-view fw-normal">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          {item.phone}
                        </span>
                        <span className="d-block fw-normal">
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                          {item.email}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">{FormatTimeStamp(item.createdAt)}</td>
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
                          class="action-btn view-btn"
                          onClick={() => OnView(item.id)}
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
                        <a
                          class="action-btn deleat-btn"
                          onClick={() => OnDeleteClicked(item)}
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
      :
      <DataNotAvailable/> }
      {showDeletePop && <DeleteAlertPopup handlePopup={handleDeletePopup} CurrentWorker={CurrentWorker} setCurrentWorker={setCurrentWorker} />}
    </>
  );
};

export default UserOrderList;
