import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Button, notification, Select } from "antd";
import { callApi } from "../../api/apiCaller";
import { GreenNotify, RedNotify } from "../../helper/helper";
import routes from "../../api/routes";

const UpdateOrganizer = ({
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
        console.log("requestBody", requestBody);
        callApi(
          "PATCH",
          `${routes.updateMedType}/${recordData._id}`,
          requestBody,
          setIsLoading,
          (res) => {
            if (res.status === 200) {
              GreenNotify("Medicine Type Updated Successfully");
              toggleModal();
            } else {
              RedNotify("Error Occurred. Please try again later.");
            }
          },
          (error) => {
            console.error("API Call Error:", error);
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
      title={"Update Type"}
      visible={visible}
      onCancel={toggleModal}
      footer={[
        <Button key="cancel" onClick={toggleModal}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the type" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateOrganizer;
