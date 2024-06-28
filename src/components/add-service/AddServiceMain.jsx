import React from "react";
import { AddServiceList, Breadcrumb } from "./sub-component";

const AddServiceMain = () => {
  return (
    <div className="main-wrapper">
      <Breadcrumb />
      <div className="card">
        <div className="card-body">
          <AddServiceList />
        </div>
      </div>
    </div>
  );
};

export default AddServiceMain;
