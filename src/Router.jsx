import Login from "./pages/Login";
import {
  createBrowserRouter,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Otp from "./pages/Otp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    // children: [
    //   {
    //     path: "/registration",
    //     element: <Registration/>
    //   }
    // ]
  },
  {
    path: 'registration',
    element: <Registration/>
  },
  {
    path: '/otp/:email',
    element: <Otp/>
  },
  {
    path: 'forgotpassword',
    element: <ForgotPassword/>
  },
  {
    path: '/changepassword/:email',
    element: <ChangePassword/>
  },
  {
    path: 'dashboard',
    element: <Dashboard/>
  }
]);
