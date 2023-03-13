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
import { Suspense, lazy, useEffect } from 'react'
import { useRoutes, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { RouteObject } from 'react-router-dom'
import { getToken } from '@/utils/auth';

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/views/Login"))
const NotFound = lazy(() => import("@/views/NotFound"))
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
    path: '/404',
    element: withLoadingComponent(<NotFound />)
  },
  {
    path: '*',
    element: <Navigate to="/404"/> // 回到首页或者404
  }
]

// 全局路由组件
const RoutesElement = () => useRoutes(routes)

// 路由跳转组件
const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  }, [])
  return null
}

// 路由前置守卫
const whiteList = ['/login']
export const RouterBeforeEach = () => {
  const { pathname } = useLocation()
  const token = getToken()

  if (!token && !whiteList.includes(pathname)) {
    return <Redirect to='/login' />
  }
  if (token) {
    // 获取用户信息等操作

    if (pathname === '/login') {
      return <Redirect to='/home' />
    }
  }

  return <RoutesElement />
}

