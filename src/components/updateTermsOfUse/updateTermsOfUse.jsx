import React, { useState, useRef, useEffect } from "react";
import "./modelAddTerms.css";
import {
  Button,
  Modal,
  Input,
  Select,
  InputNumber,
  Checkbox,
  Image,
} from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { callApi } from "../../api/apiCaller";
import { Buffer } from "buffer";
import routes from "../../api/routes";
import { GreenNotify, RedNotify, upload } from "../../helper/helper";

const TinyEditor = ({ onChange, editorRef, value, initialValue }) => {
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="lj0e821xk4kcy1r1qynucz8rxg9k8exwsk8al5al660mgqho"
        onChange={onChange}
        //   value={}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          plugins: "image link",
          file_picker_types: "file image media",
          relative_urls: false,
          remove_script_host: false,
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
  const [term, setTerm] = useState(addProduct ? "" : item?.data);
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const isFormIncomplete = () => {
    return !term;
  };

  const createTerm = async () => {
    if (!term) {
      alert("Please put term");
      return;
    }

    let getRes = (res) => {
      console.log("res of create term", res);
      if (res.status == 400) {
        RedNotify(
          "Terms and conditions already exists you cannot create more than 1"
        );
        setShowModal(false);
        setAddProduct(false);
      }
    };

    let body = {
      data: term.level.content,
    };

    callApi(
      "POST",
      routes.createTermsOfUse,
      body,
      setIsLoading,
      getRes,
      (getResp, Error) => {
        console.log("Resp....", getResp);
        if (getResp.success) {
          GreenNotify("Terms and condtions created successfully");
          setShowModal(false);
          setAddProduct(false);
        } else {
          RedNotify(Error.message);
          console.log("error", Error);
        }
      }
    );
  };

  const updateTerm = async () => {
    if (!term) {
      alert("Please put term");
      return;
    }

    let getRes = (res) => {
      // console.log("res of update product", res);
      setShowModal(false);
    };
    let body = {
      data: term.level.content,
    };
    console.log("cehck of html", term.level.content);
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
  //   console.log("item", title1);
  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Term and Condition</h2>
          {/* <input ref={inputRef} type="text" className='form-control m-2' style={{ width: '80vw' }} value={privacy} onChange={s => setPrivacy(s.target.value)}/> */}
          <TinyEditor
            ref={inputRef}
            editorRef={editorRef}
            initialValue={term}
            value={term}
            onChange={(content) => setTerm(content)}
            style={{ width: "80vw" }}
          />
          {/* <TinyEditor ref={inputRef} editorRef={editorRef} initialValue={privacy}  style={{ width: '80vw' }} /> */}
          {/* <Input
            value={privacy}
            placeholder="privacy"
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
          /> */}
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
              Add Term
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

    // <div className="add-product-modal-main-container">

    // </div>
  );
};

export default ModalAddTerms;
