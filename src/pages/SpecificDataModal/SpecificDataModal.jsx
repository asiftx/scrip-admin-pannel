import React from "react";
import { Modal, Button } from "antd";
import moment from "moment/moment";

const SpecificDataModal = ({ visible, data, onClose }) => {
  // console.log('SpecificDataModal',data);
  const modalStyle = {
    width: "600px", // Adjust this value as needed
    height: "400px", // Adjust this value as needed
  };

  const handleCancel = () => {
    onClose(); // Close the Modal when the "OK" button is clicked
  };

  // Customize the footer to display only the "OK" button
  const modalFooter = [
    <Button
      key="cancel"
      onClick={handleCancel}
      style={{ backgroundColor: "#3333ff", color: "white" }} // Apply custom styles
    >
      Cancel
    </Button>,
  ];

  return (
    <Modal
      title="Details"
      visible={visible}
      onCancel={handleCancel}
      style={modalStyle}
      footer={modalFooter} // Set the custom footer
    >
      <div>
        <p style={{ fontSize: '20px' }}>Page Followers: {data.pageFollowers}</p>
        <p style={{ fontSize: '20px' }}>Page Rating Average: {data.pageRatingAverage}</p>
        <p style={{ fontSize: '20px' }}>Services: {data?.services?.join(", ")}</p>
        {/* <p style={{ fontSize: '20px' }}>Start Date: {formattedDateStart}</p>
        <p style={{ fontSize: '20px' }}>End Date: {formattedDateEnd}</p>
        <p style={{ fontSize: '20px' }}>Age Range: {data.ageRange[0]} to {data.ageRange[1]}</p>
        <p style={{ fontSize: '20px' }}>Gender: {data.gender}</p>
        <p style={{ fontSize: '20px' }}>Click Count: {data.clickCount}</p>
        <p style={{ fontSize: '20px' }}>Reach Count: {data.reachCount}</p>
        <p style={{ fontSize: '20px' }}>Budget Amount: {data.budgetAmount}</p>
        <p style={{ fontSize: '20px' }}>Tags: {data?.tags?.join(", ")}</p> */}
      </div>
    </Modal>
  );
};

export default SpecificDataModal;
