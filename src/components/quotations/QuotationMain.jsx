import React, { useEffect } from 'react'
import { Breadcrumb, QuotationTable, } from './sub-component'

const QuotationMain = () => {
  
  return (
    <>
      <div className='main-wrapper'>
        <Breadcrumb />
        <div className='card'>
          <div className="card-body">
            <QuotationTable />
          </div>
        </div>
      </div>
    </>
  )
}
export default QuotationMain
