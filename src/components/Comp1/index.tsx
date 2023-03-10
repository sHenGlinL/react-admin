import styles from "./comp1.module.scss";
import { Button } from "antd";
import { StepBackwardOutlined } from "@ant-design/icons";
import {
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";

export interface ChildRefType {
  childFun: () => void;
}

const Comp1: ForwardRefRenderFunction<ChildRefType> = (props, ref) => {
  const childFun = () => {
    console.log("我是子组件的方法");
  };

  useImperativeHandle(ref, () => ({
    childFun,
  }));

  return (
    <div className={styles["text-color"]}>
      Comp1
      <Button type="primary">Primary Button</Button>
      <StepBackwardOutlined style={{ fontSize: "28px" }} />
    </div>
  );
};

export default forwardRef(Comp1);
