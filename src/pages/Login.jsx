import { Card, Space, Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };



  return (
    <div className="text-center my-[5%]  py-10">
    <Space direction="vertical" size={16}>
      <Card
        title="Login"
        style={{
          width: 400,
        }}
      >

          {/* from start */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        > 
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="secondary" className="bg-orange-400" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* from end */}
      <div className="my-4">
      <p>Don not have an account? Please <span className="text-blue-500 font-bold"><Link to='/registration'>Registration</Link></span></p>
    </div>
      </Card>
      
    </Space>
    
  </div>
  )
}

export default Login