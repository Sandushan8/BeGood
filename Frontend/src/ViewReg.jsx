import React,{useState,useEffect} from 'react'
import './css/View.css'
import { NavBar } from './NavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ViewReg = () => {
  const [apiData,setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/vehicle').then(getdata=>{
      setData(getdata.data)
    })
  },[])

  const setID = (id) =>{
    localStorage.setItem('ID',id)
    console.log(id)
  }
  const deleteV = async (id) =>{
    await axios.delete(`http://localhost:3000/vehicle/${id}`)
    .then(window.location.reload()).then(alert('Successfully deleted!'))
  }

  return (
    <div>
    <NavBar name='Registered vehicles' address ='/' linkname='Home'/>
    <div className='viewbody'>
    <h1 className='viewtopic'>Registered vehicles</h1>
    <Link to='/form'><button className='Add'>Register</button></Link>
    <div className='tablecontainer'>
      <table className='table'>
        <tr className='head'>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>License Plate</th>
          <th>Type</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        <tbody className='tablebody'>
          {apiData.map((data)=>{
            return(
              <tr className='body'>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.contact}</td>
                <td>{data.licensep}</td>
                <td>{data.type}</td>
                <td className='UpDel'><Link to='/update'><button className='update' onClick={()=>setID(data._id)}>Update</button></Link></td>
                <td className='UpDel'><button className='delete' onClick={()=>deleteV(data._id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
        
    </div>
    </div>
    </div>
  )
}
