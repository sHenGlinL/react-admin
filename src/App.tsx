// import { Outlet } from 'react-router-dom'
import { RoutesElement } from '@/router' // 懒加载路由组件

function App() {
  return (
    <div className="App">
      {/* <Outlet></Outlet> */}
      <RoutesElement />
    </div>
  )
}

export default App
