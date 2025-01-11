import React from "react";
import { Icon } from "@iconify/react";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Legend,
//     Tooltip,
// } from "chart.js";
// // ลงทะเบียนองค์ประกอบที่จำเป็น
// ChartJS.register(ArcElement, Tooltip, Legend);

import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";

// ลงทะเบียนองค์ประกอบที่จำเป็น
ChartJS.register(
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const Householdtracking = () => {

    // ข้อมูลสำหรับ Pie Chart (แสดงจำนวนเงิน)
    const data = {
        labels: ["รายรับ", "รายจ่าย", "ต้นทุน"],
        datasets: [
            {
                data: [50000, 30000, 2000], // จำนวนเงิน (รายรับ, รายจ่าย, ต้นทุน)
                backgroundColor: ["#2196F3", "#FF0000", "#FF9602"], // สีสำหรับแต่ละส่วน (เขียว, แดง, ฟ้า)
                hoverBackgroundColor: ["#1976D2", "#FF8484", "#FEB043"], // สีเมื่อโฮเวอร์ (เขียวเข้ม, แดงเข้ม, ฟ้าเข้ม)
            },
        ],
    };

    // กำหนดค่า options สำหรับ Chart.js
    const options = {
        plugins: {
            legend: {
                position: "bottom", // ย้าย Legend ไปด้านล่าง
                labels: {
                    usePointStyle: true, // ใช้สไตล์วงกลม
                    pointStyle: "circle", // รูปแบบจุดเป็นวงกลม
                    boxWidth: 10, // ลดขนาดจุด
                    padding: 15, // ระยะห่างระหว่างรายการ
                },
            },
        },
    };



    // ข้อมูลสำหรับ Line Chart
    const data2 = {
        labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."], // เปลี่ยนเวลาเป็นเดือน
        datasets: [
            {
                label: "รายรับ",
                data: [1500, 1600, 1700, 1800, 1750, 1900, 1850, 1950, 2000, 2100, 2200, 2300], // ข้อมูลรายรับ
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
                tension: 0.4, // ความโค้งของเส้น
            },
            {
                label: "รายจ่าย",
                data: [1300, 1400, 1450, 1500, 1480, 1550, 1520, 1600, 1650, 1700, 1800, 1900], // ข้อมูลรายจ่าย
                borderColor: "#FF0000",
                backgroundColor: "rgba(241, 19, 19, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "ต้นทุน",
                data: [300, 400, 450, 500, 480, 550, 520, 600, 650, 700, 750, 800], // ข้อมูลรายจ่าย
                borderColor: "#FF9602",
                backgroundColor: "rgba(255, 170, 0, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };


    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom", // ตำแหน่งของคำอธิบาย (Legend)
                labels: {
                    usePointStyle: true, // ใช้จุดแทนกรอบสี่เหลี่ยม
                    pointStyle: "circle", // รูปแบบของจุด (ใช้วงกลม)
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw} บาท`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "จำนวนเงิน (บาท)", // ป้ายแกน Y
                },
            },
            x: {
                title: {
                    display: true,
                    text: "เวลา", // ป้ายแกน X
                },
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">ครัวเรือนของฉัน  </h1>

            {/* ช่องค้นหาด้านขวา */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center rounded-lg p-2 w-96"> {/* เพิ่ม w-96 สำหรับความกว้างที่มากขึ้น */}
                    <input
                        type="search"
                        id="search"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="ค้นหา"
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        ค้นหา
                    </button>
                </div>
            </div>


            {/* Grid ด้านบน */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Card 1 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-blue-500 text-4xl mr-4">
                        <Icon icon="mdi:account" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">หัวหน้าครอบครัว</h2>
                        <p className="text-2xl font-bold">นายเจ สมนัท</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-yellow-500 text-4xl mr-4">
                        <Icon icon="mdi:account-multiple" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">จำนวนสมาชิก</h2>
                        <p className="text-2xl font-bold">20</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-green-500 text-4xl mr-4">
                        <Icon icon="mdi:email" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">รหัสไปรษณีย์</h2>
                        <p className="text-2xl font-bold">60130</p>
                    </div>
                </div>

            </div>

            {/* Grid ข้อมูลครัวเรือนและ Pie Chart */}
            <div className="grid grid-cols-2 gap-6 mb-12">

                {/* ข้อมูลครัวเรือน */}
                <div className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4">ข้อมูลครัวเรือน</h2>
                    <div className="space-y-4">
                        <p><strong>ตำบล:</strong> ตัวอย่างตำบล</p>
                        <p><strong>อำเภอ:</strong> ตัวอย่างอำเภอ</p>
                        <p><strong>จังหวัด:</strong> ตัวอย่างจังหวัด</p>
                        <p><strong>ชื่อหมู่บ้าน:</strong> หมู่บ้านตัวอย่าง</p>
                        <p><strong>บ้านเลขที่:</strong> 123/45</p>
                        <p><strong>ถนน:</strong> ถนนตัวอย่าง</p>
                        <p><strong>ซอย:</strong> ซอยตัวอย่าง</p>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4">รายรับ-รายจ่าย</h2>
                    <div className="w-72 h-72 mx-auto">
                        <Pie data={data} options={options} />
                    </div>
                </div>
            </div>

            {/* กราฟ Line Chart */}
            <div className="bg-white p-6 shadow rounded mt-6">
                <h2 className="text-xl font-semibold mb-4">รายรับ-รายจ่าย-ต้นทุน และจุดหลุดความจน</h2>
                <div className="w-full">
                    <Line data={data2} options={options2} />
                </div>
            </div>

        </div>
    )
}
export default Householdtracking;