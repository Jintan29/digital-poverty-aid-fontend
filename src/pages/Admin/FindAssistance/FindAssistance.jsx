import React, { useState, useEffect } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "@mui/material/Pagination"; // ✅ ใช้ Pagination จาก MUI

function FindAssistance() {
    const TABLE_HEAD = ["#", "ปีที่สำรวจ", "ชื่อ-นามสกุล", "HC", "จำนวนสมาชิก", "ที่อยู่"];

    const [selectedYear, setSelectedYear] = useState("ทั้งหมด");  // ปีที่เลือก เอาไว้ update
    const [houseCode, setHouseCode] = useState("");   // housecode ที่กรอก
    const [filteredData, setFilteredData] = useState([]); // ข้อมูลที่ได้จากการ filter
    const [currentPage, setCurrentPage] = useState(1);  //หน้าปัจจุบัน
    const [totalPages, setTotalPages] = useState(1);  //จำนวนหน้าทั้งหมด
    const [dataLoaded, setDataLoaded] = useState(false); //ใช้สำหรับเช็คว่าเคยโหลดข้อมูลหรือยัง
    const [loading, setLoading] = useState(false);  
    const pageSize = 10; // ✅ กำหนดจำนวนข้อมูลต่อหน้า
    const [yearOptions, setYearOptions] = useState([]);  //ดึงปีจาก api

    // ✅ ดึงปีจาก API เมื่อ Component โหลด
    useEffect(() => {
        const fetchYears = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/export/getYears");
                const result = await response.json();
                if (response.ok) {
                    setYearOptions(["ทั้งหมด", ...result.years]); // ✅ ใส่ "ทั้งหมด" เป็น Default
                } else {
                    console.error("Error fetching years:", result.msg);
                }
            } catch (error) {
                console.error("Error fetching years:", error);
            }
        };

        fetchYears();
    }, []);

    useEffect(() => {
        if (dataLoaded) fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        setLoading(true);
        setDataLoaded(true);

        let apiUrl = `http://localhost:8080/api/export/getFind?page=${currentPage}&pageSize=${pageSize}`;
        if (selectedYear !== "ทั้งหมด") apiUrl += `&year=${selectedYear}`;
        if (houseCode) apiUrl += `&houseCode=${houseCode}`;

        try {
            const response = await fetch(apiUrl);
            const result = await response.json();

            if (response.ok) {
                setFilteredData(result.data);
                setTotalPages(result.pagination.totalPages);
            } else {
                console.error("Error fetching data:", result.msg);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleFilter = () => {
        setCurrentPage(1);
        fetchData();
    };


    const handleDownloadExcel = async () => {
        let apiUrl = `http://localhost:8080/api/export/getFind?getAll=true`;
        if (selectedYear !== "ทั้งหมด") apiUrl += `&year=${selectedYear}`;
        if (houseCode) apiUrl += `&houseCode=${houseCode}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Error downloading Excel file");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "HouseholdData.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading Excel:", error);
        }
    };


    return (
        <>
            <div className="bg-white w-full px-4 py-4 flex justify-center items-center">
                <h1 className="text-gray-500 text-md font-bold">ค้นหาข้อมูลการช่วยเหลือ</h1>
            </div>

            <div className="p-4 bg-white mt-10">
                <form className="grid grid-cols-2 gap-4">
                    {/* ✅ ดึงปีจาก API มาใช้ */}
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">ปีที่สำรวจ</label>
                        <select
                            id="year"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {yearOptions.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="houseCode" className="block text-sm font-medium text-gray-700">รหัสบ้าน (HC)</label>
                        <input
                            type="text"
                            id="houseCode"
                            placeholder="รหัสบ้าน (HC)"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        onClick={handleDownloadExcel}
                        disabled={!dataLoaded || filteredData.length === 0} // ✅ ปิดการใช้งานปุ่มเมื่อยังไม่มีข้อมูล
                        className={`flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-md shadow-md transition 
                                ${!dataLoaded || filteredData.length === 0
                                ? "bg-gray-400 cursor-not-allowed" // ❌ ปิดการใช้งาน (สีเทา)
                                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300" // ✅ ใช้งานได้ปกติ
                            }`}
                    >
                        <SiMicrosoftexcel className="text-lg" /> ดาวน์โหลด Excel
                    </button>


                </div>

                {loading && <p className="text-center mt-4 text-gray-500">กำลังโหลดข้อมูล...</p>}

                {/* ✅ แสดงข้อความ "ไม่พบข้อมูล" เมื่อไม่มีข้อมูลตรงกับเงื่อนไขที่เลือก */}
                {dataLoaded && filteredData.length === 0 && !loading && (
                    <div className="mt-4 text-center text-gray-500">
                        ไม่พบข้อมูลที่ตรงกับเงื่อนไขที่เลือก
                    </div>
                )}

                {dataLoaded && filteredData.length > 0 && (
                    <>
                        <Card className="h-full w-full overflow-scroll mt-10">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(({ surveyDate, name, housecode, members, address }, index) => (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">{(currentPage - 1) * pageSize + index + 1}</td>  
                                            {/* เหมือนเป็น index หน้าแรก (1 - 1) * 10 = 0 */}
                                            <td className="p-4">{surveyDate}</td>
                                            <td className="p-4">{name}</td>
                                            <td className="p-4">{housecode}</td>
                                            <td className="p-4">{members} คน</td>
                                            <td className="p-4">{address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>

                        {/* ✅ ใช้ Pagination ของ MUI */}
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                count={totalPages} // จำนวนหน้าทั้งหมด
                                page={currentPage} // หน้าปัจจุบัน
                                onChange={(event, page) => setCurrentPage(page)} // เปลี่ยนหน้าที่เลือก
                                shape="rounded"
                                color="primary"
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default FindAssistance;
