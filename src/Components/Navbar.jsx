import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className=''>
      <nav>
        <div className="nav-hover">
          <div className='bg-gray-100 m-2 p-1 rounded-4xl'>
          <span className="font-bold text-sm px-1 text-blue-950 mt-3">@To-Do</span>
          </div>
           <NavLink className={(e)=>{return e.isActive?"red":""}} to="/"><li>Home</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red":""}} to="/Todos"><li>Todos</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red":""}} to="/About"><li>About</li></NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
