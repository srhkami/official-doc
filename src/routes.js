import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Home from "./component/pages/Home";
import OutManage from "./component/DocOut/OutManage";
// import LetterIn from "./component/LetterIn";
import ErrorPage from "./component/ErrorPage";
import OutHistory from "./component/DocOut/OutHistory";
import OutSend from "./component/DocOut/OutSend";
import FormTestPage from "./component/FormTestPage";
import Base from "./component/pages/Base";

// import OutHistory from "./component/OutHistory";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Base content={<Home/>}/>,
    // errorElement: <Layout main={<ErrorPage/>}/>,
  },
  {
    path: '/letter-out',
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
      {path: 'send',
        element: <OutSend/>
      }
    ]
  },
  // {
  //   path: '/letter-out/send',
  //   element: <Layout main={<OutSend/>}/>
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