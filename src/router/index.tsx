/** 1. 路由组件的写法 **/
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import App from "@/App";
// import Home from "@/views/Home";
// import About from "@/views/About";

// const baseRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//           {/* 重定向到 /home */}
//           <Route path="/" element={<Navigate to="/home" />}></Route>
//           <Route path="/home" element={<Home />}></Route>
//           <Route path="/about" element={<About />}></Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default baseRouter;

/** 2. hooks的写法 **/
import { Suspense, lazy } from 'react'
import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from 'react-router-dom'

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/views/Login"))
const Home = lazy(() => import("@/views/Home"))
const About = lazy(() => import("@/views/About"))
const Page3_1 = lazy(() => import("@/views/Page3/Page3-1"))

const withLoadingComponent = (component:JSX.Element) => (
  <Suspense fallback={ <div>loading</div> }>
    {component}
  </Suspense>
)

const routes:RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  // @todo 有没重定向更优的方法
  {
    path: '/',
    element: <Navigate to="/home"/>
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: withLoadingComponent(<Home />)
      },
      {
        path: '/about',
        element: withLoadingComponent(<About />)
      },
      {
        path: '/page3',
        children: [
          {
            path: 'page3-1',
            element: withLoadingComponent(<Page3_1 />)
          },
        ]
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/login"/> // 回到首页或者404
  }
]

export const RoutesElement = () => useRoutes(routes)