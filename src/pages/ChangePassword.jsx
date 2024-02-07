import { Card, Space, Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const changePassword = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const {email} = useParams()

    const onFinish = async (values) => {

        const forgotPassInfo = {
            email: values.email,
        };
        console.log(forgotPassInfo);
    
        try {
          const forgotPassData = await axios.post("http://localhost:7000/api/v1/auth/forgotPassword", forgotPassInfo);

          console.log(forgotPassData);
    
          // Check if the response contains an error message
        //   if (forgotPassData.status === 400 && forgotPassData.data === "OTP does not match") {
        //     setErrorMessage("Email already exists. Please use a different email.");
        //   } else {
        //     // Reset the error message if the registration is successful
        //     Swal.fire({
        //       position: "top-end",
        //       icon: "success",
        //       title: "OTP verify successful!",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     setErrorMessage(null);
        //     // Redirect to a different page or provide feedback
        //     // navigate('/');
        //   }
        } catch (error) {
          console.error("Error creating user or sending email", error);
          setErrorMessage("Please submit your valid email");
        }
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };


  return (
    <div className="text-center my-[5%]  py-10">
    <Space direction="vertical" size={16}>
      <Card
        title="Change Password"
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
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
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
      {errorMessage && <Alert message={errorMessage} type="error" />}
      </Card>
      
    </Space>
    
  </div>
  )
}

export default changePassword