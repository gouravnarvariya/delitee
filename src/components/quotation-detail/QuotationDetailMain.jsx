import React from "react";
import { Breadcrumb, QuotationInformation } from "./sub-component";

const QuotationDetailMain = () => {
  return (
    <div className="main-wrapper">
      <Breadcrumb />
      <QuotationInformation />
    </div>
  );
};

export default QuotationDetailMain;
