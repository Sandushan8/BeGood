import React,{useState,useEffect} from 'react'
import { NavBar } from './NavBar'
import './css/Form.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UpdateForm = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [licensep,setVN] = useState('')
    const [contact,setCN] = useState('')
    const [id,setID] = useState(0)
    const [error,setError] = useState('')
    const navigate = useNavigate()
    
    useEffect(()=>{
      setID(localStorage.getItem('ID'))
    },[])

    const submitform= async (e)=>{
      e.preventDefault()
      let {data} = await axios.put(`http://localhost:3000/vehicle/${id}`,{name,email,contact,licensep},{
        headers: {
        'content-type': 'application/json'
        }}
        )
        if(data.message == 'Success'){
          alert('Successfully Updated!')
          navigate('/view')
        }else{
          setError(data.message)
        }
        console.log(data.message)
    }
    
  return (
    <div>
        <NavBar name='Update Details' address ='/view' linkname='Back'/>
        <div className='formpage'>
        <form className='form' onSubmit={submitform}>
            <h1 className='topic'>Update Details</h1><br/>
            <label>Name</label><br/>
            <input type = 'text' onChange={(e)=>setName(e.target.value)} required/><br/><br/>
            <label>Email</label><br/>
            <input type = 'text' onChange={(e)=>setEmail(e.target.value)} required/><br/><br/>
            <label>Vehicle number</label><br/>
            <input type = 'text' onChange={(e)=>setVN(e.target.value)} required/><br/><br/>
            <label>Contact number</label><br/>
            <input type = 'text' onChange={(e)=>setCN(e.target.value)} required/><br/><br/>
            {error && <div className='error'>{error}</div>}
            <br/><button className='submit'>Submit</button> 
        </form>
        
    </div>
    </div>
  )
}
