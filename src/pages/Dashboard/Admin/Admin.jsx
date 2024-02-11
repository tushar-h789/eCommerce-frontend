import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState([]);

  // Table columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: userName,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      filterMode: "tree",
      filterSearch: true,
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  // Table onChange handler
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    const userNameFilterOptions = [];

    async function fetchUserList() {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/auth/userlist");
        setUserList(response.data);

        response.data.forEach((user) => {
          userNameFilterOptions.push({
            text: user.name,
            value: user.name,
          });
        });

        setUserName(userNameFilterOptions);
      } catch (error) {
        console.error("Error fetching user list", error);
      }
    }

    fetchUserList();
  }, []);

  // Filter users with role "Admin"
  const filteredUser = userList.filter((user) => user.role === "Admin");

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-3xl font-bold my-2">
          Total Admin: {filteredUser.length}
        </h2>
        <h2 className="text-3xl font-bold my-2">
          Total Users: {userList.length}
        </h2>
      </div>
      
      <Table columns={columns} dataSource={filteredUser} onChange={onChange} />
    </div>
  );
};

export default Admin;
