import React, { useEffect } from 'react'
import { Breadcrumb, OverallHistory } from './sub-component'
import { useDispatch, useSelector } from 'react-redux'
import { dashBoardHistory } from '../../Redux/Slices/DashBoardSlice'

const Home = () => {
  const dispatch = useDispatch()


  const GetSingleContext = useSelector((state) => state.DashBoard.DashboardData)
  useEffect(() => {
    dispatch(dashBoardHistory())
  }, [dispatch])

  return (
    <>
      <div className='main-wrapper'>
        <Breadcrumb />
        <OverallHistory GetSingleContext={GetSingleContext}/>
      </div>
    </>
  )
}

export default Home