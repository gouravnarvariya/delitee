import React from 'react'
import { Breadcrumb, UserTable } from './sub-component'

const User = () => {
  return (
    <>
     <div className='main-wrapper'>
        <Breadcrumb />
       <div className='card'>
        <div className="card-body">
        <UserTable />
        </div>
       </div>
     </div>
    </>
  )
}

export default User