import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Map2 from "./Map2";
import Map1 from "./Map1";
import HelpInformation from "../HelpInformation/HelpInformation";

function Minimap() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchMemberHouseholdCount = async () => {
      try {
        const response = await axios.get(
          `${config.api_path}/district/getlatest`
        );
        setCount(response.data.data); // ใช้ response.data.data เพื่อเข้าถึงค่าที่ส่งกลับจาก backend
      } catch (error) {
        console.error("Error fetching household count:", error);
      }
    };
    fetchMemberHouseholdCount();
  }, []); // ใช้ [] เพื่อให้โหลดแค่ครั้งเดียว

  // อ่านสถานะจาก localStorage ถ้ามี
  const storedMap = localStorage.getItem("showMap");

  //เงื่อนไข (condition): storedMap คือค่าที่ดึงมาจาก localStorage. ถ้า storedMap มีค่า (เช่นไม่เป็น null หรือ undefined), เงื่อนไขจะเป็น true.
  const initialMapState = storedMap ? JSON.parse(storedMap) : true;

  const [showMap, setShowMap] = useState(initialMapState);

  // ฟังก์ชันสำหรับการสลับแผนที่
  const handleClick = (isMap) => {
    setShowMap(isMap); // true สำหรับแผนที่แรก, false สำหรับแผนที่ที่สอง
    // เก็บสถานะการเลือกแผนที่ใน localStorage
    localStorage.setItem("showMap", JSON.stringify(isMap));
  };

  return (
    <div className="flex flex-wrap mt-4 items-stretch">
      {/* ซ้าย */}
      <div className="w-full sm:w-1/2 p-6 min-h-screen sm:h-screen flex flex-col justify-start pt-20 ">
        {/* ส่วนแรก */}
        <div className="p-4">
          <h3 className="text-center text-[32px] font-bold text-shadow-custom">
            จำนวนครัวเรือนฯ
          </h3>
          <p className="text-center text-[20px]">
            จำนวนครัวเรือนฯ ที่ได้จากการสำรวจ
          </p>
          <p className="text-center text-[28px] font-bold text-red-500">
            {count ? count.totalFamily.toLocaleString() : "กำลังโหลด..."}
            <span className="text-black font-normal text-shadow-custom">
              ครัวเรือน
            </span>
          </p>
        </div>
        {/* ส่วนสอง */}
        <div className="p-4 mt-6">
          <h3 className="text-center text-[32px] font-bold text-shadow-custom">
            จำนวนสมาชิกฯ
          </h3>
          <p className="text-center text-[20px]">
            จำนวนสมาชิกที่ได้จากการสำรวจ
          </p>
          <p className="text-center text-[28px] font-bold text-red-500">
            {count ? count.totalPoor.toLocaleString() : "กำลังโหลด..."}{" "}
            <span className="text-black font-normal text-shadow-custom">
              คน
            </span>
          </p>
        </div>

        {/* จำนวนการช่วยเหลือตามประเภททุน 5 ด้าน */}
        <div className="p-4 mt-80 mb-4">
          <div className="flex justify-center items-center mb-2">
            <h3 className="text-[32px] font-bold text-shadow-custom">
              จำนวนการช่วยเหลือ ตามประเภททุน 5 ด้าน
            </h3>
          </div>

          <div className="text-blue-700 px-32">
            <p className="text-[20px]">
              ทุนมนุษย์ ทุนกายภาพ ทุนเศรษฐกิจ ทุนธรรมชาติ ทุนสังคม
              ของจังหวัดพิษณุโลก
            </p>
          </div>

          <div className="flex flex-col mt-4 px-32">
            <p className="font-bold text-[20px]">จำนวนการช่วยเหลือ</p>
            <p className="text-[18px] text-red-500">500 คน</p>{" "}
            {/* ตัวเลขเป็นสีแดง */}
            <p className="font-bold text-[20px]">จำนวนเงินช่วยเหลือ</p>
            <p className="text-[18px] text-red-500">10,000 บาท</p>{" "}
            {/* ตัวเลขเป็นสีแดง */}
          </div>
        </div>
      </div>

      {/* ขวา */}
      <div className="w-full sm:w-1/2 h-auto sm:h-screen flex flex-col">
        {/* บน */}
        <div className="h-1/6 p-4">
          <div className="flex justify-start items-center">
            <div
              className="bg-blue-500 text-white px-2 py-1 rounded-l-full font-medium text-sm cursor-pointer"
              onClick={() => handleClick(true)} // กดแสดง Map
            >
              จำนวนครัวเรือนยากจน
            </div>
            <div
              className="bg-yellow-400 text-white px-2 py-1 rounded-r-full font-medium text-sm cursor-pointer"
              onClick={() => handleClick(false)} // กดแสดง Map2
            >
              จำนวนสมาชิกครัวเรือนยากจน
            </div>
          </div>
          {/* แสดงข้อความในสีที่แตกต่างกันตามแผนที่ */}
          {showMap ? (
            <p className="text-[22px] font-bold text-blue-500 mt-2">
              {count ? count.totalFamily.toLocaleString() : "กำลังโหลด..."}
              <span className="text-black font-normal text-shadow-custom">
                ครัวเรือน
              </span>
            </p>
          ) : (
            <p className="text-[22px] font-bold text-yellow-500 mt-2">
              {count ? count.totalPoor.toLocaleString() : "กำลังโหลด..."}
              <span className="text-black font-normal text-shadow-custom">
                คน
              </span>
            </p>
          )}
        </div>

        {/* ล่าง */}
        <div className="h-5/6 p-4">
          {/* แสดงแผนที่ตามการเลือก */}
          <div>{showMap ? <Map1 /> : <Map2 />}</div>
        </div>

        <div className="mt-32 mb-8 container mx-auto">
          {/* ส่วนของ HelpInformation ที่มีกราฟ */}
          <HelpInformation />
        </div>
      </div>
    </div>
  );
}

export default Minimap;
