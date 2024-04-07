import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import Rover from './components/Rover'
import Photos from './components/Photos'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
	{
		path: ':rover_name',
		element: <Rover />,
	},
    {
        path: ':rover_name/photos',
        element: <Photos />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
