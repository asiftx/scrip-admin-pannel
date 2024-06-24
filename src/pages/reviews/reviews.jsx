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
  const [reviews, setReview] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);
  const [updateRecordData, setUpdateRecordData] = useState(null);
  const [isSchoolModalVisible, setIsSchoolModalVisible] = useState(false);
  const navigate = useNavigate();

  const getAllReviews = () => {
    callApi(
      "GET",
      `${routes.getAllReviews}`,
      null,
      setIsLoading,
      (res) => {
        console.log("Resp", res);
        console.log("response is received", res?.data?.reviews);

        setReview(res?.data?.reviews);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllReviews();
  }, []);

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
      `${routes.deleteSchool}/${recordId}`,
      null,
      setIsLoading,
      (res) => {
        console.log("response", res);

        if (res.status === 200) {
          setReview((prevSchools) =>
            prevSchools.filter((school) => school._id !== recordId)
          );

          GreenNotify("User Deleted Successfully");
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
  const handleSchoolModelClick = () => {
    setIsSchoolModalVisible(true);
  };
  const handleShowMore = (review) => {
    setExpandedReview(review);
  };

  const handleCloseModal = () => {
    setExpandedReview(null);
  };

  const handleUpdate = (recordId) => {
    console.log(`Update record with id: ${recordId}`);
    const selectedRecord = reviews.find((school) => school._id === recordId);
    setSelectedRecordId(recordId);
    setUpdateRecordData(selectedRecord);
    setUpdateModalVisible(true);
    setAddProduct(false);
  };

  const columns = [
    {
      title: "Review",
      dataIndex: "description",
      className: "type-name-column-header",
      align: "center",
      render: (desc) => (
        <div>
          <p>{desc.length > 50 ? `${desc.slice(0, 30)}...` : desc}</p>
          {desc.length > 50 && (
            <Button type="link" onClick={() => handleShowMore(desc)}>
              Show More
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Creator",
      dataIndex: "creatorName",
      className: "role-name-column-header",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (text, record) => (
        <div className="product-list-image">
          <Image width={50} height={60} src={record.image} alt="thumbnail" />
        </div>
      ),
    },

    {
      title: "Rating",
      dataIndex: "stars",
      className: "type-name-column-header",
      align: "center",
      render: (stars) => (
        <Rate disabled defaultValue={stars} style={{ whiteSpace: "nowrap" }} />
      ),
    },
  ];

  const data = reviews
    ?.map((item, index) => {
      return {
        key: index,
        id: item?._id,
        description: item?.description,
        review: item?.review,
        stars: item?.stars,
        creatorName: item.userName,
        image: item?.userImage,
      };
    })
    .filter((item) => {
      const titleMatch = item?.description
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
      const creatorNameMatch = item?.userName
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
      return titleMatch || creatorNameMatch;
    });

  return (
    <div className="admin-products-main-container">
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Reviews</Breadcrumb.Item>
      </Breadcrumb>
      <Loader loading={isloading} />
      <div className="configure-server-roles-main-heading-container">
        <h1>Reviews</h1>

        <div className="search-inputs" style={{ width: "30rem" }}>
          <Input
            placeholder="Search Review"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleSchoolModelClick}
        style={{ marginBottom: "16px" }}
      >
        Add School
      </Button> */}
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
