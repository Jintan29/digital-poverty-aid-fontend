import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HelpInformation = () => {
  // สร้าง state เพื่อสลับข้อมูล
  const [showAssistance, setShowAssistance] = useState(true);

  // ฟังก์ชันสลับระหว่าง "จำนวนการช่วยเหลือ" และ "จำนวนเงินช่วยเหลือ"
  const handleToggle = (isAssistance) => {
    setShowAssistance(isAssistance);
    localStorage.setItem("showAssistance", JSON.stringify(isAssistance)); // บันทึกสถานะใน localStorage
  };
//   ข้อมูลทุน
  const data = [
    {
      year: 2562,
      humanCapital: 500,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
    {
      year: 2563,
      humanCapital: 0,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
    {
      year: 2564,
      humanCapital: 0,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
    {
      year: 2565,
      humanCapital: 3040,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
    {
      year: 2566,
      humanCapital: 3680,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
    {
      year: 2567,
      humanCapital: 0,
      physicalCapital: 0,
      businessCapital: 0,
      nationalCapital: 0,
      socialCapital: 0,
    },
  ];
  // ข้อมูล(จำนวนเงินช่วยเหลือ)
  const moneyData = [
    { year: 2562, amountHumanCapital: 10000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
    { year: 2563, amountHumanCapital: 15000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
    { year: 2564, amountHumanCapital: 13000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
    { year: 2565, amountHumanCapital: 25000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
    { year: 2566, amountHumanCapital: 30000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
    { year: 2567, amountHumanCapital: 35000, amountPhysicalCapital: 0, amountBusinessCapital: 0, amountNationalCapital: 0, amountSocialCapital: 0 },
  ];

  return (
    <>
      <div className="text-center">
        <h2 className="font-bold text-shadow-custom text-[28px] text-gray-900 mb-4">
          ข้อมูลการช่วยเหลือ จังหวัดพิษณุโลก
        </h2>
      </div>

       {/* ปุ่มสลับข้อมูล */}
       <div className="flex justify-center items-center mb-4">
        <div
          className={`px-3 py-1 rounded-l-full font-medium text-xs cursor-pointer ${
            showAssistance ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle(true)}
        >
          จำนวนการช่วยเหลือ
        </div>
        <div
          className={`px-3 py-1 rounded-r-full font-medium text-xs cursor-pointer ${
            !showAssistance ? "bg-green-400 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle(false)}
        >
          จำนวนเงินช่วยเหลือ
        </div>
      </div>

      {/* ใช้ flex จัดให้อยู่ตรงกลาง */}
      <div className="flex justify-center">
        <ResponsiveContainer width="80%" minHeight={300} maxHeight={300}>
          <LineChart
            data={showAssistance ? data : moneyData}  // เปลี่ยนข้อมูลตามสถานะ showAssistance
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="year" label={{ value: "ปี", position: "insideBottom", dy: 10 }} />
            <YAxis
              label={{
                value: showAssistance ? "จำนวน (คน)" : "จำนวนเงิน (บาท)", // เปลี่ยนชื่อแกน Y ตามข้อมูล
                angle: -90,
                position: "insideLeft",
                dy: 50,
                dx: -20,
                offset: 10,
              }}
            />
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 10, paddingBottom: 10 }} />

            {/* กราฟเมื่อแสดง "จำนวนการช่วยเหลือ" */}
            {showAssistance ? (
              <>
                <Line type="monotone" dataKey="humanCapital" stroke="#0088FE" name="ทุนมนุษย์" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="physicalCapital" stroke="#00C49F" name="ทุนกายภาพ" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="businessCapital" stroke="#FFBB28" name="ทุนเศรษฐกิจ" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="nationalCapital" stroke="#FF8042" name="ทุนธรรมชาติ" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="socialCapital" stroke="#8884d8" name="ทุนสังคม" strokeWidth={2} dot={{ r: 2 }} />
              </>
           ) : (
            <>
              <Line type="monotone" dataKey="amountHumanCapital" stroke="#0088FE" name="ทุนมนุษย์" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="amountPhysicalCapital" stroke="#00C49F" name="ทุนกายภาพ" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="amountBusinessCapital" stroke="#FFBB28" name="ทุนเศรษฐกิจ" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="amountNationalCapital" stroke="#FF8042" name="ทุนธรรมชาติ" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="amountSocialCapital" stroke="#8884d8" name="ทุนสังคม" strokeWidth={2} dot={{ r: 2 }} />
            </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default HelpInformation;
