import React, { useState, useEffect } from "react";
import "./landingPage.css";
import { Breadcrumb, Card, Row, Col, Statistic, Spin } from "antd";
import CountUp from "react-countup";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import {
  UserOutlined,
  CarOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [driversCount, setDriversCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [pharmaciesCount, setPharmaciesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUser = async () => {
    let getRes = (res) => {
      const users = res?.data?.data;

      const drivers = users.filter((user) => user.role === "driver");
      const customers = users.filter((user) => user.role === "customer");
      const pharmacies = users.filter((user) => user.role === "pharmacy");
      setTimeout(() => {
        setDriversCount(drivers.length);
        setCustomersCount(customers.length);
        setPharmaciesCount(pharmacies.length);
        setIsLoading(false);
      }, 1000);
    };

    setIsLoading(true);
    const result = await callApi(
      "GET",
      `${routes.getAllUser}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="dashboard-main-container">
      <header className="header">
        <Breadcrumb separator=">" className="bread-crumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </header>

      <main className="content">
        <div className="welcome-message">
          <h1 className="welcome-heading">Welcome to the Dashboard!</h1>
          <p className="welcome-subtext">
            Overview of your platform's key metrics
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={16} className="stats-row">
            <Col span={8}>
              <Card>
                <CarOutlined style={{ fontSize: "48px", color: "#3f8600" }} />
                <Statistic
                  title="Drivers"
                  value={driversCount}
                  formatter={(value) => <CountUp end={value} duration={2} />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <UserOutlined style={{ fontSize: "48px", color: "#3f8600" }} />
                <Statistic
                  title="Customers"
                  value={customersCount}
                  formatter={(value) => <CountUp end={value} duration={2} />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <MedicineBoxOutlined
                  style={{ fontSize: "48px", color: "#3f8600" }}
                />
                <Statistic
                  title="Pharmacies"
                  value={pharmaciesCount}
                  formatter={(value) => <CountUp end={value} duration={2} />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
          </Row>
        )}
      </main>

      <footer className="footer">
        <p className="footer-text">© 2024 ScriptId. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
