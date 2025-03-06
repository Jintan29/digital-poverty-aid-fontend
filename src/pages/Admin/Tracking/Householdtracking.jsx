import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Pie, Line, Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { Dropdown } from "flowbite-react";
// import config from "../../../config";
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
import MapHousehold from "../../../components/Householdtracking/MapHousehold";
import Swal from "sweetalert2";
import config from "../../../config";
import ResponsiveIncomeChart from "../../../components/Householdtracking/ResponsiveIncomeChart";

//Modal
import EditHouseHoldModal from "../../../components/Householdtracking/Modal/EditHouseHoldModal";
import AddIncomeModal from "../../../components/Householdtracking/Modal/AddIncomeModal";
import AddExpensesModal from "../../../components/Householdtracking/Modal/AddExpensesModal";
import AddSavingModal from "../../../components/Householdtracking/Modal/AddSavingModal";
import AddDebtModal from "../../../components/Householdtracking/Modal/AddDebtModal";
import AddMemberModal from "../../../components/Householdtracking/Modal/AddMemberModal";
import AddPinModal from "../../../components/Householdtracking/Modal/AddPinModal";

const Householdtracking = () => {
  const [household, setHousehold] = useState(null);
  const [incomeData, setIncomeData] = useState(null); //แสดงรายรับทั้งในและนอกการเกษตร
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state
  const [error, setError] = useState(null);
  // Modal
  const [editModal, setEditModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [debtModal, setDebtModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const { id } = useParams();

  //showmap
  const [showMap, setShowMap] = useState(false);

  const fetchhousehold = async () => {
    setLoading(true); // เริ่มสถานะการโหลด
    try {
      const response = await axios.get(
        `${config.api_path}/financialCapital/getAllSum/${id}` // Replace with your API URL
      );
      setHousehold(response.data.data);
      setError(null); // ล้างข้อผิดพลาดหากมีข้อมูล
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setHousehold(null); // ตั้งค่าข้อมูลเป็น null หากเกิดข้อผิดพลาด
    } finally {
      setLoading(false); // สิ้นสุดการโหลด
    }
  };

  const fetchIncome = async () => {
    try {
      const resAPI = await axios.get(
        config.api_path + `/house-hold/${id}/predict`,
        {
          params: {
            district: household?.district,
          },
          ...config.headers(),
        }
      );
      console.log(resAPI);
      setIncomeData(resAPI.data.result.incomeData);
      setPredictionData(resAPI.data.result.prediction);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchhousehold();
  }, []);

  useEffect(() => {
    if (household) {
      fetchIncome();
    }
  }, [household]);

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

  //check pin หากไม่มี pin แสดงแจ้งเตือน user ก่อน
  const handleShowMap = () => {
    if (
      !household?.Form?.PhysicalCapital?.lat ||
      !household?.Form?.PhysicalCapital?.lon
    ) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลแผนที่",
        text: "ครัวเรือนนี้ยังไม่ได้ทำการกรอกข้อมูล pin ที่อยู่ ข้อมูลนี้จึงเป็นที่อยู่เพียงคร่าวๆเท่านั้น",
        showConfirmButton: true,
      }).then(setShowMap(true));
    } else {
      setShowMap(true);
    }
  };

  // ข้อมูลสำหรับ Pie Chart (แสดงจำนวนเงิน)
  const data = {
    labels: ["รายรับนอกการเกษตร", "รายรับจากการเกษตร", "ต้นทุน", "รายจ่าย"],
    datasets: [
      {
        data: [
          household.financialSummary.totalAmountPerYear,
          household.financialSummary.totalAGIincomePerYear,
          household.financialSummary.totalCostPerYear,
          household.financialSummary.totalExpenses,
        ],
        backgroundColor: ["#2196F3", "#4CAF50", "#FF9602", "#FF0000"], // สีสำหรับแต่ละส่วน (เขียว, แดง, ฟ้า)
        hoverBackgroundColor: ["#1976D2", "#388E3C", "#FEB043", "#CC0000"], // สีเมื่อโฮเวอร์ (เขียวเข้ม, แดงเข้ม, ฟ้าเข้ม)

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
            return `${tooltipItem.label}: ${value.toLocaleString()} บาท/ปี`;
          },
        },
      },
    },
  };

  // ข้อมูลสำหรับ Bar Chart
  const data2 = {
    labels: household?.Form?.Financialcapital?.Savings?.map((saving) =>
      formatDate(saving.createdAt)
    ),
    // labels: [new Date(household.createdAt).getFullYear()],
    datasets: [
      {
        label: "ออม",
        data: household?.Form?.Financialcapital?.Savings?.map(
          (saving) => saving.amount
        ),
        backgroundColor: "rgba(54, 162, 235, 0.7)", // สีฟ้า
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 45,
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
            return household.Form.Financialcapital.Savings[index].saving_type; // แสดงข้อความเต็ม
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

  const data3 = {
    labels: [
      ...(incomeData?.Form?.Financialcapital?.NonAGIincomes || []).map(
        (income) => formatDate(income.createdAt)
      ),
      ...(incomeData?.Form?.Financialcapital?.AGIFinancials || []).map((agi) =>
        formatDate(agi.createdAt)
      ),
      "คาดการณ์รายได้",
    ],
    datasets: [
      {
        label: "รายได้นอกภาคเกษตร",
        data: [
          ...(incomeData?.Form?.Financialcapital?.NonAGIincomes || []).map(
            (income) => income.amount_per_year
          ),
          ...Array(
            (incomeData?.Form?.Financialcapital?.AGIFinancials || []).length
          ).fill(null),
          null,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 45,
      },
      {
        label: "ต้นทุน",
        data: [
          ...(incomeData?.Form?.Financialcapital?.NonAGIincomes || []).map(
            (income) => income.cost_per_year
          ),
          ...Array(
            (incomeData?.Form?.Financialcapital?.AGIFinancials || []).length
          ).fill(null),
          null,
        ],
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        barThickness: 45,
      },
      {
        label: "รายได้จากการเกษตร",
        data: [
          ...Array(
            (incomeData?.Form?.Financialcapital?.NonAGIincomes || []).length
          ).fill(null),
          ...(incomeData?.Form?.Financialcapital?.AGIFinancials || []).map(
            (agi) => agi.amount_per_year
          ),
          null,
        ],
        backgroundColor: "rgba(0, 0, 139, 0.7)",
        borderColor: "rgba(0, 0, 139, 1)",
        borderWidth: 1,
        barThickness: 45,
      },
      {
        label: "คาดการณ์รายได้",
        data: [
          ...Array(
            (incomeData?.Form?.Financialcapital?.NonAGIincomes || []).length
          ).fill(null),
          ...Array(
            (incomeData?.Form?.Financialcapital?.AGIFinancials || []).length
          ).fill(null),
          predictionData || 0,
        ],
        backgroundColor: "rgba(0, 0, 139, 0.3)",
        borderColor: "rgba(0, 0, 139, 1)",
        borderWidth: 2,
        borderDash: [5, 5],
        barThickness: 45,
      },
    ],
  };

  const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const nonAGILength =
              incomeData?.Form?.Financialcapital?.NonAGIincomes?.length || 0;
            const agiLength =
              incomeData?.Form?.Financialcapital?.AGIFinancials?.length || 0;

            if (index < nonAGILength) {
              return incomeData?.Form?.Financialcapital?.NonAGIincomes[index]
                .income_type;
            } else if (index < nonAGILength + agiLength) {
              return "รายได้จากการเกษตร";
            } else {
              return "คาดการณ์รายได้";
            }
          },
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return value ? `จำนวนเงิน: ${value.toLocaleString()} บาท` : "";
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
          text: "จำนวนเงิน (บาท)",
        },
      },
      x: {
        title: {
          display: true,
          text: "วันที่บันทึกข้อมูล",
        },
      },
    },
  };

  const data4 = {
    labels: household?.Form?.Financialcapital?.Householdexpenses?.map(
      (expense) => formatDate(expense.createdAt)
    ),
    datasets: [
      {
        label: "ค่าใช้จ่ายต่อเดือน",
        data: household?.Form?.Financialcapital?.Householdexpenses?.map(
          (expense) => expense.amount_per_month
        ),
        backgroundColor: "rgba(255, 87, 34, 0.7)", // สีส้มเข้มโปร่งแสง
        borderColor: "rgba(255, 87, 34, 1)", // สีส้มเข้มทึบ
        borderWidth: 1,
        barThickness: 45, // ลดความหนาของ bar chart
      },
    ],
  };

  const options4 = {
    responsive: true,
    maintainAspectRatio: false, // เพื่อให้กราฟสามารถปรับตามขนาดคอนเทนเนอร์ได้
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            return household.Form.Financialcapital.Householdexpenses[index]
              .expenses_type; // แสดงข้อความ
          },
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // ดึงค่าจากข้อมูล
            return `จำนวนเงิน: ${value.toLocaleString()} บาท ต่อเดือน`; // แสดงค่าพร้อมหน่วยเป็น "บาท"
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // เริ่มต้นที่ 0
        title: {
          display: true,
          text: "จำนวนเงิน (Amount)", // ชื่อแกน Y
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // เพิ่มเครื่องหมายคั่นหลัก
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "ประเภทค่าใช้จ่าย (Expense Type)", // ชื่อแกน X
        },
        ticks: {
          autoSkip: false, // ป้องกันการข้าม Label
          maxRotation: 45, // หมุนข้อความ Label สูงสุด 45 องศา
          minRotation: 0, // ไม่หมุนหากไม่จำเป็น
        },
      },
    },
  };

  // ข้อมูลสำหรับ Bar Chart แนวนอน
  const maxDataValue = Math.max(
    ...(household?.Form?.Financialcapital?.Debt?.Creditsources?.map(
      (credit) => credit.outstanding_amount
    ) || [0])
  );
  const data5 = {
    labels: household?.Form?.Financialcapital?.Debt?.Creditsources?.map(
      (credit) => formatDate(credit.createdAt)
    ),
    datasets: [
      {
        label: "หนี้",
        data: household?.Form?.Financialcapital?.Debt?.Creditsources?.map(
          (credit) => credit.outstanding_amount
        ),
        backgroundColor: "rgba(255, 0, 0, 0.7)", // Solid red color for the bars
        borderColor: "rgba(255, 0, 0, 1)", // Solid red color for borders
        borderWidth: 1,
        barThickness: 17, // Reduced bar thickness for smaller chart
      },
    ],
  };

  const options5 = {
    responsive: true,
    maintainAspectRatio: false, // เพื่อให้กราฟสามารถปรับตามขนาดคอนเทนเนอร์ได้
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            return household.Form.Financialcapital.Debt.Creditsources[index]
              .form; // แสดงข้อความเต็ม
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
    indexAxis: "y", // Bar chart orientation
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
  const chartHeight = data5.labels.length > 5 ? data5.labels.length * 70 : 400; // ปรับความสูงอัตโนมัติตามจำนวนข้อมูล

  // // ข้อมูลจาก JSON
  // const incomes = household.Form.Financialcapital.NonAGIincomes;
  // const expenses = household.Form.Financialcapital.Householdexpenses;
  // const debts = household.Form.Financialcapital.Debt?.Creditsources || [];

  // // คำนวณรายรับรวมต่อปี
  // const totalIncome = incomes.reduce(
  //   (sum, income) => sum + income.amount_per_year,
  //   0
  // );

  // // คำนวณรายจ่ายรวมต่อปี
  // const totalExpenses = expenses.reduce(
  //   (sum, expense) => sum + expense.amount_per_month * 12,
  //   0
  // );

  // // คำนวณต้นทุนรวมต่อปี
  // const totalCost = incomes.reduce(
  //   (sum, income) => sum + income.cost_per_year,
  //   0
  // );

  // // คำนวณหนี้สินรวม
  // const totalDebt = debts.reduce(
  //   (sum, debt) => sum + debt.outstanding_amount,
  //   0
  // );

  // // คำนวณจุดหลุดพ้นความจน
  // const breakEven = totalIncome >= totalExpenses + totalCost + totalDebt;

  // -------------
  // กำหนดเส้นความยากจน (สามารถปรับเปลี่ยนได้ตามมาตรฐาน)
  const povertyLine = 36000; // สมมติว่าเส้นความยากจนอยู่ที่ 36,000 บาท/ปี

  // ข้อมูลจาก JSON (ป้องกัน undefined)
  const incomes = household?.Form?.Financialcapital?.NonAGIincomes ?? [];
  const expenses = household?.Form?.Financialcapital?.Householdexpenses ?? [];
  const debts = household?.Form?.Financialcapital?.Debt?.Creditsources ?? [];
  const savings = household?.Form?.Financialcapital?.Savings ?? [];

  // คำนวณรายรับรวมต่อปี
  const totalIncome = incomes.reduce(
    (sum, income) => sum + (income.amount_per_year ?? 0),
    0
  );

  // คำนวณรายจ่ายรวมต่อปี
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (expense.amount_per_month ?? 0) * 12,
    0
  );

  // คำนวณต้นทุนรวมต่อปี
  const totalCost = incomes.reduce(
    (sum, income) => sum + (income.cost_per_year ?? 0),
    0
  );

  // คำนวณหนี้สินรวม (หนี้สินที่ยังค้างชำระ)
  const totalDebt = debts.reduce(
    (sum, debt) => sum + (debt.outstanding_amount ?? 0),
    0
  );

  // คำนวณการออมรวม (เงินออมทั้งหมดที่ครัวเรือนมี)
  const totalSavings = savings.reduce(
    (sum, saving) => sum + (saving.amount ?? 0),
    0
  );

  // คำนวณรายได้สุทธิ (Net Income) รวมการออมเข้าไป
  const netIncome = totalIncome + totalSavings - totalExpenses - totalCost - totalDebt;


  // ตรวจสอบจุดหลุดพ้นความยากจน (รวมภาระหนี้และการออม)
  const breakEven = (netIncome >= povertyLine) 



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
              แก้ไขข้อมูลครัวเรือน
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setIncomeModal(true)}>
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="material-symbols:monetization-on-rounded"
              />
              เพิ่มข้อมูลรายได้
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExpensesModal(true)}>
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="material-symbols:family-restroom-rounded"
              />
              เพิ่มข้อมูลรายจ่าย
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSavingModal(true)}>
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="material-symbols:savings"
              />
              เพิ่มการออม
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setDebtModal(true)}>
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="material-symbols:account-balance"
              />
              เพิ่มหนี้สิน
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPinModal(true)}>
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="mdi:map-marker-plus" // ใช้ไอคอนที่สื่อถึงการเพิ่มตำแหน่ง
              />
              เพิ่ม/แก้ไข ตำแหน่ง
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
            <h2 className="text-sm font-medium text-gray-500">
              หัวหน้าครอบครัว
            </h2>
            <p className="text-xl font-bold">
              {household.host_title}
              {household.host_fname} {household.host_lname}
            </p>
            {/* household.host_title}{household.host_fname} {household.host_lname} */}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="text-yellow-500 text-4xl mr-4">
            <Icon icon="mdi:account-multiple" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">จำนวนสมาชิก</h2>
            <p className="text-2xl font-bold">{household.memberCount}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="text-green-500 text-4xl mr-4">
            <Icon icon="mdi:home" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">รหัสบ้าน</h2>
            <p className="text-2xl font-bold">{household.house_code}</p>
          </div>
        </div>
      </div>

      {/* Grid ข้อมูลครัวเรือนและ Pie Chart */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* ข้อมูลครัวเรือน */}
        <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
            ข้อมูลครัวเรือน
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="text-gray-900">บ้านเลขที่:</strong>{" "}
              {household.house_number || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">ชื่อหมู่บ้าน:</strong>{" "}
              {household.village || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">ถนน:</strong>{" "}
              {household.road || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">ซอย:</strong>{" "}
              {household.alley || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">อำเภอ:</strong>{" "}
              {household.district || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">ตำบล:</strong>{" "}
              {household.subdistrict || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">จังหวัด:</strong>{" "}
              {household.province || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">รหัสไปรษณีย์:</strong>{" "}
              {household.postcode || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">หมายเลขบัตรประชาชน:</strong>{" "}
              {household.host_national_id || "ไม่ระบุ"}
            </p>
            <p>
              <strong className="text-gray-900">สมุดเกษตร:</strong>{" "}
              {household.green_book_id || "ไม่มี"}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-2 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
            รายรับ-รายจ่าย(ข้อมูลล่าสุด)
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-80 h-80">
              <Pie data={data} options={options} />
            </div>
          </div>

          {/* ผลรวม */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              {/* รายรับนอกการเกษตร */}
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-blue-700">
                  รายรับนอกการเกษตร
                </h4>
                <p className="text-lg font-bold text-blue-900">
                  {household.financialSummary.totalAmountPerYear.toLocaleString()}{" "}
                  บาท/ปี
                </p>
              </div>

              {/* รายรับในการเกษตร */}
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-green-700">
                  รายรับจากการเกษตร
                </h4>
                <p className="text-lg font-bold text-green-900">
                  {household.financialSummary.totalAGIincomePerYear.toLocaleString()}{" "}
                  บาท/ปี
                </p>
              </div>


              {/* รายรับ */}
              <div className="bg-violet-100 p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-violet-700">รวมรายรับ</h4>
                <p className="text-lg font-bold text-violet-900">
                  {household.financialSummary.totalIncomePerYear.toLocaleString()}{" "}
                  บาท/ปี
                </p>
              </div>

              {/* รายจ่าย */}
              <div className="bg-red-100 p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-red-700">รวมรายจ่าย</h4>
                <p className="text-lg font-bold text-red-900">
                  {household.financialSummary.totalExpenses.toLocaleString()}{" "}
                  บาท/ปี
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
          <div className="flex justify-center mb-6">
            <div
              style={{
                width: "100%",
                maxHeight: "500px",
                overflowX: "auto",
              }}
            >
              <div
                style={{
                  width:
                    data2.labels.length > 5
                      ? `${data2.labels.length * 150}px`
                      : "800px",
                }}
              >
                <Bar data={data2} options={options2} />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-700">
            <p className="text-xl font-medium">
              การออมรวมในครัวเรือน:{" "}
              <span className="font-bold text-blue-600">
                {parseFloat(household.financialSummary.totalSaving).toLocaleString() + ' ' + 'บาท'}
              </span>
            </p>
          </div>
        </div>

        {/* รายชื่อสมาชิก */}
        <div
          className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              รายชื่อสมาชิก
            </h2>
            {/* Icon for adding member */}
            <button
              onClick={() => setMemberModal(true)}
              className="text-blue-500 hover:text-blue-700"
              title="เพิ่มสมาชิก"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-4">
            {household?.MemberHouseholds?.length > 0 ? (
              household.MemberHouseholds.map((member, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-lg shadow-sm"
                >
                  <span
                    className="text-md text-gray-700 break-words cursor-default max-w-[70%]" // ใช้ Tailwind CSS แทน style
                  >
                    {member.title}
                    {member.fname} {member.lname}
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

      {/* รายรับ */}
      <ResponsiveIncomeChart
        incomeData={incomeData}
        predictionData={predictionData}
      />

      {/* รายจ่าย */}
      <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          รายจ่ายในครัวเรือน
        </h2>
        <div className="flex justify-center mb-6">
          <div
            className="bg-white p-4 shadow rounded w-3/4 mx-auto"
            style={{ height: "500px", maxHeight: "500px", overflowY: "auto" }}
          >
            <div className="flex justify-center mb-6">
              <div
                style={{
                  width: "100%",
                  height: "400px", // กำหนดความสูงที่เหมาะสม
                  overflowX: "auto",
                  overflowY: "hidden", // ซ่อนการเลื่อนแนวตั้ง
                }}
              >
                <div
                  style={{
                    width:
                      data4.labels.length > 5
                        ? `${data3.labels.length * 150}px`
                        : "800px", // ขนาดความกว้างของกราฟ
                    height: "100%", // ทำให้กราฟสูงพอดีกับ container
                  }}
                >
                  <Bar data={data4} options={options4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* แนวนอน - Bar Chart หนี้*/}
      <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          หนี้สินในครัวเรือน
        </h2>
        <div className="flex justify-center mb-6">
          <div
            className="bg-white p-4 shadow rounded w-3/4 mx-auto"
            style={{ height: "500px", maxHeight: "500px", overflowY: "auto" }}
          >
            {/* ใช้ w-3/4 ลดความกว้าง */}
            <div style={{ height: `${chartHeight}px` }}>
              <Bar data={data5} options={options5} />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-700">
          <p className="text-lg font-medium">
            รวมหนี้สิน:{" "}
            <span className="font-bold text-red-600">
              {parseFloat(household.financialSummary.totalDebt).toLocaleString() + ' ' + 'บาท'}
            </span>
          </p>
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-2xl font-bold py-3">
          ระบบสารสนเทศภูมิศาสตร์ (GIS) ของ ครัวเรือนยากจน
        </h1>
        <button
          type="button"
          onClick={(e) => handleShowMap()}
          class="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <Icon
            icon="material-symbols:my-location-rounded"
            className="w-5 h-5 me-3"
          />
          แสดงที่อยู่
        </button>
      </div>

      {/* Map */}
      {showMap && <MapHousehold household={household} />}

      <EditHouseHoldModal
        show={editModal}
        onClose={(e) => setEditModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddIncomeModal
        show={incomeModal}
        onClose={(e) => setIncomeModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddExpensesModal
        show={expensesModal}
        onClose={(e) => setExpensesModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddSavingModal
        show={savingModal}
        onClose={(e) => setSavingModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddDebtModal
        show={debtModal}
        onClose={(e) => setDebtModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddMemberModal
        show={memberModal}
        onClose={(e) => setMemberModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
      <AddPinModal
        show={pinModal}
        onClose={(e) => setPinModal(false)}
        household={household}
        reloadData={fetchhousehold}
      />
    </div>
  );
};
export default Householdtracking;
