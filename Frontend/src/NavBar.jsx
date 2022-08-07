import React from 'react'
import { Link } from 'react-router-dom'
import './css/NavBar.css'

export const NavBar = (props) => {
  
  return (
    <div className='nav'>
        <nav className='Adnav'>
        <label className='alogo'>{props.name}</label>
        <ul className='navul'>
           <Link to={props.address}><li className='navli'>{props.linkname}</li></Link>
        </ul>
        </nav>
        </div>
  )
 
}
