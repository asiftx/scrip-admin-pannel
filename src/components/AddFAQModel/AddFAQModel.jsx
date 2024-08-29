import React, { useState, useRef } from "react";
import { Button, Input } from "antd";
import { GreenNotify, RedNotify } from "../../helper/helper";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";

const AddFAQModel = ({
  toggleModal,
  item,
  setIsLoading,
  isAddMode, 
}) => {
 
  const [question, setQuestion] = useState(isAddMode ? "" : item?.question);
  const [answer, setAnswer] = useState(isAddMode ? "" : item?.answer);

  const handleFormSubmit = () => {
    const body = { question, answer };

    if (isAddMode) {
      callApi("POST", `${routes.createFAQs}`, body, setIsLoading, (resp) => {
        if (resp.status === 200) {
          GreenNotify("FAQ created successfully");
          toggleModal();
        } else {
          RedNotify("Failed to create FAQ");
        }
      });
    } else {
      callApi(
        "PATCH",
        `${routes.updateFAQs}/${item._id}`, 
        body,
        setIsLoading,
        (resp) => {
          if (resp.status === 200) {
            GreenNotify("FAQ updated successfully");
            toggleModal();
          } else {
            RedNotify("Failed to update FAQ");
          }
        }
      );
    }
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
          />
        </div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Answer</h2>
          <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>

        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          <Button key="cancel" onClick={toggleModal}>
            Cancel
          </Button>

          <Button
            onClick={handleFormSubmit}
            style={{ marginLeft: "2rem" }}
            type="primary"
          >
            {isAddMode ? "Add" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFAQModel;
