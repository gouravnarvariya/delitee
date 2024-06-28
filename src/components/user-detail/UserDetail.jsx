import React from 'react'
import { Breadcrumb, UserInformation, UserOrderList,  } from './sub-component'
const UserDetail = () => {
  return (
    <>
     <div className='main-wrapper'>
        <Breadcrumb />
        <UserInformation />
        <div className='card'>
          <div className="card-body">
            <UserOrderList />
          </div>
        </div>
     </div>
    </>
  )
}

export default UserDetail