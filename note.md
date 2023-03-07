# 学习笔记

## hooks

### useState
```
const [state, setState] = useState()
```
- useState返回 => 状态和更新状态函数

### useEffect
```
useEffect(() => {

}, [])
``` 
- params1: 回调函数
- params2: 依赖状态的数组
- - 正常使用：第二个参数传入依赖状态的数组。依赖的状态发生改变时，回调函数执行。
- - 特殊使用：第二个参数传空数组。回调函数只执行一次。因为更改组件状态会导致整个函数组件重新调用，因此需要useEffect模拟只执行一次的生命周期。 回调函数里return一个方法，该方法在组件被销毁时调用，也是用作模拟生命周期。

### useLayoutEffect
- 与useEffect功能一样，执行时机不同
- useLayoutEffect在dom更新后马上同步调用代码，会阻塞页面渲染。
- useEffect则在页面渲染完成后再调用。