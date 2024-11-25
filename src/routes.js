import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Home from "./component/pages/Home";
import OutManage from "./component/DocOut/OutManage";
// import LetterIn from "./component/LetterIn";
import ErrorPage from "./component/ErrorPage";
import OutHistory from "./component/DocOut/OutHistory";
import OutPrint from "./component/DocOut/OutPrint";
import FormTestPage from "./component/FormTestPage";
import Base from "./component/pages/Base";
import InManage from "./component/DocIn/InManage";

// import OutHistory from "./component/OutHistory";

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
        path: 'history',
        element: <OutHistory/>
      },
      {path: 'print/:date',
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
      // {
      //   path: 'history',
      //   element: <OutHistory/>
      // },
      // {path: 'print/:date',
      //   element: <OutPrint/>,
      // }
    ],
    errorElement: <Base main={<ErrorPage/>}/>,
  },
  // {
  //   path: '/letter-out/send',
  //   element: <Layout main={<OutPrint/>}/>
  // },
  // {
  //   path: '/test',
  //   element: <Layout main={<FormTestPage/>}/>
  // }
  // {
  //   path: '/letter',

  //   errorElement: <Layout main={<ErrorPage/>}/>,
  //   children: [
  //     {
  //       path: 'out',
  //       element: <Layout main={<DocOut/>}/>,
  //       children:[
  //         {
  //           path:'history',
  //           element:<Layout main={<OutHistory/>}/>
  //         }
  //       ]
  //     },
  //     {
  //       path: 'in',
  //       element: <Layout main={<LetterIn/>}/>
  //     },
  //           {
  //       path: 'out_history',
  //       element: <Layout main={<OutHistory/>}/>
  //     }
  //   ]
  // }
])

export default routes;