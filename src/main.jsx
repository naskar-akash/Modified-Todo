import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import Todos from './Components/Todos.jsx'
import About from './Components/About.jsx'
import Showtodos from './Components/Showtodos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Todos",
        element: <Todos />,
      },
      {
        path:"/About",
        element:<About/>
      },
      {
        path:"/Todos/Showtodos",
        element:<Showtodos/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
