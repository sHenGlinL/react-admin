import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { initThreeBackground } from "./background";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store";
import UserStore from "@/store/UserStore"

type UserInfo = {
  userName: string;
  password: string;
};

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch()
  const handleSubmit = async (values: UserInfo) => {
    if (checkUser(values)) {
      await dispatch(UserStore.asyncActions.Login as any)
      navigateTo("/");
    }
  };
  const checkUser = (values: UserInfo) => {
    const users = [["admin", "admin"]];
    return users.some(
      (user) => user[0] === values.userName && user[1] === values.password
    );
  };

  const threeRef = useRef(null);
  useEffect(() => {
    initThreeBackground(threeRef);
  }, []);

  return (
    <div className={styles.login}>
      <div ref={threeRef}></div>
      <div className={styles.login__main}>
        <div className={styles.login__main__logo}>React-Admin</div>
        <Form onFinish={handleSubmit} style={{ width: "300px" }}>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              prefix={<UserOutlined size={13} />}
              placeholder="请输入用户名 admin"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password
              prefix={<LockOutlined size={13} />}
              type="password"
              placeholder="请输入密码 admin"
            />
          </Form.Item>
          <Form.Item>
            {/* <span className="login__form__forgot" style={{ float: "right" }}>
            忘记密码
          </span> */}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
