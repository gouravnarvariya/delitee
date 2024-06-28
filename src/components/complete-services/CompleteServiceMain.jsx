import React from 'react'
import { Breadcrumb, CompletedTableList } from './sub-component'

const CompleteServiceMain = () => {
  return (
    <>
      <div className='main-wrapper'>
        <Breadcrumb />
        <div className='card'>
          <div className="card-body">
            <CompletedTableList />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompleteServiceMain