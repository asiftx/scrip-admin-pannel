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
  // 1. State to manage the description content
  const [description, setDescription] = useState(addProduct ? "" : item?.data);

  // 2. Refs for file input and editor
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  // 3. Function to create a new product
  const createProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let getRes = (res) => {
      setShowModal(false);
      setAddProduct(false);
    };

    // 4. Constructing the body for API call
    let body = {
      data: editorRef.current.getContent(),
    };

    // 5. API call to create FAQs
    callApi("POST", routes.createFAQs, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  // 6. Function to update an existing product
  const updateProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let getRes = (res) => {
      console.log("resp,,,", res);
      setShowModal(false);
    };

    // 7. Constructing the body for API call
    let body = {
      data: editorRef.current.getContent(),
    };
    console.log("body:", body);

    // 8. API call to update FAQs
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

  // 9. Handle editor content change
  const handleEditorChange = (content, editor) => {
    setDescription(content);
  };

  // 10. Effect to set the editor content on mount or description change
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(description);
    }
  }, [description]);

  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "5rem" }}></div>
        <div>
          <h3>Content</h3>
          <Editor
            apiKey="kttjxe20gth0u5wh3mfo9b9ix7o7o7dvr1zdsamvp09xfycq"
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue={description}
            onEditorChange={handleEditorChange}
            init={{
              plugins: "lists image link textcolor align justify",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright alignjustify | numlist bullist | image link | removeformat",
              file_picker_types: "file image media",
              relative_urls: false,
              remove_script_host: false,
            }}
          />
        </div>

        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          {/* 11. Cancel button */}
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            type="default"
            danger
          >
            Cancel
          </Button>
          {/* 12. Add or Update button based on context */}
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
