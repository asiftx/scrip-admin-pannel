import React, { useState, useEffect } from "react";
import "./termsOfUse.css";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import ModalAddTermsAndUses from "../../components/ModalAddTermsAndUses/ModalAddTermsAndUses";
import ModalAddPrivacyPolicy from "../../components/ModalAddPrivacyPolicy/ModalAddPrivacyPolicy";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { useDispatch } from "react-redux";
import { productItem } from "../../redux/userDataSlice";
import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import moment from "moment/moment";

const TermsOfUse = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [desc, setDesc] = useState("")
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getProduct, setGetProduct] = useState(false);

  const getDescriptionText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // console.log("content",tempElement.textContent)
    // console.log("innerText",tempElement.innerText)

    return tempElement.textContent || tempElement.innerText || "";
  }
  const getProducts = () => {
    let getRes = (res) => {
      setProducts(res?.data?.termsOfUse);
      console.log("res of get privacyPolicy", res);
      // setShowModal(false);
    };

    callApi("GET", routes.getTermsOfUse, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const DeleteProduct = (item) => {
    setGetProduct(false);
    let getRes = (res) => {
      console.log("res of delete product", res);
      setGetProduct(true);
    };

    callApi(
      "DELETE",
      `${routes.deletePrivacyPolicy}/${item?._id}`,
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
      align: "center",
      className: "action-column-header",
    },
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   align: "center",
    //   className: "action-column-header",
    // },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "center",
      className: "action-column-header",
    },
  ];

  //   Row Data
  const data = products.map((item, index) => {
    return {
      key: index,
      // heading: item?.heading,
      // description: item?.description,
      description: getDescriptionText(item?.description),
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
    getProducts();
  }, [showModal, getProduct]);

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      {showModal && (
        <ModalAddPrivacyPolicy
          showModal={showModal}
          setShowModal={setShowModal}
          item={product}
          setIsLoading={setIsLoading}
          addProduct={addProduct}
          setAddProduct={setAddProduct}
        />
      )}
      {showModalDes && (
        <DescriptionModal
          showModalDes={showModalDes}
          setShowModalDes={setShowModalDes}
          description={pDescription}
        />
      )}
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Privacy Policy</h1>
        {/* <div
          onClick={() => {
            setAddProduct(true);
            setShowModal(true);
          }}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add Privacy Policy</p>
        </div> */}
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={
            products.length > 10
              ? { showSizeChanger: true, showQuickJumper: true }
              : false
          }
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default TermsOfUse;
