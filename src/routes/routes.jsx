import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AdminDahboard from "../pages/AdminDahboard";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path:'/',
                element:<PrivateRoute><Home/></PrivateRoute>
            },
            {
                path:'/admin-dashboard',
                element:<AdminDahboard/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);