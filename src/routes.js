import {createBrowserRouter} from "react-router-dom";
import Home from "./component/pages/Home";
import OutManage from "./component/DocOut/OutManage";
import OutHistory from "./component/DocOut/OutHistory";
import OutPrint from "./component/DocOut/OutPrint";
import Base from "./component/pages/Base";
import InManage from "./component/DocIn/InManage";
import Setting from "./component/Setting/Setting";
import InHistory from "./component/DocIn/InHistory";
import InPrint from "./component/DocIn/InPrint";
import Login from "./component/pages/Login";
import ErrorPage from "./component/pages/ErrorPage";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base content={<Home/>}/>,
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
      {
        path: 'print/:date',
        element: <InPrint/>,
      }
    ],
  },
  {
    path: '/setting',
    element: <Base content={<Setting/>}/>,
  },
  {
    path: '/login',
    element: <Base content={<Login/>}/>,
  },
])

export default routes;