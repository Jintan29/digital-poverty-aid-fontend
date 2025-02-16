import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button,Card,CardFooter,IconButton,Typography,} from "@material-tailwind/react";

const Usagestatistics = () => {
  // สร้างสถานะ (state) สำหรับการจัดการค่าของเดือน, ปี และช่องค้นหา
  const [month, setMonth] = useState(""); // เก็บค่าเดือนที่เลือก
  const [year, setYear] = useState(""); // เก็บค่าปีที่เลือก
  const [search, setSearch] = useState(""); // เก็บค่าที่พิมพ์ในช่องค้นหา

  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "ประวัติการเข้าใช้งานในระบบ",
    "บทบาท",
    "หน่วยงาน",
    "ชื่อ-นามสกุล",
    "Username",
    "Email",
    "จำนวนครั้งที่เข้าใช้งาน",
  ];

  // ข้อมูลตัวอย่างในตาราง
  const TABLE_ROWS = [
    {
      Access_History: "",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "superAdmin",
      Agency: "ทีมวิจัย",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "Admin",
      Agency: "อบต.",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "Admin",
      Agency: "อบต.",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "Admin",
      Agency: "อบต.",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "Admin",
      Agency: "อบต.",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
    {
      Access_History: "",
      Role: "Admin",
      Agency: "อบต.",
      name: "เจเจ ลิงลิง",
      Username: "Username",
      Email: "pl@sradss.com",
      Number_of_times_accessed: "123",
    },
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
          <div className="grid grid-cols-2 gap-4">
            {/* ตัวเลือกเดือน */}
            <div>
              <label className="block text-lg font-medium mb-2">
                เลือกเดือน
              </label>
              <select
                value={month} // ค่าในสถานะ month
                onChange={(e) => setMonth(e.target.value)} // อัปเดตสถานะ month เมื่อมีการเปลี่ยนแปลง
                className="w-3/4 p-2 border rounded-xl"
              >
                <option value="">-กรุณาเลือกเดือน-</option>
                <option value="มกราคม">มกราคม</option>
                <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                <option value="มีนาคม">มีนาคม</option>
                <option value="เมษายน">เมษายน</option>
                <option value="พฤษภาคม">พฤษภาคม</option>
                <option value="มิถุนายน">มิถุนายน</option>
                <option value="กรกฎาคม">กรกฎาคม</option>
                <option value="สิงหาคม">สิงหาคม</option>
                <option value="กันยายน">กันยายน</option>
                <option value="ตุลาคม">ตุลาคม</option>
                <option value="พฤศจิกายน">พฤศจิกายน</option>
                <option value="ธันวาคม">ธันวาคม</option>
              </select>
            </div>

            {/* ตัวเลือกปี */}
            <div>
              <label className="block text-lg font-medium mb-2">เลือกปี</label>
              <select
                value={year} // ค่าในสถานะ year
                onChange={(e) => setYear(e.target.value)} // อัปเดตสถานะ year เมื่อมีการเปลี่ยนแปลง
                className="w-3/4 border p-2 rounded-xl"
              >
                <option value="">-กรุณาเลือกปี-</option>
                <option value="2568">2568</option>
                <option value="2567">2567</option>
                <option value="2566">2566</option>
                <option value="2565">2565</option>
                <option value="2564">2564</option>
              </select>
            </div>

            {/* ปุ่มแสดงข้อมูล */}
            <div className="mt-4">
              <button className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className="border p-2 rounded-md mt-4 mr-6"
          />
          </div>
        </div>

        {/* แสดงตารางเป็น */}
        <Card className="h-full w-full  mt-6 flex justify-center items-center">
          <table className="w-full min-w-max table-auto text-left text-center">
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
              {TABLE_ROWS.map(
                ({
                  Access_History,
                  Role,
                  Agency,
                  name,
                  Username,
                  Email,
                  Number_of_times_accessed,
                }) => (
                  <tr key={Access_History} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* ปุ่มไอคอนหน้า Access_History */}

                        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                          <Icon icon="mdi:table-large" />
                        </button>

                        {Access_History}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Role}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Agency}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {Username}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {Email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="base"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {Number_of_times_accessed}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* การแบ่งหน้า */}
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Usagestatistics;
