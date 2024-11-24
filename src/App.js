import {RouterProvider} from "react-router-dom";
import 'mdb-ui-kit/css/mdb.min.css'
import routes from "./routes"

export default function App() {

  return (
    <RouterProvider router={routes}/>
  );
}