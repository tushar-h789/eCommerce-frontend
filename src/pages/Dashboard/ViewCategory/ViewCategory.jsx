import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import Swal from "sweetalert2";
import EditCategory from "./EditCategory";

const ViewCategory = () => {
  // State to store the fetched category data
  const [viewCategory, setViewCategory] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState('');

  const handleDelete = async (id) => {
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
          //when i use delete operator then uses two object
          setLoading(id);
          const categoryData = {
            data: { categoryId: id },
          };
          const response = await axios.delete(
            "http://localhost:7000/api/v1/products/deletecategory",
            categoryData
          );
          console.log(response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: " Category Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });

          setLoadData(!loadData);
          setLoading(id);
        }
      });
    } catch (error) {
      console.log("catch error", error);
    }
  };

  const handleEdit =(edit)=>{
    console.log(edit);
    <EditCategory/>

  }

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
        setViewCategory(transformedData);

        // Log the original data (optional)
        console.log(response.data.data);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching categories:", error);
      }
    }

    // Call the function to fetch categories when the component mounts
    fetchAllCategories();
  }, [loadData]);

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
          <Button onClick={()=>handleEdit(record.key)}>Edit</Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => handleDelete(record.key)}
            loading={loading === record.key}
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
          Total Category {viewCategory.length}
        </h2>
      </div>
      <Table columns={columns} dataSource={viewCategory} />
    </>
  );
};

export default ViewCategory;
