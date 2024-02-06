import React, { useState, useEffect } from "react";
import "./pagePosts.css";
import { Breadcrumb, Table, Image } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, options, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import ModalDescription from "../../components/modalDescription/modalDescription";
import OptionModal from "../../components/optionModal/optionModal";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { useParams } from "react-router-dom";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";

const PagePosts = () => {
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
  // console.log('aaaaaaaaaa', id);

  const getService = () => {
    let getRes = (res) => {
      console.log('res of page posts', res);
      setServices(res?.data?.pagePost);
      // setShowModal(false);
    };
    // console.log('aaaaaaaaaa', window.location.href.split("=").at(-1));

    // Your API call
    callApi(
      "GET",
      `${routes.getPagePosts}?query=${encodeURIComponent(JSON.stringify({ page: id }))}`,
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
      GreenNotify("Page post is deleted successfully");
      setGetServiceApi(true);
      // setShowModal(false);
    };

    callApi(
      "DELETE",
      `${routes.deletePagePost}/${id}`,
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
      title: "Description",
      dataIndex: "description",
      className: "role-name-column-header",
      align: "center",
      width: "30rem",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      className: "action-column-header",
      width: "10rem",
    },
    {
      title: "Creator Name",
      dataIndex: "creator",
      className: "role-name-column-header",
      align: "center",
      width: "30rem",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
      width: "10rem",
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
    ?.filter((deletedUser) => deletedUser?.user != null)
    ?.map((item, index) => {
      // console.log('communityName', item?.communityName);
      let media = item?.media?.split('.')
      let i = media?.length - 1
      let mediaFormat = media[i]
      // console.log('mediaaa', media[i]);
      return {
        key: index,
        // description: item?.description,
        communityName: item?.communityName,
        creator: item?.user == null ? 'Account Deleted' : item?.user?.name,
        description: (
          <div>
            <p style={{ fontSize: "12px" }}>
              {
                item?.description.length > 10
                  ? item?.description.substring(0, 10) + "..."
                  : item?.description
              }
              {
                item?.description.length > 10 && (
                  <span
                    onClick={() => {
                      setShowModalDes(true);
                      setPdescription(item?.description);
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
        // image: (
        //   <div className="services-background-image">
        //     <Image width={50} height={60} src={item?.media} />
        //   </div>
        // ),
        image: (mediaFormat !== 'mp4' && item?.media) || mediaFormat === '' ? (
          <div className="services-background-image">
            <Image width={60} src={item?.media || 'https://divet-bucket.s3.us-east-2.amazonaws.com/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png'} />
          </div>
        ) : (
          <div className="services-background-video">
            <video width={100} height={100} controls>
              <source src={item?.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
        <Breadcrumb.Item>Page Posts</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Page Posts</h1>
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
          <p>No Post</p>
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

export default PagePosts;
