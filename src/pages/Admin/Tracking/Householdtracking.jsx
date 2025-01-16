import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";
import { useParams } from "react-router-dom";

// ลงทะเบียนองค์ประกอบที่จำเป็น
ChartJS.register(
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Tooltip,
    Legend
);

const Householdtracking = () => {
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true); // เพิ่ม loading state
    const [error, setError] = useState(null);
    const { id } = useParams()

    const fetchFinancialData = async () => {
        setLoading(true); // เริ่มสถานะการโหลด
        try {
            const response = await axios.get(
                `http://localhost:8080/api/financialCapital/getAllSum/${id}` // Replace with your API URL
            );
            setFinancialData(response.data.data);
            setError(null); // ล้างข้อผิดพลาดหากมีข้อมูล
        } catch (err) {
            setError(err.message || "Failed to fetch data");
            setFinancialData(null); // ตั้งค่าข้อมูลเป็น null หากเกิดข้อผิดพลาด
        } finally {
            setLoading(false); // สิ้นสุดการโหลด
        }
    };

    useEffect(() => {
        fetchFinancialData();
    }, []);

    if (loading) {
        return <p>Loading financial data...</p>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // ข้อมูลสำหรับ Pie Chart (แสดงจำนวนเงิน)
    const data = {
        labels: ["รายรับ", "รายจ่าย", "ต้นทุน"],
        datasets: [
            {
                data: [
                    financialData.financialSummary.totalAmountPerYear, // รายรับ
                    financialData.financialSummary.totalExpenses, // รายจ่าย
                    financialData.financialSummary.totalCostPerYear, // ต้นทุน
                ],
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
                backgroundColor: "rgba(255, 238, 0, 0.2)",
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

    const maxLabelLength = 20;
    const data3 = {
        labels: financialData.Form.Financialcapital.Householdexpenses.map((expense) =>
            expense.expenses_type.length > maxLabelLength
                ? expense.expenses_type.slice(0, maxLabelLength) + "..." // ตัดคำและเพิ่ม ...
                : expense.expenses_type
        ),
        // labels: [new Date(financialData.createdAt).getFullYear()],
        datasets: [
            {
                label: "ออม",
                data: financialData.Form.Financialcapital.Householdexpenses.map(expense => expense.amount_per_month),
                // data: [financialData.financialSummary.totalSaving],
                // data: [500, 700, 400, 600, 800, 900, 1100, 1200],
                backgroundColor: "rgba(54, 162, 235, 0.7)", // สีฟ้า
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                barThickness: 45
            },
            {
                label: "หนี้สิน",
                // data: [financialData.financialSummary.totalDebt],
                // data: [1000, 900, 800, 750, 700, 650, 600, 550],
                backgroundColor: "rgba(255, 99, 132, 0.7)", // สีแดง
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                barThickness: 45
            },
        ],
    };

    const options3 = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return financialData.Form.Financialcapital.Householdexpenses[index].expenses_type; // แสดงข้อความเต็ม
                    },
                },
            },
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "จำนวนเงิน",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "ประเภท",
                },
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">ครัวเรือนของฉัน  </h1>

            {/* Grid ด้านบน */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Card 1 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-blue-500 text-4xl mr-4">
                        <Icon icon="mdi:account" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">หัวหน้าครอบครัว</h2>
                        <p className="text-xl font-bold">{financialData.host_title} {financialData.host_fname} {financialData.host_lname}</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-yellow-500 text-4xl mr-4">
                        <Icon icon="mdi:account-multiple" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">จำนวนสมาชิก</h2>
                        <p className="text-2xl font-bold">{financialData.memberCount}</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
                    <div className="text-green-500 text-4xl mr-4">
                        <Icon icon="mdi:email" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">รหัสบ้าน</h2>
                        <p className="text-2xl font-bold">{financialData.house_code}</p>
                    </div>
                </div>

            </div>

            {/* Grid ข้อมูลครัวเรือนและ Pie Chart */}
            <div className="grid grid-cols-2 gap-6 mb-6">

                {/* ข้อมูลครัวเรือน */}
                <div className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl font-semibold mb-4">ข้อมูลครัวเรือน</h2>
                    <div className="space-y-4">
                        <p><strong>ตำบล:</strong> {financialData.subdistrict}</p>
                        <p><strong>อำเภอ:</strong> {financialData.district}</p>
                        <p><strong>จังหวัด:</strong> {financialData.province}</p>
                        <p><strong>ชื่อหมู่บ้าน:</strong> {financialData.village}</p>
                        <p><strong>บ้านเลขที่:</strong> {financialData.house_number}</p>
                        <p><strong>ถนน:</strong> {financialData.road}</p>
                        <p><strong>ซอย:</strong> {financialData.alley}</p>
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

            {/* กราฟ Bar Chart */}
            <div className="bg-white p-6 shadow rounded mt-6">
                <h2 className="text-lg font-semibold mb-4">
                    การเปรียบเทียบการออมและหนี้สิน
                </h2>
                <Bar data={data3} options={options3} />
            </div>

            {/* กราฟ bar Chart */}
            <div className="bg-white p-6 shadow rounded mt-6">
                <h2 className="text-xl font-semibold mb-4">รายรับ-รายจ่าย-ต้นทุน และจุดหลุดความจน</h2>
                <div className="w-full">
                    <Line data={data2} options={options2} />
                </div>
            </div>




        </div>
    );
};
export default Householdtracking;