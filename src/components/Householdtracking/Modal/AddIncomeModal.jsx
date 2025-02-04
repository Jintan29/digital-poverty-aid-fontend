import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const AddIncomeModal = ({ show, onClose, household, reloadData }) => {
    const [formData, setFormData] = useState({
        NonAGIincome: [
            // {
            //     income_type: " ",
            //     amount_per_yaer: 0.0,
            //     cost_per_year: 0.0,
            // }
        ]
    });
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

    //validator
    const validateFormData = () => {
        let isValid = true;
    
        // ตรวจสอบว่ามีการเลือกข้อมูลอย่างน้อย 1 รายการ
        if (formData.NonAGIincome.length === 0) {
            Swal.fire("ข้อผิดพลาด", "กรุณาเลือกอย่างน้อย 1 รายการ", "error");
            isValid = false;
        }
    
        // ตรวจสอบข้อมูลในแต่ละรายการ
        formData.NonAGIincome.forEach((item) => {
            // ตรวจสอบว่า amount_per_year ถูกกรอกและเป็นตัวเลขมากกว่า 0
            if (!item.amount_per_year || item.amount_per_year <= 0) {
                Swal.fire(
                    "ข้อผิดพลาด",
                    `กรุณากรอกจำนวนเงินสำหรับ "${item.income_type}"`,
                    "error"
                );
                isValid = false;
            }
    
            // ตรวจสอบว่า cost_per_year ถูกกรอกและเป็นตัวเลข (อนุญาตให้เป็น 0 ได้)
            if (item.cost_per_year === null || item.cost_per_year === undefined || isNaN(item.cost_per_year)) {
                Swal.fire(
                    "ข้อผิดพลาด",
                    `กรุณากรอกต้นทุนที่ถูกต้องสำหรับ "${item.income_type}"`,
                    "error"
                );
                isValid = false;
            }
        });
    
        return isValid;
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // เรียกใช้ฟังก์ชัน validateFormData
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
                    `${config.api_path}/house-hold/create-nonagiincome/${household.id}`,
                    formData.NonAGIincome, // Include the NonAGIincome array in the request body
                    config.headers()
                );


                if (response.data.message === "NonAGIincome records created successfully") {
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
    };


    return (
        <>
            <Modal
                title="รายรับ"
                show={show}
                icon="material-symbols:person-edit-rounded"
                onClose={onClose}
                size="3xl"
            >
                {/* Section 2 รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)*/}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5 ">
                         รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)
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
export default AddIncomeModal;