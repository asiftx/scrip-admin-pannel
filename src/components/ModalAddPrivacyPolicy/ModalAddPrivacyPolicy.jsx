import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { GreenNotify, RedNotify } from "../../helper/helper";

const TinyEditor = ({ onChange, editorRef, value, initialValue }) => {
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="kttjxe20gth0u5wh3mfo9b9ix7o7o7dvr1zdsamvp09xfycq"
        onChange={onChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          plugins: "lists image link",
          toolbar:
            "styleselect | fontselect | fontsize | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | romanlist | h1 h2 h3 h4 h5 h6 | code",
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          file_picker_types: "image media",
          relative_urls: false,
          remove_script_host: false,
          menubar: false,
          content_style: `
      ol.roman {
        list-style-type: upper-roman;
      }
    `,
          setup: (editor) => {
            editor.ui.registry.addButton("romanlist", {
              text: "Roman List", // Button text
              tooltip: "Insert Roman numeral list",
              onAction: () => {
                editor.execCommand("InsertOrderedList", false, {
                  "list-style-type": "upper-roman",
                });
              },
            });
          },
        }}
      />

      <button onClick={log}>Log editor content</button>
    </>
  );
};

const ModalAddTerms = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [privacy, setPrivacy] = useState(addProduct ? "" : item?.data);
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const isFormIncomplete = () => {
    return !privacy;
  };

  const createTerm = async () => {
    if (!privacy) {
      alert("Please put term");
      return;
    }

    let getRes = (res) => {
      if (res.status == 400) {
        RedNotify(
          "Privacy policy already exists you cannot create more than 1"
        );
        setShowModal(false);
        setAddProduct(false);
      }
      if (res.status == 200) {
        GreenNotify("Privacy policy created successfully");
        setShowModal(false);
        setAddProduct(false);
      }
    };

    let body = {
      data: privacy.level.content,
    };

    callApi(
      "POST",
      routes.createTermsOfUse,
      body,
      setIsLoading,
      getRes,
      (error) => {
        RedNotify(error.message);
        console.log("error", error);
      }
    );
  };

  const updateTerm = async () => {
    if (!privacy) {
      alert("Please put privacy");
      return;
    }

    let getRes = (res) => {
      setShowModal(false);
    };
    let body = {
      data: privacy.level.content,
    };
    callApi(
      "PATCH",
      `${routes.updatePrivacyPolicy}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };
  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Privacy Policy</h2>

          <TinyEditor
            ref={inputRef}
            editorRef={editorRef}
            initialValue={privacy}
            value={privacy}
            onChange={(content) => setPrivacy(content)}
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
              onClick={createTerm}
              style={{ marginLeft: "2rem" }}
              disabled={isFormIncomplete()}
              type="primary"
            >
              Add Privacy
            </Button>
          ) : (
            <Button
              onClick={updateTerm}
              style={{ marginLeft: "2rem" }}
              disabled={isFormIncomplete()}
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

export default ModalAddTerms;
