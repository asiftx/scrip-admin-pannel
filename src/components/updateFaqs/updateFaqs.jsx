import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Button, notification, Select } from "antd";
import { callApi } from "../../api/apiCaller";
import { GreenNotify, RedNotify } from "../../helper/helper";
import routes from "../../api/routes";
// import { Buffer } from "buffer";
import AWS from "aws-sdk";
const { Option } = Select;
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

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
  const [image, setImage] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  useEffect(() => {
    if (visible && recordData) {
      console.log("record data", recordData);
      form.setFieldsValue({
        title: recordData?.title,
        type: recordData?.type,
        // firstName: recordData?.creator?.firstName,
        // lastName: recordData?.creator?.lastName,
        image: recordData.image,
      });
      setImage(recordData.image || dummyImage);
    }
  }, [visible, recordData, form]);

  const pickImageFile = () => {
    fileInputRef.current.click();
  };

  const uploadImageOnS3 = async (src) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const S3 = new AWS.S3();
          const params = {
            Bucket: "drivebuddyz",
            Key: `${10000 + Math.round(Math.random() * 10000)}.png`,
            Body: new Buffer(
              reader.result.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            ),
          };
          let res = await S3.upload(params).promise();
          console.log(res);
          return resolve(res.Location);
        };
        reader.onerror = (e) => console.log("OOPS!", e);
        reader.readAsDataURL(src);
      } catch (error) {
        console.error("Error uploading to S3:", error);
        reject(error);
      }
    });
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;

    if (fileList.length > 0) {
      const file = fileList[0];

      const reader = new FileReader();
      reader.onloadend = async () => {
        const thubnailUrl = await uploadImageOnS3(file);
        console.log("urls3 ", thubnailUrl);
        setImage(thubnailUrl);
        setFileError("");
      };
      reader.readAsDataURL(file);
    } else {
      setFileError("Please select a file.");
    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const requestBody = {
          ...values,
          image: image,
        };
        console.log("requestBody", requestBody);
        callApi(
          "PATCH",
          `${routes.updateCategory}/${recordData._id}`,
          requestBody,
          setIsLoading,
          (res) => {
            if (res.status === 200) {
              GreenNotify("Category Updated Successfully");
              toggleModal();
            } else {
              console.log("else :::", res);
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
      title={"Update Category"}
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter the title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select type",
            },
          ]}
        >
          <Select placeholder="Select Type">
            <Option value="weight">Weight</Option>
            <Option value="vehicle">Vehicle</Option>
          </Select>
        </Form.Item>

        <div
          onClick={pickImageFile}
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2> Image</h2>
          <div className="add-product-modal-image">
            <img src={image ? image : dummyImage} alt="" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            required
          />
          {fileError && <p style={{ color: "red" }}>{fileError}</p>}
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateOrganizer;
