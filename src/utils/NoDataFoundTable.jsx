import React from "react";

const NoDataFoundTable = () => {
  return (
    <>
      <tr>
        <td colSpan={10}>
          <div className="not-fnd-box">
            <div className="noti-not-found">
              <span>
                <i className="fa fa-frown-o" aria-hidden="true"></i>
              </span>
              <h3>No Data Available !</h3>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NoDataFoundTable;
