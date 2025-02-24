import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import config from "../../../config";

const ExclusiveSummaryReport = () => {

  const handleDownload = async()=>{
    try{
      const response = await axios.get(config.api_path + "/log/summary-report", {
        ...config.headers(),
        responseType: "blob", // บอก axios ว่าเราต้องการรับข้อมูลเป็น binary
      });

      // สร้าง URL สำหรับดาวน์โหลดไฟล์
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "summary-report.pdf"; // ชื่อไฟล์ที่ต้องการดาวน์โหลด
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // ลบ element หลังดาวน์โหลด
      window.URL.revokeObjectURL(url); // ปล่อยหน่วยความจำ

    }catch(err){
      Swal.fire({
        title:'error',
        text: err.response?.data?.message || err.message,
        icon:'error'
      })
    }
  }

  return (
    <div>
      ทดสอบ Download PDF
      <button
        onClick={() => handleDownload()}
        className={`block mt-5 text-slate-500 hover:bg-slate-300 bg-slate-200 p-2 rounded-full`}
      >
        PDF
        {/* <Icon icon="heroicons-solid:search" /> */}
      </button>
    </div>
  );
};

export default ExclusiveSummaryReport;
