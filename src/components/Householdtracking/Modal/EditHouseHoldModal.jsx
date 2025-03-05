import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
 
const EditHouseHoldModal = ({ show, onClose, household, reloadData }) => {
    // สร้าง state เพื่อเก็บข้อมูลฟอร์ม
    const [formData, setFormData] = useState({
        host_title: household?.host_title || "",
        host_fname: household?.host_fname || "",
        host_lname: household?.host_lname || "",
        host_national_id: household?.host_national_id || "",
        has_greenBook: household?.green_book_id ? true : false,
        green_book_id: household?.green_book_id || "",
        house_number: household?.house_number || "",
        house_code: household?.house_code || "",
        village: household?.village || "",
        road: household?.road || "",
        alley: household?.alley || "",
        district: household?.district || "",
        subdistrict: household?.subdistrict || "",
        province: household?.province || "",
        postcode: household?.postcode || "",
    });
    // ตั้งค่าข้อมูลเริ่มต้นเมื่อ household เปลี่ยนแปลง
    useEffect(() => {
        if (show) {
            // ตั้งค่าข้อมูลเริ่มต้นเมื่อ modal แสดง
            setFormData({
                host_title: household?.host_title || "",
                host_fname: household?.host_fname || "",
                host_lname: household?.host_lname || "",
                host_national_id: household?.host_national_id || "",
                has_greenBook: household?.green_book_id ? true : false,
                green_book_id: household?.green_book_id || "",
                house_number: household?.house_number || "",
                house_code: household?.house_code || "",
                village: household?.village || "",
                road: household?.road || "",
                alley: household?.alley || "",
                district: household?.district || "",
                subdistrict: household?.subdistrict || "",
                province: household?.province || "",
                postcode: household?.postcode || "",
            });
        }

        // ตรวจสอบว่ามีอำเภอที่เลือกและอัปเดตตำบลที่เกี่ยวข้อง
        if (household?.district && districtSubdistrictMap[household.district]) {
            setAvailableSubdistricts(districtSubdistrictMap[household.district]);
        } else {
            setAvailableSubdistricts([]);
        }
    }, [show, household]);
    //validator
    const validateFormData = (formData) => {
        // ตรวจสอบว่าหมายเลขบัตรประชาชนเป็นตัวเลข 13 หลัก
        if (!/^\d{13}$/.test(formData.host_national_id)) {
            Swal.fire("ข้อผิดพลาด", "หมายเลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก", "error");
            return false;
        }
    
        // ตรวจสอบว่ากรอกหมายเลขสมุดเกษตรเมื่อเลือก "มีสมุดเกษตร"
        if (formData.has_greenBook && !formData.green_book_id) {
            Swal.fire("ข้อผิดพลาด", "กรุณากรอกหมายเลขสมุดเกษตร", "error");
            return false;
        }
    
        // ตรวจสอบว่าหมายเลขสมุดเกษตรเป็นตัวเลข 12 หลักเมื่อเลือก "มีสมุดเกษตร"
        if (formData.has_greenBook && !/^\d{12}$/.test(formData.green_book_id)) {
            Swal.fire("ข้อผิดพลาด", "หมายเลขสมุดเกษตรต้องเป็นตัวเลข 12 หลัก", "error");
            return false;
        }
    
        // ตรวจสอบว่ารหัสไปรษณีย์เป็นตัวเลขเท่านั้น
        if (!/^\d+$/.test(formData.postcode)) {
            Swal.fire("ข้อผิดพลาด", "รหัสไปรษณีย์ต้องเป็นตัวเลข", "error");
            return false;
        }
    
        // ผ่านการตรวจสอบ
        return true;
    };
    // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedForm = { ...prev, [name]: value };

            // รีเซ็ตค่าตำบลเมื่อเปลี่ยนอำเภอ
            if (name === "district") {
                updatedForm.subdistrict = ""; // รีเซ็ตตำบล
            }

            return updatedForm;
        });
    };
    // ฟังก์ชันบันทึกข้อมูล
    const handleSubmit = async (e) => {
        e.preventDefault();

        // เรียกใช้ฟังก์ชัน validateFormData
        if (!validateFormData(formData)) {
            return; // หาก validation ไม่ผ่าน ให้หยุดการทำงาน
        }

        try {
            const res = await Swal.fire({
                title: "แก้ไขข้อมูล",
                text: "ตรวจสอบข้อมูลถูกต้องแล้วใช่หรือไม่",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "ใช่",
                cancelButtonText: "ยกเลิก",
            });

            if (res.isConfirmed) {
                const res = await axios.patch(config.api_path + `/house-hold/update/${household.id}`,
                    formData,
                    config.headers(),
                )
                // await axios.put(
                //     `${config.api_path}/house-hold/update/${household.id}`, // Correct endpoint
                //     formData, // Data payload
                //     config.headers() // Headers
                // );
                if (res.data.msg === 'success') {
                    await Swal.fire({
                        title: 'บันทึกข้อมูล',
                        text: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success'
                    })
                }
                // await Swal.fire("สำเร็จ", "แก้ไขข้อมูลสำเร็จแล้ว", "success");
                reloadData(); // Reload data
                onClose(); // Close modal
            }
        } catch (error) {
            Swal.fire("เกิดข้อผิดพลาด", error.response?.data?.message || error.message, "error");
        }
    };
    const districtSubdistrictMap = {
        "ชาติตระการ": ["ป่าแดง", "ชาติตระการ", "สวนเมี่ยง", "บ้านดง", "บ่อภาค", "ท่าสะแก"],
        "นครไทย": [
            "นครไทย",
            "หนองกะท้าว",
            "บ้านแยง",
            "เนินเพิ่ม",
            "นาบัว",
            "นครชุม",
            "น้ำกุ่ม",
            "ยางโกลน",
            "บ่อโพธิ์",
            "บ้านพร้าว",
            "ห้วยเฮี้ย",
        ],
        "อำเภอเมืองพิษณุโลก": [
            "ในเมือง", "วังน้ำคู้", "วัดจันทร์", "วัดพริก",
            "ท่าทอง", "ท่าโพธิ์", "สมอแข", "ดอนทอง",
            "บ้านป่า", "ปากโทก", "หัวรอ", "จอมทอง",
            "บ้านกร่าง", "บ้านคลอง", "พลายชุมพล", "มะขามสูง",
            "อรัญญิก", "บึงพระ", "ไผ่ขอดอน", "งิ้วงาม",
        ],

        "เนินมะปราง": ["ชมพู", "บ้านมุง", "ไทรย้อย", "วังโพรง", "บ้านน้อยซุ้มขี้เหล็ก", "เนินมะปราง", "วังยาง"],
        "บางกระทุ่ม": [
            "บางกระทุ่ม",
            "บ้านไร่",
            "โคกสลุด",
            "สนามคลี",
            "ท่าตาล",
            "ไผ่ล้อม",
            "นครป่าหมาก",
            "เนินกุ่ม",
            "วัดตายม",
        ],
        "บางระกำ": [
            "บางระกำ",
            "ปลักแรด",
            "พันเสา",
            "วังอิทก",
            "บึงกอก",
            "หนองกุลา",
            "ชุมแสงสงคราม",
            "นิคมพัฒนา",
            "บ่อทอง",
            "ท่านางงาม",
            "คุยม่วง",
        ],
        "พรหมพิราม": [
            "พรหมพิราม",
            "ท่าช้าง",
            "วงฆ้อง",
            "มะตูม",
            "หอกลอง",
            "ศรีภิรมย์",
            "ตลุกเทียม",
            "วังวน",
            "หนองแขม",
            "มะต้อง",
            "ทับยายเชียง",
            "ดงประคำ",
        ],
        "วังทอง": [
            "วังทอง",
            "พันชาลี",
            "แม่ระกา",
            "บ้านกลาง",
            "วังพิกุล",
            "แก่งโสภา",
            "ท่าหมื่นราม",
            "วังนกแอ่น",
            "หนองพระ",
            "ชัยนาม",
            "ดินทอง",
        ],
        "วัดโบสถ์": ["วัดโบสถ์", "ท่างาม", "ทองแท้", "บ้านยาง", "หินลาด", "คันโช้ง"],
    };
    //เก็บอำเภอที่เลือก
    const [availableSubdistricts, setAvailableSubdistricts] = useState([]);
    return (
        <>
            <Modal
                title="เพิ่ม/แก้ไข ข้อมูลครัวเรือน"
                show={show}
                icon="material-symbols:person-edit-rounded"
                onClose={onClose}
                size="3xl"
            >
                <div className="grid gap-2 grid-cols-2">
                    {/* ชื่อจริง */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อจริง (เจ้าของบ้าน)
                        </label>
                        <div className="flex items-center gap-2 mb-5">
                            <select
                                id="host_title"
                                name="host_title"
                                value={formData.host_title}
                                onChange={handleChange}
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
                                id="host_fname"
                                name="host_fname"
                                type="text"
                                value={formData.host_fname}
                                onChange={handleChange}
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
                    {/* นามสกุล */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            นามสกุล (เจ้าของบ้าน)
                        </label>
                        <input
                            id="host_lname"
                            name="host_lname"
                            type="text"
                            value={formData.host_lname}
                            onChange={handleChange}
                            required
                            placeholder=""
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm 
                   rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 
                   w-full dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400 dark:text-white 
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* หมายเลขบัตรประจำตัวประชาชน */}
                    <div>
                        <label
                            htmlFor="host_national_id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            หมายเลขบัตรประจำตัวประชาชน (เจ้าของบ้าน)
                        </label>
                        <input
                            type="text"
                            id="host_national_id"
                            name="host_national_id"
                            value={formData.host_national_id}
                            onChange={handleChange}
                            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                    {/* สมุดเกษตร */}
                    {/* <div>
                        <label
                            htmlFor="green_book_id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            สมุดเกษตร
                        </label>
                        {formData.green_book_id ? (
                            <input
                                type="text"
                                id="green_book_id"
                                name="green_book_id"
                                value={formData.green_book_id}
                                onChange={handleChange}
                                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="กรอกหมายเลขสมุดเกษตร"
                            />
                        ) : (
                            <p className="text-gray-500 text-sm italic">ไม่มีสมุดเกษตร</p>
                        )}
                    </div> */}
                    {/* สมุดเกษตร */}
                    <div className="ml-12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                            สมุดเกษตร
                        </label>
                        <div className="flex items-center gap-4">
                            {/* Radio button: มี */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="has_greenBook_yes"
                                    name="has_greenBook"
                                    value="true"
                                    checked={formData.has_greenBook === true}
                                    onChange={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            has_greenBook: true,
                                        }))
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 focus:ring-2 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="has_greenBook_yes" className="text-sm font-medium text-gray-900 dark:text-white">
                                    มี
                                </label>
                            </div>
                            {/* Radio button: ไม่มี */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="has_greenBook_no"
                                    name="has_greenBook"
                                    value="false"
                                    checked={formData.has_greenBook === false}
                                    onChange={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            has_greenBook: false,
                                            green_book_id: "", // Clear green_book_id when "ไม่มี" is selected
                                        }))
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="has_greenBook_no" className="text-sm font-medium text-gray-900 dark:text-white">
                                    ไม่มี
                                </label>
                            </div>
                        </div>
                        {/* Input field for Green Book ID */}
                        {formData.has_greenBook && (
                            <div className="mt-4">
                                <label
                                    htmlFor="green_book_id"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    หมายเลขสมุดเกษตร
                                </label>
                                <input
                                    type="text"
                                    id="green_book_id"
                                    name="green_book_id"
                                    value={formData.green_book_id}
                                    onChange={handleChange}
                                    className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="กรอกหมายเลขสมุดเกษตร"
                                    required
                                />
                            </div>
                        )}
                    </div>
                    {/* ข้อมูลที่อยู่ */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            บ้านเลขที่
                        </label>
                        <input
                            type="text"
                            id="house_number"
                            name="house_number"
                            value={formData.house_number}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            รหัสบ้าน
                        </label>
                        <input
                            type="text"
                            id="house_code"
                            name="house_code"
                            value={formData.house_code}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อหมู่บ้าน
                        </label>
                        <input
                            type="text"
                            id="village"
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
                    </div>
                    {/* อำเภอ */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            อำเภอ
                        </label>
                        {/* <input
                            type="text"
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        /> */}
                        <select
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">เลือกอำเภอ</option>
                            {Object.keys(districtSubdistrictMap).map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* ตำบล */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ตำบล
                        </label>
                        {/* <input
                            type="text"
                            id="subdistrict"
                            name="subdistrict"
                            value={formData.subdistrict}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        /> */}
                        <select
                            id="subdistrict"
                            name="subdistrict"
                            value={formData.subdistrict}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">เลือกตำบล</option>
                            {availableSubdistricts.map((subdistrict) => (
                                <option key={subdistrict} value={subdistrict}>
                                    {subdistrict}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            รหัสไปรษณีย์
                        </label>
                        <input
                            type="text"
                            id="postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ถนน
                        </label>
                        <input
                            type="text"
                            id="road"
                            name="road"
                            value={formData.road}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ซอย
                        </label>
                        <input
                            type="text"
                            id="alley"
                            name="alley"
                            value={formData.alley}
                            onChange={handleChange}
                            className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
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

export default EditHouseHoldModal;

