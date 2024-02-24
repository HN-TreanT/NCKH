import React from "react";
import { Row, Col, Breadcrumb, Divider, Button } from "antd";
const ThongKeCount: React.FC = () => {
  return (
    <div className="thong-ke-count">
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
                  Thống kê theo số lượng
                </span>
              ),
            },
          ]}
        />
        {/* <Button
          type="primary"
          style={{ marginLeft: "auto", width: 100 }}
          className="blue-button"
          // onClick={() => {
          //   setOpenModalAdd(true)
          //   setCurData({})
          // }}
        >
          Thêm mới
        </Button> */}
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
    </div>
  );
};

export default ThongKeCount;
