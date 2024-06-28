import React from 'react'

const DeleteAlertPopup  = ({ handlePopup ,deleteService}) => {
  return (
    <>
      <div className="main-popup deleat-popup">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-body">
                <div className='alert-descrp'>
                    <div className='alert-icon'>
                        <span>!</span>
                    </div>
                    <h3>Are you sure?</h3>
                    <p>You want to Delete this Service!</p>
                </div>
                <div className="form-btn">
                    <button type="button" className="btn primary-btn" onClick={deleteService}>Yes Delete it</button>
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={handlePopup}
                    >No</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  )
}

export default DeleteAlertPopup