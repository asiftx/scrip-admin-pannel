import React from "react";
import "./htmlReturn.css";

const HtmlModal = ({ showModalDes, setShowModalDes, description }) => {
  return (
    <div
      onClick={() => setShowModalDes(false)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "29rem", width: "70rem" }}
        className="add-product-modal-container product-description-detail"
      >
        {/* <h1>Description</h1> */}
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};

export default HtmlModal;
