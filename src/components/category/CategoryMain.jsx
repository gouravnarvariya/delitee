import React,{useEffect} from 'react'
import { Breadcrumb, CategoryListTable } from './sub-component'


const CategoryMain = () => {
  

  return (
    <>
    <div className="main-wrapper">
    <Breadcrumb />
    <div className="card">
      <div className="card-body">
        <CategoryListTable />
      </div>
    </div>
  </div>
  </>
  )
}

export default CategoryMain