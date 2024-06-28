import React from 'react'
import { NotFoundImage } from '../../assets/images'

const NotFound = () => {
  return (
    <>
    <div className="card">
        <div className="card-body">
        <div className='pagenot-found'>
      <div className="notfound-image">
      <img src={NotFoundImage} class="" alt="" />
      </div>
      <h3>Page Not Found</h3>
    </div>
        </div>
    </div>
    </>
  )
}

export default NotFound