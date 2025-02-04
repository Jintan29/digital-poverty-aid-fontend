import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";

const IncomeInflationChart = ({ charData }) => {

  //Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border border-gray-300 p-3 rounded shadow-lg">
          <p className="label text-lg font-semibold">{label}</p>
          {payload.map((data, index) => {
            if (data.dataKey === "income") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value.toLocaleString()} บาทต่อเดือน
                </p>
              );
            }
            if (data.dataKey === "predictedIncome") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value.toLocaleString()} บาทต่อเดือน
                </p>
              );
            }
            if (data.dataKey === "expenses") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value.toLocaleString()} บาทต่อเดือน
                </p>
              );
            }
            if (data.dataKey === "inflation") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value}% ต่อปี
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
  };
  
  return (
    <>
      <ComposedChart width={900} height={400} data={charData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" />
        <YAxis
          yAxisId="left"
          label={{
            value: "รายได้เฉลี่ย",
            angle: -90,
            position: "outsideLeft",
            dx: -25,
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "อัตตราเงินเฟ้อ (%)",
            angle: -90,
            position: "outsideRight",
            dx: 25,
          }}
        />
        <RechartsTooltip content={CustomTooltip} />
        <RechartsLegend />
        <Bar
          yAxisId="left"
          dataKey="income"
          barSize={20}
          fill="#413ea0"
          name={"รายได้เฉลี่ย"}
        />
        <Bar
          yAxisId="left"
          dataKey="predictedIncome"
          barSize={20}
          fill="#8884d8"
          name={"รายได้ที่คาดการณ์"}
          stroke="#413ea0"
          strokeDasharray="5 5"
        />
        <Bar
          yAxisId="left"
          dataKey="expenses"
          barSize={20}
          fill="#E80700"
          name={"รายจ่ายเฉลี่ย"}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="inflation"
          stroke="#F9B700"
          name={"อัตราเงินเฟ้อ"}
        />
      </ComposedChart>
    </>
  );
};

export default IncomeInflationChart;
