import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './Components/Nav.jsx'
import Addproduct from './Components/Addproduct.jsx'
import Order from './Components/Order.jsx'
import Update from './Components/Update.jsx'
import Code from './Components/Code.jsx'
function App() {

  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div><Nav /><Addproduct /></div>
    },
    {
      path: '/update',
      element: <div><Nav /><Update /></div>
    },
    {
      path: '/code',
      element: <div><Nav /><Code/></div>
    },
    {
      path: '/order',
      element: <div><Nav /><Order /></div>
    },
  ])

  return (
    <div >
      <RouterProvider router={router} />
    </div>

  )
}

export default App
