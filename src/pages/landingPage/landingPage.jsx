import React from "react";
import "./landingPage.css";
import { Breadcrumb, Button, Select, Image } from "antd";
import { homeIcon, welcomeImage } from "../../assets"; // Assuming you have a welcome image

const LandingPage = () => {
  return (
    <div className="landing-page-main-container">
      <div className="header">
        <Breadcrumb separator=">" className="bread-crumb">
          <div className="configure-server-home-icon">
            {/* <img src={homeIcon} alt="home-icon" /> */}
          </div>
         
        </Breadcrumb>
      </div>

      <div className="content">
        <div className="welcome-message">
          <h1 className="welcome-heading">Welcome to ScripID!</h1>
          <p className="welcome-subtext">
            Your Ultimate Platform for Seamless Experiences
          </p>
        </div>

        <div className="dynamic-card-main-container">
          <div className="dynamic-card">
            {/* Add dynamic content or components here */}
            <Button type="primary" size="large">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <div className="footer">
        <p className="footer-text">© 2023 Paisero. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
