import React from "react"
import { FaSearchPlus } from "react-icons/fa"; // ติดตั้ง react-icons หากยังไม่ได้ติดตั้ง
import { SiMicrosoftexcel } from "react-icons/si"; // นำเข้าไอคอน Excel
import { FaSearch } from "react-icons/fa";
import { Card, Typography } from "@material-tailwind/react";

function FindAssistance() {
    const TABLE_HEAD = ["#", "ปีที่สำรวจ", "ชื่อ-นามสกุล", "HC", "จำนวนสมาชิก", "ที่อยู่"];
    const TABLE_ROWS = [
        {
            id: 1,
            surveyDate: "2567",
            name: "สมชาย ใจดี",
            housecode: "HC-123",
            members: 5,
            address: "123 หมู่ 5 ตำบลเมือง",
        },
        {
            id: 2,
            surveyDate: "2566",
            name: "สมหญิง รักเรียน",
            housecode: "HC-456",
            members: 3,
            address: "45 หมู่ 1 ตำบลคลองหลวง",
        },
        {
            id: 3,
            surveyDate: "2565",
            name: "ทวีศักดิ์ เก่งมาก",
            housecode: "HC-789",
            members: 4,
            address: "78 หมู่ 2 ตำบลบ้านดอน",
        },
        {
            id: 4,
            surveyDate: "2564",
            name: "อรพรรณ แสนดี",
            housecode: "HC-1011",
            members: 6,
            address: "99 หมู่ 3 ตำบลโนนสูง",
        },
        {
            id: 5,
            surveyDate: "2564",
            name: "นัท สมใจ",
            housecode: "HC-10111",
            members: 6,
            address: "99 หมู่ 3 ตำบลโนนสูง",
        },
    ];

    return (
        <>
            <div className="bg-white w-full px-4 py-4 flex justify-center items-center">
                <h1 className="text-gray-500 text-md font-bold">
                    ค้นหาข้อมูลการช่วยเหลือ
                </h1>
            </div>
            <div className="p-4 bg-white mt-10">
                <form className="grid grid-cols-2 gap-4">
                    {/* ปีที่สำรวจ */}
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                            ปีที่สำรวจ
                        </label>
                        <select
                            id="year"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="2567">ทั้งหมด</option>
                            <option value="2567">2567</option>
                            <option value="2566">2566</option>
                            <option value="2565">2565</option>
                        </select>
                    </div>
                    {/* รหัสบ้าน (HC) */}
                    <div>
                        <label htmlFor="houseCode" className="block text-sm font-medium text-gray-700">
                            รหัสบ้าน (HC)
                        </label>
                        <input
                            type="text"
                            id="houseCode"
                            placeholder="รหัสบ้าน (HC)"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">* Option</p>
                    </div>
                </form>
                {/* ปุ่มแสดงรายชื่อ */}
                <div className="mt-4 flex justify-start">
                    <button
                        type="button"
                        className="flex items-center px-3 py-1.5 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                        <FaSearchPlus className="mr-2 text-sm" /> แสดงรายชื่อ
                    </button>
                </div>
            </div>

            <div className="bg-white mt-10 p-4">
                {/* ส่วนของปุ่ม Excel และ ช่องค้นหา */}
                <div className="flex justify-between items-center">
                    {/* ปุ่ม Excel */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        <SiMicrosoftexcel className="text-lg" /> Excel
                    </button>

                    {/* ช่องค้นหา */}
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 w-64">
                        <FaSearch className="text-gray-400 text-xs mr-2" />
                        <input
                            type="text"
                            placeholder="ค้นหา..."
                            className="outline-none border-none text-xs w-full bg-transparent focus:ring-0 placeholder-gray-400"
                        />
                    </div>
                </div>
                {/* ตาราง*/}
                <Card className="h-full w-full overflow-scroll mt-10">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
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
                            {TABLE_ROWS.map(({ id, surveyDate, name, housecode, members, address }, index) => (
                                <tr key={id} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {id}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {surveyDate}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {housecode}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {members} คน
                                        </Typography>
                                    </td>

                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {address}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>


            </div>
        </>
    )
}
export default FindAssistance