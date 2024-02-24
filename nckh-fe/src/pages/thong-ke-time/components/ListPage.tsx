import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
interface DataType {
  url: string;
}
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
const ListPage: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "URL page nhạy cảm",
      dataIndex: "url",
      key: "name",
      align: "center",
    },
  ];
  return <Table dataSource={fakeData} pagination={false} columns={columns} />;
};

export default ListPage;
