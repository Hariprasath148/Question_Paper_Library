import { createBrowserRouter , createRoutesFromElements , Navigate, Route  , RouterProvider } from 'react-router-dom'
import { Root_Layout } from './layout/Root_Layout';
import { Home } from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Staff_layout } from './layout/Staff_Layout.jsx';
import { Login } from './pages/Login';
import { Library_Layout } from './layout/Library_Layout';
import baseURL from "./constant/constant.js"
import { useQuery } from '@tanstack/react-query';
import "./style/root.css"
import { Staff_Root_Layout } from './layout/Staff_Root_Layout.jsx';
import { New_Question_paper } from './pages/New_Question_paper.jsx';
import { Error_Page } from './pages/Error_Page.jsx';

export const App = () => {

    const { data : authStaff , isLoading } = useQuery({
        queryKey : ["authStaff"],
        queryFn : async () => {
          try {
            const res = await fetch(`${baseURL}/api/auth/getStaff`, {
              method : "GET",
              credentials : "include" ,
              headers : {
                "Content-Type" : "application/json"
              }
            });
            const data = await res.json();
            if(data.error) {
                return null;
            }
            if(!res.ok){
              throw new Error(data.error || "Something went Wrong");
            }
            console.log("Staff :" , data);
            return data;
          } catch (error) {
            throw error;
          }
        },
        retry : false
    });

    if(isLoading) {
      return <div className="loader vh-100 wh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    }

    const router = createBrowserRouter (
        createRoutesFromElements (
          <Route path='/' element={<Root_Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="staff" element={authStaff ? <Staff_Root_Layout/> : <Navigate to="/login"/>}>
              <Route index element={<Staff_layout />} />
              <Route path="add-new-question-paper" element={<New_Question_paper/>} />
            </Route>
            <Route path="login" element={!authStaff ? <Login/> : <Navigate to="/staff"/>}/>
            <Route path="library" element={<Library_Layout/>} />
            <Route path="*" element={<Error_Page/>} />
          </Route>
        )
    );
      
    return (
    <>
        <RouterProvider router={router} />
    </>
    )
}
