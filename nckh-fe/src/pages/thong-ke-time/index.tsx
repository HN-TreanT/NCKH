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
  const [postTitle, setPosttitle] = useState();
   const [dataLineChar, setDataLineChar] = useState<any>([])
  const handleClickRowTable = (title: any) => {
    postServices.thongketheothang({
      title: title
    }).then((res: any) => {
      const temp = [
        {
          id: 1,
          name: "Tháng 1",
        },
        {
          id: 2,
          name: "Tháng 2",
        },
        {
          id: 3,
          name: "Tháng 3",
        },
        {
          id: 4,
          name: "Tháng 4",
        },
        {
          id: 5,
          name: "Tháng 5",
        },
        {
          id: 6,
          name: "Tháng 6",
        },
        {
          id: 7,
          name: "Tháng 7",
        },
        {
          id: 8,
          name: "Tháng 8",
        },
        {
          id: 9,
          name: "Tháng 9",
        },
        {
          id: 10,
          name: "Tháng 11",
        },
        {
          id: 11,
          name: "Tháng 11",
        },
        {
          id: 12,
          name: "Tháng 12",
        }
      ]
      temp.map((item: any) => {
        if (res?.data?.currentYear && Array.isArray(res?.data?.currentYear?.data)) {
          const find = res?.data?.currentYear?.data.find((a : any) => item?.id === a?._id?.month)
           if (find) {
            item[`${res?.data?.currentYear?.year}`] = find?.count || 0
           } else {
            item[`${res?.data?.currentYear?.year}`] = 0
           }

           const find2 = res?.data?.preYear?.data.find((a : any) => item?.id === a?._id?.month)
           if (find2) {
            item[`${res?.data?.preYear?.year}`] = find2?.count || 0
           } else {
            item[`${res?.data?.preYear?.year}`] = 0
           }
        }
        return {
           ...item
        }
      })
      // console.log(temp)
      setDataLineChar(temp)
      
    }).catch((err: any) => {
      console.log(err)
    })

  }

  // const getListUrl = async () => {
  //   postServices
  //     .get({
  //       page: 1,
  //       size: 11,
  //     })
  //     .then((res) => {
  //       const temp = res.data.data.map((item: any) => {
  //         return {
  //           url: item.url,
  //         };
  //       });
  //       setListURLPage(temp);
  //     });
  // };

  const getDatThongKe = async () => {
    postServices
      .thongke({
        limit: 18
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const temp = res.data.map((item: any) => {
            return {
              name: item?._id || "",
              uv: item?.count,
            };
          });
          setDataThongKe(temp);
          setListURLPage(temp)
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDatThongKe();
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
          <ListPage handleClickRowTable={handleClickRowTable} postTitle={postTitle} setPostTitle={setPosttitle} data={listUrlPage} />
        </Col>
        <Col span={16}>
          <BarChar dataThongKe={dataThongKe} />
          <LineChar dataLineChar={dataLineChar} />
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeTime;
