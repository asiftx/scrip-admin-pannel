import React, { useState, useRef } from "react";
import { Button, Modal, Input, InputNumber, Checkbox, Image } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";
import { GreenNotify, RedNotify } from "../../helper/helper";
import FAQs from "../../pages/faqs/faqs";
// import DatePicker from "react-datepicker";
const AddFAQModel = ({
  setShowModal,
  toggleModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [question, setQuestion] = useState(addProduct ? "" : item?.question);
  const [answer, setAnswer] = useState(addProduct ? "" : item?.answer);
  // const [reward, setReward] = useState(addProduct ? 0 : item?.rewards);

  const fileInputRef = useRef(null);

  const pickImageFile = () => {
    fileInputRef.current.click();
  };

  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  //console.log("add product", addProduct);

  const handleFileChange = (event) => {
    const fileList = event.target.files;

    console.log(fileList);
  };

  const createProduct = () => {
    let getRes = (res) => {
      console.log("Response of create product:", res);
    };

    let body = {
      question: question,
      answer: answer,
    };

    callApi("POST", `${routes.createFAQs}`, body, setIsLoading, (resp) => {
      console.log("resp", resp);

      if (resp.status === 200) {
        GreenNotify("FAQ created successfully");

        toggleModal(false);
        setAddProduct(false);
      } else {
        RedNotify("Failed to create FAQ");
      }
    });
  };

  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "2rem" }}></div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Question</h2>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            // min={0}
            // placeholder="0"
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Answer</h2>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            // min={0}
            // placeholder="0"
          />
        </div>

        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          <Button key="cancel" onClick={toggleModal}>
            Cancel
          </Button>

          {addProduct ? (
            <Button
              onClick={createProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={createProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>

    // <div className="add-product-modal-main-container">

    // </div>
  );
};

export default AddFAQModel;
