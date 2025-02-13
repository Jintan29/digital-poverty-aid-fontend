import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearchPlus } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "@mui/material/Pagination"; // 🔹 นำเข้า Pagination
import * as XLSX from "xlsx"; // 🔹 นำเข้า XLSX
import { saveAs } from "file-saver"; // 🔹 ใช้เพื่อบันทึกไฟล์
import Swal from "sweetalert2";

function FindAssistance() {
  const TABLE_HEAD = [
    "#",
    "ปีที่สำรวจ",
    "ชื่อ-นามสกุล",
    "HC",
    "จำนวนสมาชิก",
    "ที่อยู่",
  ];

  const [tableData, setTableData] = useState([]); //ค่าที่ได้จากการดึง api
  const [selectYear, setSelectYear] = useState("ทั้งหมด"); //ตัวกรอง year
  const [houseCode, setHouseCode] = useState(""); //ตัวกรอก รหัสบ้าน
  const [filterData, setFilterData] = useState([]); // ค่าที่กรองแล้ว
  const [isFetched, setIsFetched] = useState(false); //เปิดปิดข้อมูลในตาราง
  const [years, setYears] = useState([]); // เก็บค่าปีที่มีอยู่ในข้อมูล

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 🔹 จำนวนข้อมูลต่อหน้า

  useEffect(() => {
    fetchHouseholdData();
  }, []);

  const fetchHouseholdData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/export/gethousehold"
      );
      const fetchedData = response.data.data;
      setTableData(fetchedData); //update ค่าที่ดึงมา

      const uniqueYears = [
        ...new Set(fetchedData.map((item) => item.surveyDate.toString())),
      ].sort((a, b) => b - a);
      setYears(uniqueYears);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilter = () => {
    fetchHouseholdData()
    
    let filtered = tableData;

    if (selectYear !== "ทั้งหมด") {
      filtered = filtered.filter(
        (row) => row.surveyDate.toString() === selectYear
      );
    }
    if (houseCode) {
      filtered = filtered.filter((row) =>
        row.housecode.toLowerCase().includes(houseCode.toLowerCase())
      );
    }

    filtered = filtered.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    setFilterData(filtered);
    setIsFetched(true); //เปิดข้อมูลในตาราง
    setCurrentPage(1); // 🔹 รีเซ็ตกลับไปหน้าที่ 1 หลังจากกรองข้อมูลใหม่
  };

  // 🔹 คำนวณข้อมูลของหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filterData.slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    if (filterData.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลให้ Export",
        text: "โปรดตรวจสอบข้อมูลก่อนทำการ Export",
      });
      return;
    }

    // 🔹 แปลงข้อมูลเป็นรูปแบบที่ Excel รองรับ
    const dataForExcel = filterData.map((item) => ({
      ลำดับที่: item.id,
      ปีที่สำรวจ: item.surveyDate,
      "ชื่อ-นามสกุล": item.name,
      "รหัสบ้าน (HC)": item.housecode,
      จำนวนสมาชิก: item.members + " คน",
      ที่อยู่: item.address,
    }));

    // 🔹 สร้าง Workbook และ Worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Household Data");

    // 🔹 บันทึกไฟล์
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // 🔹 ดาวน์โหลดไฟล์
    saveAs(data, "Household_Data.xlsx");

    // ✅ แจ้งเตือนเมื่อดาวน์โหลดสำเร็จ
    Swal.fire({
      icon: "success",
      title: "Export สำเร็จ!",
      text: "ไฟล์ Household_Data.xlsx ถูกดาวน์โหลดแล้ว",
    });
  };

  return (
    <>
      <div className="mx-3 my-5">
        <h2 className="text-2xl font-semibold">
          นำออกข้อมูลครัวเรือนตามปีที่ทำการสำรวจ
        </h2>
      </div>

      <div className="p-4 bg-white mt-10">
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              ปีที่สำรวจ
            </label>
            <select
              id="year"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={selectYear}
              onChange={(e) => setSelectYear(e.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="houseCode"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสบ้าน (HC)
            </label>
            <input
              type="text"
              id="houseCode"
              placeholder="รหัสบ้าน (HC)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={houseCode}
              onChange={(e) => setHouseCode(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">* Optional</p>
          </div>
        </form>

        <div className="mt-4 flex justify-start">
          <button
            type="button"
            onClick={handleFilter}
            className="flex items-center px-3 py-1.5 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <FaSearchPlus className="mr-2 text-sm" /> แสดงรายชื่อ
          </button>
        </div>
      </div>

      <div className="bg-white mt-10 p-4">
        <div className="flex justify-between items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={exportToExcel}
          >
            <SiMicrosoftexcel className="text-lg" /> Excel
          </button>
        </div>

        {isFetched && currentItems.length > 0 && (
          <Card className="h-full w-full overflow-scroll mt-10">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b p-4 bg-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map(
                  ({ id, surveyDate, name, housecode, members, address }) => (
                    <tr key={id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{id}</td>
                      <td className="p-4">{surveyDate}</td>
                      <td className="p-4">{name}</td>
                      <td className="p-4">{housecode}</td>
                      <td className="p-4">{members} คน</td>
                      <td className="p-4">{address}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        )}

        {isFetched && currentItems.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            ไม่พบข้อมูลที่ตรงกับเงื่อนไขที่เลือก
          </div>
        )}

        {/* 🔹 Pagination Component */}
        {isFetched && filterData.length > itemsPerPage && (
          <div className="mt-6 flex justify-center">
            <Pagination
              count={Math.ceil(filterData.length / itemsPerPage)} // จำนวนหน้าทั้งหมด
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)} // อัปเดตหน้าที่เลือก
              shape="rounded"
              color="primary"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default FindAssistance;
