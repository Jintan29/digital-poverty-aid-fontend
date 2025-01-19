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
    const [formData, setFormData] = useState({
        Saving: [
            {
                is_has_saving: null,
                saving_type: " ",
                amount: 0.0,
            },
        ],
        Debt: [
            {
                is_has_debt: null,
                description: " ",
            },
        ],
        Creditsources: [],
        NonAGIincome: [
            // {
            //     income_type: " ",
            //     amount_per_yaer: 0.0,
            //     cost_per_year: 0.0,
            // }
        ],
        Householdexpenses: [
            // {
            //     expenses_type: " ",
            //     amount_per_month: 0.0,
            // }
        ],
    });
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true); // เพิ่ม loading state
    const [error, setError] = useState(null);

    // Modal
    const [editModal, setEditModal] = useState(false);
    const [incomeModal, setIncomeModal] = useState(false)
    const [expensesModal, setExpensesModal] = useState(false)
    const [savingModal, setSavingModal] = useState(false)
    const [debtModal, setDebtModal] = useState(false)
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
    const chartHeight = data3.labels.length > 5 ? data3.labels.length * 70 : 400; // ปรับความสูงอัตโนมัติตามจำนวนข้อมูล

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

    //Saving
    const prefixSaving = "การออมอื่นๆ";
    const handleSavingChange = (event) => {
        const { name, value } = event.target;
        if (name === "is_has_saving" && value === "false") {
            setFormData((prevData) => ({
                ...prevData,
                Saving: [
                    {
                        is_has_saving: false,
                        saving_type: "",
                        amount: 0.0,
                    },
                ],
            }));
        }
    };
    const handleRadio1Change = (event) => {
        // const { id } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            Saving: [
                // {
                //     is_has_saving: true,
                //     saving_type: " ",
                //     amount: 0.0,
                // }
            ], // รีเซ็ตข้อมูลใน Saving ให้ว่าง
        }));
    };

    const handleSavingCheckBoxChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = [...prevFormData.Saving];
            if (checked) {
                // เพิ่มข้อมูลในกรณีที่เลือก checkbox
                updatedSaving.push({
                    is_has_saving: true,
                    saving_type: value,
                    amount: 0.0,
                });
            } else {
                // ลบข้อมูลในกรณีที่ยกเลิกการเลือก checkbox
                return {
                    ...prevFormData,
                    Saving: updatedSaving.filter((item) => item.saving_type !== value),
                };
            }

            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    const handleAmountChange = (e, savingType) => {
        const { value } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = prevFormData.Saving.map((item) =>
                item.saving_type === savingType
                    ? {
                        ...item,
                        amount: parseFloat(value) || 0.0, // เก็บค่า amount เป็นตัวเลข
                    }
                    : item
            );
            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    //
    const handleOtherSavingChange = (e) => {
        const { checked } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = [...prevFormData.Saving];

            if (checked) {
                // Add the new entry with empty saving_type to allow input
                updatedSaving.push({
                    is_has_saving: true,
                    saving_type: prefixSaving + " ", // Add a space instead of a hyphen
                    amount: 0.0,
                });
            } else {
                // Remove the saving type for "อื่น ๆ" from the array
                return {
                    ...prevFormData,
                    Saving: updatedSaving.filter(
                        (item) => !item.saving_type.startsWith(prefixSaving)
                    ),
                };
            }

            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    const handleOtherInputSavingChange = (e) => {
        const { value } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = prevFormData.Saving.map((item) =>
                item.saving_type.startsWith(prefixSaving)
                    ? {
                        ...item,
                        saving_type: prefixSaving + " " + value, // Update the saving_type based on input
                    }
                    : item
            );

            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    const handleOtherAmount = (e, savingType) => {
        const { value } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = prevFormData.Saving.map((item) =>
                item.saving_type.startsWith(savingType) // Ensure we're updating the correct item
                    ? {
                        ...item,
                        amount: parseFloat(value) || 0.0, // Update amount, default to 0 if invalid input
                    }
                    : item
            );

            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    //Debt
    const prefix = "อื่น ๆ";
    const prefixCredit = "แหล่งอื่น ๆ";
    const prefixCredit2 =
        "กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)";

    const handleDebtChange = (event) => {
        const value = event.target.value === "true" ? true : false;

        setFormData((prevData) => {
            let updatedFormData = { ...prevData };

            // ถ้า value เป็น true เคลียร์ค่าใน description
            if (value === true) {
                updatedFormData.Debt[0].description = " "; // เคลียร์ค่าใน description
            }

            // ถ้า value เป็น false เคลียร์ค่าใน form และ outstanding_amount
            if (value === false) {
                updatedFormData.Creditsources = []; // เคลียร์ Creditsources ทั้งหมด
            }

            return {
                ...updatedFormData,
                Debt: [{ ...updatedFormData.Debt[0], is_has_debt: value }],
            };
        });
    };

    const handleOutstandingAmountChange = (value, creditSource) => {
        setFormData((prevFormData) => {
            const updatedCreditsources = prevFormData.Creditsources.map((item) =>
                item.form === creditSource
                    ? { ...item, outstanding_amount: parseFloat(value) }
                    : item
            );
            return { ...prevFormData, Creditsources: updatedCreditsources };
        });
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        const prefix = "อื่น ๆ"; // ค่าที่ต้องการตรวจสอบ

        setFormData((prevData) => {
            // ถ้า value ตรงกับ prefix "อื่น ๆ" ให้ทำงานต่อ
            if (value === prefix) {
                return {
                    ...prevData,
                    Debt: [{ ...prevData.Debt[0], description: value }],
                };
            }

            // ถ้า value ไม่ตรงกับ prefix "อื่น ๆ", จะทำการอัพเดต description โดยไม่มีการส่ง description_3
            return {
                ...prevData,
                Debt: [{ ...prevData.Debt[0], description: value }],
            };
        });
    };

    const handleOtherDescriptionChange = (event) => {
        const value = event.target.value;

        setFormData((prevData) => ({
            ...prevData,
            Debt: [{ ...prevData.Debt[0], description: `อื่น ๆ: ${value}` }],
        }));
    };

    const handleCreditSourceChange = (e, amount) => {
        const { checked, value, id } = e.target;

        setFormData((prevFormData) => {
            let updatedCreditsources = [...prevFormData.Creditsources];

            if (checked) {
                updatedCreditsources.push({
                    form: value,
                    outstanding_amount: amount || 0, // เก็บจำนวนเงินที่คงค้าง
                });
            } else {
                // Remove credit source and reset outstanding amount
                updatedCreditsources = updatedCreditsources.filter(
                    (item) => item.form !== value
                );

                // Reset the specific amount input field based on checkbox id
                const amountFieldId = `outstanding_amount_${id.split("_")[1]}`;
                document.getElementById(amountFieldId).value = "";
            }

            return {
                ...prevFormData,
                Creditsources: updatedCreditsources,
            };
        });
    };

    const handleOtherFormChange = (e, prefixCredit) => {
        const { checked } = e.target;

        setFormData((prevState) => {
            const updatedCreditsources = checked
                ? [
                    ...prevState.Creditsources,
                    { form: `${prefixCredit} `, outstanding_amount: "" },
                ]
                : prevState.Creditsources.filter(
                    (item) => !item.form.startsWith(prefixCredit)
                );

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };

    const handleOtherInputChange = (e, prefixCredit) => {
        const value = e.target.value;

        setFormData((prevState) => {
            const updatedCreditsources = prevState.Creditsources.map((group) =>
                group.form.startsWith(prefixCredit)
                    ? { ...group, form: `${prefixCredit} ${value}` }
                    : group
            );

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };

    const handleOtherOutstandingAmount = (prefixCredit, value) => {
        setFormData((prevState) => {
            const updatedCreditsources = prevState.Creditsources.map((group) =>
                group.form.startsWith(prefixCredit)
                    ? { ...group, outstanding_amount: parseFloat(value) || 0 }
                    : group
            );

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };

    //income
    const prefixIncomeType = "รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่";
    const prefixIncomeType2 = "รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่";
    const handleNonAGIincomeCheckboxChange = (e, incomeType) => {
        const { checked } = e.target;

        setFormData((prevData) => {
            const existingIndex = prevData.NonAGIincome.findIndex(
                (item) => item.income_type === incomeType
            );

            if (checked) {
                // เพิ่มข้อมูลใหม่ถ้ายังไม่มี
                if (existingIndex === -1) {
                    return {
                        ...prevData,
                        NonAGIincome: [
                            ...prevData.NonAGIincome,
                            { income_type: incomeType, amount_per_year: 0, cost_per_year: 0 },
                        ],
                    };
                }
            } else {
                // ลบข้อมูลออกถ้า unchecked
                if (existingIndex > -1) {
                    const updatedNonAGIincome = [...prevData.NonAGIincome];
                    updatedNonAGIincome.splice(existingIndex, 1);
                    return { ...prevData, NonAGIincome: updatedNonAGIincome };
                }
            }

            return prevData;
        });
    };

    const updateNonAGIincomeFields = (incomeType, field, value) => {
        setFormData((prevData) => {
            const updatedNonAGIincome = [...prevData.NonAGIincome];
            const index = updatedNonAGIincome.findIndex(
                (item) => item.income_type === incomeType
            );

            if (index !== -1) {
                updatedNonAGIincome[index][field] = parseFloat(value) || 0;
            }

            return { ...prevData, NonAGIincome: updatedNonAGIincome };
        });
    };

    //expenses
    const prefixExperss1 =
        "ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม";
    const prefixExperss2 =
        "ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง พลังงาน) รวม";
    const prefixExperss3 =
        "ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม";
    const prefixExperss4 =
        "ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม";
    const prefixExperss5 = "ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม";
    const prefixExperss6 =
        "ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ (ประกันชีวิต/ประกันรถยนต์/ประกันอุบัติเหตุ/ประกันอัคคีภัย) รวม";
    const prefixExperss7 =
        "ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา บริจาค รวม";
    const prefixExperss8 = "ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม";
    const prefixExperss9 = "ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม";
    const prefixExperss10 =
        "ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง บุหรี่ ยาสูบ รวม";
    const prefixExperss11 = "ค่าใช้จ่ายอื่น ๆ (ระบุ)";

    const handleHouseholdChange = (e) => {
        const { checked, value } = e.target;

        setFormData((prevData) => {
            const existingIndex = prevData.Householdexpenses.findIndex(
                (item) => item.expenses_type === value
            );

            if (checked) {
                // เพิ่มค่าใหม่เมื่อ checkbox ถูกเลือก
                if (existingIndex === -1) {
                    return {
                        ...prevData,
                        Householdexpenses: [
                            ...prevData.Householdexpenses,
                            { expenses_type: value, amount_per_month: 0 },
                        ],
                    };
                }
            } else {
                // ลบค่าเมื่อ checkbox ถูกยกเลิก
                if (existingIndex > -1) {
                    const updatedHouseholdexpenses = [...prevData.Householdexpenses];
                    updatedHouseholdexpenses.splice(existingIndex, 1);
                    return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
                }
            }
            return prevData; // ไม่มีการเปลี่ยนแปลง
        });
    };

    const handletInputHouseholdChange = (expenses_type, field, value) => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = [...prevData.Householdexpenses];
            const index = updatedHouseholdexpenses.findIndex(
                (item) => item.expenses_type === expenses_type
            );

            if (index !== -1) {
                // อัปเดตค่าฟิลด์ที่ระบุ
                updatedHouseholdexpenses[index][field] = parseFloat(value) || 0;
            }

            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
    };

    const handletOrtherInputHouseholdChange = (value) => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = [...prevData.Householdexpenses];
            const index = updatedHouseholdexpenses.findIndex((item) =>
                item.expenses_type.startsWith(prefixExperss11)
            );

            if (index !== -1) {
                updatedHouseholdexpenses[index].expenses_type = `${prefixExperss11} ${value}`;
            }

            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
    };

    const handleOtherExpenseChange = (value) => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = [...prevData.Householdexpenses];
            const index = updatedHouseholdexpenses.findIndex((item) =>
                item.expenses_type.startsWith(prefixExperss11)
            );

            if (index !== -1) {
                updatedHouseholdexpenses[index].amount_per_month = parseFloat(value) || 0;
            }

            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
    };

    const handleOtherCheckboxClear = (checked) => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = [...prevData.Householdexpenses];
            const index = updatedHouseholdexpenses.findIndex((item) =>
                item.expenses_type.startsWith(prefixExperss11)
            );

            if (checked) {
                if (index === -1) {
                    updatedHouseholdexpenses.push({
                        expenses_type: prefixExperss11,
                        amount_per_month: 0,
                    });
                }
            } else {
                if (index !== -1) {
                    updatedHouseholdexpenses.splice(index, 1);
                }
            }

            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
    };

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
                    <div className="flex justify-center mb-6">
                        <div
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                overflowX: 'auto',
                            }}
                        >
                            <div
                                style={{
                                    width: data2.labels.length > 5 ? `${data2.labels.length * 150}px` : '800px',
                                }}
                            >
                                <Bar data={data2} options={options2} />
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
                        <div style={{ height: `${chartHeight}px` }}>
                            <Bar data={data3} options={options3} />
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
            <Modal
                title="รายรับ"
                show={incomeModal}
                icon="material-symbols:person-edit-rounded"
                onClose={(e) => setIncomeModal(false)}
                size="3xl"
            >
                {/* Section 2 รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)*/}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5 ">
                        2. รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)
                    </h3>
                    <div className="pl-10">
                        {/* 1 */}
                        <div className="flex flex-wrap items-center mb-4">
                            <input
                                type="checkbox"
                                id="income_type_0"
                                name="income_type"
                                className="mr-2 rounded"
                                checked={formData.NonAGIincome.some(
                                    (item) => item.income_type === prefixIncomeType
                                )} // ตรวจสอบว่า income_type ตรงกับ prefixIncomeType หรือไม่
                                onChange={(e) =>
                                    handleNonAGIincomeCheckboxChange(e, prefixIncomeType)
                                } // ส่งค่า prefixIncomeType ไปใน onChange
                            />
                            <label
                                htmlFor="income_type_0"
                                className="font text-black mr-2"
                            >
                                รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่
                            </label>

                            {formData.NonAGIincome.some(
                                (item) => item.income_type === prefixIncomeType
                            ) && ( // ตรวจสอบว่ามี income_type ตรงกับ prefixIncomeType
                                    <div className="flex flex-wrap items-center sm:w-auto md:w-2/2 lg:w-auto xl:w-auto ">
                                        <input
                                            type="number"
                                            placeholder="....บาท/ปี"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200  sm:w-48 md:w-48 lg:w-60 xl:w-60"
                                            value={
                                                formData.NonAGIincome.find(
                                                    (item) => item.income_type === prefixIncomeType
                                                )?.amount_per_year || ""
                                            } // ใช้ค่าใน NonAGIincome ที่ตรงกับ prefixIncomeType
                                            onChange={(e) =>
                                                updateNonAGIincomeFields(
                                                    prefixIncomeType,
                                                    "amount_per_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label htmlFor=" " className="font text-black mr-2 ml-4">
                                            ต้นทุน
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="....บาท/ปี"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200  sm:w-48 md:w-48 lg:w-60 xl:w-60 "
                                            value={
                                                formData.NonAGIincome.find(
                                                    (item) => item.income_type === prefixIncomeType
                                                )?.cost_per_year || ""
                                            } // ใช้ค่าใน NonAGIincome ที่ตรงกับ prefixIncomeType
                                            onChange={(e) =>
                                                updateNonAGIincomeFields(
                                                    prefixIncomeType,
                                                    "cost_per_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                        {/* 2 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="income_type_1"
                                name="income_type"
                                className="mr-2 rounded"
                                checked={formData.NonAGIincome.some(
                                    (item) => item.income_type === prefixIncomeType2
                                )}
                                onChange={(e) =>
                                    handleNonAGIincomeCheckboxChange(e, prefixIncomeType2)
                                }
                            />
                            <label
                                htmlFor="income_type_1"
                                className="font text-black mr-2"
                            >
                                รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่
                            </label>
                            {formData.NonAGIincome.some(
                                (item) => item.income_type === prefixIncomeType2
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/ปี"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.NonAGIincome.find(
                                                (item) => item.income_type === prefixIncomeType2
                                            )?.amount_per_year || ""
                                        }
                                        onChange={(e) =>
                                            updateNonAGIincomeFields(
                                                prefixIncomeType2,
                                                "amount_per_year",
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="รายจ่าย"
                show={expensesModal}
                icon="material-symbols:person-edit-rounded"
                onClose={(e) => setExpensesModal(false)}
                size="3xl"
            >
                {/* Section 3: รายจ่ายครัวเรือน */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5 ">
                        3. รายจ่ายครัวเรือน (นอกเหนือจากการลงทุนเพื่อการผลิต)
                        (ตอบได้มากกว่า 1 ข้อ)
                    </h3>
                    <div className="pl-10">
                        {/* 1 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_0"
                                className="mr-2 rounded"
                                name="expenses_type"
                                value={prefixExperss1}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss1
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label
                                htmlFor="expenses_type_0"
                                className="font text-black mr-2"
                            >
                                1) ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss1
                            ) && (
                                    <input
                                        type="number"
                                        name="amount_per_month"
                                        placeholder="....บาท/เดือน"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss1
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss1,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 2 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_1"
                                className="mr-2 rounded"
                                value={prefixExperss2}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss2
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                2) ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง
                                พลังงาน) รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss2
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss2
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss2,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 3 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_2"
                                className="mr-2 rounded"
                                value={prefixExperss3}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss3
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                3) ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss3
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss3
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss3,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 4 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_3"
                                className="mr-2 rounded"
                                value={prefixExperss4}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss4
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                4) ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม
                                ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss4
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss4
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss4,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 5 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_4"
                                className="mr-2 rounded"
                                value={prefixExperss5}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss5
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                5) ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss5
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss5
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss5,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 6 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_5"
                                className="mr-2 rounded"
                                value={prefixExperss6}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss6
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                6) ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ
                                (ประกันชีวิต/ประกันรถยนต์/ประกัน อุบัติเหตุ/ประกันอัคคีภัย)
                                รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss6
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss6
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss6,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 7 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_6"
                                className="mr-2 rounded"
                                value={prefixExperss7}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss7
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                7) ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา
                                บริจาค รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss7
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss7
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss7,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 8 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_7"
                                className="mr-2 rounded"
                                value={prefixExperss8}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss8
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                8) ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss8
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss8
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss8,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 9 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_8"
                                className="mr-2 rounded"
                                value={prefixExperss9}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss9
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                9) ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss9
                            ) && (
                                    <input
                                        type="number"
                                        name="amount_per_month"
                                        placeholder="....บาท/เดือน"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss9
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss9,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 10 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_9"
                                className="mr-2 rounded"
                                value={prefixExperss10}
                                checked={formData.Householdexpenses.some(
                                    (item) => item.expenses_type === prefixExperss10
                                )}
                                onChange={handleHouseholdChange}
                            />
                            <label htmlFor="" className="font text-black mr-2">
                                10) ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง
                                บุหรี่ ยาสูบ รวม
                            </label>
                            {formData.Householdexpenses.some(
                                (item) => item.expenses_type === prefixExperss10
                            ) && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        value={
                                            formData.Householdexpenses.find(
                                                (item) => item.expenses_type === prefixExperss10
                                            )?.amount_per_month || ""
                                        }
                                        onChange={(e) =>
                                            handletInputHouseholdChange(
                                                prefixExperss10,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                        </div>
                        {/* 11 */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="expenses_type_10"
                                className="mr-2 rounded"
                                value={prefixExperss11}
                                checked={formData.Householdexpenses.some((item) =>
                                    item.expenses_type.startsWith(prefixExperss11)
                                )}
                                onChange={handleOtherCheckboxClear}
                            />
                            <label
                                htmlFor="expenses_type_10"
                                className="font text-black mr-2"
                            >
                                11) ค่าใช้จ่ายอื่น ๆ (ระบุ)
                            </label>
                            {formData.Householdexpenses.some((item) =>
                                item.expenses_type.startsWith(prefixExperss11)
                            ) && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="ระบุค่าใช้จ่าย..."
                                            name="expenses_type"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                            value={
                                                formData.Householdexpenses.find((item) =>
                                                    item.expenses_type.startsWith(prefixExperss11)
                                                )?.expenses_type.slice(prefixExperss11.length + 1) || ""
                                            }
                                            onChange={(e) =>
                                                handletOrtherInputHouseholdChange(e.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            name="amount_per_month"
                                            placeholder="....บาท/เดือน"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-4"
                                            value={
                                                formData.Householdexpenses.find((item) =>
                                                    item.expenses_type.startsWith(prefixExperss11)
                                                )?.amount_per_month || ""
                                            }
                                            onChange={handleOtherExpenseChange}
                                        />
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="การออมในครัวเรือน"
                show={savingModal}
                icon="material-symbols:person-edit-rounded"
                onClose={(e) => setSavingModal(false)}
                size="3xl"
            >
                {/* Section 4: Does the household have savings? */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5">
                        4. ครัวเรือนของท่านมีการออมหรือไม่
                    </h3>
                    <div className="pl-10">
                        {/* Radio buttons for "ไม่มี" */}
                        <div className="mt-3">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-600 mr-2"
                                    id="is_has_saving_0"
                                    name="is_has_saving"
                                    value={false}
                                    onChange={handleSavingChange}
                                    checked={
                                        formData.Saving &&
                                        formData.Saving[0]?.is_has_saving === false
                                    }
                                />
                                <span className="font text-black mr-2">0) ไม่มี</span>
                            </label>
                        </div>

                        {/* Radio buttons for "มี" */}
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-600 mr-2"
                                    id="is_has_saving_1"
                                    name="is_has_saving"
                                    value={true}
                                    checked={
                                        formData.Saving?.length === 0 ||
                                        formData.Saving[0]?.is_has_saving === true
                                    }
                                    onChange={handleRadio1Change}
                                />
                                <span className="font text-black mr-2">
                                    1) มี (ระบุประเภทการออม)
                                </span>
                            </label>
                            {(formData.Saving?.length === 0 ||
                                formData.Saving[0]?.is_has_saving === true) && (
                                    <div className="mt-5 bg-white p-4 rounded-lg  max-w-4xl overflow-x-auto">
                                        <table className="table-auto border-collapse table-fixed " style={{ width: '800px' }} >
                                            <thead>
                                                <tr>
                                                    <th className="border px-4 py-2 bg-gray-200 text-black " style={{ width: "50%" }}>
                                                        ประเภทการออม
                                                    </th>
                                                    <th className="border px-4 py-2 bg-gray-200 text-black " style={{ width: "50%" }}>
                                                        จำนวนเงินรวม (บาท)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_0"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value="เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                                                checked={formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                                                )}
                                                                onChange={handleSavingCheckBoxChange}
                                                            />
                                                            <span>
                                                                1. เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย
                                                                พระเครื่อง ของสะสมที่มีค่า)
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_0"
                                                            name="amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            value={
                                                                formData.Saving.find(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                                                )?.amount || "" // แสดงค่าจำนวนเงินหรือเว้นว่างถ้าไม่มีข้อมูล
                                                            }
                                                            disabled={
                                                                !formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                                                )
                                                            }
                                                            onChange={(e) =>
                                                                handleAmountChange(
                                                                    e,
                                                                    "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_1"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value="เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                                                checked={formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                                                )}
                                                                onChange={handleSavingCheckBoxChange}
                                                            />
                                                            <span>
                                                                2. เงินฝากกับสถาบันการเงิน (ธนาคาร
                                                                หน่วยประกันชีวิต)
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_1"
                                                            name="amount"
                                                            value={
                                                                formData.Saving.find(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                                                )?.amount || "" // แสดงค่าจำนวนเงินหรือเว้นว่างถ้าไม่มีข้อมูล
                                                            }
                                                            disabled={
                                                                !formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                                                )
                                                            }
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            onChange={(e) =>
                                                                handleAmountChange(
                                                                    e,
                                                                    "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_2"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value="เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                                                checked={formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                                                )}
                                                                onChange={handleSavingCheckBoxChange}
                                                            />
                                                            <span>
                                                                3. เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน
                                                                กลุ่มสัจจะ กองทุนหมู่บ้าน
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_2"
                                                            name="amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            value={
                                                                formData.Saving.find(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                                                )?.amount || ""
                                                            }
                                                            disabled={
                                                                !formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                                                )
                                                            }
                                                            onChange={(e) =>
                                                                handleAmountChange(
                                                                    e,
                                                                    "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_3"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value="พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                                                checked={formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                                                )}
                                                                onChange={handleSavingCheckBoxChange}
                                                            />
                                                            <span>
                                                                4. พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_3"
                                                            name="amount"
                                                            value={
                                                                formData.Saving.find(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                                                )?.amount || ""
                                                            }
                                                            disabled={
                                                                !formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                                                )
                                                            }
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            onChange={(e) =>
                                                                handleAmountChange(
                                                                    e,
                                                                    "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_4"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value="กองทุนการออมแห่งชาติ (กอช.)"
                                                                onChange={handleSavingCheckBoxChange}
                                                                checked={formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "กองทุนการออมแห่งชาติ (กอช.)"
                                                                )}
                                                            />
                                                            <span>5. กองทุนการออมแห่งชาติ (กอช.)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_4"
                                                            name="amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            value={
                                                                formData.Saving.find(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "กองทุนการออมแห่งชาติ (กอช.)"
                                                                )?.amount || ""
                                                            }
                                                            disabled={
                                                                !formData.Saving.some(
                                                                    (item) =>
                                                                        item.saving_type ===
                                                                        "กองทุนการออมแห่งชาติ (กอช.)"
                                                                )
                                                            }
                                                            onChange={(e) =>
                                                                handleAmountChange(
                                                                    e,
                                                                    "กองทุนการออมแห่งชาติ (กอช.)"
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border px-4 py-3">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="saving_type_5"
                                                                name="saving_type"
                                                                className="form-checkbox text-blue-600 mr-2 rounded"
                                                                value={prefixSaving}
                                                                checked={formData.Saving.some((item) =>
                                                                    item.saving_type.startsWith(prefixSaving)
                                                                )}
                                                                onChange={handleOtherSavingChange}
                                                            />
                                                            <span>6. การออมอื่นๆ </span>
                                                            {formData.Saving.some((group) =>
                                                                group.saving_type.startsWith(prefixSaving)
                                                            ) && (
                                                                    <input
                                                                        type="text"
                                                                        placeholder="ระบุ..."
                                                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                        value={formData.Saving?.find((e) =>
                                                                            e.saving_type.startsWith(prefixSaving)
                                                                        )
                                                                            ?.saving_type.slice(prefixSaving.length)
                                                                            .trim()} // Remove the "prefixSaving" part and leading spaces
                                                                        onChange={handleOtherInputSavingChange}
                                                                    />
                                                                )}
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินบาทรวม"
                                                            id="amount_5"
                                                            name="amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                            value={
                                                                formData.Saving.find((item) =>
                                                                    item.saving_type.startsWith(prefixSaving)
                                                                )?.amount || ""
                                                            }
                                                            disabled={
                                                                !formData.Saving.some((item) =>
                                                                    item.saving_type.startsWith(prefixSaving)
                                                                )
                                                            }
                                                            onChange={(e) =>
                                                                handleOtherAmount(e, prefixSaving)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="หนี้สิน"
                show={debtModal}
                icon="material-symbols:person-edit-rounded"
                onClose={(e) => setDebtModal(false)}
                size="3xl"
            >
                {/* Section 5 */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5">
                        5. ครัวเรือนของท่านมีหนี้สินหรือไม่
                    </h3>
                    <div className="pl-10">
                        {/* Radio option 1 สำหรับ ไม่มีหนี้ */}
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="is_has_debt_0"
                                name="is_has_debt"
                                className="mr-2"
                                checked={formData.Debt[0].is_has_debt === false}
                                value={false}
                                onChange={handleDebtChange}
                            />
                            <label htmlFor="" className="font text-black">
                                1) ไม่มี เนื่องจาก <strong>(เลือกได้ 1 ข้อ)</strong>
                            </label>
                        </div>
                        {formData.Debt[0].is_has_debt === false && (
                            <div className="pl-10">
                                <div className="mb-4">
                                    <input
                                        type="radio"
                                        id="description_0"
                                        name="description"
                                        className="mr-2"
                                        value="ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน"
                                        checked={
                                            formData.Debt[0].description ===
                                            "ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน"
                                        }
                                        onChange={handleDescriptionChange}
                                    />
                                    <label htmlFor="description_0" className="text-black">
                                        ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="radio"
                                        id="description_1"
                                        name="description"
                                        className="mr-2"
                                        value="ไม่มีความสามารถในการชำระคืน"
                                        checked={
                                            formData.Debt[0].description ===
                                            "ไม่มีความสามารถในการชำระคืน"
                                        }
                                        onChange={handleDescriptionChange}
                                    />
                                    <label htmlFor="" className="text-black">
                                        ไม่มีความสามารถในการชำระคืน
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="radio"
                                        id="description_2"
                                        name="description"
                                        className="mr-2"
                                        value="ไม่ต้องการเป็นหนี้"
                                        checked={
                                            formData.Debt[0].description === "ไม่ต้องการเป็นหนี้"
                                        }
                                        onChange={handleDescriptionChange}
                                    />
                                    <label htmlFor="" className="text-black">
                                        ไม่ต้องการเป็นหนี้
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="radio"
                                        id="description_3"
                                        name="description"
                                        className="mr-2"
                                        value={prefix}
                                        checked={formData.Debt[0].description.startsWith(prefix)}
                                        onChange={handleDescriptionChange}
                                    />
                                    <label htmlFor="description_3" className="text-black">
                                        อื่น ๆ (ระบุ)
                                    </label>
                                    {formData.Debt[0].description.startsWith(prefix) && (
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-[10px]"
                                            placeholder="ระบุ...."
                                            value={
                                                formData.Debt[0].description.startsWith(`${prefix}:`)
                                                    ? formData.Debt[0].description.replace(
                                                        `${prefix}: `,
                                                        ""
                                                    )
                                                    : ""
                                            }
                                            onChange={handleOtherDescriptionChange}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Radio option 2 สำหรับ มีหนี้ */}
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="is_has_debt_1"
                                name="is_has_debt"
                                className="mr-2"
                                value={true}
                                checked={formData.Debt[0].is_has_debt === true}
                                onChange={handleDebtChange}
                            />
                            <label htmlFor="has-debt" className="font text-black">
                                2) มี <strong>(ตอบได้มากกว่า 1 ข้อ)</strong>
                            </label>
                        </div>
                        {formData.Debt[0].is_has_debt === true && (
                            <div className="mt-5 bg-white p-4 rounded-lg  max-w-4xl overflow-x-auto">
                                <table
                                    className="table-auto border-collapse table-fixed"
                                    style={{ width: '800px' }}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                className="border px-4 py-2 bg-gray-200 text-black"
                                                style={{ width: "60%" }}
                                            >
                                                แหล่งสินเชื่อ <br />
                                                (สถาบันการเงิน/ กองทุน/ เงินบุคคล)
                                            </th>
                                            <th
                                                className="border px-4 py-2 bg-gray-200 text-black"
                                                style={{ width: "40%" }}
                                            >
                                                จำนวนเงินกู้ที่คงค้าง (บาท)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="form_0"
                                                        name="form"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        value="ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        1. ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    id="outstanding_amount_0"
                                                    name="outstanding_amount"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_1"
                                                        name="form"
                                                        value="ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        2. ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า
                                                        ร้อยละ 15 ต่อปี)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_1"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_2"
                                                        name="form"
                                                        value="กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        3. กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์
                                                        และกลุ่มกองทุน)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    id="outstanding_amount_2"
                                                    name="outstanding_amount"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_3"
                                                        name="form"
                                                        value={prefixCredit2}
                                                        checked={formData.Creditsources.some((source) =>
                                                            source.form.startsWith(prefixCredit2)
                                                        )}
                                                        onChange={(e) =>
                                                            handleOtherFormChange(e, prefixCredit2)
                                                        }
                                                    />
                                                    <span>4. {prefixCredit2}</span>
                                                    {formData.Creditsources.some((source) =>
                                                        source.form.startsWith(prefixCredit2)
                                                    ) && (
                                                            <input
                                                                type="text"
                                                                placeholder="อื่นๆ ระบุ"
                                                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                value={
                                                                    formData.Creditsources.find((source) =>
                                                                        source.form.startsWith(prefixCredit2)
                                                                    )?.form.slice(prefixCredit2.length + 1) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleOtherInputChange(e, prefixCredit2)
                                                                }
                                                            />
                                                        )}
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_3"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find((source) =>
                                                            source.form.startsWith(prefixCredit2)
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOtherOutstandingAmount(
                                                            prefixCredit2,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_4"
                                                        name="form"
                                                        value="ธนาคารเพื่อการเกษตรและสหกรณ์"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form === "ธนาคารเพื่อการเกษตรและสหกรณ์"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>5. ธนาคารเพื่อการเกษตรและสหกรณ์</span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_4"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form === "ธนาคารเพื่อการเกษตรและสหกรณ์"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ธนาคารเพื่อการเกษตรและสหกรณ์"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_5"
                                                        name="form"
                                                        value="ธนาคารออมสิน"
                                                        checked={formData.Creditsources.some(
                                                            (item) => item.form === "ธนาคารออมสิน"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>6. ธนาคารออมสิน</span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_5"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) => item.form === "ธนาคารออมสิน"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ธนาคารออมสิน"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_6"
                                                        name="form"
                                                        value="ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        7. ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์
                                                        กรุงไทย อิสลาม SME ธอส. ฯลฯ)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_6"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                                                        )
                                                    }
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_7"
                                                        name="form"
                                                        value="สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        8. สถาบันการเงินเอกชน (ไฟแนนซ์,
                                                        บัตรกดเงินสด/บัตรผ่อนสินค้า)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_7"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_8"
                                                        name="form"
                                                        value="ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        9. ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา
                                                        เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_8"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_9"
                                                        name="form"
                                                        value="เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        10. เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15
                                                        ต่อปี)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_9"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_10"
                                                        name="form"
                                                        value="กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                                                        checked={formData.Creditsources.some(
                                                            (item) =>
                                                                item.form ===
                                                                "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                                                        )}
                                                        onChange={(e) => handleCreditSourceChange(e, 0)}
                                                    />
                                                    <span>
                                                        11. กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
                                                        กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้
                                                        ในอนาคต (กอร.)
                                                    </span>
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_10"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    value={
                                                        formData.Creditsources.find(
                                                            (item) =>
                                                                item.form ===
                                                                "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                                                        )?.outstanding_amount || ""
                                                    }
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    onChange={(e) =>
                                                        handleOutstandingAmountChange(
                                                            e.target.value,
                                                            "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-600 mr-2 rounded"
                                                        id="form_11"
                                                        name="form"
                                                        value={prefixCredit}
                                                        checked={formData.Creditsources.some((source) =>
                                                            source.form.startsWith(prefixCredit)
                                                        )}
                                                        onChange={(e) =>
                                                            handleOtherFormChange(e, prefixCredit)
                                                        }
                                                    />
                                                    <span>12. {prefixCredit}</span>
                                                    {formData.Creditsources.some((source) =>
                                                        source.form.startsWith(prefixCredit)
                                                    ) && (
                                                            <input
                                                                type="text"
                                                                placeholder="(ระบุ)......................"
                                                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                value={
                                                                    formData.Creditsources.find((source) =>
                                                                        source.form.startsWith(prefixCredit)
                                                                    )?.form.slice(prefixCredit.length + 1) || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleOtherInputChange(e, prefixCredit)
                                                                }
                                                            />
                                                        )}
                                                </label>
                                            </td>
                                            <td className="border px-4 py-3">
                                                <input
                                                    type="number"
                                                    id="outstanding_amount_11"
                                                    name="outstanding_amount"
                                                    placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-2/2"
                                                    value={
                                                        formData.Creditsources.find((source) =>
                                                            source.form.startsWith(prefixCredit)
                                                        )?.outstanding_amount || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleOtherOutstandingAmount(
                                                            prefixCredit,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div >
    );
};
export default Householdtracking;