import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Pie, Line, Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { Dropdown } from "flowbite-react";
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
import { Link, useParams } from "react-router-dom";

// ลงทะเบียนองค์ประกอบที่จำเป็น
ChartJS.register(
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Tooltip,
    Legend,
    annotationPlugin
);

//components
import Modal from "../../../components/Modal";

const Householdtracking = () => {
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true); // เพิ่ม loading state
    const [error, setError] = useState(null);

    // Modal
    const [editModal, setEditModal] = useState(false);
    const [incomeModal, setIncomeModal] = useState(false) //รายรับ
    const [welfareModal, setWelfareModal] = useState(false) //รายจ่าย
    const [careerModal, setCareerModal] = useState(false)

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

    //แปลงวันจาก createdAt
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const option = { month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("th-TH", option).format(date);
    };

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
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        // ดึงค่าข้อมูลจาก datasets
                        const value = tooltipItem.raw;
                        // แสดงค่าพร้อมหน่วยเป็น "บาท"
                        return `${tooltipItem.label}: ${value.toLocaleString()} บาท`;
                    },
                },
            },
        },
    };


    // ข้อมูลสำหรับ Bar Chart
    const data2 = {
        labels: financialData?.Form?.Financialcapital?.Savings?.map(saving => formatDate(saving.createdAt)),
        // labels: [new Date(financialData.createdAt).getFullYear()],
        datasets: [
            {
                label: "ออม",
                data: financialData?.Form?.Financialcapital?.Savings?.map(saving => saving.amount),
                backgroundColor: "rgba(54, 162, 235, 0.7)", // สีฟ้า
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                barThickness: 45
            },
        ],
    };

    const options2 = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return financialData.Form.Financialcapital.Savings[index].saving_type; // แสดงข้อความเต็ม
                    },
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw; // ดึงค่าจากข้อมูล
                        return `จำนวนเงิน: ${value.toLocaleString()} บาท`; // แสดงค่าพร้อมหน่วยเป็น "บาท"
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
                    text: "จำนวนเงิน (Amount)",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "ปี (Year)",
                },
            },
        },
    };

    // ข้อมูลสำหรับ Bar Chart แนวนอน
    const maxDataValue = Math.max(
        ...financialData?.Form?.Financialcapital?.Debt?.Creditsources?.map(credit => credit.outstanding_amount) || [0]
    );
    const data3 = {
        labels: financialData?.Form?.Financialcapital?.Debt?.Creditsources?.map(credit => formatDate(credit.createdAt)),
        datasets: [
            {
                label: "หนี้",
                data: financialData?.Form?.Financialcapital?.Debt?.Creditsources?.map(credit => credit.outstanding_amount),
                backgroundColor: "rgba(255, 0, 0, 0.7)", // Solid red color for the bars
                borderColor: "rgba(255, 0, 0, 1)", // Solid red color for borders
                borderWidth: 1,
                barThickness: 17, // Reduced bar thickness for smaller chart
            },
        ],
    };
    
    const options3 = {
        responsive: true,
        maintainAspectRatio: false, // เพื่อให้กราฟสามารถปรับตามขนาดคอนเทนเนอร์ได้
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return financialData.Form.Financialcapital.Debt.Creditsources[index].form; // แสดงข้อความเต็ม
                    },
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw; // ดึงค่าจากข้อมูล
                        return `จำนวนเงิน: ${value.toLocaleString()} บาท`; // แสดงค่าพร้อมหน่วยเป็น "บาท"
                    },
                },
            },
            legend: {
                position: "top",
            },
        },
        indexAxis: 'y', // Bar chart orientation
        scales: {
            x: {
                beginAtZero: true,
                suggestedMax: maxDataValue * 1.1,
                title: {
                    display: true,
                    text: "จำนวนเงิน (Amount)", // Amount label for x-axis
                },

            },
            y: {

                title: {
                    display: true,
                    text: "ปี (Year)", // Year label for y-axis
                },
            },
        },
    };

    // ข้อมูลจาก JSON
    const incomes = financialData.Form.Financialcapital.NonAGIincomes;
    const expenses = financialData.Form.Financialcapital.Householdexpenses;
    const debts = financialData.Form.Financialcapital.Debt?.Creditsources || [];

    // คำนวณรายรับรวมต่อปี
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount_per_year, 0);

    // คำนวณรายจ่ายรวมต่อปี
    const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount_per_month * 12), 0);

    // คำนวณต้นทุนรวมต่อปี
    const totalCost = incomes.reduce((sum, income) => sum + income.cost_per_year, 0);

    // คำนวณหนี้สินรวม
    const totalDebt = debts.reduce((sum, debt) => sum + debt.outstanding_amount, 0);

    // คำนวณจุดหลุดพ้นความจน
    const breakEven = totalIncome >= (totalExpenses + totalCost + totalDebt);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* <h1 className="text-2xl font-bold mb-6">ครัวเรือน</h1> */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">ครัวเรือน</h1>
                    <p
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105
        ${breakEven
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                    >
                        {breakEven ? (
                            <>
                                <Icon icon="mdi:check-circle" className="w-5 h-5" />
                                <span className="font-medium">หลุดพ้นจากความยากจน</span>
                            </>
                        ) : (
                            <>
                                <Icon icon="mdi:close-circle" className="w-5 h-5" />
                                <span className="font-medium">ยังอยู่ในความยากจน</span>
                            </>
                        )}
                    </p>
                </div>
                <div className="ml-auto">
                    <Dropdown
                        label="เพิ่มข้อมูล"
                        dismissOnClick={false}
                        renderTrigger={() => (
                            <button
                                type="button"
                                className="flex items-center focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                <Icon
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                    icon="material-symbols:assignment-add-rounded"
                                />
                                เพิ่มข้อมูล
                            </button>
                        )}
                    >
                        <Dropdown.Item onClick={() => setEditModal(true)}>
                            <Icon
                                width={20}
                                height={20}
                                className="mr-2"
                                icon="material-symbols:person-edit-rounded"
                            />
                            แก้ไขข้อมูลส่วนบุคคล
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setIncomeModal(true)}>
                            <Icon
                                width={20}
                                height={20}
                                className="mr-2"
                                icon="material-symbols:monetization-on-rounded"
                            />
                            เพิ่มข้อมูลรายรับ(ครัวเรือน)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setWelfareModal(true)}>
                            <Icon
                                width={20}
                                height={20}
                                className="mr-2"
                                icon="material-symbols:family-restroom-rounded"
                            />
                            เพิ่มข้อมูลรายจ่าย(ครัวเรือน)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setCareerModal(true)}>
                            <Icon
                                width={20}
                                height={20}
                                className="mr-2"
                                icon="material-symbols:psychiatry-rounded"
                            />
                            เพิ่มทักษะอาชีพ
                        </Dropdown.Item>
                    </Dropdown>
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
                        <p className="text-xl font-bold">{financialData.host_title}{financialData.host_fname} {financialData.host_lname}</p>
                        {/* financialData.host_title}{financialData.host_fname} {financialData.host_lname} */}
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
                        <Icon icon="mdi:home" />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">รหัสบ้าน</h2>
                        <p className="text-2xl font-bold">{financialData.house_code}</p>
                    </div>
                </div>

            </div>

            {/* Grid ข้อมูลครัวเรือนและ Pie Chart */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                {/* ข้อมูลครัวเรือน */}
                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">ข้อมูลครัวเรือน</h2>
                    <div className="space-y-4 text-gray-700">
                        <p><strong className="text-gray-900">บ้านเลขที่:</strong> {financialData.house_number || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">ชื่อหมู่บ้าน:</strong> {financialData.village || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">ถนน:</strong> {financialData.road || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">ซอย:</strong> {financialData.alley || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">อำเภอ:</strong> {financialData.district || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">ตำบล:</strong> {financialData.subdistrict || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">จังหวัด:</strong> {financialData.province || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">รหัสไปรษณีย์:</strong> {financialData.postcode || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">หมายเลขบัตรประชาชน:</strong> {financialData.host_national_id || "ไม่ระบุ"}</p>
                        <p><strong className="text-gray-900">สมุดเกษตร:</strong> {financialData.green_book_id || "ไม่ระบุ"}</p>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="col-span-2 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">รายรับ-รายจ่าย</h2>
                    <div className="w-full flex justify-center">
                        <div className="w-80 h-80">
                            <Pie data={data} options={options} />
                        </div>
                    </div>

                    {/* ผลรวม */}
                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            {/* รายรับ */}
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-blue-700">รวมรายรับ</h4>
                                <p className="text-lg font-bold text-blue-900">
                                    {financialData.financialSummary.totalAmountPerYear.toLocaleString()} บาท
                                </p>
                            </div>

                            {/* รายจ่าย */}
                            <div className="bg-red-100 p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-red-700">รวมรายจ่าย</h4>
                                <p className="text-lg font-bold text-red-900">
                                    {financialData.financialSummary.totalExpenses.toLocaleString()} บาท
                                </p>
                            </div>

                            {/* ต้นทุน */}
                            <div className="bg-orange-100 p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-orange-700">รวมต้นทุน</h4>
                                <p className="text-lg font-bold text-orange-900">
                                    {financialData.financialSummary.totalCostPerYear.toLocaleString()} บาท
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลแถวสอง */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-6">
                {/* กราฟ Bar Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                        การออมในครัวเรือน
                    </h2>
                    <div className="flex justify-center mb-6 ">
                    <div className style={{ width: '100%', maxHeight: '500px', overflowX: 'auto' }}>
                        <div style={{ width:data2.labels.length > 5 ?  `${data2.labels.length * 150}px` : '800px', }}>
                        <Bar data={data2} options={options2}/>
                        </div>
                    </div>
                    </div>
                    <div className="mt-4 text-center text-gray-700">
                        <p className="text-xl font-medium">
                            การออมรวมในครัวเรือน: <span className="font-bold text-blue-600">{financialData.financialSummary.totalSaving}</span>
                        </p>
                    </div>
                </div>

                {/* รายชื่อสมาชิก */}
                <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3"
                style={{ maxHeight: '600px', overflowY: 'auto' }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 border-b pb-2">
                        รายชื่อสมาชิก
                    </h2>
                    <ul className="space-y-4">
                        {financialData?.MemberHouseholds?.length > 0 ? (
                            financialData.MemberHouseholds.map((member, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center p-4 bg-blue-50 rounded-lg shadow-sm"
                                >
                                    <span
                                        className="text-md text-gray-700 break-words cursor-default max-w-[70%]" // ใช้ Tailwind CSS แทน style
                                    >
                                        {member.title}{member.fname} {member.lname}
                                    </span>
                                    <Link
                                        to={`/admin/track-member/${member.id}`}
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 whitespace-nowrap flex-shrink-0"
                                    >
                                        ดูรายละเอียด
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">ไม่มีข้อมูลสมาชิก</p>
                        )}
                    </ul>

                </div>
            </div>

            {/* แนวนอน - Bar Chart */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    หนี้สินในครัวเรือน
                </h2>
                <div className="flex justify-center mb-6">
                <div className="bg-white p-4 shadow rounded w-3/4 mx-auto" style={{ height: '500px', maxHeight: '500px', overflowY: 'auto' }}>
                        {/* ใช้ w-3/4 ลดความกว้าง */}
                        <div style={{ height:data3.labels.length > 5 ? `${data3.labels.length * 70 }px`: '400px', }}>
                        <Bar data={data3} options={options3}/>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 text-gray-700">
                    <p className="text-lg font-medium">
                        รวมหนี้สิน: <span className="font-bold text-red-600">{financialData.financialSummary.totalDebt}</span>
                    </p>
                </div>
            </div>

            <Modal
                title="เพิ่ม/แก้ไข ข้อมูลครัวเรือน"
                show={editModal}
                icon="material-symbols:person-edit-rounded"
                onClose={(e) => setEditModal(false)}
                size="3xl"
            >
                <div className="grid gap-2 grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อจริง
                        </label>
                        <div className="flex items-center gap-2 mb-5">
                            <select
                                id="title"
                                name="title"
                                className="border border-gray-300 bg-white text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option>นาย</option>
                                <option>นาง</option>
                                <option>นางสาว</option>
                                <option>เด็กชาย</option>
                                <option>เด็กหญิง</option>
                            </select>

                            <input
                                id="fname"
                                name="fname"
                                type="text"
                                required
                                placeholder=""
                                className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            นามสกุล
                        </label>
                        <input
                            id="fname"
                            name="fname"
                            type="text"
                            required
                            placeholder=""
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            for="national_id"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            หมายเลขบัตรประจำตัวประชาชน
                        </label>
                        <input
                            type="text"
                            id="national_id"
                            class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="national_id"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            สมุดเกษตร
                        </label>
                        <input
                            type="text"
                            id="national_id"
                            class=" bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
            </Modal>
            
        </div>
    );
};
export default Householdtracking;