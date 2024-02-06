import React, { useState, useEffect } from "react";
import "./services.css";
import { Breadcrumb, Table, Image } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import ModalDescription from "../../components/modalDescription/modalDescription";
import OptionModal from "../../components/optionModal/optionModal";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";

const Services = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalOption, setShowModalOption] = useState(false);
  const [description, setDescription] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [optionsM, setOptionsM] = useState([]);
  const [getServiceapi, setGetServiceApi] = useState(false);

  const getService = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
      setServices(res?.data?.data);
      // setShowModal(false);
    };

    callApi(
      "GET",
      routes.getAllServices,
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      className: "role-name-column-header",
    },
    {
      title: "Special",
      dataIndex: "special",
      align: "center",
      className: "type-name-column-header",

      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },
    {
      title: "BackGround Photo",
      dataIndex: "backGround",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
      className: "action-column-header",
    },

    {
      title: "Options",
      dataIndex: "option",
      align: "center",
      className: "action-column-header",
    },

    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "center",
      className: "action-column-header",
    },
  ];

  const data = services?.map((item, index) => {
    return {
      key: index,
      title: item?.title,
      special: item?.special ? "True" : "False",
      backGround: (
        <div className="services-background-image">
          {/* <img src={item?.backgroundphoto} alt="" /> */}
          <Image width={60} src={item?.backgroundphoto} />
        </div>
      ),
      description: (
        <span
          onClick={() => {
            setShowModal(!showModal);
            setPhotos(item?.photos);
            setDescription(item?.description);
          }}
          style={{ color: "#34ADF4", cursor: "pointer" }}
        >
          See
        </span>
      ),
      type: item?.type,
      option: (
        <div
          onClick={() => {
            setOptionsM(item?.options);
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
      edit: (
        <div
          onClick={() =>
            navigate("/update-service", {
              state: {
                item: item,
              },
            })
          }
          className="product-list-edit-icon"
        >
          <img src={editIcon} />
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
        <Breadcrumb.Item>Services</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Services</h1>
        <div
          onClick={() => navigate("/new-service")}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Service</p>
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
    </div>
  );
};

export default Services;
