import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Main } from './src/Main'
import { RegForm } from './src/RegForm'
import { UpdateForm } from './src/UpdateForm'
import { ViewReg } from './src/ViewReg'

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Main/>}/>
      <Route exact path='/form' element={<RegForm/>}/>
      <Route exact path='/view' element={<ViewReg/>}/>
      <Route exact path='/update' element={<UpdateForm/>}/>
    </Routes>
    </BrowserRouter>
  )
}

ReactDom.render(<App/>, document.getElementById('root'))
