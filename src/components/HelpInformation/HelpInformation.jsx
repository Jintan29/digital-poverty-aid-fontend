import { data } from "autoprefixer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../../config";
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
import { set } from "date-fns";

const HelpInformation = () => {
  // สร้าง state เพื่อสลับข้อมูล
  const [capitalData, setCapitalData] = useState([]);
  const [moneyData, setMoneyData] = useState([]);
  const [showAssistance, setShowAssistance] = useState(true);
  const [capitalCount, setCapitalCount] = useState(0);
  const [moneyCount, setMoneyCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.api_path}/capital/lists`);
      const data = response.data;

      // 💾 จัดรูปแบบข้อมูลสำหรับกราฟ
      const formattedCapitalData = Object.keys(data.capitalByYear).map(
        (year) => ({
          year: year,
          humanCapital: data.capitalByYear[year]["ทุนมนุษย์"].count,
          physicalCapital: data.capitalByYear[year]["ทุนกายภาพ"].count,
          businessCapital: data.capitalByYear[year]["ทุนทางเศรษฐกิจ"].count,
          nationalCapital: data.capitalByYear[year]["ทุนธรรมชาติ"].count,
          socialCapital: data.capitalByYear[year]["ทุนทางสังคม"].count,
        })
      );

      const formattedMoneyData = Object.keys(data.capitalByYear).map(
        (year) => ({
          year: year,
          amountHumanCapital: data.capitalByYear[year]["ทุนมนุษย์"].amount,
          amountPhysicalCapital: data.capitalByYear[year]["ทุนกายภาพ"].amount,
          amountBusinessCapital:
            data.capitalByYear[year]["ทุนทางเศรษฐกิจ"].amount,
          amountNationalCapital: data.capitalByYear[year]["ทุนธรรมชาติ"].amount,
          amountSocialCapital: data.capitalByYear[year]["ทุนทางสังคม"].amount,
        })
      );

      setCapitalData(formattedCapitalData);
      setMoneyData(formattedMoneyData);
      setCapitalCount(data.capitalAllCount);
      setMoneyCount(data.totalAmount);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // 💡 ใช้ useEffect เพื่อเรียก API เมื่อ Component โหลดครั้งแรก
  useEffect(() => {
    fetchData();
  }, []);

  // ฟังก์ชันสลับระหว่าง "จำนวนการช่วยเหลือ" และ "จำนวนเงินช่วยเหลือ"
  const handleToggle = (isAssistance) => {
    setShowAssistance(isAssistance);
    localStorage.setItem("showAssistance", JSON.stringify(isAssistance)); // บันทึกสถานะใน localStorage
  };

  return (
    <>
 <div className="flex justify-center px-10"> {/* เพิ่ม padding ข้าง */}
  {/* ส่วนของจำนวนการช่วยเหลือ */}
  <div className="w-2/3 text-left text-[20px] font-bold"> {/* ลดขนาดความกว้าง */}
    <p>
      จำนวนการช่วยเหลือทั้งหมด:{" "}
      <span className="text-red-500">{capitalCount.toLocaleString()} คน</span>
    </p>
    <p>
      จำนวนเงินช่วยเหลือทั้งหมด:{" "}
      <span className="text-red-500">{moneyCount.toLocaleString()} บาท</span>
    </p>
  </div>
</div>

<div className="w-4/5 ml-[900px] mt-[-220px] relative"> {/* เพิ่ม position: relative */}
  <div className="text-center">
    <h2 className="font-bold text-shadow-custom text-[28px] text-gray-900 mb-4">
      ข้อมูลการช่วยเหลือ จังหวัดพิษณุโลก
    </h2>
  </div>

  {/* ปุ่มสลับข้อมูล */}
  <div className="flex justify-center items-center mb-4">
    <div
      className={`px-3 py-1 rounded-l-full font-medium text-xs cursor-pointer ${
        showAssistance
          ? "bg-yellow-400 text-white z-10"  // เพิ่ม z-index
          : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => handleToggle(true)}
    >
      จำนวนการช่วยเหลือ
    </div>
    <div
      className={`px-3 py-1 rounded-r-full font-medium text-xs cursor-pointer ${
        !showAssistance
          ? "bg-green-400 text-white z-10"  // เพิ่ม z-index
          : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => handleToggle(false)}
    >
      จำนวนเงินช่วยเหลือ
    </div>
  </div>


    

  {/* ส่วนของกราฟ */}
  
    <ResponsiveContainer minHeight={300} maxHeight={300}>
      <LineChart
        data={showAssistance ? capitalData : moneyData} // เปลี่ยนข้อมูลตามสถานะ showAssistance
        margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis
          dataKey="year"
          label={{ value: "ปี", position: "insideBottom", dy: 10 }}
        />
        <YAxis
          label={{
            value: showAssistance ? "จำนวน (คน)" : "จำนวนเงิน (บาท)",
            angle: -90,
            position: "insideLeft",
            dy: 50,
            dx: -20,
            offset: 10,
          }}
        />
        <Tooltip />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ paddingTop: 10, paddingBottom: 10 }}
        />

        {/* กราฟเมื่อแสดง "จำนวนการช่วยเหลือ" */}
        {showAssistance ? (
          <>
            <Line
              type="monotone"
              dataKey="humanCapital"
              stroke="#0088FE"
              name="ทุนมนุษย์"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="physicalCapital"
              stroke="#00C49F"
              name="ทุนกายภาพ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="businessCapital"
              stroke="#FFBB28"
              name="ทุนเศรษฐกิจ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="nationalCapital"
              stroke="#FF8042"
              name="ทุนธรรมชาติ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="socialCapital"
              stroke="#8884d8"
              name="ทุนสังคม"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </>
        ) : (
          <>
            <Line
              type="monotone"
              dataKey="amountHumanCapital"
              stroke="#0088FE"
              name="ทุนมนุษย์"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="amountPhysicalCapital"
              stroke="#00C49F"
              name="ทุนกายภาพ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="amountBusinessCapital"
              stroke="#FFBB28"
              name="ทุนเศรษฐกิจ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="amountNationalCapital"
              stroke="#FF8042"
              name="ทุนธรรมชาติ"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="amountSocialCapital"
              stroke="#8884d8"
              name="ทุนสังคม"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  </div>



    </>
  );
};

export default HelpInformation;
