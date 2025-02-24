import React, { useEffect, useState } from "react";
import { Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import { FaFilePdf } from "react-icons/fa";
import config from "../../../config"

const SystemLoginHistory = ({ user }) => {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // เริ่มต้นจำนวนรายการต่อหน้าเป็น 15 หรือ "all" หากต้องการดึงข้อมูลทั้งหมด
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // กำหนด query parameter สำหรับ page และ limit
    const limitParam = rowsPerPage === "all" ? "all" : rowsPerPage;
    const url = `${config.api_path}/log/list?page=${currentPage}&limit=${limitParam}`;

    fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return res.text().then(text => { throw new Error(text) });
        }
      })
      .then((data) => {
        // สมมุติว่า backend ส่งกลับในรูปแบบ { total, logs }
        setLogs(data.result.logs);
        setTotal(data.result.total);
      })
      .catch((err) => console.error(err));
  }, [token, currentPage, rowsPerPage]);

  // คำนวณจำนวนหน้าทั้งหมดจาก total ที่ได้รับมาจาก backend
  const totalPages = rowsPerPage === "all" ? 1 : Math.ceil(total / rowsPerPage);

  // ฟังก์ชันจัดรูปแบบวันที่
  function formatThaiDateTime(dateString) {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("th-TH", { weekday: "long" });
    let datePart = date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    datePart = datePart.replace("พ.ศ. ", "");
    const timePart = date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `วัน ${dayName} ที่ ${datePart} เวลา ${timePart} น.`;
  }

  return (
    <div className="justify-center mb-2 mt-8">
      <Card className="p-4 bg-white shadow-lg rounded-lg">
        <Typography variant="h5" className="font-bold mb-2">
          ประวัติการเข้าใช้งานของ {user.name}
        </Typography>

        <div className="flex justify-between items-center mb-4">
          {/* ปุ่มดาวน์โหลด อยู่ทางซ้าย */}
          <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded shadow transition duration-300">
            <FaFilePdf className="text-xl" />
            <span>ดาวน์โหลด PDF</span>
          </button>


          {/* ส่วน entries per page อยู่ทางขวา */}
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">entries per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                const value = e.target.value;
                // หากเลือก All ให้เซ็ตเป็น "all" มิฉะนั้นแปลงเป็นตัวเลข
                if (value === `${total}`) {
                  setRowsPerPage("all");
                } else {
                  setRowsPerPage(Number(value));
                }
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1 mr-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={total}>All</option>
            </select>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">บทบาท</th>
                <th className="border border-gray-300 px-4 py-2">หน่วยงาน</th>
                <th className="border border-gray-300 px-4 py-2 w-[100px]">ชื่อ</th>
                <th className="border border-gray-300 px-4 py-2">นามสกุล</th>
                <th className="border border-gray-300 px-4 py-2">การกระทำ</th>
                <th className="border border-gray-300 px-4 py-2">วันเวลา</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1 + (currentPage - 1) * (rowsPerPage === "all" ? total : rowsPerPage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{log.User?.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.User?.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.User?.fname}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.User?.lname}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.action}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatThaiDateTime(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CardFooter className="flex items-center justify-end border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            {rowsPerPage !== "all" && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "filled" : "outlined"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "bg-gray-300" : ""}
              >
                {page}
              </Button>
            ))}
            {rowsPerPage !== "all" && (
              <Button
                variant="outlined"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="ml-2"
              >
                ถัดไป
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemLoginHistory;
