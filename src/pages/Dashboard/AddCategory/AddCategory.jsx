import { Alert, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddCategory = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const data = useSelector(state => state.activeUser.value)
  console.log(data);

  const onFinish = async (values) => {
    console.log('Success:', values.categoryName, data.id);
    const categoryData = {
      name: values.categoryName,
      ownerId: data.id
    }

    try {
      const response = await axios.post('http://localhost:7000/api/v1/products/createcategory', categoryData);

      // Check if the response status is 200
      if (response.status === 200 && response.data === "Category Already Exists") {
        setErrorMessage("Category Already Exists. Please use a different category.");
      } else {
        // Reset the error message if the category creation is successful
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${values.categoryName} is created category!`,
          showConfirmButton: false,
          timer: 1500
        });
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error creating category or sending request", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
      label="Add Category Name"
        name="categoryName"
        rules={[
          {
            required: true,
            message: 'Please input your Category!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {errorMessage && <Alert message={errorMessage} type="error" />}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" block htmlType="submit" className='my-2'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddCategory;