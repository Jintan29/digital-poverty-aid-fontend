import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";

const AddSavingModal = ({ show, onClose, household, reloadData }) => {
    const [formData, setFormData] = useState({
        Saving: [
        ],
    });
    //Saving
    const prefixSaving = "การออมอื่นๆ";

    const handleSavingCheckBoxChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevFormData) => {
            const updatedSaving = [...prevFormData.Saving];

            if (checked) {
                // ตรวจสอบก่อนเพิ่มข้อมูลว่าประเภทนี้ยังไม่มีใน `Saving`
                if (!updatedSaving.some((item) => item.saving_type === value)) {
                    updatedSaving.push({
                        is_has_saving: true,
                        saving_type: value,
                        amount: 0.0, // ค่าเริ่มต้น
                    });
                }
            } else {
                // ลบข้อมูลตาม `saving_type` ที่ยกเลิก checkbox
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
                        amount: parseFloat(value) || 0.0, // ปรับค่าตัวเลข หรือ 0.0 หากอินพุตไม่ถูกต้อง
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
                // เพิ่มข้อมูลอื่นๆ หากยังไม่มี
                if (!updatedSaving.some((item) => item.saving_type.startsWith(prefixSaving))) {
                    updatedSaving.push({
                        is_has_saving: true,
                        saving_type: prefixSaving + " ", // เว้นว่างสำหรับการป้อนข้อมูล
                        amount: 0.0,
                    });
                }
            } else {
                // ลบข้อมูลที่ขึ้นต้นด้วย `prefixSaving`
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
                        saving_type: prefixSaving + " " + value.trim(), // เพิ่มข้อความที่ป้อนเข้ามา
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
                item.saving_type.startsWith(savingType)
                    ? {
                        ...item,
                        amount: parseFloat(value) || 0.0, // อัปเดตค่าเป็นตัวเลข หรือ 0.0
                    }
                    : item
            );

            return {
                ...prevFormData,
                Saving: updatedSaving,
            };
        });
    };

    //validate
    const validateForm = () => {
        // ตรวจสอบว่ามีการเลือก Checkbox อย่างน้อย 1 ตัว
        if (formData.Saving.length === 0) {
            Swal.fire("ข้อผิดพลาด", "กรุณาเลือกประเภทการออมอย่างน้อย 1 ตัว", "error");
            return false;
        }
    
        // ตรวจสอบว่า Checkbox ที่เลือกมีการกรอกจำนวนเงิน
        const invalidSavings = formData.Saving.filter(
            (item) => item.amount <= 0 || isNaN(item.amount) // ตรวจสอบว่า `amount` ต้องมากกว่า 0 และไม่ใช่ค่าว่าง
        );
    
        if (invalidSavings.length > 0) {
            Swal.fire(
                "ข้อผิดพลาด",
                "กรุณากรอกจำนวนเงินให้ครบถ้วนสำหรับประเภทการออมที่เลือก",
                "error"
            );
            return false;
        }
    
        // ตรวจสอบกรณี "การออมอื่นๆ" ว่ากรอก `saving_type` ครบถ้วน
        const otherSaving = formData.Saving.find((item) =>
            item.saving_type.startsWith(prefixSaving)
        );
    
        if (otherSaving && otherSaving.saving_type.trim() === prefixSaving.trim()) {
            Swal.fire("ข้อผิดพลาด", "กรุณาระบุประเภทการออมในช่อง 'การออมอื่นๆ'", "error");
            return false;
        }
    
        return true; // หากผ่านทุกเงื่อนไข
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // เรียกฟังก์ชัน validateForm() เพื่อตรวจสอบข้อมูล
        if (!validateForm()) {
            return; // หากไม่ผ่าน validation หยุดการทำงาน
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
                    `${config.api_path}/house-hold/create-saving/${household.id}`,
                    formData.Saving, // Include the NonAGIincome array in the request body
                    config.headers()
                );


                if (response.data.message === "Saving created successfully") {
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
                title="การออมในครัวเรือน"
                show={show}
                icon="material-symbols:person-edit-rounded"
                onClose={onClose}
                size="7xl"
            >
                {/* Section 4: Household Savings */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-5">
                        4. ครัวเรือนของท่านมีการออมหรือไม่
                    </h3>
                    <div className="pl-10">
                        {/* ตารางแสดงข้อมูลการออม */}
                        <div className="mt-5 bg-white p-4 rounded-lg max-w-4xl overflow-x-auto">
                            <table className="table-auto border-collapse table-fixed" style={{ width: '800px' }}>
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2 bg-gray-200 text-black" style={{ width: "50%" }}>
                                            ประเภทการออม
                                        </th>
                                        <th className="border px-4 py-2 bg-gray-200 text-black" style={{ width: "50%" }}>
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
                                                    )?.amount || ""
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
                                                    )?.amount || ""
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
                                                                .trim()}
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
export default AddSavingModal;