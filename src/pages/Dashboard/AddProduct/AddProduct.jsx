import { useState } from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";

const AddProduct = () => {
  let [varinatvalue, setVarinatvalue] = useState([]);
  let [value, setValue] = useState("");
  let [valuestock, setValueStock] = useState("");
  const onFinish = (values) => {
    let arr = [...varinatvalue];

    arr.push({
      name: values.variantname,
      value: [],
    });
    setVarinatvalue(arr);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleVariantValue = (index) => {
    varinatvalue[index].value.push({
      name: value,
      stock: valuestock,
    });
    let arr = [...varinatvalue];
    console.log(arr);
    setVarinatvalue(arr);
  };

  const handleDelete =(index)=>{
    console.log(index);
    const arr = [...varinatvalue]
    console.log(arr);
    arr.splice(index, 1)
    setVarinatvalue(arr)
  }

  const handleValueDelete =(mainId, id)=>{
    console.log(mainId, id);
    const arr = [...varinatvalue]
    console.log(arr[mainId].value);
    arr[mainId].value.splice(id, 1)
    setValue(arr)
  }

  return (
    <>
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button ghost type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Variant Name"
          name="variantname"
          style={{
            maxWidth: 600,
          }}
          rules={[
            {
              required: true,
              message: "Please input your variant!",
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
          <Button ghost type="primary" htmlType="submit">
            Add Variant
          </Button>
        </Form.Item>
        <Row>
        {varinatvalue.length > 0 &&
          varinatvalue.map((item, index) => (
            <Col key={item._id} span={8}>
            <Card  style={{ width: 300 }} className="my-2 h-96 overflow-y-auto">
              <div>
                  <div className="flex justify-between">
                  <b>Variant Name: {item.name}</b>
                <Button type="primary" danger onClick={()=> handleDelete(index)}>Delete</Button>
                  </div>

                <Input
                  placeholder="value name"
                  className="my-2 placeholder:font-bold placeholder:text-lg"
                  onChange={(e) => setValue(e.target.value)}
                />
                <Input
                  placeholder="Sotck"
                  className="my-2 placeholder:font-bold placeholder:text-lg"
                  onChange={(e) => setValueStock(e.target.value)}
                />
                <br />
                <Button ghost type="primary" className="my-2" onClick={() => handleVariantValue(index)}>Add</Button>
                <div  className="scroll-my-1">
                {item.value.map((i) => (
                    <div key={i._id} className="flex gap-12 font-bold my-2 scroll-mt-0">
                    <p>{i.name}</p>
                    <p>{i.stock}</p>
                    <Button danger className="font-semibold" onClick={()=>handleValueDelete(index, i)}>Delete</Button>
                    </div>
                ))}
                </div>
              </div>
            </Card>
            </Col>
          ))}
          </Row>
      </Form>
    </>
  );
};

export default AddProduct;
