# 学习笔记

## API
- 加🌟的表示为用作性能优化的API
### forwardRef
```
const Paranet = () => {
  const inputRef = useRef()

  return (
    <div>
      <Child ref={inputRef}/>
    </div>
  )
}

const Child = forwardRef((props, ref) => {
  return <div>
    <input ref={ref}/>
  </div>
})
```
- 透传/转发ref，可以直接拿到子组件内部的ref

### portal
```
const Comp = () => {
  return createPortal(dom, document.body)
}
```
- 传送门，相当于vue的teleport
- params1: 需要传送的dom
- params2: 传送到哪个目标dom下

### memo🌟
```
const child = memo(() => {
  return <div>
    <input />
  </div>
})
```
- react组件更新会自上而下进行更新
- memo可以控制组件仅在它的props发生改变时进行重新渲染
- 与PureComponent区别：PureComponent只能用于class组件，memo用于functional组件

## hooks的使用说明
- 加🌟的表示为用作性能优化/代码优化的hooks

### useState
```
const [state, setState] = useState()
```
- useState返回 => 状态和更新状态函数
- 记忆函数，会记住状态，因此函数组件重新调用不会重置状态

### useEffect
```
useEffect(() => {

}, [])
``` 
- params1: 回调函数
- params2: 依赖状态的数组
- - 正常使用：第二个参数传入依赖状态的数组。依赖的状态发生改变时，回调函数执行。
- - 特殊使用：第二个参数传空数组。回调函数只执行一次。因为更改组件状态会导致整个函数组件重新调用，因此需要useEffect模拟只执行一次的生命周期。 回调函数里return一个方法，该方法在组件被销毁时调用，也是用作模拟生命周期。

### useLayoutEffect🌟
- 与useEffect功能一样，执行时机不同。
- useLayoutEffect在dom更新后马上同步调用代码，会阻塞页面渲染。
- useEffect则在页面渲染完成后再调用。
- 如果需要操作dom，可以在此hooks进行操作，那么会在渲染前把dom一并更新掉，减少了一次重排和重绘。

### useCallback🌟
```
const handleClick = useCallback(() => {
  console.log(name)
}, [name])
``` 
- 防止因为组件重新渲染，导致该方法被重新定义，起到缓存的作用。
- 只有params2变化了，才会重新声明一次。
- 如果params2传入空数组，那么第一次创建后就会被缓存。如果name后期改变了，拿到的还是老的name。
- 如果不传入params2，那么每次都会重新声明一次，拿到的就是最新的name。

### useMemo🌟
```
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)

useMemo(() => {
  return ''
}, inputs)
```
- useMemo可以完全取代useCallback的功能，如果你想通过useMemo返回一个记忆函数也是可以的。
- 区别：useCallback不会执行fn，而是将它返回给你；useMemo会执行fn，并将fn的执行结果返回给你。
- 使用场景：useCallback常用在记忆事件函数，生成记忆后的函数并传递给子组件使用。而useMemo更适合经过函数计算得到一个确定的值，比如记忆组件、类似于vue的计算属性。
- params2为依赖项。

### useRef
```
const myswiper = useRef()
<Swiper ref={myswiper} />

useRef(0) // 用作保存状态
```
- 与vue的ref一样
- 放在组件上就是获取组件实例，放在dom上就是获取dom节点。
- 在不使用useState的情况下，还可以用作保存状态，原理是闭包。 

### useContext
```
const GlobalContext = React.createContext

<GlobalContext.Provider value={ {count:1} }>
  <Counter />
</GlobalContext.Provider>

const Counter = () => {
  const { count } = useContext(GlobalContext)
  return <p>子组件获得的点击数量：{count}</p>;
};
```
- 用于组件跨级通信

### useReducer🌟
```
const initState = {}
const reducer = (oldState, action) => {
  const newState = { ...oldState }

  switch(action.type) {
    case ''
      ...
      return newState
      break
     default:
      return oldState
  }
}
const [state, dispatch] = useReducer(reducer, initState)
```
- 先有的redux，react-hooks引用了redux的理念，创建了useReducer。
- 可以在单个组件内使用redux的状态管理模式，使用高内聚的方式代替多个useState。

### useImperativeHandle
- 将方法暴漏给父组件使用

## redux生态
### redux
- dispatch的时候，会把所有的订阅者都执行一遍。
- dispatch的时候，会把所有的reducer都执行一遍。
- dispatch会把所有的reducer执行一遍，reducer会返回新的state，useSelector获取新的state。这一系列都是同步操作。因此action不能为异步操作，否则返回的state还是旧的state。
### redux-thunk
```
dispatch((dis) => {
  // 异步操作
  dis({ type: 'arrPush', payload: '异步添加' })
})
```
- 解决dispatch异步问题
- 向dispatch传入一个方法

### redux-promise
```
dispatch(new Promise(resolve => {
  resolve({ type: 'arrPush', payload: '异步添加' })
}))

or

dispatch(async () => {
  await ...
  return { type: 'arrPush', payload: '异步添加' }
})
```
- 解决dispatch异步问题
- 向dispatch传入一个promise

### redux-saga
- 解决dispatch异步问题
- 区别于redux-thunk和redux-promise，redux-saga不会改变dispatch的调用参数，非侵入式的解决方案。
- 使用了Generator