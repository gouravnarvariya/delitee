import React, { useState } from "react";

const ChangePasswordForm = () => {
const[show , setShow] = useState(false)
  return (
    <div className="form-main">
      <div className="form-flex">
      <div className="form-inner-flx-100">
          <div className="form-inputs">
            <label className="form-label">
              New Password<i>*</i>
            </label>
            <input
              type="password"
              name="newpassword"
              className="form-control"
              placeholder="**********"
            />
          </div>
        </div>
        <div className="form-inner-flx-100">
          <div className="form-inputs">
            <label className="form-label">
              New Password<i>*</i>
            </label>
            <input
              type="password"
              name="newpassword"
              className="form-control"
              placeholder="**********"
            />
          </div>
        </div>
        <div className="form-inner-flx-100">
          <div className="form-inputs">
            <label className="form-label">
              Confirm Password<i>*</i>
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              placeholder="**********"
            />
          </div>
        </div>
      </div>
      <div class="pwdinpu-cmn chngepwd-btn">
        <button type="submit" class="btn primary-btn" onClick={()=>setShow}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
