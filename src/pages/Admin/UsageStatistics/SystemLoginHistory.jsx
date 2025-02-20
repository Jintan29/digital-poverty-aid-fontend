import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const SystemLoginHistory = ({ user }) => {
  // ข้อมูลตัวอย่าง (สามารถเปลี่ยนเป็น API call ได้)
  const data = [
    { id: 1, role:"Admin", agency:"อบต.", name: "กาย", surname: "เจเจ", province: "พิษณุโลก", action: "login", datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:09 น.", ip: "223.205.92.101" },
    { id: 2, role:"Admin", agency:"อบต.", name: "กาย", surname: "เจเจ", province: "พิษณุโลก", action: "login", datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.", ip: "223.205.92.101" },
    { id: 3, role:"Admin", agency:"อบต.", name: "กาย", surname: "เจเจ", province: "พิษณุโลก", action: "login", datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.", ip: "223.205.92.101" },
    { id: 4, role:"Admin", agency:"อบต.", name: "กาย", surname: "เจเจ", province: "พิษณุโลก", action: "login", datetime: "วัน พฤหัสบดี ที่ 05 ธันวาคม 2567 เวลา 18:11 น.", ip: "223.205.92.101" },
  ];
// กรองข้อมูลตามชื่อของผู้ใช้
const filteredData = data.filter((item) => item.name === user.name);

return (
  <div className="justify-center mb-2 mt-8">
    <Card className="p-4 bg-white shadow-lg rounded-lg">
      <Typography variant="h5" className="font-bold mb-4">
        ประวัติการเข้าใช้งานของ {user.name}
      </Typography>
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
              <th className="border border-gray-300 px-4 py-2 ">IP Address</th>
            </tr>
          </thead>
          <tbody>
          {/* {filteredData.map((item, index) => ( */}
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.role}</td>
                <td className="border border-gray-300 px-4 py-2">{item.agency}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.surname}</td>
                <td className="border border-gray-300 px-4 py-2">{item.province}</td>
                <td className="border border-gray-300 px-4 py-2">{item.action}</td>
                <td className="border border-gray-300 px-4 py-2">{item.datetime}</td>
                <td className="border border-gray-300 px-4 py-2">{item.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default SystemLoginHistory;
