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
  const [subscribers, setSubscribers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);
  const [updateRecordData, setUpdateRecordData] = useState(null);
  const [isSchoolModalVisible, setIsSchoolModalVisible] = useState(false);
  const [expandedText, setExpandedText] = useState(null);
  const [expandedModalVisible, setExpandedModalVisible] = useState(false);

  const navigate = useNavigate();

  const getAllSubscribers = () => {
    callApi(
      "GET",
      `${routes.getSubscribers}`,
      null,
      setIsLoading,
      (res) => {
        console.log("Resp", res);
        console.log("response is received", res?.data?.subscribers);

        setSubscribers(res?.data?.subscribers);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllSubscribers();
  }, []);
  const handleCloseModal = () => {
    setExpandedText(null);
    setExpandedModalVisible(false);
  };
  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      className: "type-name-column-header",
      align: "center",
    },
  ];

  const data = subscribers
    ?.map((item, index) => {
      return {
        key: index,
        id: item?._id,
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
        <Breadcrumb.Item>Subscribers</Breadcrumb.Item>
      </Breadcrumb>
      <Loader loading={isloading} />
      <div className="configure-server-roles-main-heading-container">
        <h1>Subscribers</h1>

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
          title="Full Review"
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
