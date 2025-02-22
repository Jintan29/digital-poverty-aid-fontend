import { Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const SystemLoginHistory = ({ user }) => {
  // ข้อมูลตัวอย่าง (สามารถเปลี่ยนเป็น API call ได้)
  const data = [
    {
      id: 1,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:09 น.",
      ip: "223.205.92.101",
    },
    {
      id: 2,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.",
      ip: "223.205.92.101",
    },
    {
      id: 3,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.",
      ip: "223.205.92.101",
    },
    {
      id: 4,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.",
      ip: "223.205.92.101",
    },
    {
      id: 5,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.",
      ip: "223.205.92.101",
    },
    {
      id: 6,
      role: "Admin",
      agency: "อบต.",
      name: "กาย",
      surname: "เจเจ",
      province: "พิษณุโลก",
      action: "login",
      datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.",
      ip: "223.205.92.101",
    },
  ];
  // กรองข้อมูลตามชื่อของผู้ใช้
  // const filteredData = data.filter((item) => item.name === user.name);

  // State สำหรับจัดการ pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15); // ✅ ใช้ state สำหรับเลือกจำนวนแถว

  // คำนวณจำนวนหน้าทั้งหมด โดยใช้ Math.ceil() เพื่อปัดขึ้น
  // เช่น ถ้ามี 32 รายการ ต้องใช้ 3 หน้า (32/15 = 2.13 ปัดขึ้นเป็น 3)
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // คำนวณ index ของรายการแรกในหน้าปัจจุบัน
  // เช่น ถ้าอยู่ที่หน้า 2 -> (2-1) * 15 = index 15 (เริ่มต้นที่รายการที่ 16)
  const startIndex = (currentPage - 1) * rowsPerPage;

  // เช่น ถ้า startIndex = 15 -> endIndex = 15 + 15 = 30 (จบที่รายการที่ 30)
  const endIndex = startIndex + rowsPerPage;

  // ใช้ slice() เพื่อตัดเฉพาะข้อมูลที่ต้องการแสดงในหน้านั้น ๆ
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="justify-center mb-2 mt-8">
      <Card className="p-4 bg-white shadow-lg rounded-lg">
        <Typography variant="h5" className="font-bold mb-2">
          ประวัติการเข้าใช้งานของ {user.name}
        </Typography>

        <div className="flex justify-end items-center mb-2">
          <div className="flex items-center">
          <span className="mr-4 text-gray-700">entries per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value)); // ✅ อัปเดตจำนวนรายการต่อหน้า
                setCurrentPage(1); // รีเซ็ตไปหน้าแรกเมื่อเปลี่ยนค่า
              }}
              className="border rounded-md px-2 py-1 mr-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={data.length}>All</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 ">#</th>
                <th className="border border-gray-300 px-4 py-2 ">บทบาท</th>
                <th className="border border-gray-300 px-4 py-2 ">หน่วยงาน</th>
                <th className="border border-gray-300 px-4 py-2 ">ชื่อ</th>
                <th className="border border-gray-300 px-4 py-2 ">นามสกุล</th>
                <th className="border border-gray-300 px-4 py-2 ">จังหวัด</th>
                <th className="border border-gray-300 px-4 py-2 ">การกระทำ</th>
                <th className="border border-gray-300 px-4 py-2 ">วันเวลา</th>
                <th className="border border-gray-300 px-4 py-2 ">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {filteredData.map((item, index) => ( */}
              {currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.agency}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.surname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.province}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.action}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.datetime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <CardFooter className="flex items-center justify-end  border-blue-gray-50 p-4">
          {/* ปุ่มหมายเลขหน้าและปุ่ม "ถัดไป" */}
          <div className="flex items-center gap-2">
            {/* สร้างปุ่มหมายเลขหน้าจากการวนลูป */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "filled" : "outlined"} // เปลี่ยนสไตล์ปุ่มตามหน้า
                size="sm"
                onClick={() => setCurrentPage(page)} // เมื่อคลิกเปลี่ยนหน้า
                className={page === currentPage ? "bg-gray-300" : ""} // ถ้าเป็นหน้าปัจจุบันให้เปลี่ยนสี
              >
                {page} {/* แสดงหมายเลขหน้า */}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ml-2"
            >
              ถัดไป
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemLoginHistory;
