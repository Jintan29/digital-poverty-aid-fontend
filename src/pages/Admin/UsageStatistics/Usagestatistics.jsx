import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import config from "../../../config";
import axios from "axios";

const Usagestatistics = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  //สร้างวันที่ default ปัจจุบันก่อน
  const [currentYear, setCurrentYear] = useState(() => {
    let myDate = new Date();
    return myDate.getFullYear();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    let myDate = new Date();
    return myDate.getMonth() + 1; //เดือนเริ่มต้นที่ 0
  });

  //สร้างArr สำหรับดึงข้อมูลย้อนหลังได้ 5 ปี
  const [arrYear, setArrYear] = useState(() => {
    let arr = [];
    let myDate = new Date();
    let currentYear = myDate.getFullYear();
    let yearBefore = currentYear - 5;

    for (let i = currentYear; i >= yearBefore; i--) {
      arr.push(i);
    }

    return arr;
  });

  //loop show month
  const [arrMonth, setArrMonth] = useState(() => {
    let arr = [
      { value: 1, label: "มกราคม" },
      { value: 2, label: "กุมภาพันธ์" },
      { value: 3, label: "มีนาคม" },
      { value: 4, label: "เมษายน" },
      { value: 5, label: "พฤษภาคม" },
      { value: 6, label: "มิถุนายน" },
      { value: 7, label: "กรกฏาคม" },
      { value: 8, label: "สิงหาคม" },
      { value: 9, label: "กันยายน" },
      { value: 10, label: "ตุลาคม" },
      { value: 11, label: "พฤศจิกายน" },
      { value: 12, label: "ธันวาคม" },
    ];

    return arr;
  });

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      const resAPI = await axios.get(
        config.api_path + `/user/login-history/${currentMonth}/${currentYear}`,
        {
          params: {
            page: currentPage,
            limit,
          },
          ...config.headers(),
        }
      );
      setUsers(resAPI.data.results);
      setTotalPages(resAPI.data.totalPages);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  //loop เปลี่ยนเลขหน้า
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "ประวัติการเข้าใช้งาน",
    "บทบาท",
    "หน่วยงาน",
    "ชื่อ-นามสกุล",
    "Username",
    "Email",
    "จำนวนครั้งที่เข้าใช้งาน",
  ];



  return (
    <div>
      <div className="text-center mb-1 p-4">
        {/* หัวข้อของหน้าแสดงสถิติการใช้งาน */}
        <h1 className="font-bold">
          <span className="text-2xl font-bold mt-2 mb-1">
            สถิติการเข้าใช้งานในระบบ
          </span>
        </h1>
      </div>

      {/* ตัวกรองสำหรับเลือกเดือนและปี */}
      <div className="justify-center mb-2">
        <div className="col-span-2 w-full p-8 mt-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-5">
            {/* ตัวเลือกเดือน */}
            <div>
              <label className="block text-lg font-medium mb-2">
                เลือกเดือน
              </label>
              <select
                value={currentMonth} // ค่าในสถานะ month
                onChange={(e) => setCurrentMonth(e.target.value)} // อัปเดตสถานะ month เมื่อมีการเปลี่ยนแปลง
                className="w-full p-2 border rounded-xl"
              >
                {arrMonth.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>

            {/* ตัวเลือกปี */}
            <div>
              <label className="block text-lg font-medium mb-2">เลือกปี</label>
              <select
                value={currentYear} // ค่าในสถานะ year
                onChange={(e) => setCurrentYear(e.target.value)} // อัปเดตสถานะ year เมื่อมีการเปลี่ยนแปลง
                className="w-full border p-2 rounded-xl"
              >
                {arrYear.map((item) => (
                  <option value={item}>{item + 543}</option>
                ))}
              </select>
            </div>

            {/* ปุ่มแสดงข้อมูล */}
            <div className="mt-4">
              <button
                onClick={() => loadData()}
                className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
              >
                <Icon icon="heroicons-solid:search" className="mr-2" />
                แสดงข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full bg-white rounded-lg shadow">
        {/* แถบค้นหาด้านขวา */}
        <div className="flex justify-end mb-4 mt-8">
          <div>
            <input
              type="text"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
              className="border p-2 rounded-md mt-4 mr-6"

            />
          </div>
        </div>

        {/* แสดงตารางเป็น */}
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
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="even:bg-blue-gray-50/50">

                    <td className="p-4">
                      <Typography variant="base" className="font-normal">
                        <button
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                          onClick={handleAccessHistoryClick} // เรียกฟังก์ชันเมื่อกดปุ่ม
                        >
                          <Icon icon="mdi:table-large" />
                        </button>

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.role}

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.status}

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.title} {user.fname} {user.lname}

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.username}

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {user.email}

                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <span className="text-red-500 font-bold">
                          {user.totalLogin}
                        </span>

                      </Typography>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    ไม่พบข้อมูลเข้าใช้งานภายในเดือนนี้
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* การแบ่งหน้า */}
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <IconButton
                  key={index + 1}
                  variant={currentPage === index + 1 ? "outlined" : "text"}
                  size="sm"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="ml-2"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ถัดไป
              </Button>
            </div>


          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Usagestatistics;
