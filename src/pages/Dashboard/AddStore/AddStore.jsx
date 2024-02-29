import { Button, Form, Input } from 'antd';

const AddStore = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <div>
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
      label="Store Name"
      name="storeName"
      rules={[
        {
          required: true,
          message: 'Please input your Store Name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Trade Number"
      name="tradeNumber"
      rules={[
        {
          required: true,
          message: 'Please input your Trade Number!',
        },
      ]}
    >
      <Input placeholder='TRAD/DNCC/123456/2024' className='placeholder:font-bold placeholder:text-lg'/>
    </Form.Item>

    <Form.Item
      label="NID Number"
      name="nidNumber"
      rules={[
        {
          required: true,
          message: 'Please input your NID number!',
        },
      ]}
    >
      <Input placeholder='1234567890000' className='placeholder:font-bold placeholder:text-lg'/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" ghost className='font-bold' htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AddStore