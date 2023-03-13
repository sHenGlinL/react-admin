import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom";

const BreadcrumbView = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>面包屑</Link>
    };
  });

  return (
    <Breadcrumb >
      {
        extraBreadcrumbItems.map(item => (
          <Breadcrumb.Item key={item.key}>{ item.title }</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default BreadcrumbView