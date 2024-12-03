import React, { useState } from "react";
import HouseCode from "../components/Household/HouseCode";
import ByAgeRange from "../components/Household/ByAgeRange";
import RealName from "../components/Household/RealName";
import { Icon } from "@iconify/react";

const Household = () => {
  // สร้าง state สำหรับเก็บหน้าที่ต้องการแสดง
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <div>
      {/* ปุ่มสำหรับเลือกcomponents */}
      <div className="flex  space-x-2 mt-5 mb-5">
        {/* ปุ่มสำหรับแสดง ByAgeRange */}
        <button
          type="button"
          className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 ml-5"
          onClick={() => setActiveComponent("ByAgeRange")}
        >
          {/* ไอคอน */}
          <Icon
            icon="guidance:changin-room-family"
            width="1.5em"
            height="1.5em"
            className="mr-2"
          />
          ค้นหาสมาชิก-ตามช่วงอายุ
        </button>

        {/* ปุ่มสำหรับแสดง RealName */}
        <button
          type="button"
          className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 ml-5 "
          onClick={() => setActiveComponent("RealName")}
        >
          {/* ไอคอน */}
          <Icon
            icon="fa-regular:address-card"
            width="1.5em"
            height="1.5em"
            className="mr-2"
          />
          ค้นหาสมาชิก-จากชื่อจริง
        </button>
        {/* ปุ่มสำหรับแสดง HouseCode */}
        <button
          type="button"
          className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 ml-5"
          onClick={() => setActiveComponent("HouseCode")}
        >
          {/* ไอคอน */}
          <Icon
            icon="fluent-emoji-high-contrast:house"
            width="1.5em"
            height="1.5em"
            className="mr-2"
          />
          {/* ข้อความ */}
          ค้นหาสมาชิก-จากเลขที่บ้าน
        </button>
      </div>

      {/* แสดงผลเนื้อหาตามค่าของ activeComponent */}
      <div>
        {activeComponent === "HouseCode" && <HouseCode />}{" "}
        {/*แสดงคอมโพเนนต์ HouseCode เมื่อ activeComponent เป็น "HouseCode" */}
        {activeComponent === "ByAgeRange" && <ByAgeRange />}{" "}
        {/* แสดงคอมโพเนนต์ ByAgeRange เมื่อ activeComponent เป็น "ByAgeRange" */}
        {activeComponent === "RealName" && <RealName />}{" "}
        {/* แสดงคอมโพเนนต์ RealName เมื่อ activeComponent เป็น "RealName" */}
      </div>
    </div>
  );
};

export default Household;
