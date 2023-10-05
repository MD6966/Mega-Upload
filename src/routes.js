import { useRoutes } from "react-router-dom/dist";
import AuthLayout from "./layouts/Auth/AuthLayout";
import Home from "./layouts/Home";
import Landing from "./layouts/Landing/Landing";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import AdminLogin from "./views/Admin/Auth/AdminLogin";
import ErrorPage from "./components/ErrorBoundary/components/ErrorPage";
import AdminDashboard from "./layouts/Dashboard/AdminDashboard";

export default function Router() {
    let element = useRoutes([
    //     {
    //     path:'/',
    //     element : <Landing /> ,
    //    },
       { path: '/', element: <Login />},
       { path: '/signup' , element: <SignUp /> },
       {
        path: 'admin',
        element: <AdminDashboard />,
        children: [
        ]
    },
       {
        path:'auth',
        element: <AuthLayout />, 
        children : [
        ]
       },
       {
        path:'/home',
        element: <Home />,
       },
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