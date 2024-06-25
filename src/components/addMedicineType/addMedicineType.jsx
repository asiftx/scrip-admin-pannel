import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Button, notification, Select } from "antd";
import { callApi } from "../../api/apiCaller";
import { GreenNotify, RedNotify } from "../../helper/helper";
import routes from "../../api/routes";
import { Buffer } from "buffer";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const AddCategory = ({
  visible,
  item,
  toggleModal,
  recordData,
  addProduct,
  setAddProduct,
}) => {
  const [form] = Form.useForm();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible && recordData) {
      console.log("record data", recordData);
      form.setFieldsValue({
        name: recordData?.name,
      });
    }
  }, [visible, recordData, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const requestBody = {
          ...values,
        };
        callApi(
          "POST",
          `${routes.addType}`,
          requestBody,
          setIsLoading,
          (res) => {
            if (res.status === 200) {
              GreenNotify("Type Created Successfully");
              toggleModal();
            } else {
              RedNotify("Error Occurred. Please try again later.");
            }
          },
          (error) => {
            RedNotify(
              "An error occurred during the API call. Please try again later.",
              error
            );
          }
        );
      })
      .catch((errorInfo) => {
        console.error("Validation Error:", errorInfo);
      });
  };

  return (
    <Modal
      title={"Create Type"}
      visible={visible}
      onCancel={toggleModal}
      footer={[
        <Button key="cancel" onClick={toggleModal}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the name",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategory;
