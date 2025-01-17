import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , createRoutesFromElements , Route  , RouterProvider } from 'react-router-dom'
import { Root_Layout } from './layout/Root_Layout';
import { Home } from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Staff_layout } from './layout/Staff_layout';
import { Login } from './pages/Login';
import { Library_Layout } from './layout/Library_Layout';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';


const queryClient = new QueryClient();

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path='/' element={<Root_Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="staff" element={<Staff_layout/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="library" element={<Library_Layout/>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
