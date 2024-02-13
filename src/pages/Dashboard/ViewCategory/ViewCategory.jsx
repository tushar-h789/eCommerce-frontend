import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Space, Table, Modal, Form, Input, Alert } from "antd";
import Swal from "sweetalert2";

const ViewCategory = () => {
  // State to store the fetched category data
  const [categories, setCategories] = useState([]);
  const [shouldReloadData, setShouldReloadData] = useState(false);
  const [loadingCategoryId, setLoadingCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [form] = Form.useForm();  // Form hooks
    // State to manage error messages
    const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle category deletion
  const handleDelete = async (categoryId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoadingCategoryId(categoryId);
          const response = await axios.delete(
            "http://localhost:7000/api/v1/products/deletecategory",
            { data: { categoryId: categoryId } }
          );
          console.log(response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: " Category Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });

          setShouldReloadData(!shouldReloadData);
          setLoadingCategoryId("");
        }
      });
    } catch (error) {
      console.error("Error handling category deletion:", error);
    }
  };

  //  edit part start
  const onFinish = async (values) => {
    console.log("Success:", values);
    const editCategoryData = {
      name: values.categoryName,
      id: editId,
    };

    const response = await axios.post(
      "http://localhost:7000/api/v1/products/editcategory",
      editCategoryData
    );
    console.log(response);

    if (response.status === 200 && response.data === "Category Already Exists") {
        setErrorMessage("Category Already Exists. Please use a different category.");
      }else{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: " Category Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
      
          setShouldReloadData(!shouldReloadData);
          setLoadingCategoryId("");
          setIsModalOpen(false);  // Close the modal after successful edit
      }

    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (editId) => {
    setIsModalOpen(true);
    setEditId(editId);

    // Find the category data based on the editId
    const categoryToEdit = categories.find((category) => category.key === editId);

    // Set initial values for the form fields
    form.setFieldsValue({
      categoryName: categoryToEdit.name,
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   modal end

  useEffect(() => {
    // Function to fetch all categories from the API
    async function fetchAllCategories() {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/products/allcategory"
        );

        // Transform the received data into the desired format
        const transformedData = response.data.data.map((item) => ({
          key: item._id,
          name: item.name,
          status: item.isActive ? "Approved" : "Pending",
        }));

        // Set the transformed data to the state
        setCategories(transformedData);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching categories:", error);
      }
    }

    // Fetch categories when the component mounts and whenever data should be reloaded
    fetchAllCategories();
  }, [shouldReloadData]);

  // Table columns configuration
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record.key)}>Edit</Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => handleDelete(record.key)}
            loading={loadingCategoryId === record.key}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-semibold my-2">View Category</h2>
        <h2 className="text-2xl font-semibold my-2">
          Total Category {categories.length}
        </h2>
      </div>
      <Table columns={columns} dataSource={categories} />

      {/* edit modal start */}
      <Modal
        title="Edit Category"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Form input for category name */}
          <Form.Item
            label="Edit Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your Category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {errorMessage && <Alert message={errorMessage} type="error" />}

          {/* Form submission button */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              block
              htmlType="submit"
              className="my-2 bg-blue-500 text-white font-semibold"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* edit modal end */}
    </>
  );
};

export default ViewCategory;
