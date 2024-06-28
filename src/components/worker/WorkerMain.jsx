import React from "react";
import { Breadcrumb, WorkerTableList } from "./sub-component";

const WorkerMain = () => {
  return (
    <>
      <div className="main-wrapper">
        <Breadcrumb />
        <div className="card">
          <div className="card-body">
            <WorkerTableList />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerMain;
