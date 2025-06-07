import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {

  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/Todos")
  }


  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>📝 @To-Do</h1>
        <button onClick={handleNavigate} className='cta-button'>Get Started</button>
      </header>

      <section className="features-section">
        <h2>Why use this app?</h2>
        <ul className="features-list">
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
