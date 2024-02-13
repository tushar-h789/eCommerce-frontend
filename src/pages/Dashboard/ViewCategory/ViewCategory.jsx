import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import Swal from "sweetalert2";

const ViewCategory = () => {
  // State to store the fetched category data
  const [categories, setCategories] = useState([]);
  const [shouldReloadData, setShouldReloadData] = useState(false);
  const [loadingCategoryId, setLoadingCategoryId] = useState("");

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

  // Function to handle category editing
  const handleEdit = (categoryId) => {
    console.log("Edit category with ID:", categoryId);
    // Implement the logic to open the edit category modal
    // For example, you can use a state to control the modal visibility
    // and pass the category data to the modal component
    // <EditCategoryModal categoryId={categoryId} onClose={() => handleModalClose()} />
  };

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

        // Log the original data (optional)
        console.log(response.data.data);
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
          <Button onClick={() => handleEdit(record.key)}>Edit</Button>
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
    </>
  );
};

export default ViewCategory;
