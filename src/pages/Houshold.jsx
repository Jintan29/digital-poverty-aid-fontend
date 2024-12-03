import React, { useState } from "react";
import HouseCode from "../components/Household/HouseCode";
import ByAgeRange from "../components/Household/ByAgeRange";
import RealName from "../components/Household/RealName";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path
              fill="none"
              stroke="currentColor"
              d="M3.5 24v-6.5a2 2 0 0 0-2-2v-8s1.5-1 4-1a9 9 0 0 1 2.251.286M10.501 24v-5.5H7v-.25l.072-.15A25 25 0 0 0 9.5 7.352v-.329a8.6 8.6 0 0 1 3-.523c1.288 0 2.311.266 3 .523v.329a25 25 0 0 0 .116 2.406M20.75 24v-3.426c0-1.146.784-2.074 1.75-2.074v-6.463S21.188 11 19 11s-3.5 1.037-3.5 1.037V18.5c.967 0 1.75.929 1.75 2.074V24M5.35 4.5s-1.6-1-1.6-2.25a1.747 1.747 0 1 1 3.496 0C7.246 3.5 5.65 4.5 5.65 4.5zm7 0s-1.6-1-1.6-2.25a1.747 1.747 0 1 1 3.496 0c0 1.25-1.596 2.25-1.596 2.25zM18.873 9S17.5 8.125 17.5 7.031c0-.845.672-1.531 1.502-1.531s1.498.686 1.498 1.531C20.5 8.125 19.13 9 19.13 9z"
            ></path>
          </svg>
          {/* ข้อความ */}
          ค้นหาสมาชิก-ตามช่วงอายุ
        </button>

        {/* ปุ่มสำหรับแสดง RealName */}
        <button
          type="button"
          className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 ml-5 "
          onClick={() => setActiveComponent("RealName")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 576 512"
            className="mr-2"
          >
            <path
              fill="currentColor"
              d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48m0 400H48V80h480zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2M360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8"
            ></path>
          </svg>
          ค้นหาสมาชิก-จากชื่อจริง
        </button>
        {/* ปุ่มสำหรับแสดง HouseCode */}
        <button
          type="button"
          className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 ml-5"
          onClick={() => setActiveComponent("HouseCode")}
        >
          {/* ไอคอน */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 32 32"
            className="mr-2"
          >
            <g fill="none">
              <g
                fill="currentColor"
                clipPath="url(#fluentEmojiHighContrastHouse0)"
              >
                <path d="M23.14 21.002h-4.28c-.48 0-.86-.38-.86-.86v-4.28c0-.47.38-.86.86-.86h4.28c.47 0 .86.38.86.86v4.28c0 .48-.38.86-.86.86"></path>
                <path d="m18.28.923l.004.005l12.755 12.565l.003.003a3.17 3.17 0 0 1-.003 4.546a3.2 3.2 0 0 1-2.039.916v6.151a3.91 3.91 0 0 1 3 3.803v2.09H0v-2.09a3.904 3.904 0 0 1 3-3.804v-6.11a3.23 3.23 0 0 1-2.04-.917a3.183 3.183 0 0 1-.002-4.555l.003-.002L4 10.532v-7.01C4 2.059 5.208 1 6.543 1h2.924c1.102 0 2.092.72 2.42 1.769L13.752.93c1.26-1.252 3.28-1.228 4.526-.008M10 7.432v-3.91A.53.53 0 0 0 9.467 3H6.543A.53.53 0 0 0 6 3.523v7.846zm-5 8.314v11.256h2c0-.55.45-1 1-1v-9.61c0-.75.61-1.36 1.36-1.36h5.29c.75 0 1.36.61 1.36 1.36v9.612c.527.026.95.465.95.998H27V15.706L16.02 4.893zm10 4.756a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0"></path>
              </g>
              <defs>
                <clipPath id="fluentEmojiHighContrastHouse0">
                  <path fill="#fff" d="M0 0h32v32H0z"></path>
                </clipPath>
              </defs>
            </g>
          </svg>
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
