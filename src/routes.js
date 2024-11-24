import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Home from "./component/pages/Home";
import LetterOut from "./component/LetterOut/LetterOut";
// import LetterIn from "./component/LetterIn";
import ErrorPage from "./component/ErrorPage";
import LetterOutHistory from "./component/LetterOut/LetterOutHistory";
import LetterSend from "./component/LetterOut/LetterSend";
import FormTestPage from "./component/FormTestPage";
import Base from "./component/pages/Base";

// import LetterOutHistory from "./component/LetterOutHistory";

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
        element: <LetterOut/>
      },
      {
        path: 'history',
        element: <LetterOutHistory/>
      },
      {path: 'send',
        element: <LetterSend/>
      }
    ]
  },
  // {
  //   path: '/letter-out/send',
  //   element: <Layout main={<LetterSend/>}/>
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
  //       element: <Layout main={<LetterOut/>}/>,
  //       children:[
  //         {
  //           path:'history',
  //           element:<Layout main={<LetterOutHistory/>}/>
  //         }
  //       ]
  //     },
  //     {
  //       path: 'in',
  //       element: <Layout main={<LetterIn/>}/>
  //     },
  //           {
  //       path: 'out_history',
  //       element: <Layout main={<LetterOutHistory/>}/>
  //     }
  //   ]
  // }
])

export default routes;