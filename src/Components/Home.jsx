import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/Todos")
  }


  return (
    <div className="bg-blue-50 w-full h-[100vh]">
      <header className="flex gap-2">
        <h1 className='text-center'>@To-Do</h1>
        <button onClick={handleNavigate} className='bg-gray-700 text-white align-middle p-2 w-1/12'>Get Started</button>
      </header>

      <section className="">
        <h2>Why use this app?</h2>
        <ul className="">
          <li>✅ Easy task creation</li>
          <li>🗂️ Organize with categories</li>
          <li>📅 Due dates & reminders</li>
          <li>📊 Progress tracking</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
