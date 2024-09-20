import React, { useState, useEffect } from "react";
import "./faqs.css";
import { Breadcrumb, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { GreenNotify, RedNotify } from "../../helper/helper";
import AddFAQModel from "../../components/ModalAddFAQS/ModalAddFAQS";
import routes from "../../api/routes";

const FAQs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFAQModalVisible, setIsFAQModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);

  const getPreferences = () => {
    callApi(
      "GET",
      `${routes.getFAQs}`,
      null,
      setIsLoading,
      (res) => {
        setProducts(res?.data?.fAQS);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleDelete = (item) => {
    callApi(
      "DELETE",
      `${routes.deleteFAQs}/${item?._id}`,
      null,
      setIsLoading,
      (resp) => {
        if (resp.status === 200) {
          GreenNotify("FAQ Deleted successfully");
          getPreferences();
        } else {
          RedNotify("Failed to Delete FAQ");
        }
      }
    );
  };

  const columns = [
    {
      title: "FAQ",
      dataIndex: "data",
      align: "center",
      width: 420,
      render: (text) => (
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "center",
      render: (text, item) => (
        <div
          onClick={() => {
            setSelectedProduct(item);
            setIsAddMode(false);
            setIsFAQModalVisible(true);
          }}
        >
          <img src={editIcon} alt="edit-icon" />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      render: (text, item) => (
        <div onClick={() => handleDelete(item)}>
          <img src={redTrash} alt="delete-icon" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getPreferences();
  }, [isFAQModalVisible]);

  return (
    <div className="admin-products-main-container">
      {isFAQModalVisible && (
        <AddFAQModel
          setShowModal={setIsFAQModalVisible}
          showModal={isFAQModalVisible}
          item={selectedProduct}
          setIsLoading={setIsLoading}
          addProduct={isAddMode}
          setAddProduct={setIsAddMode}
        />
      )}

      <Loader loading={isLoading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>FAQ's</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>FAQ's</h1>
        <div
          onClick={() => {
            setIsAddMode(true);
            setSelectedProduct(null);
            setIsFAQModalVisible(true);
          }}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="add-icon" />
          <p>Add New FAQ's</p>
        </div>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setIsAddMode(true);
          setSelectedProduct(null);
          setIsFAQModalVisible(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add New FAQ's
      </Button>
      <div className="server-roles-tb-main-container">
        <Table
          columns={columns}
          dataSource={products}
          pagination={true}
          className="subscriptionapi-table"
        />
      </div>
    </div>
  );
};

export default FAQs;
