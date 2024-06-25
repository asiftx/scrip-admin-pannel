import React, { useState, useEffect } from "react";
import "./faqs.css";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddFaq from "../../components/AddFAQModel/AddFAQModel";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { GreenNotify, RedNotify } from "../../helper/helper";
import { useDispatch } from "react-redux";
import { productItem } from "../../redux/userDataSlice";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import moment from "moment/moment";

const FAQs = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showModalAddFAQ, setshowModalAddFAQ] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getProduct, setGetProduct] = useState(false);
  const [isFAQModalVisible, setIsFAQModalVisible] = useState(false);
  const getPreferences = () => {
    let getRes = (res) => {
      console.log("RESo", res);
      setProducts(res?.data?.fAQS);
    };

    callApi("GET", `${routes.getFAQs}`, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  const handleEventModelClick = () => {
    setshowModalAddFAQ(true);
  };

  const DeleteProduct = (item) => {
    setGetProduct(false);
    let getRes = (res) => {
      console.log("res of delete game", res);
      setGetProduct(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteFAQs}/${item?._id}`,
      null,
      setIsLoading,
      (resp) => {
        console.log("Resp????????", resp);
        if (resp.status === 200) {
          GreenNotify("FAQ Deleted successfully");
          getPreferences();
        } else {
          RedNotify("Failed to Delete FAQ");
        }
      }
    );
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      align: "center",
      className: "role-name-column-header",
      width: 420,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      align: "center",
      className: "action-column-header",
      // width: "10rem",
    },
    // {
    //   title: "Edit",
    //   dataIndex: "edit",
    //   align: "center",
    //   className: "action-column-header",
    // },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
  ];

  //   Row Data
  const data = products.map((item, index) => {
    return {
      key: index,
      question: item?.question,
      answer: item?.answer,
      delete: (
        <div
          onClick={() => DeleteProduct(item)}
          className="server-roles-trash-btn"
        >
          <img src={redTrash} alt="" />
        </div>
      ),
      edit: (
        <div
          onClick={() => {
            setProduct(item);
            // dispatch(productItem(item));
            setShowModal(true);
            setAddProduct(false);
          }}
          className="product-list-edit-icon"
        >
          <img src={editIcon} />
        </div>
      ),
    };
  });

  useEffect(() => {
    getPreferences();
  }, [showModal, getProduct]);

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      {isFAQModalVisible && (
        <AddFaq
          setIsFAQModalVisible={setIsFAQModalVisible}
          setIsLoading={setIsLoading}
          toggleModal={() => {
            setIsFAQModalVisible(false);
            getPreferences();
          }}
        />
      )}

      {/* {showModalDes && (
        <DescriptionModal
          showModalDes={showModalDes}
          setShowModalDes={setShowModalDes}
          description={pDescription}
        />
      )} */}
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>FAQ's</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>FAQ's</h1>
        <div
          onClick={() => {
            setAddProduct(true);
            setShow(true);
          }}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New FAQ's</p>
        </div>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setIsFAQModalVisible(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add New FAQ's
      </Button>
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

export default FAQs;
