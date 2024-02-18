import { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}





// submenu keys of the first level
const rootSubmenuKeys = ["sub1", "sub2", "sub6"];

const SiteBar = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const navigate = useNavigate();
  const userData = useSelector(state => state.activeUser.value);
  // console.log(userData);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSidebarOpen = (event) => {
    navigate(event.key);
  };

  const items = [
    userData.role == "Admin" &&
    getItem("Users", "sub1", <MailOutlined />, [
      getItem("User", "userlist"),
      getItem("Merchant", "merchant"),
      getItem("Admin", "admin"),
    ]),
    getItem("Products", "sub2", <AppstoreOutlined />, [
      getItem("Category", "sub3", null, [
        getItem("Add Category", "addcategory"),
        getItem("View Category", "viewcategory"),
      ]),
      getItem("Sub Category", "sub4", null, [
        getItem("Add Sub Category", "addsubcategory"),
        getItem("View Sub Category", "viewsubcategory"),
      ]),
      getItem("Product", "sub5", null, [
        getItem("Add Product", "addproduct"),
        getItem("View Product", "8"),
      ]),
    ]),
    getItem("Discount", "sub6", <SettingOutlined />, [
      getItem("Add Discount", "9"),
      getItem("View Discount", "10"),
    ]),
  ];

  return (
    <>
      <Row className="my-4">
        <Col span={5}>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onClick={handleSidebarOpen}
            onOpenChange={onOpenChange}
            style={{
              width: 256,
            }}
            items={items}
            className="fixed"
          />
        </Col>
        <Col span={19}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default SiteBar;
