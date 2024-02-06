import React, { useState, useEffect } from "react";
import {Breadcrumb, Button, Table, Input, Image, Modal, Form } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import moment from "moment";
import { crossIcon,homeIcon, trueIcon } from "../../assets";
import "../userList/userList.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const getCourses = () => {
    callApi(
      "GET",
      `${routes.getCourses}`,
      null,
      setIsLoading,
      (resp, error) => {
        if (error) {
          console.error("Error fetching courses:", error);
        } else {
          setCourses(resp?.data?.course);
          console.log("Data:", resp);
        }
      }
    );
  };

  useEffect(() => {
    getCourses();
  }, []);

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
      title: "Title",
      dataIndex: "title",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      className: "type-name-column-header",
      align: "center",
    },
    {
      title: "Cover Image",
      dataIndex: "coverImage",
      align: "center",
      render: (text, record) => (
        <div className="product-list-image">
          <Image
            width={50}
            height={60}
            src={record?.coverImage}
            alt="cover-image"
          />
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      align: "center",
    },
    {
      title: "Approve",
      dataIndex: "approve",
      align: "center",
      render: (text, record, index) => (
        <Button
          className="server-roles-action-btn"
          style={{
            backgroundColor: record.approved ? "#52c41a" : "#FFFFFF",
          }}
          disabled={record.approved}
          onClick={(event) => approveCourse(index, event, true, record.id)}
        >
          {record.approved ? "Approved" : "Accept"}
        </Button>
      ),
    },
    {
      title: "Reject",
      dataIndex: "reject",
      align: "center",
      render: (text, record, index) => (
        <Button
          className="server-roles-action-btn"
          style={{
            backgroundColor: record.approved ? "#f5222d" : "#FFFFFF",
          }}
          disabled={!record.approved}
          onClick={(event) => rejectCourse(index, event, false, record.id)}
        >
          {record.approved ? "Reject" : "Rejected"}
        </Button>
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
          View Details
        </Button>
      ),
    },
  ];

  const data = courses
    ?.map((item, index) => ({
      key: index,
      id: item?._id,
      title: item?.title,
      category: item?.category?.name,
      coverImage: item?.coverImage,
      country: item?.country?.name,
      approved: item?.approved,
    }))
    .filter((item) =>
      item.title?.toLowerCase().includes(searchText?.toLowerCase())
    );

  const getRowClassName = (record, index) =>
    index % 2 === 0 ? "server-role-even-row" : "server-role-odd-row";

  const modalContent = (
    <Form layout="vertical">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <Form.Item label="Title">
            <span>{selectedCourse?.title}</span>
          </Form.Item>
          <Form.Item label="Category">
            <span>{selectedCourse?.category}</span>
          </Form.Item>
          <Form.Item label="Cover Image">
            <Image
              width={100}
              height={120}
              src={selectedCourse?.coverImage}
              alt="cover-image"
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1 }}>
          <Form.Item label="Country">
            <span>{selectedCourse?.country}</span>
          </Form.Item>
          <Form.Item label="Approval Status">
            <span
              style={{
                color: selectedCourse?.approved ? "#52c41a" : "#f5222d",
              }}
            >
              {selectedCourse?.approved ? "Approved" : "Not Approved"}
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
        <Breadcrumb.Item>Courses</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Courses</h1>
        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search Course Title"
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
        title="Course Details"
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
