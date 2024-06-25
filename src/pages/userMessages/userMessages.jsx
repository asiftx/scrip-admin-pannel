import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Image,
  notification,
  Input,
  Breadcrumb,
  Rate,
  Modal,
} from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { GreenNotify, RedNotify } from "../../helper/helper";
import Loader from "../../components/loader/loader";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Reviews = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [expandedReview, setExpandedReview] = useState(null);

  const navigate = useNavigate();

  const getAllUserMessages = () => {
    callApi(
      "GET",
      `${routes.getUserMessage}`,
      null,
      setIsLoading,
      (res) => {
        console.log("Resp", res);
        console.log("response is received", res?.data?.getInTouch);

        setUserMessages(res?.data?.getInTouch);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleShowMore = (text) => {
    setExpandedReview(text);
  };

  const handleCloseModal = () => {
    setExpandedReview(null);
  };

  useEffect(() => {
    getAllUserMessages();
  }, []);

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      className: "type-name-column-header",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      className: "type-name-column-header",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "type-name-column-header",
      align: "center",
    },
    {
      title: "Message",
      dataIndex: "message",
      className: "type-name-column-header",
      align: "center",
      render: (text) => (
        <div>
          <p>{text.length > 50 ? `${text.slice(0, 30)}...` : text}</p>
          {text.length > 50 && (
            <Button type="link" onClick={() => handleShowMore(text)}>
              Show More
            </Button>
          )}
        </div>
      ),
    },
  ];

  const data = userMessages
    ?.map((item, index) => {
      return {
        key: index,
        id: item?._id,
        firstName: item?.firstName,
        lastName: item?.lastName,
        message: item?.message,
        email: item?.email,
      };
    })
    .filter((item) => {
      const titleMatch = item?.email
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());

      return titleMatch;
    });

  return (
    <div className="admin-products-main-container">
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User Messages</Breadcrumb.Item>
      </Breadcrumb>
      <Loader loading={isloading} />
      <div className="configure-server-roles-main-heading-container">
        <h1>User Messages</h1>

        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search Review"
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
        />
      </div>
      {expandedReview && (
        <Modal
          title="Message"
          visible={!!expandedReview}
          onCancel={handleCloseModal}
          footer={null}
        >
          <p>{expandedReview}</p>
        </Modal>
      )}
    </div>
  );
};

export default Reviews;
