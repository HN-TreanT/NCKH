import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Divider } from "antd";
import ListPage from "./components/ListPage";
import BarChar from "./components/BarChart";
import LineChar from "./components/LineChar";
import "./index.scss";
import { postServices } from "../../utils/services/postService";

const ThongKeTime: React.FC = () => {
  const [dataThongKe, setDataThongKe] = useState([]);
  const [listUrlPage, setListURLPage] = useState([]);

  const getListUrl = async () => {
    postServices
      .get({
        page: 1,
        size: 11,
      })
      .then((res) => {
        const temp = res.data.data.map((item: any) => {
          return {
            url: item.url,
          };
        });
        setListURLPage(temp);
      });
  };

  const getDatThongKe = async () => {
    postServices
      .thongke({})
      .then((res) => {
        if (Array.isArray(res.data)) {
          const temp = res.data.map((item: any) => {
            return {
              name: item?._id || "",
              uv: item?.count,
            };
          });
          setDataThongKe(temp);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDatThongKe();
    getListUrl();
  }, []);
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
              //theo thời gian
              title: <span style={{ fontWeight: "bold" }}>Thống kê</span>,
            },
          ]}
        />
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Row gutter={[10, 10]}>
        <Col className="list-page" style={{ overflow: "hidden" }} span={8}>
          <ListPage data={listUrlPage} />
        </Col>
        <Col span={16}>
          <BarChar dataThongKe={dataThongKe} />
          <LineChar />
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeTime;
