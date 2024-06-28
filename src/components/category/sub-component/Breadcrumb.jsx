import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryPopup from './AddCategoryPopup';
const Breadcrumb = () => {
  const [showAddCategoryPopup, setshowAddCategoryPopup] = useState(false);

  const handlePopup = () => {
    setshowAddCategoryPopup((p) => !p);
  };
  return (
    <>
    <div className='home-top'>
        <div className='page-title'>
            <h3>Category</h3>
        </div>
        <div className='btns-evnts'>
              <div className='btns-evnts-inner'>
                <Link to="" className="btn primary-btn" onClick={handlePopup}>Add Category</Link>
              </div>
        </div> 
    </div>
    {showAddCategoryPopup && <AddCategoryPopup handlePopup={handlePopup}/>}
    </>
  )
}

export default Breadcrumb