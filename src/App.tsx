// import { Outlet } from 'react-router-dom'
import { RouterBeforeEach } from '@/router' // 懒加载路由组件

function App() {
  return (
    <div className="App">
      {/* <Outlet></Outlet> */}
      <RouterBeforeEach />
    </div>
  )
}

export default App
