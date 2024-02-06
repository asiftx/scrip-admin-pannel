import React, { useState, useEffect } from "react";
import "./newsEvents.css";
import { Breadcrumb, Table, Image } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import ModalDescription from "../../components/modalDescription/modalDescription";
import OptionModal from "../../components/optionModal/optionModal";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { useParams } from "react-router-dom";
import moment from "moment/moment";


const NewsEvents = () => {
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
  const { id } = useParams();
  console.log('bbbbbbbbbbb', id);

  const getService = () => {
    let getRes = (res) => {
      console.log("res of get Communities events", res);
      setServices(res?.data?.events);
      // setShowModal(false);
    };

    console.log('location', window.location.href.split("/"));

    // Your API call
    if (id) {
      callApi(
        "GET",
        `${routes.getCommunityEvents}?query=${encodeURIComponent(JSON.stringify({ community: id }))}`,
        null,
        setIsLoading,
        getRes,
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      // console.log(111111111111);
      callApi(
        "GET",
        `${routes.getCommunityEvents}`,
        null,
        setIsLoading,
        getRes,
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  const deleteService = (id) => {
    setGetServiceApi(false);
    let getRes = (res) => {
      console.log("res of deleteService", res);
      GreenNotify("News Event is deleted successfully");
      setGetServiceApi(true);
      // setShowModal(false);
    };

    callApi(
      "DELETE",
      `${routes.deleteCommunityEvent}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const columns = [
    {
      title: "Event Detail",
      dataIndex: "description",
      className: "role-name-column-header",
      align: "center",
      // width: "30rem",
    },
    {
      title: "Event Location",
      dataIndex: "eventLocation",
      className: "role-name-column-header",
      align: "center",
      // width: "30rem",
    },
    {
      title: "Date And Time",
      dataIndex: "dateAndTime",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    {
      title: "Creator Name",
      dataIndex: "creator",
      className: "role-name-column-header",
      align: "center",
      // width: "30rem",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    // {
    //   title: "Community Name",
    //   dataIndex: "communityName",
    //   align: "center",
    //   className: "action-column-header",
    //   // width: "10rem",
    // }
  ];

  const data = services
    ?.filter((events) => events.type == 'newsEvent' || events.visibility == 'Public')
    ?.map((item, index) => {
      const fromDateStart = new Date((item?.dateAndTime / 600000) * 10);
      const formattedDateStart = moment(fromDateStart).format("MMMM Do YYYY");
      const formattedTimeStart = moment(fromDateStart).format("h:mm A");
      return {
        key: index,
        // eventDetail: item?.eventDetail,
        eventLocation: item?.eventLocation,
        communityName: item?.communityName,
        creator: item?.user == null ? 'Account Deleted' : item?.user?.name,
        // dateAndTime: item?.formattedDate,
        description: (
          <div>
            <p style={{ fontSize: "12px" }}>
              {
                item?.eventDetail.length > 30
                  ? item?.eventDetail.substring(0, 30) + "..."
                  : item?.eventDetail
              }
              {
                item?.eventDetail.length > 30 && (
                  <span
                    onClick={() => {
                      setShowModalDes(true);
                      setPdescription(item?.eventDetail);
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
        dateAndTime: (
          <div>
            <div>{formattedDateStart}</div>
            <div>{formattedTimeStart}</div>
          </div>
        ),
        image: (
          <div className="services-background-image">
            <Image width={50} height={60} src={item?.media} />
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
      }
    })

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
        <Breadcrumb.Item>Community Events</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Community Events</h1>
        {/* Add New Service button */}
        {/* <div
          onClick={() => navigate("/new-service")}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Service</p>
        </div> */}
      </div>
      <div className="server-roles-tb-main-container">
        {services?.length === 0 ? (
          <p>No Event</p>
        ) : (
          <Table
            rowClassName={getRowClassName}
            columns={columns}
            dataSource={data}
            pagination={true}
            className="subscriptionapi-table"
          ></Table>
        )}
      </div>
    </div>
  );
};

export default NewsEvents;
