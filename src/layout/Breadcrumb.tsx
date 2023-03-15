import { useAppSelector } from "@/store";
import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom";

interface menuItem {
  name: string
  path: string
  children?: menuItem[]
}

// 匹配面包屑名字
const mateBreadcrumbName = (parent:menuItem[], pathSnippets:string[]) => {
  let _pathSnippets = [...pathSnippets]
  const nameSnippets = []
  while(_pathSnippets.length > 0) {
    const current = parent.find(child => isSameLastPath(child.path, _pathSnippets[0]))!
    nameSnippets.push(current.name)
    parent = current.children || []
    _pathSnippets.shift()
  }
  return nameSnippets
}
// 判断一级路径是否相等
const isSameLastPath = (path:string, pathSnippet:string) => {
  const pathSplit = path.split('/')
  const lastPath = pathSplit[pathSplit.length - 1]
  return lastPath.toUpperCase() === pathSnippet.toUpperCase()
}

const BreadcrumbView = () => {
  const { menu } = useAppSelector(state => state.UserReducer)
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const nameSnippets = mateBreadcrumbName(menu, pathSnippets)  
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{ nameSnippets[index] }</Link>
    };
  });

  return (
    <Breadcrumb style={{ height: '64px', display: 'flex', alignItems: 'center' }}>
      {
        extraBreadcrumbItems.map(item => (
          <Breadcrumb.Item key={item.key}>{ item.title }</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default BreadcrumbView