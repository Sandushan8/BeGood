import React from 'react'
import { NavBar } from './NavBar'
import { Link } from 'react-router-dom'
import './css/MainPage.css'
export const Main = () => {
  return (
    <div>
        <NavBar name='Vehicle Registration System' address ='/view' linkname='View Registered Vehicles'/>
      <div className='mainpage'>
      <div className='mainpagecontainer'>
        <h1 className='maintopic'>Register your vehicle</h1>
        <Link to ='/form'><button className='mainadd'>Register</button></Link>
      </div>
    </div>
    </div>
  )
}
