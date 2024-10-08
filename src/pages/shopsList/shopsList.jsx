import React, { useState, useEffect } from "react";
import "./userList.css";
import { Breadcrumb, Button, Select, Table, Input, Image } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";
import {
  crossIcon,
  homeIcon,
  editIcon,
  redTrash,
  trueIcon,
} from "../../assets";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getAllUser = async () => {
    let getRes = (res) => {
      console.log("respon", res?.data?.data);
      setUsers(res?.data?.data);
    };

    const result = await callApi(
      "GET",
      `${routes.getAllUser}?role=shop`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
      align: "center",
      // width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "type-name-column-header",
      align: "center",
      // width: 250,
    },
    {
      title: "Cell",
      dataIndex: "number",
      className: "type-name-column-header",
      align: "center",
      // width: 250,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      align: "center",
      className: "action-column-header",
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      className: "action-column-header",
      width: 200,
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      align: "center",
      className: "action-column-header",
      // render: (text, record) => (
      //   <div className="product-list-image">
      //     <Image width={50} src={record.profilePic} alt="profile-image" />
      //   </div>
      // ),
    },
    {
      title: "Verified",
      dataIndex: "verified",
      align: "center",
      className: "action-column-header",
    },
    // {
    //   title: "Phone No.",
    //   dataIndex: "phoneNo",
    //   align: "center",
    //   className: "action-column-header",
    //   width: 200,
    // },

    {
      title: "Block User",
      dataIndex: "blockORUnblock",
      align: "center",
      className: "action-column-header",
      render: (text, record) => (
        <div className="server-roles-trash-btn">
          {/* {console.log('record',record.email)} */}
          {record.isBlocked ? (
            <Button
              className="server-roles-trash-btn"
              style={{
                width: "80px",
                color: "white",
                backgroundColor: "#52c41a",
              }}
              onClick={(event) => {
                console.log("unblock", record.email);
                return blocked(record.key, event, record.email, false);
              }}
            >
              Unblock
            </Button>
          ) : (
            <Button
              className="server-roles-trash-btn"
              style={{
                width: "80px",
                color: "white",
                backgroundColor: "#f5222d",
              }}
              onClick={(event) => {
                console.log("block", record.email);
                return blocked(record.key, event, record.email, true);
              }}
            >
              Block
            </Button>
          )}
        </div>
      ),
    },
  ];

  const data = users
    ?.map((item, index) => {
      return {
        key: index,
        name: item?.name,
        lastName: item?.lastName,
        userName: item?.username,
        role: item?.role,
        email: item?.email,
        number: item?.number,
        location: item?.location?.address,
        dob: moment(item?.dob).format("MM-DD-YYYY"),
        profilePicture: (
          <div className="product-list-image">
            <Image
              width={50}
              height={60}
              src={item?.image}
              alt="profile-image"
            />
          </div>
        ),
        verified: (
          <div className="server-roles-trash-btn">
            <img src={item?.verified ? trueIcon : crossIcon} alt="" />
          </div>
        ),
        isBlocked: item?.isBlocked,
      };
    })
    .filter((item) => {
      const usernameMatch = item.name
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
      const emailMatch = item.email
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
      return usernameMatch || emailMatch;
    });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  let blocked = async (ind, event, email, blockStatus) => {
    event.stopPropagation();
    let i = ind;
    let updatedUsers = [...users];
    updatedUsers[i].isBlocked = blockStatus;
    let data = {
      email: email,
      isBlocked: blockStatus,
    };
    console.log("data:::", data);

    let getRes = (res) => {};

    callApi("PATCH", routes.blockUser, data, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });

    setUsers(updatedUsers);
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Shops</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Shops</h1>
        <div></div>
        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search Name or Email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default UserList;
