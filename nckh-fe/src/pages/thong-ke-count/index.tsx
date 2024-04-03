import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Divider, Button, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { postServices } from "../../utils/services/postService";
interface DataType {}
const ThongKeCount: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [dataSoure, setDatasoucre] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    postServices
      .get({
        page: currentPage,
        size: rowsPerPage,
      })
      .then((res: any) => {
        if (Array.isArray(res?.data?.data)) {
          setDatasoucre(res?.data.data);
          setCount(res?.data.count);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };
  const columns: ColumnProps<DataType>[] = [
    {
      title: "TT",
      dataIndex: "ID",
      width: 30,
      align: "center",
      render: (text, record, index) => (
        <span>{(currentPage - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      title: "Tiêu đề",
      dataIndex: "title",
    },

    {
      title: "Đường dẫn",
      dataIndex: "url",
      render: (text, record, index) => (
        <span>
          <a target="_blank" href={text} rel="noreferrer">
            {text.length > 80 ? `${text.slice(0, 80)}...` : text}
          </a>
        </span>
      ),
    },

    {
      title: "Tóm tắt",
      dataIndex: "summarization",
      // render: (text, record, index) => (
      //   <span>{text.length > 80 ? `${text.slice(0, 80)}...` : text}</span>
      // ),
    },
  ];

  useEffect(() => {
    getData();
  }, [currentPage, rowsPerPage]);
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
              // theo số lượng
              title: <span style={{ fontWeight: "bold" }}>Thống kê</span>,
            },
          ]}
        />
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>

      <Table
        loading={loading}
        style={{ width: "100%" }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSoure}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: rowsPerPage,
          defaultPageSize: rowsPerPage,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "100"],
          total: count,
          locale: { items_per_page: "/ trang" },
          showTotal: (total, range) => <span>Tổng số: {total}</span>,
          onShowSizeChange: (current, pageSize) => {
            setCurrentPage(current);
            setRowsPerPage(pageSize);
          },
          onChange: (pageNumber) => {
            setCurrentPage(pageNumber);
          },
        }}
      />
    </div>
  );
};

export default ThongKeCount;
