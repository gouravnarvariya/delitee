import React, { useEffect, useState } from "react";


const OverallHistory = ({ GetSingleContext }) => {


  const { pending, data, error } = GetSingleContext
  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="dashborad-details">
        {/* <div class="top-heading">
           <h3>Overall History</h3>
        </div> */}
        <ul>
          <li>
            <div class="card dashcrd-bdy">
              <div className="card-body">
                <div class="dash-flx">
                  <div class="dash-content">
                    <p>Total Users</p>
                    <h3>{data.overallUsers}</h3>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card dashcrd-bdy">
              <div className="card-body">
                <div class="dash-flx">
                  <div class="dash-content">
                    <p>Total Worker</p>
                    <h3>{data.overallEmployees}</h3>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card dashcrd-bdy">
              <div className="card-body">
                <div class="dash-flx">
                  <div class="dash-content">
                    <p>Total Services</p>
                    <h3>{data.overallServices}</h3>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OverallHistory;
