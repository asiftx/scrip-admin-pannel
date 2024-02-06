import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Table, Input, Image, Modal, Form } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment";
import { crossIcon, homeIcon, trueIcon } from "../../assets";
import "../userList/userList.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);

  const getAllMedicines = () => {
    callApi(
      "GET",
      `${routes.getMedicines}`,
      null,
      setIsLoading,
      (resp, error) => {
        if (error) {
          console.error("Error fetching courses:", error);
        } else {
          setCourses(resp?.data?.Medicines);
          console.log("Data:", resp);
        }
      }
    );
  };

  useEffect(() => {
    getAllMedicines();
  }, []);
  const showFullDescription = (text) => {
    Modal.info({
      title: "Full Description",
      content: (
        <div>
          <p>{text}</p>
        </div>
      ),
      onOk() {},
    });
  };
  const approveCourse = async (index, event, status, courseId) => {
    event.stopPropagation();

    const updatedCourses = [...courses];
    updatedCourses[index].approved = status;

    try {
      const result = await callApi(
        "PATCH",
        `${routes.updateCourse}/${courseId}`,
        { approved: status },
        setIsLoading
      );
      console.log("result", result);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };
  const rejectCourse = async (index, event, status, courseId) => {
    event.stopPropagation();

    const updatedCourses = [...courses];

    try {
      const result = await callApi(
        "PATCH",
        `${routes.rejectCourse}/${courseId}`,
        { approved: status },
        setIsLoading
      );

      console.log("result", result);

      updatedCourses[index].approved = false;
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating rejection status:", error);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Barcode #",
      dataIndex: "barcodeNumber",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      className: "type-name-column-header",
      align: "center",
      render: (text, record) => (
        <div>
          {expandedDescription === record.key ? (
            <span>{text}</span>
          ) : (
            <div>
              <span>{`${text.slice(0, 50)}...`}</span>
              <Button type="link" onClick={() => showFullDescription(text)}>
                See More
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "ManufacturedBy",
      dataIndex: "manufacturedBy",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      align: "center",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      align: "center",
      render: (text, record) => (
        <div className="product-list-image">
          <Image
            width={50}
            height={60}
            src={record?.picture}
            alt="medicine-image"
          />
        </div>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setIsModalVisible(true);
            setSelectedCourse(record);
          }}
        >
          Pharmacy Details
        </Button>
      ),
    },
  ];

  const data = courses
    ?.map((item, index) => ({
      key: index,
      id: item?._id,
      name: item?.name,
      description: item?.description,
      price: item?.price,
      quantity: item?.quantity,
      picture: item?.picture,
      barcodeNumber: item?.barcodeNumber,
      type: item?.type,
      volume: item?.volume,
      manufacturedBy: item?.manufacturedBy,
      pharmacyName: item?.pharmacy?.name,
      role: item?.pharmacy?.role,
      number: item?.pharmacy?.number,
      email: item?.pharmacy?.email,
      averageRating: item?.pharmacy.averageRating,
      image: item?.pharmacy?.image,
      verified: item?.pharmacy?.verified,
    }))
    .filter((item) =>
      item.name?.toLowerCase().includes(searchText?.toLowerCase())
    );

  const getRowClassName = (record, index) =>
    index % 2 === 0 ? "server-role-even-row" : "server-role-odd-row";
  const modalContent = (
    <Form layout="vertical">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <Form.Item label="Name">
            <span>{selectedCourse?.pharmacyName}</span>
          </Form.Item>
          <Form.Item label="Role">
            <span>{selectedCourse?.role}</span>
          </Form.Item>
          <Form.Item label="Pharmacy Number">
            <span>{selectedCourse?.number}</span>
          </Form.Item>
          <Form.Item label="Cover Image">
            <Image
              width={100}
              height={120}
              src={selectedCourse?.image}
              alt="pharmacy-image"
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1 }}>
          <Form.Item label="Email">
            <span>{selectedCourse?.email}</span>
          </Form.Item>
          <Form.Item label="Verification Status">
            {selectedCourse?.verified ? (
              <img
                src={trueIcon}
                alt="Verified"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            ) : (
              <img
                src={crossIcon}
                alt="Not Verified"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            )}
            <span>
              {selectedCourse?.verified ? "Verified" : "Not Verified"}
            </span>
          </Form.Item>
        </div>
      </div>
    </Form>
  );

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Medicines</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Medicines</h1>
        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search..."
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
      <Modal
        title="Pharmacy Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedCourse && modalContent}
      </Modal>
    </div>
  );
};

export default Courses;
