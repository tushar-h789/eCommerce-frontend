import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";

const Merchant = () => {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState([]);

  //   table part start
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
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //   table part end

  useEffect(() => {
    const userName = [];
    async function usersList() {
      const userList = await axios.get(
        "http://localhost:7000/api/v1/auth/userlist"
      );
      setUserList(userList.data);

      userList.data.map((users) => {
        userName.push({
          text: users.name,
          value: users.name,
        });
      });

      setUserName(userName);
    }

    usersList();
  }, []);

  const filteredUser = userList.filter((user)=> user.role === "Merchant")
  console.log(filteredUser);

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-3xl font-bold my-2">
          Total Merchant: {filteredUser.length}
        </h2>
        <h2 className="text-3xl font-bold my-2">
          Total Users: {userList.length}
        </h2>
      </div>
      
      <Table columns={columns} dataSource={filteredUser} onChange={onChange} />
    </div>
  );
};

export default Merchant;
