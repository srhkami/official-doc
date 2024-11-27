import {createBrowserRouter} from "react-router-dom";
import Home from "./component/pages/Home";
import OutManage from "./component/DocOut/OutManage";
import ErrorPage from "./component/ErrorPage";
import OutHistory from "./component/DocOut/OutHistory";
import OutPrint from "./component/DocOut/OutPrint";
import Base from "./component/pages/Base";
import InManage from "./component/DocIn/InManage";
import Setting from "./component/Setting/Setting";
import InHistory from "./component/DocIn/InHistory";
import InPrint from "./component/DocIn/InPrint";
import Login from "./component/pages/Login";
import AuthLayout from "./component/tools/AuthLayout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base content={<Home/>}/>,
    errorElement: <Base main={<ErrorPage/>}/>,
  },
  {
    path: '/out',
    element: <Base/>,
    children: [
      {
        path: '',
        element: <OutManage/>
      },
      {
        path: 'history/:pageNumber',
        element: <OutHistory/>
      },
      {
        path: 'print/:date',
        element: <OutPrint/>,
      }
    ],
    errorElement: <Base main={<ErrorPage/>}/>,
  },
  {
    path: '/in',
    element: <Base/>,
    children: [
      {
        path: '',
        element: <InManage/>
      },
      {
        path: 'history',
        element: <InHistory/>
      },
      {path: 'print/:date',
        element: <InPrint/>,
      }
    ],
    errorElement: <Base main={<ErrorPage/>}/>,
  },
  {
    path: '/setting',
    element: <Base content={<Setting/>}/>,
    errorElement: <Base main={<ErrorPage/>}/>,
  },
    {
    path: '/login',
    element: <Base content={<Login/>}/>,
    errorElement: <Base main={<ErrorPage/>}/>,
  },
])

export default routes;