import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {PopupAddService } from "./index";
const Breadcrumb = () => {
  const [showAddServicePop, setshowAddServicePop] = useState(false);

  const handlePopup = () => {
    setshowAddServicePop((p) => !p);
  };
  return (
    <>
    <div className='home-top'>
        <div className='page-title'>
            <h3>Service</h3>
        </div>
        <div className='btns-evnts'>
              <div className='btns-evnts-inner'>
                <Link to="" className="btn primary-btn" onClick={handlePopup}>Add Service</Link>
              </div>
        </div> 
    </div>
    {showAddServicePop && <PopupAddService handlePopup={handlePopup}/>}
    </>
  )
}

export default Breadcrumb