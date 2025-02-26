import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");

const LineLoginStatistics = () => {
  const [logData, setLogData] = useState([]);
  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [currentYear, setCurrentYear] = useState(() => {
    const today = new Date();
    return today.getFullYear();
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return today.getMonth() + 1;
  });

  //ตัวเลือกปีย้อนหลัง
  const [arrYear, setArrYear] = useState(() => {
    let arr = [];
    let myDate = new Date();
    let currentYear = myDate.getFullYear();
    let yearBefore = currentYear - 5;

    for (let i = currentYear; i > yearBefore; i--) {
      arr.push(i);
    }
    return arr;
  });

  //ตัวเลือกเดือนย้อนหลัง
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

  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "ชื่อ-นามสกุล",
    "Action",
    "รหัสบ้าน(HC)",
    "Userid",
    "วันที่",
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/line-oa/log/${currentMonth}/${currentYear}`,
        {
          params: {
            page: currentPage,
            limit,
          },
        }
      );
      setLogData(res.data.results);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  //loopเปลี่ยนหน้า
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //ติดตามการเปลี่ยนหน้า
  useEffect(()=>{
    loadData()
  },[currentPage])

  return (
    <>
      <div className="text-center mb-1 p-4">
        {/* หัวข้อของหน้าแสดงสถิติการใช้งาน */}
        <h1 className="font-bold text-left">
          <span className="text-2xl font-bold mt-2 mb-1">
            สถิติการดูข้อมูลของผู้ใช้งาน Line
          </span>
        </h1>
      </div>

      {/* Search */}

      <div className="justify-center mb-2">
        <div className="col-span-2 w-full p-8 mt-2 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4">
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

      {/* ตาราง */}
      <div className="mt-6 bg-white shadow-lg rounded-lg">
        {/* แสดงตาราง */}
        <Card className="h-full w-full rounded-lg  mt-4 flex justify-center items-center">
          <table className="w-full min-w-max table-auto  text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal leading-none opacity-100"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logData && logData.length > 0 ? (
                logData.map((data, index) => (
                  <tr
                    key={data.id || index}
                    className="even:bg-blue-gray-50/50"
                  >
                    <td className="p-4">
                      <Typography
                        variant="paragraph" // เปลี่ยนจาก "base" เป็น "paragraph" ตาม warning
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.LineOA.fname} {data.LineOA.lname}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.action}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {data.LineOA.house_code}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.userId}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {dayjs(data.createdAt).format("DD MMMM BBBB (HH:mm)")}
                      </Typography>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
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
    </>
  );
};

export default LineLoginStatistics;
