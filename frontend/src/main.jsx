import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , createRoutesFromElements , Route , Routes , RouterProvider } from 'react-router-dom'
import { Root_Layout } from './layout/Root_Layout';
import { Home } from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path='/' element={<Root_Layout/>}>
      <Route index element={<Home/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
