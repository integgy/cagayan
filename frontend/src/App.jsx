import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NewUserForm from './components/NewUserForm';
import NewSessionForm from './components/NewSessionForm';
import ProductIndex from './components/ProductIndex';
import ProductShow from './components/ProductShow';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        index: "true",
        element: <ProductIndex/>
      },
      {
        path: "products/:productId",
        element: <ProductShow/>
      }
    ]
  },
  {
    index: "true",
    element: <ProductIndex/>
  },
  {
    path: "products/:productId",
    element: <ProductShow/>
  },
  {
    path: "login",
    element: <NewSessionForm/>
  },
  {
    path: "signup",
    element: <NewUserForm/>
  },
  {
    path: "*",
    element: <Navigate to={"/"}/>
  }
])


function App() {
  return (
        <RouterProvider router={router}/>
    )
}

export default App;
