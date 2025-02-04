import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";


function AddPinModal({ show, onClose, household, reloadData }) {
    const [formData, setFormData] = useState({
        lat: household?.Form?.PhysicalCapital?.lat || "", // ใช้ค่าพิกัดเก่า ถ้ามี
        lon: household?.Form?.PhysicalCapital?.lon || "", // ใช้ค่าพิกัดเก่า ถ้ามี
    });

    useEffect(() => {
        if (show) {
            // ตั้งค่าข้อมูลเริ่มต้นเมื่อ modal แสดง
            setFormData({
                lat: household?.Form?.PhysicalCapital?.lat || "", // ใช้ค่าพิกัดเก่า ถ้ามี
                lon: household?.Form?.PhysicalCapital?.lon || "", // ใช้ค่าพิกัดเก่า ถ้ามี
            });
        }
    }, [show, household]);

    const handleInputChange = (field, value) => {
        const update = { ...formData }; //clone
        update[field] = value; //assign

        // clear house status in law
        if (field === "is_has_house" && value !== "มีบ้านและที่ดินเป็นของตนเอง") {
            update["house_status_law"] = "";
        }

        if (field === "is_has_house" && value !== "เช่าบ้าน/เช่าห้องอยู่") {
            update["house_rent"] = 0;
        }

        setFormData(update);
    };

    const validateFormData = () => {
        if (!formData.lat || !formData.lon) {
            Swal.fire({
                title: "ข้อผิดพลาด",
                text: "กรุณากรอกค่าพิกัดละติจูดและลองจิจูดให้ครบถ้วน",
                icon: "error",
            });
            return false;
        }

        // ตรวจสอบว่าพิกัดเป็นตัวเลขที่ถูกต้อง
        if (!/^-?\d+(\.\d+)?$/.test(formData.lat) || !/^-?\d+(\.\d+)?$/.test(formData.lon)) {
            Swal.fire({
                title: "ข้อผิดพลาด",
                text: "ค่าพิกัดต้องเป็นตัวเลขที่ถูกต้อง",
                icon: "error",
            });
            return false;
        }

        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // เรียกใช้ฟังก์ชัน validateFormData

        // ตรวจสอบข้อมูลก่อนส่ง
        if (!validateFormData()) {
            return;
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
                    `${config.api_path}/house-hold/createPin/${household.id}`,
                    formData, // Include the NonAGIincome array in the request body
                    config.headers()
                );


                if (response.data.message === "Pin created/updated successfully") {
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
                title=" เพิ่ม/แก้ไข ตำแหน่ง"
                show={show}
                icon="material-symbols:person-edit-rounded"
                onClose={onClose}
                size="3xl"
            >
                <h3 className="text-black text-base font-bold py-2">
                    ให้ระบบ pin location ของบ้านด้วย GIS (ทศนิยม 6-8 ตำแหน่ง)
                </h3>
                {/* pin */}
                <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
                    <div>
                        <label
                            htmlFor="lat"
                            className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
                        >
                            ละติจูด
                        </label>
                        <input
                            type="text"
                            name="lat"
                            value={formData.lat}
                            onChange={(e) => {
                                handleInputChange(e.target.name, e.target.value);
                            }}
                            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lon"
                            className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
                        >
                            ลองจิจูด
                        </label>
                        <input
                            type="text"
                            name="lon"
                            value={formData.lon}
                            onChange={(e) => {
                                handleInputChange(e.target.name, e.target.value);
                            }}
                            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

export default AddPinModal;