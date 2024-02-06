import React, { useState, useEffect } from "react";
import "./communities.css";
import { Breadcrumb, Table, Image } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import ModalDescription from "../../components/modalDescription/modalDescription";
import OptionModal from "../../components/optionModal/optionModal";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import CommunityPosts from "../communityPosts/communityPosts";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";


const Communities = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalOption, setShowModalOption] = useState(false);
  const [description, setDescription] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [optionsM, setOptionsM] = useState([]);
  const [getServiceapi, setGetServiceApi] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");

  const getService = () => {
    let getRes = (res) => {
      console.log("res of get Communities", res);
      setServices(res?.data?.communities);
      // setShowModal(false);
    };

    callApi(
      "GET",
      `${routes.getCommunities}?noEvents=true&noPosts=true`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const deleteService = (id) => {
    setGetServiceApi(false);
    let getRes = (res) => {
      console.log("res of deleteService", res);
      GreenNotify("Service is deleted successfully");
      setGetServiceApi(true);
      // setShowModal(false);
    };

    callApi(
      "DELETE",
      `${routes.deleteService}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleViewPosts = (record) => {
    navigate(`/communityPosts/${record.key}`);
  };

  const handleViewEvents = (record) => {
    navigate(`/communityEvents/${record.key}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
      align: "center",
      // render: (text, record) => (
      //   <div
      //     style={{ cursor: "pointer" }}
      //     onClick={() => navigate(`/communityPosts/${record.key}`)}
      //   >
      //     {text}
      //   </div>
      // )
    },
    {
      title: "Bio",
      dataIndex: "bio",
      align: "center",
      className: "type-name-column-header",
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    {
      title: "Community Joins",
      dataIndex: "communityJoins",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Interests",
      dataIndex: "interest",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Creator Name",
      dataIndex: "creator",
      className: "role-name-column-header",
      align: "center",
      // width: "30rem",
    },
    {
      title: "Posts",
      dataIndex: "posts",
      align: "center",
      className: "action-column-header",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <button
            style={{ cursor: "pointer", padding: "0.4rem" }}
            onClick={() => handleViewPosts(record)}>View Posts</button>
        </div>
      ),
    },
    {
      title: "Events",
      dataIndex: "events",
      align: "center",
      className: "action-column-header",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <button
            style={{ cursor: "pointer", padding: "0.4rem" }}
            onClick={() => handleViewEvents(record)}>View Events</button>
        </div>
      ),
    },
  ];

  const data = services.map((item, index) => {
    console.log('index', item._id);
    return {
      key: item._id,
      name: item?.name,
      // bio: item?.bio,
      communityJoins: item?.communityJoinsCount,
      creator: item?.user == null ? 'Account Deleted' : item?.user?.name,
      bio: (
        <div>
          <p style={{ fontSize: "12px" }}>
            {
              item?.bio.length > 10
                ? item?.bio.substring(0, 10) + "..."
                : item?.bio
            }
            {
              item?.bio.length > 10 && (
                <span
                  onClick={() => {
                    setShowModalDes(true);
                    setPdescription(item?.bio);
                  }}
                  style={{ color: "#34adf4", cursor: "pointer", fontWeight: 600 }}
                >
                  {" "}
                  See More
                </span>
              )
            }
          </p>
        </div>
      ),      
      image: (
        <div className="services-background-image">
          {/* <img src={item?.backgroundphoto} alt="" /> */}
          <Image width={50} height={60} src={item?.profileImage} />
        </div>
      ),
      interest: (
        <div
          onClick={() => {
            setOptionsM(item?.communityInterests);
            setShowModalOption(!showModalOption);
          }}
          className="service-background-option"
        >
          <img src={options} alt="options" />
        </div>
      ),
      delete: (
        <div
          onClick={() => deleteService(item?._id)}
          className="server-roles-trash-btn"
        >
          <img src={redTrash} alt="red-trash" />
        </div>
      ),
    };
  });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  useEffect(() => {
    getService();
  }, [getServiceapi]);
  return (
    <div className="admin-products-main-container">
      {showModalDes && (
        <DescriptionModal
          showModalDes={showModalDes}
          setShowModalDes={setShowModalDes}
          description={pDescription}
        />
      )}
      <Loader loading={isloading} />
      {showModal && (
        <ModalDescription
          photos={photos}
          showModal={showModal}
          setShowModal={setShowModal}
          description={description}
        />
      )}
      {showModalOption && (
        <OptionModal
          showModalOption={showModalOption}
          setShowModalOption={setShowModalOption}
          options={optionsM}
        />
      )}
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Communities</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Communities</h1>
        {/* <div
          onClick={() => navigate("/new-service")}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Service</p>
        </div> */}
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

export default Communities;
