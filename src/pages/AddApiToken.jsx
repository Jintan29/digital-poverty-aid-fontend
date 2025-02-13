import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

function AddApiToken() {
  const [apiUrl, setApiUrl] = useState("");
  const validateInput = () => {
    if (!apiUrl.trim()) {
      Swal.fire("เกิดข้อผิดพลาด", "กรุณากรอก API URL", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    try {
      const res = await Swal.fire({
        title: "เพิ่มข้อมูล",
        text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });

      if (res.isConfirmed) {
        // Send the API request with the entered apiUrl
        const response = await axios.post(
          `${config.api_path}/district/fetch-data`,
          { apiUrl }, // <-- Include apiUrl in the request payload
          config.headers()
        );

        if (response.data.message === "Data saved successfully from API") {
          await Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error response:", error.response?.data);
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <>
      <div className="mx-3 my-5">
        <h2 className="text-2xl font-semibold">ดึงข้อมูลครัวเรือนยากจนจากระบบหลัก (SRA DSS)</h2>
        <ul class="text-xl space-y-1 text-gray-900 list-disc list-inside dark:text-gray-400 mt-4">
          <li>เลือก Service ข้อมูลครัวเรือนยากจน</li>
          <li>ตั้งค่า mode เป็น 2</li>
          <li>ตัวอย่าง URL : <span className="text-sm">http://sradss.ppaos.com/sradss/api/01poor.php?API-TOKEN=MzBiZDdhY2EyODY1YWNiZmU0Nzc0OW&&province_id=65&&yearget=all&mode=2</span></li>
          
        </ul>
      </div>

      <div className="flex items-center justify-center py-20 bg-white rounded-lg">
        
        <div className="relative w-[700px] h-[400px] bg-gray-100 rounded-2xl shadow-lg p-6">
            
          {/* Title */}
          <h1
            className="text-center text-2xl font-semibold text-black mb-4"
          >
            กรอก URL ตัวเต็มของ service 
          </h1>
          <hr className="w-[400px] border-t-[1px] border-gray-200 mx-auto my-4" />

          {/* Input Field */}
          <div className="flex justify-center mb-8 mt-20">
            <input
              type="text"
              placeholder="Url link"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-[500px] h-[75px] text-lg text-gray-700 px-4 bg-[#B4C1D2] border border-[#B4C1D2] rounded-2xl placeholder:text-[#FFFFFF] placeholder:text-2xl shadow-md"
            />
          </div>

          {/* Go Button */}
          <div className="absolute bottom-6 right-6">
            <button
              className="bg-blue-500 text-white text-base font-semi-bold w-[100px] h-[50px] rounded-xl shadow-md hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddApiToken;
