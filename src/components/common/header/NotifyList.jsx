import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchNotifications } from '../../../Redux/Slices/NotificationSlice'

const NotifyList = () => {


    const Notify = useSelector((state) => state.Notification.Notify)
    const dispatch = useDispatch()

    const [notifyList, setNotifyList] = useState([])
    useEffect(() => {
        dispatch(FetchNotifications())
    }, [])

    useEffect(() => {
        if (Notify.data) {
            setNotifyList(Notify.data)
        }
    }, [Notify.data])

    console.log("notifyList:", notifyList)

    return (
        <div className="hdrnoti-drpdwn">
            <div className='noti-head'>
                <h3>Notification</h3>
            </div>
            <ul>
                {notifyList.length>0  ?
                notifyList?.map((item) => {
                    return (
                        <li>
                            <div className="notihstry-dtls">
                                <h3>{item.notify_title}</h3>
                                <p>{item.notify_body}</p>
                            </div>
                        </li>
                    )
                }) :
                <li>
                      <div className="notihstry-dtls">
                        <h3>No New Notification</h3>
                        <p>No New Notification Recently Come.</p>
                      </div>
                    </li>
                }
            </ul>
        </div>
    )
}

export default NotifyList