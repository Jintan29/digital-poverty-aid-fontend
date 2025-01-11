import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', income: 4000, inflation: 2.5 },
  { month: 'Feb', income: 3000, inflation: 2.0 },
  { month: 'Mar', income: 5000, inflation: 3.0 },
  // เพิ่มข้อมูลตามต้องการ
];

function MixedChart() {
  return (
    <ComposedChart width={700} height={400} data={data}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="month" />
      <YAxis yAxisId="left" label={{ value: 'Income', angle: -90, position: 'insideLeft' }} />
      <YAxis yAxisId="right" orientation="right" label={{ value: 'Inflation (%)', angle: -90, position: 'insideRight' }} />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="income" barSize={20} fill="#413ea0" />
      <Line yAxisId="right" type="monotone" dataKey="inflation" stroke="#ff7300" />
    </ComposedChart>
  );
}

export default MixedChart;
