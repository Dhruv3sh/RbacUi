import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.jsx'
import axios from 'axios'

//axios setup
axios.defaults.baseURL = 'https://6740df46d0b59228b7f1a363.mockapi.io/auth';
axios.defaults.headers.common['Content-Type'] = 'application/json';

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
