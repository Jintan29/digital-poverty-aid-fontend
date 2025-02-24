import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const AddDebtModal = ({ show, onClose, household, reloadData }) => {
    const [formData, setFormData] = useState({
        Creditsources: [],
    });

    const prefix = "อื่น ๆ";
    const prefixCredit = "แหล่งอื่น ๆ";
    const prefixCredit2 =
        "กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)";

    const handleCreditSourceChange = (e, amount) => {
        const { checked, value } = e.target;

        setFormData((prevFormData) => {
            let updatedCreditsources = [...prevFormData.Creditsources];

            if (checked) {
                updatedCreditsources.push({
                    form: value,
                    outstanding_amount: amount || 0,
                });
            } else {
                updatedCreditsources = updatedCreditsources.filter(
                    (item) => item.form !== value
                );
            }

            return {
                ...prevFormData,
                Creditsources: updatedCreditsources,
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

    // const handleSubmit = async (e) => {
    //     console.log("formData", formData);
    // }

    const validateFormData = (formData) => {
        // ตรวจสอบว่ามีการเลือกแหล่งสินเชื่อหรือไม่
        if (formData.Creditsources.length === 0) {
            Swal.fire("ข้อผิดพลาด", "กรุณาเลือกแหล่งสินเชื่ออย่างน้อย 1 รายการ", "error");
            return false;
        }

        // ตรวจสอบว่าฟอร์ม "อื่น ๆ" (prefixCredit2 และ prefixCredit) ถูกกรอกครบถ้วนหรือไม่
        for (const prefix of [prefixCredit2, prefixCredit]) {
            const otherSource = formData.Creditsources.find((source) =>
                source.form.startsWith(prefix)
            );
            if (otherSource) {
                const description = otherSource.form.slice(prefix.length).trim();
                if (!description) {
                    Swal.fire(
                        "ข้อผิดพลาด",
                        `กรุณาระบุข้อมูลเพิ่มเติมสำหรับ "${prefix}"`,
                        "error"
                    );
                    return false;
                }
            }
        }

        // ตรวจสอบว่าแหล่งสินเชื่อที่เลือก มีการกรอกจำนวนเงินหรือไม่
        for (const credit of formData.Creditsources) {
            if (!credit.outstanding_amount || credit.outstanding_amount <= 0) {
                Swal.fire(
                    "ข้อผิดพลาด",
                    `กรุณากรอกจำนวนเงินสำหรับแหล่งสินเชื่อ: "${credit.form}"`,
                    "error"
                );
                return false;
            }
        }

        // ผ่านการตรวจสอบ
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // เรียกฟังก์ชัน validateFormData เพื่อตรวจสอบข้อมูล
        if (!validateFormData(formData)) {
            return; // หยุดการดำเนินการหากข้อมูลไม่ถูกต้อง
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
                    `${config.api_path}/house-hold/create-creditsource/${household.id}`,
                    formData.Creditsources, // Include the NonAGIincome array in the request body
                    config.headers()
                );


                if (response.data.message === "Creditsource created successfully") {
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
        <Modal
            title="แหล่งสินเชื่อ"
            show={show}
            onClose={onClose}
            size="6xl"
        >
            <div className="mt-5 bg-white p-4 rounded-lg  max-w-4xl overflow-x-auto">
                {/* <h3 className="text-lg font-bold text-black mb-5">
                    หนี้สินครัวเรือน
                </h3> */}
                <table
                    className=" border-collapse table-fixed"
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
    );
};

export default AddDebtModal;
