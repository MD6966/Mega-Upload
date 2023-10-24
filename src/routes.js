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
import ViewSinglePicture from "./views/User/MyUploads/components/Pictures/components/ViewSinglePicute/ViewSinglePicture";
import ViewSingleDocument from "./views/User/MyUploads/components/Documents/components/ViewSingleDocument";
import ViewSingleSoftware from "./views/User/MyUploads/components/Softwares/components/ViewSingleSoftware";
import ProfilePage from "./views/User/ProfilePage";
import CheckOut from "./views/User/CheckOut";
import Dashboard from "./views/Admin/Dashboard";
export default function Router() {
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    const isAuthenticatedAdmin = useSelector((state)=>state.admin.isAuthenticatedAdmin)
    // console.log(isAuthenticatedAdmin)
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
            {path:'view-picture', element: <ViewSinglePicture/>},
            {path:'view-document', element:<ViewSingleDocument />},
            {path:'view-software', element:<ViewSingleSoftware />},
            {path:'profile', element:<ProfilePage />},
            {path:'checkout', element:<CheckOut />},


            ]
        },

        ]
       },
       {
        element:<ProtectedRoutes isLogged={isAuthenticatedAdmin} />,
        children:[
            {
             path:'admin', element:<AdminDashboard />,
             children:[
                 {path:'dashboard', element: <Dashboard />}
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
       {
        path:'/admin-login',
        element: <AdminLogin /> 
       },
       {
        path:'*',
        element: <ErrorPage /> 
       }
    ])
    return element
}