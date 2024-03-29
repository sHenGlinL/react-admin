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
import { Suspense, lazy, useEffect, useState } from 'react'
import { useRoutes, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { RouteObject } from 'react-router-dom'
import { getToken, getUserInfo } from '@/utils/auth';
import { useAppDispatch } from '@/store';

const Layout = lazy(() => import("@/layout"))
const Login = lazy(() => import("@/views/Login"))
const NotFound = lazy(() => import("@/views/NotFound"))

const modules = import.meta.glob('@/views/**/*.tsx')
const lazyLoad = (modulePath: string) => {
  // 路径变成大写
  const upperCasePath = modulePath.split('/').map(path => path.charAt(0).toUpperCase() + path.slice(1)).join('/')

  const Module = lazy(modules[`../views${[upperCasePath]}/index.tsx`] as any);
  
  return (
    <Suspense fallback={ <div>loading</div> }>
      <Module />
    </Suspense>
  )
};

const withLoadingComponent = (component:JSX.Element) => (
  <Suspense fallback={ <div>loading</div> }>
    {component}
  </Suspense>
)

// 根据权限数据生成菜单
const getPermissionRoutes = (menu:any[]):any => {
  return menu.map(item => {
    if (item.children?.length > 0) {
      return {
        ...item,
        children: getPermissionRoutes(item.children)
      }
    } else {
      return {
        ...item,
        element: lazyLoad(item.path)
      }
    }
  })
}
// 生成最终菜单数据
export const GenerateRoutes = (menu:any[]) => {
  const permissionRoutes = getPermissionRoutes(menu)

  const routes:RouteObject[] = [
    {
      path: '/',
      element: <Navigate to="/home"/>
    },
    {
      path: '/',
      element: <Layout />,
      children: permissionRoutes
    },
    ...defaultRoutes,
    {
      path: '*',
      element: <Navigate to="/404"/> // 回到首页或者404
    }
  ]

  return routes
}
const defaultRoutes:RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: withLoadingComponent(<NotFound />)
  }
]

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
  const dispatch = useAppDispatch()
  
  const [permissionRoute, setPermissionRoute] = useState(defaultRoutes)
  const RoutesElement = useRoutes(permissionRoute)
  
  const token = getToken()
  useEffect(() => {    
    if (token) {
      // 设置菜单数据
      const menu = getUserInfo().menu
      dispatch({ type: 'SET_MENU', payload: menu })
      // 生成路由
      const routes = GenerateRoutes(menu)
      setPermissionRoute(routes)
    }
  }, [token])

  if (!token && !whiteList.includes(pathname)) {
    return <Redirect to='/login' />
  }
  if (token && pathname === '/login') {
    return <Redirect to='/home' />
  }

  return RoutesElement
}