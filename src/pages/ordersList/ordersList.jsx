import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Input, Image } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { GreenNotify, RedNotify } from "../../helper/helper";
import UpdateCategory from "../../components/updateCategory/updateCategory";
import Category from "../../components/addCategory/addCategory";

import {
  crossIcon,
  homeIcon,
  editIcon,
  redTrash,
  trueIcon,
} from "../../assets";

const Organizers = () => {
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateRecordData, setUpdateRecordData] = useState(null);
  const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);

  const getAllOrders = () => {
    let getRes = (res) => {
      console.log("response??????", res?.data);
      setCategories(res?.data);
    };

    callApi(
      "GET",
      `${routes.getOrders}`,
      null,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const columns = [
    {
      title: "Order #",
      dataIndex: "orderNumber",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "role-name-column-header",
      align: "center",
    },

    // {
    //   title: "Picture",
    //   dataIndex: "picture",
    //   align: "center",
    //   render: (text, record) => (
    //     <div className="product-list-image">
    //       <Image width={50} height={60} src={record.picture} alt="Image" />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   className: "type-name-column-header",
    //   align: "center",
    //   render: (text, record) => (
    //     <div>
    //       <Button
    //         type="primary"
    //         icon={<EditOutlined />}
    //         onClick={() => handleUpdate(record.id)}
    //         style={{ marginRight: 8 }}
    //       ></Button>
    //       <Button
    //         type="danger"
    //         icon={<DeleteOutlined />}
    //         onClick={() => handleDelete(record.id)}
    //       ></Button>
    //     </div>
    //   ),
    // },
  ];
  const data = categories
    ?.map((item, index) => {
      console.log("iiiiii", item);
      return {
        key: index,
        id: item?._id,
        orderNumber: item?.orderNumber,
        totalItems: item?.totalItems,
        status: item?.status,
        totalPrice: item?.totalPrice,
        items: item?.items,
        pharmacy: item?.pharmacy,
      };
    })
    .filter((item) => {
      const titleMatch = item?.orderNumber
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());

      return titleMatch;
    });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  const handleDelete = (recordId) => {
    console.log(`Delete record with id: ${recordId}`);
    callApi(
      "DELETE",
      `${routes.deleteCategory}/${recordId}`,
      null,
      setIsLoading,
      (res) => {
        console.log("response Receceiveddddd", res);

        if (res.status === 200) {
          console.log(setCategories);
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== recordId)
          );

          GreenNotify("Event Deleted Successfully");
        } else {
          RedNotify("Error Occurred");
        }
      },
      (error) => {
        console.log("error", error);

        notification.error({
          message: "Error",
          description: "An error occurred while deleting the school.",
        });
      }
    );
  };

  const handleOrganizerModelClick = () => {
    setIsOrganizerModalVisible(true);
  };
  const handleUpdate = (recordId) => {
    const selectedCategory = categories.find(
      (category) => category._id === recordId
    );
    console.log("selected??????", selectedCategory);

    setUpdateRecordData(selectedCategory);
    setUpdateModalVisible(true);
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Orders</h1>
        <div></div>
        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {/* {
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOrganizerModelClick}
          style={{ marginBottom: "16px" }}
        >
          Add Medicine
        </Button>
      } */}
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>

      <UpdateCategory
        visible={isUpdateModalVisible}
        toggleModal={() => {
          setUpdateModalVisible(false);
          getAllOrders();
        }}
        onCancel={() => setUpdateModalVisible(false)}
        recordData={updateRecordData}
        selectedOrganizer={selectedOrganizer}
      />
      {isOrganizerModalVisible && (
        <Category
          visible={isOrganizerModalVisible}
          toggleModal={() => {
            setIsOrganizerModalVisible(false);
            getAllOrders();
          }}
        />
      )}
    </div>
  );
};

export default Organizers;
