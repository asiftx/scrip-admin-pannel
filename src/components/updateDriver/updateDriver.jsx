import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { callApi } from "../../api/apiCaller";
import { GreenNotify, RedNotify } from "../../helper/helper";
import routes from "../../api/routes";

const AddCategory = ({
  visible,
  item,
  toggleModal,
  recordData,
  addProduct,
  setAddProduct,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { Option } = Select;
  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";

  useEffect(() => {
    if (visible && recordData) {
      form.setFieldsValue({
        approved: recordData?.approved ? "Approve" : "Reject",
        _id: recordData._id,
      });
    }
  }, [visible, recordData, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Values", values);
        console.log("recorddddd", recordData._id);
        const url = `${routes.updateUser}/${recordData.id}`;
        const data = { approved: values.approved }; // Construct the data object correctly
        console.log("data", data);
        callApi(
          "PATCH",
          url,
          data,
          setIsLoading,
          (res) => {
            console.log("response", res);
            if (res.status === 200) {
              GreenNotify("Driver Updated Successfully");
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
      title={"Update Driver"}
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
          label="Approval"
          name="approved"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select placeholder="Select an option">
            <Option value={true}>Approve</Option>
            <Option value={false}>Reject</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategory;
