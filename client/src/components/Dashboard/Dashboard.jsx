import { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CompanyRegFormModal from "../../modals/CompanyRegFormModal";
import OtherCompanyRegFormModal from "../../modals/OtherCompanyRegFormModal";
import UserManagerModal from "../../modals/UserManagerModal";
import CargoFormModal from "../../modals/CargoFormModal";

// --- Dummy Data ---
const barData = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800 },
  { name: "Page G", uv: 3490, pv: 4300 },
];

const pieData = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// --- Custom Shape for Bars ---
const CustomBarShape = ({ x, y, width, height, fill, stroke }) => (
  <Rectangle x={x} y={y} width={width} height={height} fill={fill} stroke={stroke} />
);

// Pie chart custom label render
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- Reusable Bar Chart Component ---
const BarChartCard = ({ data, layout = "horizontal" }) => (
  <div className="col-span-4 bg-white shadow rounded-lg p-4">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout={layout === "vertical" ? "vertical" : undefined}>
        <CartesianGrid strokeDasharray="3 3" />
        {layout === "vertical" ? (
          <>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
          </>
        ) : (
          <>
            <XAxis dataKey="name" />
            <YAxis />
          </>
        )}
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#47a84d" shape={<CustomBarShape stroke="" />} />
        <Bar dataKey="uv" fill="#4767a8" shape={<CustomBarShape stroke="" />} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Reusable Pie Chart Component ---
const PieChartCard = ({ data, colors }) => (
  <div className="col-span-4 bg-white shadow rounded-lg p-4">
    <ResponsiveContainer width={500} height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={150}
          paddingAngle={5}
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

// --- Reusable Stat Card Component ---
const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
    <div>
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
    <div className={`p-3 rounded-full text-white ${bg}`}>
      <i className={`fas ${icon} text-lg`}></i>
    </div>
  </div>
);

export default function Dashboard() {
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [othCompanyModalOpen, setOthCompanyModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [cargoModalOpen, setCargoModalOpen] = useState(false);

  const statCards = [
    { title: "Total Items", value: "12,048", icon: "fa-box-open", bg: "bg-blue-500" },
    { title: "Low Stock", value: "1,058", icon: "fa-exclamation-triangle", bg: "bg-orange-500" },
    { title: "Out of Stock", value: "7,058", icon: "fa-times-circle", bg: "bg-pink-500" },
    { title: "Bills Due", value: "58", icon: "fa-hourglass-half", bg: "bg-yellow-400" },
    { title: "Hold Invoices", value: "16", icon: "fa-pen-fancy", bg: "bg-violet-500" },
    { title: "Pending Invoices", value: "14", icon: "fa-layer-group", bg: "bg-green-500" },
  ];

  return (
    <div className="p-4">
      {/* Page Menu */}
      <div className="flex w-full p-2 border-b-2 border-[#b0c4c4] mb-6 justify-between items-center">
        <h2 className="text-lg font-bold">DASHBOARD</h2>
        <div className="space-x-3">
          <button className="cursor-pointer" onClick={() => setCompanyModalOpen(true)}>My Company</button>
          <span>|</span>
          <button className="cursor-pointer" onClick={() => setOthCompanyModalOpen(true)}>Other Company</button>
          <span>|</span>
          <button className="cursor-pointer" onClick={() => setUserModalOpen(true)}>Login Users</button>
          <span>|</span>
          <button className="cursor-pointer" onClick={() => setCargoModalOpen(true)}>Cargo Info</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Horizontal Bar Charts */}
        <BarChartCard data={barData} layout="horizontal" />  {/* col-span-4 */}
        <BarChartCard data={barData} layout="horizontal" />  {/* col-span-4 */}
        <PieChartCard data={pieData} colors={COLORS} />      {/* col-span-4 */}

        {/* Vertical Bar Charts */}
        <BarChartCard data={barData} layout="vertical" />    {/* col-span-4 */}
        <BarChartCard data={barData} layout="vertical" />    {/* col-span-4 */}
        <BarChartCard data={barData} layout="vertical" />    {/* col-span-4 */}
      </div>

      {companyModalOpen && (
        <CompanyRegFormModal />
      )}
      {othCompanyModalOpen && (
        <OtherCompanyRegFormModal />
      )}

      {userModalOpen && (
        <UserManagerModal />
      )}

      {cargoModalOpen && (
        <CargoFormModal />
      )}
    </div>
  );
}
