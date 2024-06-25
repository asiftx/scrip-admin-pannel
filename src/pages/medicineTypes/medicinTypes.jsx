import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Input, Image } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment/moment";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { GreenNotify, RedNotify } from "../../helper/helper";
import UpdateType from "../../components/updateMedicineType/updateMedicineType";
import Type from "../../components/addMedicineType/addMedicineType";

import {
  crossIcon,
  homeIcon,
  editIcon,
  redTrash,
  trueIcon,
} from "../../assets";

const Organizers = () => {
  const [types, setTypes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateRecordData, setUpdateRecordData] = useState(null);
  const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);

  const getAllTypes = () => {
    let getRes = (res) => {
      console.log("response??????", res?.data.medicineTypes);
      setTypes(res?.data?.medicineTypes);
    };

    callApi(
      "GET",
      `${routes.getMedTypes}`,
      null,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  useEffect(() => {
    getAllTypes();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
      align: "center",
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
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          ></Button>
        </div>
      ),
    },
  ];
  const data = types
    ?.map((item, index) => {
      console.log("item", item);
      return {
        key: index,
        id: item?._id,
        name: item?.name,
      };
    })
    .filter((item) => {
      const nameMatch = item.name
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
      return nameMatch;
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
      `${routes.deleteMedType}/${recordId}`,
      null,
      setIsLoading,
      (res) => {
        if (res.status === 200) {
          setTypes((prevType) =>
            prevType.filter((type) => type._id !== recordId)
          );

          GreenNotify("Type Deleted Successfully");
        } else {
          RedNotify("Error Occurred while deleting category");
        }
      },
      (error) => {
        console.log("error", error);

        notification.error({
          message: "Error",
          description: "An error occurred while deleting the Category.",
        });
      }
    );
  };
  const handleOrganizerModelClick = () => {
    setIsOrganizerModalVisible(true);
  };
  const handleUpdate = (recordId) => {
    console.log("Selected id", recordId);
    const selectedType = types.find((type) => type._id === recordId);
    console.log("selected??????", selectedType);

    setUpdateRecordData(selectedType);
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
        <Breadcrumb.Item>Medicine Types</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Medicine Types</h1>
        <div></div>
        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search Type..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOrganizerModelClick}
          style={{ marginBottom: "16px" }}
        >
          Add
        </Button>
      }
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>

      <UpdateType
        visible={isUpdateModalVisible}
        toggleModal={() => {
          setUpdateModalVisible(false);
          getAllTypes();
        }}
        onCancel={() => setUpdateModalVisible(false)}
        recordData={updateRecordData}
        selectedOrganizer={selectedOrganizer}
      />
      {isOrganizerModalVisible && (
        <Type
          visible={isOrganizerModalVisible}
          toggleModal={() => {
            setIsOrganizerModalVisible(false);
            getAllTypes();
          }}
        />
      )}
    </div>
  );
};

export default Organizers;
