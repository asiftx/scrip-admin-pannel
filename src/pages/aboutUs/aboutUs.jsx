import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Input, Modal } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { GreenNotify, RedNotify } from "../../helper/helper";
import UpdateAboutUs from "../../components/updateAboutUs/updateAboutUs";
// import About from "../../components/addAbout/addAbout";

import {
  crossIcon,
  homeIcon,
  editIcon,
  redTrash,
  trueIcon,
} from "../../assets";

const Organizers = () => {
  const [about, setAbout] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateRecordData, setUpdateRecordData] = useState(null);
  const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);
  const [expandedText, setExpandedText] = useState(null);
  const [expandedModalVisible, setExpandedModalVisible] = useState(false);

  const getAllAboutUS = () => {
    let getRes = (res) => {
      console.log("response??????", res?.data?.aboutUs);
      setAbout(res?.data?.aboutUs);
    };

    callApi(
      "GET",
      `${routes.getAbout}`,
      null,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  useEffect(() => {
    getAllAboutUS();
  }, []);

  const columns = [
    {
      title: "Text",
      dataIndex: "text",
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
    {
      title: "Action",
      dataIndex: "id",
      className: "type-name-column-header",
      align: "center",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record.id)}
            style={{ marginRight: 8 }}
          ></Button>
        </div>
      ),
    },
  ];
  const data = about
    ?.map((item, index) => {
      console.log("item", item);
      return {
        key: index,
        id: item?._id,
        text: item?.text,
      };
    })
    .filter((item) => {
      const titleMatch = item.text
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

  const handleShowMore = (text) => {
    setExpandedText(text);
    setExpandedModalVisible(true);
  };

  const handleCloseModal = () => {
    setExpandedText(null);
    setExpandedModalVisible(false);
  };

  const handleOrganizerModelClick = () => {
    setIsOrganizerModalVisible(true);
  };

  const handleUpdate = (recordId) => {
    console.log("Selected id", recordId);
    const selectedAbout = about.find((about) => about._id === recordId);
    console.log("selectedAbout??????", selectedAbout);

    setUpdateRecordData(selectedAbout);
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
        <Breadcrumb.Item>About Us</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>About Us</h1>
        <div></div>
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

      <UpdateAboutUs
        visible={isUpdateModalVisible}
        toggleModal={() => {
          setUpdateModalVisible(false);
          getAllAboutUS();
        }}
        onCancel={() => setUpdateModalVisible(false)}
        recordData={updateRecordData}
        selectedOrganizer={selectedOrganizer}
      />

      <Modal
        title="About Us"
        visible={expandedModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <p style={{ textAlign: "justify" }}>{expandedText}</p>
      </Modal>
    </div>
  );
};

export default Organizers;
