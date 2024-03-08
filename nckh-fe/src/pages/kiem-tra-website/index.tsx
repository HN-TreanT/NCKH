import React, { useState } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Divider,
  Input,
  Button,
  Steps,
  StepProps,
  Table,
} from "antd";

import { LoadingOutlined } from "@ant-design/icons";

const fakeData = [
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
  {
    url: "https://codesandbox.io/p/sandbox/basic-usage-antd-5-14-1-lsz5vv?",
  },
];
interface optionProps {
  status: String;
  icon?: any;
}
const KiemTraWebsite: React.FC = () => {
  const [optionsStep1, setOptionStep1] = useState<optionProps>({
    status: "wait",
  });
  const [optionStep2, setOptionStep2] = useState<optionProps>({
    status: "wait",
  });
  const [optionStep3, setOptionStep3] = useState<optionProps>({
    status: "wait",
  });

  const [dataUrl, setDataUrl] = useState<any>([]);
  const items: any[] = [
    {
      title: "Quét trang web",
      ...optionsStep1,
    },
    {
      title: "Kiểm tra",
      ...optionStep2,
      // status: "process",
      // icon: <LoadingOutlined />,
    },
    {
      title: "Hoàn thành",
      ...optionStep3,
      // status: "wait",
      // icon:<
    },
  ];

  const handleCheck = () => {
    setOptionStep1({
      status: "process",
      icon: <LoadingOutlined />,
    });
    setTimeout(() => {
      setOptionStep1({
        status: "finish",
      });
      setOptionStep2({
        status: "process",
        icon: <LoadingOutlined />,
      });
      setTimeout(() => {
        setOptionStep2({
          status: "finish",
        });
        setOptionStep3({
          status: "process",
          icon: <LoadingOutlined />,
        });
        setTimeout(() => {
          setOptionStep3({
            status: "finish",
          });
          setDataUrl(fakeData);
        }, 10000);
      }, 10000);
    }, 10000);
  };

  const columns: any = [
    {
      title: "Các page nhạy cảm",
      dataIndex: "url",
      // key: "name",
      // align: "center",
    },
  ];
  return (
    <div className="kiem-tra">
      <Row>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Kiểm tra",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>Kiểm tra website</span>
              ),
            },
          ]}
        />
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={16} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "130px", fontWeight: "700" }}>URL kiểm tra</div>
          <Input placeholder="Nhập url muốn kiểm tra"></Input>
          <Button
            onClick={handleCheck}
            type="primary"
            style={{ marginLeft: "10px" }}
          >
            Kiểm tra
          </Button>
        </Col>
        <Col span={8}></Col>
        <Col style={{ marginTop: "20px" }} span={24}>
          <Steps items={items} />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
        <Table
          style={{ width: "100%" }}
          dataSource={dataUrl}
          columns={columns}
        />
      </Row>
    </div>
  );
};

export default KiemTraWebsite;
