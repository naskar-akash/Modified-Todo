import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/Todos")
  }


  return (
    <div className="flex flex-col gap-10 m-4">
      <header className="flex flex-col gap-3 bg-blue-200 rounded-lg p-4">
        <div className="flex justify-center">
        <div className='text-6xl font-extrabold text-gray-400 text-shadow-lg text-shadow-gray-500 font-serif'>@To-Do</div>
        </div>
        <div className="flex justify-center">
        <button onClick={handleNavigate} className='bg-blue-700 text-white p-2 m-2 rounded font-semibold hover:bg-blue-800 hover:font-bold'>Get Started</button>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className='flex justify-center'>Why use this app?</h2>
        <div className="flex justify-center">
        <ul className="flex flex-col gap-2">
          <li className='text-lg'>✅ Easy task creation</li>
          <li className='text-lg'>🗂️ Organize with categories</li>
          <li className='text-lg'>📅 Due dates & reminders</li>
          <li className='text-lg'>📊 Progress tracking</li>
        </ul>
        </div>
      </section>
    </div>
  )
}

export default Home
