import React from 'react'
import UserNav from '../components/UserNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        <UserNav/>
        <div className="App">
            <Outlet/>
        </div>
    </>
  )
}

export default UserLayout