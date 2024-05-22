import { ColumnsType } from "antd/es/table";

import SalaryTable from "./components/SalaryTable";
import { salaries } from "./assets/salaries";

export interface DataType {
  work_year: number;
  total_jobs: number;
  total_salary: number;
  average_salary: number;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: number;
  salary_currency: string;
  salary_in_usd: number;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

let data: DataType[] = salaries.map((record) => ({
  ...record,
  total_jobs: salaries.reduce(
    (a, s) => (s.work_year === record.work_year ? a + 1 : a + 0),
    0
  ),
  total_salary: 0,
  average_salary: 0,
}));
data = data.map((record) => ({
  ...record,
  total_salary: salaries.reduce(
    (a, s) => (s.work_year === record.work_year ? a + s.salary : 0),
    0
  ),
}));
data = data.map((record) => ({
  ...record,
  average_salary: data.reduce((_, s) => s.total_salary / s.total_jobs, 0),
}));
console.log("data", data.slice(0, 10));

const main_table: ColumnsType<DataType> = [
  {
    title: "Year",
    dataIndex: "work_year",
    key: "work_year",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.work_year - b.work_year,
  },
  {
    title: "Total Jobs",
    dataIndex: "total_jobs",
    key: "total_jobs",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.total_jobs - b.total_jobs,
  },
  {
    title: "Average Salary (USD)",
    dataIndex: "average_salary",
    key: "average_salary",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.average_salary - b.average_salary,
  },
];

function App() {
  return <SalaryTable data={data} columns={main_table} />;
}

export default App;
