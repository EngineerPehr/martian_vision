import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Rover from './components/Rover'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
	{
		path: ':rover_name',
		element: <Rover />,
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
