import { useEffect, useState } from "react";
import { Button, Form, Input, Card, Col, Row, Select } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import CkEditor from "./CkEditor";

const AddProduct = () => {
  let [varinatvalue, setVarinatvalue] = useState([]);
  let [value, setValue] = useState("");
  let [valuestock, setValueStock] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [image, setImage] = useState({});
  const [imagePrev, setImagePrev] = useState({});
  const [productType, setProductType] = useState(null);

  const onFinishMain = async (values) => {
    // console.log(values);
    const productData = {
      name: values.name,
      description: values.description,
      variant: varinatvalue,
      avatar: image,
    };

    const data = await axios
      .post(
        "http://localhost:7000/api/v1/products/createproducts",
        productData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your product added",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    console.log(data);
  };

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
    // console.log(arr);
    setVarinatvalue(arr);
    // clear input box values
    setValue("");
    setValueStock("");
  };

  const handleDelete = (index) => {
    console.log(index);
    const arr = [...varinatvalue];
    // console.log(arr);
    arr.splice(index, 1);
    setVarinatvalue(arr);
  };

  const handleValueDelete = (mainId, id) => {
    console.log(mainId, id);
    const arr = [...varinatvalue];
    // console.log(arr[mainId].value);
    arr[mainId].value.splice(id, 1);
    setValue(arr);
  };

  useEffect(() => {
    // console.log("running");
    async function getData() {
      const data = await axios.get(
        "http://localhost:7000/api/v1/products/viewstore/65c725ddf3bff7b9096d963d"
      );
      // console.log(data.data);
      setStoreList(data.data);
    }
    getData();
  }, []);

  const handleFile = (e) => {
    setImage(e.target.files[0]);
    setImagePrev(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    console.log(e.label);
    setProductType(e.label);
  };

  // const handleProductType =(e)=>{
  //   console.log("kire",e.label);
  //   setProductType(e.label)
  // }

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
        onFinish={onFinishMain}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        encType="multipart/form-data"
      >
        {/* variant select option start */}
        <Select
          labelInValue
          defaultValue={{
            value: "nonvariant",
            label: "Non Variant",
          }}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "variant",
              label: "Variant",
            },
            {
              value: "nonvariant",
              label: "Non Variant",
            },
          ]}
          // onChange={handleProductType}
        />
        {/* variant select option end */}

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

        <div className="mx-auto w-full pl-28 my-4 ">
          <div className="flex gap-6 justify-center items-center">
            <p className="font-semibold">File name:</p>
            <input onChange={handleFile} type="file" name="" id="" />
            <img src={imagePrev} alt="" className="w-[100px] h-[100px]" />
          </div>
        </div>

        <Form.Item
          label="Brand Name"
          name="brandName"
          rules={[
            {
              required: true,
              message: "Please input your Brand Name!",
            },
          ]}
        >
          <Select>
            {storeList.map((storeData) => (
              // <div key={storeData._id}>
              <Select.Option key={storeData._id} value={storeData._id}>
                {storeData.storeName}
              </Select.Option>
              // </div>
            ))}
          </Select>
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

      {productType == 'Variant' &&

      

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
        {/* ck editor */}
        <CkEditor />

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
              <Col key={index} span={8}>
                <Card
                  style={{ width: 300 }}
                  className="my-2 h-96 overflow-y-auto"
                >
                  <div>
                    <div className="flex justify-between">
                      <b>Variant Name: {item.name}</b>
                      {/* {JSON.stringify(varinatvalue)} */}
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
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
                    <Button
                      ghost
                      type="primary"
                      className="my-2"
                      onClick={() => handleVariantValue(index)}
                    >
                      Add
                    </Button>
                    <div className="scroll-my-1">
                      {item.value.map((i, id) => (
                        <div
                          key={i._id}
                          className="flex gap-12 font-bold my-2 scroll-mt-0"
                        >
                          <p>{i.name}</p>
                          <p>{i.stock}</p>
                          <Button
                            danger
                            className="font-semibold"
                            onClick={() => handleValueDelete(index, id)}
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </Form>
}
    </>
  );
};

export default AddProduct;
