// import React, { useState, useEffect } from "react";
// import { Breadcrumb, Button, Select, Table, Input, Modal } from "antd";
// import { callApi } from "../../api/apiCaller";
// import routes from "../../api/routes";
// import Loader from "../../components/loader/loader";
// import moment from "moment/moment";
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { notification } from "antd";
// import { GreenNotify, RedNotify } from "../../helper/helper";
// import UpdateAboutUs from "../../components/updateAboutUs/updateAboutUs";

// import {
//   crossIcon,
//   homeIcon,
//   editIcon,
//   redTrash,
//   trueIcon,
// } from "../../assets";

// const Organizers = () => {
//   const [about, setAbout] = useState([]);
//   const [isloading, setIsLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [selectedOrganizer, setSelectedOrganizer] = useState(null);
//   const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
//   const [updateRecordData, setUpdateRecordData] = useState(null);
//   const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);
//   const [expandedText, setExpandedText] = useState(null);
//   const [expandedModalVisible, setExpandedModalVisible] = useState(false);

//   const getAllAboutUS = () => {
//     let getRes = (res) => {
//       console.log("response??????", res?.data);

//       setAbout(res?.data?.aboutUs);
//     };

//     callApi(
//       "GET",
//       `${routes.getAbout}`,
//       null,
//       setIsLoading,
//       getRes,
//       (error) => {}
//     );
//   };

//   useEffect(() => {
//     getAllAboutUS();
//   }, []);

//   const columns = [
//     {
//       title: "Text",
//       dataIndex: "text",
//       className: "type-name-column-header",
//       align: "center",
//       render: (text) => (
//         <div>
//           <p>{text.length > 50 ? `${text.slice(0, 30)}...` : text}</p>
//           {text.length > 50 && (
//             <Button type="link" onClick={() => handleShowMore(text)}>
//               Show More
//             </Button>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "id",
//       className: "type-name-column-header",
//       align: "center",
//       render: (text, record) => (
//         <div>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => handleUpdate(record.id)}
//             style={{ marginRight: 8 }}
//           ></Button>
//           <Button
//             type="danger"
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record.id)}
//           ></Button>
//         </div>
//       ),
//     },
//   ];
//   console.log("about", about);
//   const data = about?.map((item, index) => {
//     console.log("item", item);
//     return {
//       key: index,
//       id: item?._id,
//       text: item?.text,
//     };
//   });

//   const getRowClassName = (record, index) => {
//     if (index % 2 === 0) {
//       return "server-role-even-row";
//     }
//     return "server-role-odd-row";
//   };

//   const handleShowMore = (text) => {
//     setExpandedText(text);
//     setExpandedModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setExpandedText(null);
//     setExpandedModalVisible(false);
//   };

//   const handleDelete = (recordId) => {
//     console.log(`Delete record with id: ${recordId}`);
//     callApi(
//       "DELETE",
//       `${routes.deleteAboutUs}/${recordId}`,
//       null,
//       setIsLoading,
//       (res) => {
//         console.log("this is my response", res);

//         if (res.status === 200) {
//           setAbout((prevAbout) =>
//             prevAbout.filter((about) => about._id !== recordId)
//           );

//           GreenNotify("About Us Deleted Successfully");
//         } else {
//           RedNotify("Error Occurred while deleting Generes");
//         }
//       },
//       (error) => {
//         console.log("error", error);

//         notification.error({
//           message: "Error",
//           description: "An error occurred while deleting the Generes.",
//         });
//       }
//     );
//   };

//   const handleOrganizerModelClick = () => {
//     setIsOrganizerModalVisible(true);
//   };

//   const handleUpdate = (recordId) => {
//     console.log("Selected id", recordId);
//     const selectedAbout = about.find((about) => about._id === recordId);
//     console.log("selectedAbout??????", selectedAbout);

//     setUpdateRecordData(selectedAbout);
//     setUpdateModalVisible(true);
//   };

//   return (
//     <div className="admin-products-main-container">
//       <Loader loading={isloading} />
//       <Breadcrumb separator=">" className="bread-crumb">
//         <div className="configure-server-home-icon">
//           <img src={homeIcon} alt="home-icon" />
//         </div>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>About Us</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="configure-server-roles-main-heading-container">
//         <h1>About Us</h1>
//         <div></div>
//         <div className="search-inputs" style={{ width: "30rem" }}>
//           <Input
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>
//       {
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={handleOrganizerModelClick}
//           style={{ marginBottom: "16px" }}
//         >
//           Add About
//         </Button>
//       }
//       <div className="server-roles-tb-main-container">
//         <Table
//           rowClassName={getRowClassName}
//           columns={columns}
//           dataSource={data}
//           pagination={true}
//           className="subscriptionapi-table"
//         ></Table>
//       </div>

//       <UpdateAboutUs
//         visible={isUpdateModalVisible}
//         toggleModal={() => {
//           setUpdateModalVisible(false);
//           getAllAboutUS();
//         }}
//         onCancel={() => setUpdateModalVisible(false)}
//         recordData={updateRecordData}
//         selectedOrganizer={selectedOrganizer}
//       />
//       {isOrganizerModalVisible && (
//         <About
//           visible={isOrganizerModalVisible}
//           toggleModal={() => {
//             setIsOrganizerModalVisible(false);
//             getAllAboutUS();
//           }}
//         />
//       )}

//       <Modal
//         title="About Us"
//         visible={expandedModalVisible}
//         onCancel={handleCloseModal}
//         footer={null}
//       >
//         <p style={{ textAlign: "justify" }}>{expandedText}</p>
//       </Modal>
//     </div>
//   );
// };

// export default Organizers;
