import React from "react";
import { Breadcrumb, ChangePasswordForm } from "./sub-component";

const ChangePasswordMain = () => {
  return (
    <div className="main-wrapper">
      <Breadcrumb />
      <div className="card">
        <div className="card-body">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordMain;
