import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../App";
const { Title } = Typography;

interface Props {
  data: DataType[];
  columns: ColumnsType<DataType>;
}

const SalaryTable = ({ data, columns }: Props) => {
  return (
    <>
      <Title level={2}>Main Table</Title>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => data.findIndex((r) => r === record)}
      />
    </>
  );
};

export default SalaryTable;
