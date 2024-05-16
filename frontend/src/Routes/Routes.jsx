import { createBrowserRouter } from "react-router-dom";
import Home from './../Pages/Home/Home';
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import MetroInfo from './../Pages/MetroInfo/MetroInfo';
import Contact from './../Pages/Contact/Contact';
import Main from './../Layout/Main';
import Recharge from './../Pages/Recharge/Recharge';
import TicketInfo from './../Pages/TicketInfo/TicketInfo';
import PrivateRoute from './../Provider/PrivateRoute';
import Lost from './../Pages/Lost/Lost';
import FareChart from './../Pages/FareChart/FareChart';
import { Bookings } from "../Pages/Bookings/Bookings";
import { TicketPDF } from "../Pages/Bookings/TicketPDF";
import { Form } from "../Pages/Lost/Form";
import { DisplaySubmissions } from "../Pages/Lost/DisplaySubmissions";
import { Users } from "../Pages/Users/Users";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/metroinfo',
        element: <MetroInfo></MetroInfo>
      },
      {
        path: '/contact',
        element: <PrivateRoute><Contact></Contact></PrivateRoute>
      },
      {
        path: '/bookings',
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
      },
      {
        path: '/bookings/download/:id',
        element: <PrivateRoute><TicketPDF></TicketPDF></PrivateRoute>
      },
      {
        path: '/ticketinfo/:id',
        element: <PrivateRoute><TicketInfo /></PrivateRoute>
      },
      {
        path: '/lostpage',
        element: <PrivateRoute><Lost></Lost></PrivateRoute>,
        children: [
          {
            path: "",
            element: <DisplaySubmissions></DisplaySubmissions>
          },
          {
            path: "form/",
            element: <Form></Form>
          },
        ]
      },
      {
        path: "/farechart",
        element: <FareChart />
      },
      {
        path: "/recharge",
        element: <PrivateRoute><Recharge></Recharge></PrivateRoute>
      },
      {
        path: "/users",
        element: <PrivateRoute><Users></Users></PrivateRoute>
      }
    ]
  }
]);
export default router;