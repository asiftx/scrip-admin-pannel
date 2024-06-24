import React, { useState, useRef, useEffect } from "react";
import "./ModalAddTermsAndUses.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image } from "antd";
import { addIcon, editIcon, termsAndUse } from "../../assets";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";

const ModalAddTermsAndUses = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [description, setDescription] = useState(
    addProduct ? "" : item?.description
  );

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
      description: editorRef.current.getContent(),
    };

    callApi(
      "POST",
      routes.createTermsOfUse,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const updateProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let getRes = (res) => {
      setShowModal(false);
    };

    let body = {
      description: editorRef.current.getContent(),
    };

    callApi(
      "PATCH",
      `${routes.updateTermsOfUse}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleEditorChange = (content, editor) => {
    // Update the description state when the editor content changes
    setDescription(content);
  };

  useEffect(() => {
    if (editorRef.current) {
      // Set the initial content of the editor
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
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            value={description}
            onEditorChange={handleEditorChange}
            init={{
              plugins: "image link",
              file_picker_types: "file image media",
              relative_urls: false,
              remove_script_host: false,
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

export default ModalAddTermsAndUses;
