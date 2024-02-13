import axios from "axios";
import { useEffect, useState } from "react";
import { Space, Table } from "antd";

const ViewSubCategory = () => {
  // State to store the fetched category data
  const [viewCategory, setViewCategory] = useState([]);

  useEffect(() => {
    // Function to fetch all categories from the API
    async function fetchAllCategories() {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/products/allsubcategory");

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
  }, []);

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
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>View Category: {viewCategory.length}</h2>
      <Table columns={columns} dataSource={viewCategory} />
    </>
  );
};

export default ViewSubCategory;
