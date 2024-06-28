import React from 'react'
import { Breadcrumb, BookingDetailImage , BookingInformation } from './sub-component'
const BookingDetailMain = () => {
  return (
    <>
      <div className='main-wrapper'>
        <Breadcrumb />
        <BookingInformation />
        <div className='card'>
          <div className="card-body">
            <BookingDetailImage />
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingDetailMain