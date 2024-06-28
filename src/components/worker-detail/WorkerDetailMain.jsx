import React from 'react'
import { Breadcrumb, WorkerInfomation, WorkerWorkingList } from './sub-component'
const WorkerDetailMain = () => {
  return (
    <>
    <div className='main-wrapper'>
       <Breadcrumb/>
       <WorkerInfomation/>
       <div className='card'>
         <div className="card-body">
         <WorkerWorkingList/>
         </div>
       </div>
    </div>
   </>
  )
}

export default WorkerDetailMain