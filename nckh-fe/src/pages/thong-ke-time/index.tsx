import React from "react";
import { Row, Col, Breadcrumb, Divider } from "antd";
import ListPage from "./components/ListPage";
import BarChar from "./components/BarChart";
import LineChar from "./components/LineChar";
import "./index.css";
const ThongKeTime: React.FC = () => {
  return (
    <div className="thong-ke-time">
      <Row>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Thống kê",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>
                  Thống kê theo thời gian
                </span>
              ),
            },
          ]}
        />
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <ListPage />
        </Col>
        <Col span={16}>
          <BarChar />
          <LineChar />
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeTime;
