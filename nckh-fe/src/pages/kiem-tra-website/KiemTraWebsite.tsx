import React, { useState } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Divider,
  Input,
  Button,
  Steps,
  Form
} from "antd";

import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import { crawlServices } from "../../utils/services/crawlService";

interface UrlPage {
  content: String;
  title: String;
  url: String;
}
interface optionProps {
  status: String;
  icon?: any;
}
const KiemTraOneWebsite: React.FC = () => {
  const [form] = Form.useForm()
  const [optionsStep1, setOptionStep1] = useState<optionProps>({
    status: "wait",
  });
  const [optionStep2, setOptionStep2] = useState<optionProps>({
    status: "wait",
  });
  const [optionStep3, setOptionStep3] = useState<optionProps>({
    status: "wait",
  });

  const [urlInput, setUrlInput] = useState<any>();
  const [data, setData] = useState<any>()
  const [nhaycam, setNhaycam] = useState<boolean>(false)

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
    crawlServices
      .getOneWebsite({
        website: urlInput,
      })
      .then((res) => {
        if (res.status) {
          
          setOptionStep1({
            status: "finish",
          });
          setOptionStep2({
            status: "process",
            icon: <LoadingOutlined />,
          });
          setData(res.data)
          // kiem tra\
          const dataSubmit = {
            title:res?.data?.title || "" ,
            content: res?.data?.title || "" ,
            url: urlInput, 
            images: res?.data?.title || "",
          }
          fetch("http://127.0.0.1:8000/check-post",
          {
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(dataSubmit)
          })
          .then((response) => response.json())
          .then(function(res2){ 
            setOptionStep2({
              status: "finish",
            });
            setOptionStep3({
              status:"finish"
            })
              if(res2.status) {
                 setNhaycam(true)
              } else {
                setNhaycam(false)
                
              }
          })
          .catch(function(err){ 
            setNhaycam(true)
            setOptionStep2({
              status: "error",
              icon: <CloseOutlined />,
            });
            console.log(err?.message)
           })
        }
      })
      .catch((err) => {
        setOptionStep1({
          status: "error",
          icon: <CloseOutlined />,
        });
      });
  };

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
          <Input
            onChange={(value) => setUrlInput(value.target.value)}
            placeholder="Nhập url muốn kiểm tra"
          ></Input>
          <Button
            onClick={handleCheck}
            type="primary"
            style={{ marginLeft: "10px" }}
          >
            Tiến hành
          </Button>
        </Col>
        <Col span={8}></Col>
        <Col style={{ marginTop: "20px" }} span={24}>
          <Steps items={items} />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
        {/* <Table
          style={{ width: "100%" }}
          dataSource={dataUrl}
          columns={columns}
        /> */}
        {/* <Input value={data?.title}></Input> */}
        <h3>{data?.title || ""}</h3>
        <Form form={form} style={{width:"100%"}}>
          <Form.Item
            rules={[
              // {
              //   required:true,
              //   message:"Nội dung nhạy cảm"
              // },
              {
                message:"",
                validator: (_, value) => {
                  if (nhaycam) {
                    throw new Error("Nội dung nhạy cảm ");
                  }
                 }
               }
            ]}
           name={"content"}
           initialValue={data?.content}
          >
             <Input.TextArea  rows={25} ></Input.TextArea>
          </Form.Item>
        </Form>
        
      </Row>
    </div>
  );
};

export default KiemTraOneWebsite;
