import React from 'react';
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ResponsiveIncomeChart = ({ incomeData, predictionData }) => {
    // const formatDate = (date) => new Date(date).toLocaleDateString("th-TH");

    const DateLongTH = (date) => {
      dayjs.locale("th");
      return dayjs(date).format("DD MMMM BBBB");
    };
  
    // Process data for Recharts
    const processData = () => {
      const nonAGIData = incomeData?.Form?.Financialcapital?.NonAGIincomes || [];
      const agiData = incomeData?.Form?.Financialcapital?.AGIFinancials || [];
      
      // Combine all dates to create data points
      const allData = [];
      
      // Add NonAGI income data
      nonAGIData.forEach(income => {
        allData.push({
          date: DateLongTH(income.createdAt),
          nonAGIIncome: income.amount_per_year,
          cost: income.cost_per_year,
          agiIncome: null,
          predicted: null,
          incomeType: income.income_type
        });
      });
      
      // Add AGI income data
      agiData.forEach(agi => {
        allData.push({
          date: DateLongTH(agi.createdAt),
          nonAGIIncome: null,
          cost: null,
          agiIncome: agi.amount_per_year,
          predicted: null,
          incomeType: 'รายได้จากการเกษตร'
        });
      });
      
      // Add prediction data point
      if (predictionData) {
        allData.push({
          date: 'คาดการณ์รายได้ปีถัดไป',
          nonAGIIncome: null,
          cost: null,
          agiIncome: null,
          predicted: predictionData,
        });
      }
      
      return allData;
    };
  
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          const data = payload[0].payload; // ข้อมูลทั้งหมดของจุดนั้น
    
          return (
            <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
              <p className="font-semibold text-lg border-b pb-2 mb-2">{label}</p>
              
 
              {/* แสดงจำนวนเงิน */}
              {payload.map((entry, index) => {
                if (entry.value) {
                  return (
                    <p 
                      key={index} 
                      className="mb-2"
                      style={{ 
                        color: entry.color,
                        fontWeight: '500'
                      }}
                    >
                      {entry.name}: {entry.value.toLocaleString()} บาท
                    </p>
                  );
                }
                return null;
              })}

              {/* แสดงประเภทรายได้ */}
              {data.incomeType && (
                <p className="mt-2">
                   {data.incomeType}
                </p>
              )}
            </div>
          );
        }
        return null;
      };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        รายรับในครัวเรือน
      </h2>
      <div className="w-full" style={{ height: '500px' }}>
        {incomeData ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={processData()}
              margin={{
                top: 20,
                right: 40,
                left: 40,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                label={{ 
                  position: 'insideBottom',
                  offset: -10 
                }}
              />
              <YAxis
                label={{ 
                  value: 'จำนวนเงิน (บาท)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 0
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="nonAGIIncome"
                name="รายได้นอกภาคเกษตร"
                fill="rgba(75, 192, 192, 0.7)"
                stroke="rgba(75, 192, 192, 1)"
                barSize={45}
              />
              <Bar
                dataKey="cost"
                name="ต้นทุน"
                fill="rgba(255, 159, 64, 0.7)"
                stroke="rgba(255, 159, 64, 1)"
                barSize={45}
              />
              <Bar
                dataKey="agiIncome"
                name="รายได้จากการเกษตร"
                fill="rgba(0, 0, 139, 0.7)"
                stroke="rgba(0, 0, 139, 1)"
                barSize={45}
              />
              <Bar
                dataKey="predicted"
                name="คาดการณ์รายได้"
                fill="rgba(0, 0, 139, 0.3)"
                stroke="rgba(0, 0, 139, 1)"
                strokeDasharray="5 5"
                barSize={45}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveIncomeChart;
