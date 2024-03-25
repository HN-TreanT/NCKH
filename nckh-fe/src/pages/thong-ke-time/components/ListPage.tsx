import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
interface DataType {
  url: string;
}
interface Props {
  data: any[];
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
const ListPage: React.FC<Props> = (props) => {
  const { data } = props;
  const [dataSource, setDataSource] = useState([]);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "URL page nhạy cảm",
      dataIndex: "url",
      key: "name",
      render: (text) => (
        // <div style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
        //   {value}
        // </div>
        <span title={text}>
          {text.length > 80 ? `${text.slice(0, 80)}...` : text}
        </span>
      ),
    },
  ];
  return (
    <Table
      style={{ justifyContent: "left" }}
      dataSource={data}
      pagination={false}
      columns={columns}
    />
  );
};

export default ListPage;
