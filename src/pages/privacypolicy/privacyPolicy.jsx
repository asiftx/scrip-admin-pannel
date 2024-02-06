import React, { useState, useEffect } from "react";
import "./privacyPolicy.css";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import ModalAddPrivacyPolicy from "../../components/ModalAddPrivacyPolicy/ModalAddPrivacyPolicy";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { useDispatch } from "react-redux";
import { productItem } from "../../redux/userDataSlice";
import moment from "moment/moment";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getDescriptionText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const getProducts = () => {
    let getRes = (res) => {
      console.log("resp>>>",res);
      setProducts(res?.data?.data);
    };

    callApi(
      "GET",
      routes.getPrivacyPolicy,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const DeleteProduct = (item) => {
    let getRes = (res) => {
      console.log("res of delete product", res);
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
      dataIndex: "data",
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

  //   Row Data
  const data = products?.map((item, index) => {
    console.log("dddd",)
    return {
      key: index,
      data: (
        <div
          dangerouslySetInnerHTML={{ __html: item?.data }}
          className="privacy-policy-description"
        />
      ),
      edit: (
        <div
          onClick={() => {
            setProduct(item);
            dispatch(productItem(item));
            setShowModal(true);
            setAddProduct(false);
          }}
          className="product-list-edit-icon"
        >
          <img src={editIcon} alt="Edit Icon" />
        </div>
      ),
    };
  });

  useEffect(() => {
    getProducts();
  }, [showModal]);

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "server-role-even-row" : "server-role-odd-row";
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
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="Home Icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Privacy Policy</h1>
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

export default PrivacyPolicy;
