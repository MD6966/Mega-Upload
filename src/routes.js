import { useRoutes } from "react-router-dom/dist";
import AuthLayout from "./layouts/Auth/AuthLayout";
import Home from "./layouts/Home";
import Landing from "./layouts/Landing/Landing";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import AdminLogin from "./views/Admin/Auth/AdminLogin";
import ErrorPage from "./components/ErrorBoundary/components/ErrorPage";
import AdminDashboard from "./layouts/Dashboard/AdminDashboard";
import OTP from "./views/OTP";
import HomePage from "./views/HomePage";
import { useSelector } from "react-redux";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ResetPassword from "./views/ResetPassword";
import UserDashboard from "./layouts/Dashboard/UserDashboard";
import UploadFile from "./views/User/UploadFile";
import MyUploads from "./views/User/MyUploads";
export default function Router() {
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    // console.log(isAuthenticated)
    let element = useRoutes([
    //     {
    //     path:'/',
    //     element : <Landing /> ,
    //    },
       { path: '/', element: <Login />},
       { path: '/signup' , element: <SignUp /> },
       { path: '/verify-otp/:id' , element: <OTP /> },
       { path: '/reset/:token' , element: <ResetPassword /> },
       {path:'/home', element:<HomePage />},

       {
        element: <ProtectedRoutes isLogged={isAuthenticated} />,
        children:[
            {path:'user', element:<UserDashboard />, children:[
            {path:'upload', element:<UploadFile />},
            {path:'uploads', element:<MyUploads />},
            ]
        },

        ]
       },


    //    {
    //     path: 'admin',
    //     element: <AdminDashboard />,
    //     children: [
    //     ]
    // },
    //    {
    //     path:'auth',
    //     element: <AuthLayout />, 
    //     children : [
    //     ]
    //    },
    //    {
    //     path:'/home',
    //     element: <Home />,
    //    },
    //    {
    //     path:'/admin-login',
    //     element: <AdminLogin /> 
    //    },
       {
        path:'*',
        element: <ErrorPage /> 
       }
    ])
    return element
}