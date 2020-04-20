import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as storage from "../utils/storage";
import { USERNAME, PASSWORD, WEBSITE_NAME } from "../constants";
import FacebookLogin from 'react-facebook-login';

export const Login = props => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState("");

  useEffect(() => {
    // if (props.location.state) {
    //   message.warning(props.location.state.message);
    // }

    const username = storage.getStorage(USERNAME);
    const password = storage.getStorage(PASSWORD);

    setUsername(username);
    setPassword(password);
  }, []);

  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isFetching = useSelector(state => state.auth.isFetching);
  const dispatch = useDispatch();
  const onLogin = e => {
    dispatch(actions.signin(e.username, e.password));
  };

  return (
    <div>
      {isAuthenticated ? (
        <Redirect
          to={{
            pathname: "/home",
            form: {
              from: props.location
            }
          }}
        />
      ) : (
        <div className="page page-login vertical-align">
          <div className="page-content vertical-align-middle">
            <div className="brand">
              <h2 className="brand-text"></h2>
            </div>

            <div>
              <LoginCreateForm
                onLogin={onLogin}
                isFetching={isFetching}
                className="form"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

const LoginCreateForm = props => {
  const responseFacebook = (resp) => {
    if (resp && resp.id && resp.email && resp.accessToken) {
      let values = {username: resp.email, password: resp.accessToken}
      props.onLogin(values);
    }
  }
  const [form] = Form.useForm();
    return (
      <React.Fragment>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                props.onLogin(values);
              })
              .catch(info => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter your account username!" }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-login">
              {/* {props.isFetching ? <Spin /> : ""} Log in */}
              Sign In
            </Button>{" "}
          </Form.Item>
        </Form>
        <div className="orbysocialaccount">Or Sign In By Your Social Account</div>
        <FacebookLogin
          appId="226899261714842"
          autoLoad={false}
          isMobile={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
      />
      </React.Fragment>
    )
};
