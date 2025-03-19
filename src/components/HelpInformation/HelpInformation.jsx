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
  
      const currentYear = (new Date().getFullYear() + 543).toString(); // ปีปัจจุบัน (พ.ศ.)
      const years = Object.keys(data.capitalByYear).length ? Object.keys(data.capitalByYear) : [currentYear]; // ถ้าไม่มีปีเลยให้ใช้ปีปัจจุบัน
      
      // จัดรูปแบบข้อมูลสำหรับกราฟ
      const formattedCapitalData = years.map((year) => ({
        year,
        humanCapital: data.capitalByYear[year]?.["ทุนมนุษย์"]?.count || 0,
        physicalCapital: data.capitalByYear[year]?.["ทุนกายภาพ"]?.count || 0,
        businessCapital: data.capitalByYear[year]?.["ทุนทางเศรษฐกิจ"]?.count || 0,
        nationalCapital: data.capitalByYear[year]?.["ทุนธรรมชาติ"]?.count || 0,
        socialCapital: data.capitalByYear[year]?.["ทุนทางสังคม"]?.count || 0,
      }));
  
      const formattedMoneyData = years.map((year) => ({
        year,
        amountHumanCapital: data.capitalByYear[year]?.["ทุนมนุษย์"]?.amount || 0,
        amountPhysicalCapital: data.capitalByYear[year]?.["ทุนกายภาพ"]?.amount || 0,
        amountBusinessCapital: data.capitalByYear[year]?.["ทุนทางเศรษฐกิจ"]?.amount || 0,
        amountNationalCapital: data.capitalByYear[year]?.["ทุนธรรมชาติ"]?.amount || 0,
        amountSocialCapital: data.capitalByYear[year]?.["ทุนทางสังคม"]?.amount || 0,
      }));
  
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
      {/* ส่วนของจำนวนการช่วยเหลือ */}
      <div className="w-2/3 text-left text-[18px] font-bold flex flex-col gap-y-2 ml-4 md:text-[20px] lg:text-[28px] lg:ml-24 lg:-mt-[250px] xl:text-[20px] xl:ml-32 xl:mt-0">
        <p className="flex items-center gap-x-2 whitespace-nowrap ml-4  md:ml-48 xl:ml-0">
          จำนวนการช่วยเหลือทั้งหมด:
          <span className="text-red-500 inline-flex">{capitalCount.toLocaleString()} คน</span>
        </p>
        <p className="flex items-center gap-x-2 whitespace-nowrap ml-4  md:ml-48  xl:ml-0">
          จำนวนเงินช่วยเหลือทั้งหมด:
          <span className="text-red-500 inline-flex">{moneyCount.toLocaleString()} บาท</span>
        </p>
      </div>


      <div className="w-4/5  relative xl:ml-[800px] xl:mt-[-220px]"> {/* เพิ่ม position: relative */}
        <div className="text-center">
          <h2 className="font-bold text-shadow-custom text-[18px] text-gray-900 mb-4 mt-4 ml-12 md:text-[24px] md:ml-32  lg:ml-40 lg:text-[28px] lg:-mt-[50px] xl:text-[28px] xl:mt-0 xl:ml-0">
            ข้อมูลการช่วยเหลือ จังหวัดพิษณุโลก
          </h2>
        </div>

        {/* ปุ่มสลับข้อมูล */}
        <div className="flex justify-center items-center mb-4 ml-12 md:ml-32 xl:ml-0">
          <div
            className={`px-3 py-1 md:px-5 md:py-2 md:text-lg  rounded-l-full font-medium text-xs cursor-pointer xl:px-3 xl:py-1 xl:text-xs ${showAssistance
              ? "bg-yellow-400 text-white z-10"  // เพิ่ม z-index
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => handleToggle(true)}
          >
            จำนวนการช่วยเหลือ
          </div>
          <div
            className={`px-3 py-1 md:px-5 md:py-2 md:text-lg  rounded-r-full font-medium text-xs cursor-pointer xl:px-3 xl:py-1 xl:text-xs ${!showAssistance
              ? "bg-green-400 text-white z-10"  // เพิ่ม z-index
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => handleToggle(false)}
          >
            จำนวนเงินช่วยเหลือ
          </div>
        </div>




        {/* ส่วนของกราฟ */}
        <div className="w-full flex justify-center lg:justify-start ml-4 mt-8 md:ml-18 lg:ml-24 xl:ml-0 xl:mt-0">
          <ResponsiveContainer minHeight={300} maxHeight={300}>
            <LineChart
              data={showAssistance ? capitalData : moneyData}
              margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="year"
                label={{ value: "ปี", position: "insideBottom", dy: 10 }}
              />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                label={{
                  value: showAssistance ? "จำนวน (คน)" : "จำนวนเงิน (บาท)",
                  angle: -90,
                  position: "insideLeft",
                  dy: 50,
                  dx: -20,
                  offset: 10,
                }}
              />
              <Tooltip formatter={(value) => Number(value).toLocaleString()} />
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



      </div>


    </>
  );
};

export default HelpInformation;
