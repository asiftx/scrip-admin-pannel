import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Auth/login/login";
import { useDispatch } from "react-redux";
import { userData, accessToken, refreshToken } from "../redux/userDataSlice";
import { callApi } from "../api/apiCaller";
import { message } from "antd";
import routes from "../api/routes";
import { GreenNotify, RedNotify } from "../helper/helper";
import Loader from "../components/loader/loader";
import UserList from "../pages/userList/userList";

import Pages from "../pages/pages/pages";
import { MenuOutlined } from "@ant-design/icons";
import PagePosts from "../pages/pagePosts/pagePosts";
import Communities from "../pages/communiteis/communities";
import CommunityPosts from "../pages/communityPosts/communityPosts";
import CommunityEvents from "../pages/communityEvents/communityEvents";
import Chat from "../pages/chat/chat";
import NewsEvents from "../pages/newsEvents/newsEvents";
import Jobs from "../pages/jobs/jobs";
import Feedbacks from "../pages/feedbacks/feedbacks";
import Pharmacy from "../pages/pharmacyList/pharmacyList";
import Order from "../pages/ordersList/ordersList";
import PrivacyPolicy from "../pages/privacypolicy/privacyPolicy";
import TermsOfUse from "../pages/termsOfUse/termsOfUse";
import FAQs from "../pages/faqs/faqs";
import Driver from "../pages/driverList/driverList";
import Shopp from "../pages/shopsList/shopsList";
import Review from "../pages/reviews/reviews";
import About from "../pages/aboutUs/aboutUs";
import Subscriber from "../pages/subscribersList/subscribersList";

import {
  userIcon,
  privacyIcon,
  driver,
  pharmacy,
  subscribeIcon,
  messageIcon,
  order,
  capsules,
  informationIcon,
  categories,
  customers,
  ratingIcon,
  ShopsIcon,
  faqs,
  termsIcon,
} from "../assets";
import Header2 from "../components/header/header";
import { Routes, Route } from "react-router-dom";
import Courses from "../pages/courses/Courses";
import Navigation from "../navigation/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LandingPage from "../pages/landingPage/landingPage";
import Medicines from "../pages/categoryList/categoryList";
import UserMessages from "../pages/userMessages/userMessages";
import MedicineType from "../pages/medicineTypes/medicinTypes";

const { Header, Content, Sider } = Layout;

const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const callApiWithLoading = async (...args) => {
    setIsLoading(true);

    try {
      const result = await callApi(...args);
      return result;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logOut = () => {
    GreenNotify("Logout successful");

    localStorage.clear();

    navigate("/login", { replace: true });
  };
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const currentPath = location.pathname;

  const routeToKey = {
    "/customers": "12",
    "/reviews": "13",
    "/login": "11",
    "/subscribers": "14",
    "/aboutus": "15",
    "/userMessages": "16",
    "/types": "20",
    "/newsEvents": "21",
    "/jobs": "22",
    "/feedbacks": "23",
    "/privacy-policy": "30",
    "/faqs": "31",
    "/medicines": "40",
    "/chat": "41",
    "/termsOfUses": "25",
    "/orders": "42",
    "/pharmacies": "43",
    "/drivers": "44",
    "/shops": "80",
  };

  const currentKey = routeToKey[currentPath];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Loader loading={isloading} />
      <Sider style={{ background: "#0B1B2D" }} width={280}>
        <div
          style={{
            padding: "2rem 0",
            textAlign: "center",
            color: "white",
            fontSize: "3rem",
            scrollBehavior: "smooth",
            position: "sticky",
          }}
        >
          SCRIPTID
        </div>
        <Menu
          style={{ marginTop: "5rem" }}
          inlineCollapsed={true}
          theme="dark"
          defaultSelectedKeys={["12"]}
          mode="inline"
        >
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/customers")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={customers}
              />
            }
            key="12"
            className={currentKey === "12" ? "active-menu-item" : ""}
          >
            Customers
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/shops")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={ShopsIcon}
              />
            }
            key="80"
            className={currentKey === "980" ? "active-menu-item" : ""}
          >
            Shops
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/drivers")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={driver}
              />
            }
            key="44"
            className={currentKey === "44" ? "active-menu-item" : ""}
          >
            Drivers
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/pharmacies")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={pharmacy}
              />
            }
            key="43"
            className={currentKey === "43" ? "active-menu-item" : ""}
          >
            Pharmacies
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/medicines")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={capsules}
              />
            }
            key="40"
            className={currentKey === "40" ? "active-menu-item" : ""}
          >
            Medicines
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/orders")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={order}
              />
            }
            key="42"
            className={currentKey === "42" ? "active-menu-item" : ""}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/types")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={categories}
              />
            }
            key="20"
            className={currentKey === "20" ? "active-menu-item" : ""}
          >
            Types
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/subscribers")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={subscribeIcon}
              />
            }
            key="14"
            className={currentKey === "14" ? "active-menu-item" : ""}
          >
            Subscribers
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/userMessages")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={messageIcon}
              />
            }
            key="16"
            className={currentKey === "16" ? "active-menu-item" : ""}
          >
            User Messages
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/reviews")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={ratingIcon}
              />
            }
            key="13"
            className={currentKey === "13" ? "active-menu-item" : ""}
          >
            Reviews
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/privacy-policy")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={privacyIcon}
              />
            }
            key="30"
            className={currentKey === "30" ? "active-menu-item" : ""}
          >
            PrivacyPolicy
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/aboutus")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={informationIcon}
              />
            }
            key="15"
            className={currentKey === "15" ? "active-menu-item" : ""}
          >
            About Us
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/termsOfUses")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={termsIcon}
              />
            }
            key="25"
            className={currentKey === "25" ? "active-menu-item" : ""}
          >
            TermsOfUse
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "3rem", color: "white", fontWeight: "bold" }}
            onClick={() => navigate("/faqs")}
            icon={
              <img
                style={{ height: "30px", width: "30px" }}
                className="side-bar-icon"
                src={faqs}
              />
            }
            key="31"
            className={currentKey === "31" ? "active-menu-item" : ""}
          >
            FAQs
          </Menu.Item>

          <Menu.Item
            onClick={logOut}
            key="89"
            icon={<LogoutOutlined className="side-bar-icon" />}
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header2 />
        <Content style={{ background: "#fff" }}>
          <Routes>
            <Route path="/pharmacies" element={<Pharmacy />} />
            <Route path="/drivers" element={<Driver />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/Customers" element={<UserList />} />
            <Route path="/types" element={<MedicineType />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/subscribers" element={<Subscriber />} />
            <Route path="/userMessages" element={<UserMessages />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/communityPosts/:id" element={<CommunityPosts />} />
            <Route path="/communityPosts" element={<CommunityPosts />} />
            <Route path="/communityEvents/:id" element={<CommunityEvents />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/newsEvents" element={<NewsEvents />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/termsOfUses" element={<TermsOfUse />} />
            <Route path="/shops" element={<Shopp />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
