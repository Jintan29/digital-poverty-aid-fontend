import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const AddExpensesModal = ({ show, onClose, household, reloadData }) => {

    const [formData, setFormData] = useState({
        Householdexpenses: [
            // {
            //     expenses_type: " ",
            //     amount_per_month: 0.0,
            // }
        ],
    });
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
    // Validator function
    const validateFormData = () => {
        const { Householdexpenses } = formData;

        // ตรวจสอบว่ามีการเลือกอย่างน้อย 1 รายการ
        if (Householdexpenses.length === 0) {
            Swal.fire("ข้อผิดพลาด", "กรุณาเลือกค่าใช้จ่ายอย่างน้อย 1 รายการ", "error");
            return false;
        }

        // ตรวจสอบว่าทุกรายการที่เลือก มีการกรอกจำนวนเงิน
        for (const item of Householdexpenses) {
            if (!item.amount_per_month || item.amount_per_month <= 0) {
                Swal.fire(
                    "ข้อผิดพลาด",
                    `กรุณากรอกจำนวนเงินใน "${item.expenses_type}"`,
                    "error"
                );
                return false;
            }

            // ตรวจสอบว่ารายการ "ค่าใช้จ่ายอื่น ๆ" มีการกรอกคำอธิบาย
            if (item.expenses_type.startsWith(prefixExperss11) &&
                (!item.expenses_type.trim() || item.expenses_type === prefixExperss11)) {
                Swal.fire(
                    "ข้อผิดพลาด",
                    "กรุณาระบุคำอธิบายสำหรับค่าใช้จ่ายอื่น ๆ",
                    "error"
                );
                return false;
            }
        }

        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // เรียก validator function
        if (!validateFormData()) {
            return; // หาก validation ไม่ผ่าน ให้หยุดการทำงาน
        }


        try {
            const res = await Swal.fire({
                title: "เพิ่มข้อมูล",
                text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "ใช่",
                cancelButtonText: "ยกเลิก",
            });

            if (res.isConfirmed) {
                // Send NonAGIincome data to the API
                const response = await axios.post(
                    // console.log("data", formData.Householdexpenses),
                    `${config.api_path}/house-hold/create-expenses/${household.id}`,
                    formData.Householdexpenses, // Include the NonAGIincome array in the request body
                    config.headers()
                );


                if (response.data.message === "Householdexpenses created successfully") {
                    await Swal.fire({
                        title: "บันทึกข้อมูล",
                        text: "บันทึกข้อมูลสำเร็จ",
                        icon: "success",
                    });
                }
                reloadData();
                onClose();
            }
        } catch (error) {
            console.error("Error response:", error.response?.data);
            Swal.fire("เกิดข้อผิดพลาด", error.response?.data?.message || error.message, "error");
        }
    }
    return (
        <>
            <Modal
                title="รายจ่าย"
                show={show}
                icon="material-symbols:person-edit-rounded"
                onClose={onClose}
                size="3xl"
            >
                {/* Section 3: รายจ่ายครัวเรือน */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5 ">
                        รายจ่ายครัวเรือน (นอกเหนือจากการลงทุนเพื่อการผลิต)
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
                                onChange={(e) => handleOtherCheckboxClear(e.target.checked)}
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
                                            onChange={(e) => handleOtherExpenseChange(e.target.value)}
                                        />
                                    </>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        บันทึกข้อมูล
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default AddExpensesModal;