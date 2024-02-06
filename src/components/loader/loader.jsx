import React from "react";
import { Button, Modal, Space, Spin } from "antd";

const Loader = ({ loading }) => {
  return (
    <Modal
      open={loading}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      closeIcon={<div></div>}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "16rem",
        }}
      >
        <Spin size="large" />
        <h3>Loading..</h3>
      </div>
    </Modal>
  );
};

export default Loader;
