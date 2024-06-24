import React, { useState, useEffect } from "react";
import "./termsOfUse.css";
import { Breadcrumb, Button, Table } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { useDispatch } from "react-redux";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import moment from "moment/moment";
import HtmlModal from "../../components/htmlReturnModal/htmlReturnModal";
import ModalUpdateAbout from "../../components/updateAboutUs/updateAboutUs";
import { PlusOutlined } from "@ant-design/icons";

const Termsandconditions = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [termsandconditions, setTermsandconditions] = useState([]);
  const [termandcondition, setTermandcondition] = useState();
  const [addTermandcondition, setAddTermandcondition] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getTermandcondition, setGetTermandcondition] = useState(false);
  const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);

  const getTermsandconditions = () => {
    const getRes = (res) => {
      setTermsandconditions(res?.data?.data);
      console.log("res of get Termsandconditions", res);
    };

    callApi(
      "GET",
      routes.getTermsOfUse,
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
      title: "Term and Condition",
      dataIndex: "termandcondition",
      className: "role-name-column-header",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "right",
      className: "action-column-header",
    },
  ];

  const data = termsandconditions?.map((item, index) => ({
    key: index,
    privacy: item?.data,
    termandcondition: (
      <div>
        <p style={{ fontSize: "12px" }}>
          {item?.data.length > 10
            ? item?.data.substring(0, 10) + "..."
            : item?.data}{" "}
          {item?.data.length > 10 && (
            <span
              onClick={() => {
                setShowModalDes(true);
                setPdescription(item?.data);
              }}
              style={{ color: "#34adf4", cursor: "pointer", fontWeight: 600 }}
            >
              See More
            </span>
          )}
        </p>
      </div>
    ),
    createdAt: moment(item?.createdAt)
      .local()
      .format("DD, MMM, YYYY , hh:mm A"),
    // delete: (
    //   <div
    //     onClick={() => DeleteTermandcondition(item)}
    //     className="server-roles-trash-btn"
    //   >
    //     <img src={redTrash} alt="" />
    //   </div>
    // ),
    edit: (
      <div
        onClick={() => {
          setTermandcondition(item);
          setShowModal(true);
          setAddTermandcondition(false);
        }}
        className="product-list-edit-icon"
      >
        <img src={editIcon} alt="edit" />
      </div>
    ),
  }));

  useEffect(() => {
    getTermsandconditions();
  }, [showModal, getTermandcondition]);

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "server-role-even-row" : "server-role-odd-row";
  };

  // return (
  //   <div className="admin-products-main-container">
  //     {isOrganizerModalVisible && (
  //       <AddTerms
  //         visible={isOrganizerModalVisible}
  //         toggleModal={() => {
  //           setIsOrganizerModalVisible(false);
  //         }}
  //       />
  //     )}
  //     {showModal && (
  //       <ModalUpdateAbout
  //         showModal={showModal}
  //         setShowModal={setShowModal}
  //         item={termandcondition}
  //         setIsLoading={setIsLoading}
  //         addProduct={addTermandcondition}
  //         setAddProduct={setAddTermandcondition}
  //       />
  //     )}
  //     {showModalDes && (
  //       <HtmlModal
  //         showModalDes={showModalDes}
  //         setShowModalDes={setShowModalDes}
  //         description={pDescription}
  //       />
  //     )}
  //     <Loader loading={isLoading} />
  //     <Breadcrumb separator=">" className="bread-crumb">
  //       <div className="configure-server-home-icon">
  //         <img src={homeIcon} alt="home-icon" />
  //       </div>
  //       <Breadcrumb.Item>Home</Breadcrumb.Item>
  //       <Breadcrumb.Item>About Us</Breadcrumb.Item>
  //     </Breadcrumb>
  //     <div className="configure-server-roles-main-heading-container">
  //       <h1>About Us</h1>
  //       <div
  //         onClick={() => {
  //           setAddTermandcondition(true);
  //           setShowModal(true);
  //         }}
  //         className="server-roles-add-btn"
  //       >
  //         <Button
  //           type="primary"
  //           icon={<PlusOutlined />}
  //           style={{ marginBottom: "16px" }}
  //         >
  //           Add New
  //         </Button>
  //       </div>
  //     </div>
  //     <div className="server-roles-tb-main-container">
  //       <Table
  //         rowClassName={getRowClassName}
  //         columns={columns}
  //         dataSource={data}
  //         pagination={true}
  //         className="subscriptionapi-table"
  //       />
  //     </div>
  //   </div>
  // );
};

export default Termsandconditions;
