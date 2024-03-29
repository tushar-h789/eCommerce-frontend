import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
const AddVariant = () => {
  let [image, setImage] = useState({});
  let [imagePrev, setImagePrev] = useState("");
  let [prolist, setProlist] = useState([]);
  let [productId, setProductId] = useState("");

  const onFinish = async (values) => {
    // console.log("Success:", values);
    // console.log(image);
    let data = await axios.post(
      "http://localhost:7000/api/v1/products/variant",
      {
        name: values.name,
        avatar: image,
        productId: productId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log("running");
    async function getData() {
      let data = await axios.get(
        "http://localhost:7000/api/v1/products/viewproducts"
      );
      console.log(data.data);
      let arr = [];
      data.data.map((item) => {
        arr.push({
          label: item.name,
          value: item._id,
        });
      });
      setProlist(arr);
    }
    getData();
  }, []);

  let handleChange = (e) => {
    setImage(e.target.files[0]);
    setImagePrev(URL.createObjectURL(e.target.files[0]));
  };
  let handleChange2 = (e) => {
    setProductId(e);
    console.log(e);
  };

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
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        enctype="multipart/form-data"
      >
        <div className="mx-auto w-full text-center my-4">
            <p className="font-semibold my-1"><strong>*</strong> Select Variant:</p>
        <Select
          defaultValue=""
          style={{
            width: 120,
          }}
          options={prolist}
          onChange={handleChange2}
        />
        </div>
        
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

        <div className="mx-auto w-full pl-28 my-4 ">
          <div className="flex gap-6 justify-center items-center">
            <p className="font-semibold">File name:</p>
            <input onChange={handleChange} type="file" name="" id="" />
            <img src={imagePrev} alt="" className="w-[100px] h-[100px]" />
            {/* <Input onChange={handleChange} type="file" />
        <img src={imagePrev} /> */}
          </div>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" className="bg-orange-500 font-semibold"  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddVariant;