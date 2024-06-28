import React from "react";
import { service1 } from "../../../assets/images";

const BookingDetailImage = () => {
  return (
    <>
        <div className="userinfo-head">
            <h2>Service Images</h2>
          </div>
          <div class="srvce-image-main">
            <ul>
              <li>
                <div className="srvce-inner">
                  <span style={{ backgroundImage: `url(${service1})` }}></span>
                </div>
              </li>
              <li>
                <div className="srvce-inner">
                  <span style={{ backgroundImage: `url(${service1})`}}></span>
                </div>
              </li>
            </ul>
          </div>
    </>
  );
};

export default BookingDetailImage;
