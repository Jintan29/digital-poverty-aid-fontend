import { Card, Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import SystemLoginHistory from "./SystemLoginHistory";

const IndividualUserLogin = () => {
  const [search, setSearch] = useState(""); // เก็บค่าที่พิมพ์ในช่องค้นหา
  const [showLoginHistory, setShowLoginHistory] = useState("main"); // จัดการหน้าปัจจุบัน
  const [selectedUser, setSelectedUser] = useState(null); // เก็บข้อมูลของผู้ใช้ที่เลือก

  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "#",
    "บทบาท",
    "หน่วยงาน",
    "ชื่อ-นามสกุล",
    "Username",
    "Email",
    "ประวัติการเข้าใช้งานในระบบ",
  ];
  // ข้อมูลตัวอย่างในตาราง
  const TABLE_ROWS = [
    {
      id: "1",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Access_History: "",
    },
    {
      id: "2",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "กาย ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Access_History: "",
    },
    {
      id: "3",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "เจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Access_History: "",
    },
  ];

  
  // ฟังก์ชันที่เรียกเมื่อกดปุ่มไอคอนหน้า Access_History
  const handleAccessHistoryClick = (user) => {
    setSelectedUser(user); // เก็บข้อมูลของผู้ใช้ที่เลือก
    setShowLoginHistory("loginHistory"); // แสดงหน้า SystemLoginHistory
  };

  // ถ้าหน้าปัจจุบันเป็น "loginHistory" จะแสดงหน้า SystemLoginHistory
  if (showLoginHistory === "loginHistory" && selectedUser) {
    return (
      <div>
        <SystemLoginHistory user={selectedUser} />
      </div>
    );
  }


  return (
    <div>
      <div className="text-center mb-1 p-4">
        <h1 className="font-bold">
          <span className="text-2xl font-bold mt-2 mb-1">
            การเข้าใช้งานในระบบของผู้ใช้แต่ละราย
          </span>
        </h1>
      </div>

      <div className="h-full w-full bg-white rounded-lg shadow">
        {/* แถบค้นหาด้านขวา */}
        <div className="flex justify-end mt-6">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
              className="border p-2 rounded-md mt-4 mr-6 pl-10"
            />
            <Icon
              icon="ic:baseline-search"
              className="absolute left-2 top-1/2 transform -translate-y-2/2" 
            />
          </div>
        </div>

        {/* แสดงตาราง */}
        <Card className="h-full w-full  mt-6 flex justify-center items-center">
          <table className="w-full min-w-max table-auto  text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="base"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* ข้อมูลในตาราง */}
              {/* {TABLE_ROWS.map(
                ({
                  id,
                  Role,
                  Agency,
                  name,
                  Username,
                  Email,
                  Access_History,
                }) => ( */}
                {TABLE_ROWS.map((user) => (
                  <tr key={user.id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.Role}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.Agency}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.Username}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.Email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                          onClick={handleAccessHistoryClick} // เรียกฟังก์ชันเมื่อกดปุ่ม
                        >
                          <Icon icon="mdi:table-large" />
                        </button>
                        {user.Access_History}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default IndividualUserLogin;
