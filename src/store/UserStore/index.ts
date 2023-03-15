import { getUserMenu } from '@/api/system'
import { setUserInfo, removeUserInfo } from "@/utils/auth";

interface StateType {
  arr: number[]
  menu: any[]
}

const UserStore = {
  state: {
    arr: [10, 20, 30],
    menu: [] // 权限菜单
  },
  actions: {
    arrPush(state:StateType, payload:any) {
      state.arr.push(payload)
    },
    SET_MENU(state:StateType, payload:any) {
      state.menu = payload
    }
  },
  asyncActions: {
    asyncArrPush(dispatch:Function) {
      setTimeout(() => {
        dispatch({ type: 'arrPush', payload: '异步添加' })
      }, 1000);
    },
    // 登录
    async Login(dispatch:Function) {
      const response = await getUserMenu() // 获取菜单
      const userinfo = { token: '666', menu: response }
      setUserInfo(userinfo)
    },
    // 登出
    async Logout(dispatch:Function) {
      removeUserInfo()
    }
  }
}

export default UserStore