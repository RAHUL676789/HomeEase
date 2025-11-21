import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminChartsDemo() {
  const statsData = [
    { name: "Users", value: 1280 },
    { name: "Partners", value: 240 },
    { name: "Services", value: 42 },
    { name: "Bookings", value: 987 },
  ];

  const monthlyBookings = [
    { month: "Jan", bookings: 120 },
    { month: "Feb", bookings: 180 },
    { month: "Mar", bookings: 150 },
    { month: "Apr", bookings: 200 },
    { month: "May", bookings: 250 },
    { month: "Jun", bookings: 220 },
  ];

  const pieColors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"]; // purple, green, yellow, red

  return (
    <div className="p-6 text-gray-100 space-y-12 bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard Charts Demo</h1>

      {/* 1) BAR CHART */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Platform Stats (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statsData}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2) LINE CHART */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Monthly Bookings (Line Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyBookings}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3) PIE CHART */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Platform Distribution (Pie Chart)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={statsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {statsData.map((entry, index) => (
                <Cell key={index} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 4) AREA + LINE COMBO CHART (BONUS) */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Bookings Growth (Bonus Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyBookings}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}