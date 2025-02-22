import { Card, Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import SystemLoginHistory from "./SystemLoginHistory";
import axios from "axios";
import config from "../../../config";
import Swal from "sweetalert2";

const IndividualUserLogin = () => {
  const [users, setUsers] = useState([]); // เก็บข้อมูลผู้ใช้จาก API
  const [search, setSearch] = useState(""); // เก็บค่าที่พิมพ์ในช่องค้นหา
  const [showLoginHistory, setShowLoginHistory] = useState("main"); // จัดการหน้าปัจจุบัน (main หรือ loginHistory)
  const [selectedUser, setSelectedUser] = useState(null); // เก็บข้อมูลของผู้ใช้ที่เลือก

  const [tableHead] = useState({
    id: "#",
    role: "บทบาท",
    agency: "หน่วยงาน", 
    name: "ชื่อ-นามสกุล",
    username: "Username",
    email: "Email",
    accessHistory: "ประวัติการเข้าใช้งานในระบบ",
  });

  useEffect(() => {
    loadData(); // เรียกข้อมูลผู้ใช้จาก API เมื่อเริ่มต้นคอมโพเนนต์
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        config.api_path + "/user/list",
        config.headers()
      );
      setUsers(res.data.user); // เก็บข้อมูลผู้ใช้ใน state
    } catch (err) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: err.message,
      });
    }
  };
  const handleAccessHistoryClick = (user) => {
    setSelectedUser(user); // เก็บข้อมูลผู้ใช้ที่เลือก
    setShowLoginHistory("loginHistory"); // แสดงหน้าประวัติการใช้งาน
  };

  // กรองข้อมูลผู้ใช้จากช่องค้นหา
  const filteredUsers = users.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(search.toLowerCase()))
  );

  if (showLoginHistory === "loginHistory" && selectedUser) {
    return <SystemLoginHistory user={selectedUser} />;
  }

  return (
    <div>
      <div className="text-center mb-1 p-4">
        <h1 className="font-bold text-left">
          <span className="text-2xl font-bold mt-2 mb-1">
            การเข้าใช้งานในระบบของผู้ใช้แต่ละราย {/* หัวข้อ */}
          </span>
        </h1>
      </div>

      <div className="h-full w-full bg-white rounded-lg shadow">
        <div className="flex justify-end mt-2">
          {" "}
          {/* ช่องค้นหา */}
          <div className="relative">
            <input
              type="text"
              value={search} // เก็บค่าสำหรับช่องค้นหา
              onChange={(e) => setSearch(e.target.value)} // อัพเดตค่าเมื่อผู้ใช้พิมพ์
              placeholder="ค้นหา"
              className="border p-2 rounded-md mt-4 mr-6 pl-10"
            />
            <Icon
              icon="ic:baseline-search"
              className="absolute left-2 top-1/2 transform -translate-y-2/2"
            />
          </div>
        </div>

        <Card className="h-full w-full  mt-6 flex justify-center items-center">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {Object.values(tableHead).map(
                  (
                    head,
                    index // แสดงหัวตาราง
                  ) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="paragraph" // เปลี่ยนจาก "base" เป็น "paragraph"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(
                (
                  user,
                  index // แสดงข้อมูลผู้ใช้
                ) => (
                  <tr key={user.id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.role}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.status}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.title} {user.fname} {user.lname}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.username}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                          onClick={() => handleAccessHistoryClick(user)} // ส่งข้อมูลผู้ใช้ที่เลือกไปในฟังก์ชัน
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
