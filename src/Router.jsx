import Login from "./pages/Login";
import {
  createBrowserRouter,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Otp from "./pages/Otp";

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
  }
]);
