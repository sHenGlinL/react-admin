import styles from './comp1.module.scss'
import { Button } from 'antd'
import { StepBackwardOutlined } from '@ant-design/icons'

function Comp1() {
  return (
    <div className={styles['text-color']}>
      组件1
      <Button type="primary">Primary Button</Button>
      <StepBackwardOutlined style={{fontSize: '28px'}}/>
    </div>
  )
}

export default Comp1