import React, { useState, useRef, useEffect } from "react";
import "./ModalAddFAQS.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image } from "antd";
import { addIcon, editIcon, termsAndUse } from "../../assets";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";

const ModalAddPrivacyPolicy = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [description, setDescription] = useState(item?.description || "");
  const [question, setQuestion] = useState(item?.question || "");

  console.log("item id", item?._id);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  const createProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let getRes = (res) => {
      setShowModal(false);
      setAddProduct(false);
    };

    let body = {
      answer: editorRef.current.getContent(),
      question: question,
    };

    callApi("POST", routes.createFAQs, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let getRes = (res) => {
      setShowModal(false);
    };

    let body = {
      answer: editorRef.current.getContent(),
      question: question,
    };
    console.log("item", item._id);
    callApi(
      "PATCH",
      `${routes.updateFAQs}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleEditorChange = (content, editor) => {
    setDescription(content);
  };

  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "5rem" }}></div>
        <div>
          <h3>Question</h3>
          <Input
            placeholder="Enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <h3>Answer</h3>
          <Editor
            apiKey="kttjxe20gth0u5wh3mfo9b9ix7o7o7dvr1zdsamvp09xfycq"
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue={item?.answer}
            onEditorChange={handleEditorChange}
            init={{
              plugins: "lists textcolor",
              toolbar:
                "styleselect | fontselect | fontsize | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | h1 h2 h3 h4 h5 h6 | code", // Add font size control to toolbar
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
              file_picker_types: "image media",
              relative_urls: false,
              remove_script_host: false,
              menubar: false,
            }}
          />
        </div>

        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            type="default"
            danger
          >
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
              onClick={updateProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAddPrivacyPolicy;
