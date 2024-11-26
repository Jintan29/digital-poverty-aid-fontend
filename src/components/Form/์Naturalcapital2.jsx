import React, { useState } from "react";

function Naturalcapital2() {
    const [formData, setFormData] = useState(
        {
            Farmlandindisasterareas: {//4
                is_in_disaster: null,
                disaster_type: "",
                frequncy_disaster: "",
                disaster_response: "",
            },
            Houseindisasterareas: { //3
                is_in_disaster: null,
                disaster_type: "",
                frequncy_disaster: "",
                disaster_response: "",
            },
        }
    );

    const [isOtherChecked, setIsOtherChecked] = useState({});
    const [isOtherChecked2, setIsOtherChecked2] = useState({});
    //3
    //false
    const handleHouseFChange = (event) => {
        const { name, value } = event.target;
        setIsOtherChecked({});
        if (name === "is_in_disaster" && value === "false") {
            setFormData((prevData) => ({
                ...prevData,
                Houseindisasterareas: [
                    {
                        is_in_disaster: false,
                        disaster_type: "",
                        frequncy_disaster: "",
                        disaster_response: "",
                    },
                ],
            }));
        }
    };
    //true
    const handleHouseTChange = (event) => {
        const { id } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            Houseindisasterareas: [
                // {
                //     is_in_disaster: null,
                //     disaster_type: "",
                //     frequncy_disaster: "",
                //     disaster_response: "",
                // }
            ], // รีเซ็ตข้อมูลใน Houseindisasterareas ให้ว่าง
        }));
        setIsOtherChecked2((prev) => ({
            ...prev,
            [id]: event.target.checked,
        }));
    };
    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ  text, checkbox
    const handleHouseCheckboxChange = (groupValue, checked) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.Houseindisasterareas];
            const groupIndex = updatedHouse.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (checked) {
                if (groupIndex === -1) {
                    updatedHouse.push({
                        is_in_disaster: true,
                        disaster_type: groupValue,
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }
            } else {
                if (groupIndex !== -1) {
                    updatedHouse.splice(groupIndex, 1);
                }
            }

            return { ...prevState, Houseindisasterareas: updatedHouse };
        });
    };
    //frequncy_disaster
    const handleFrequncy2Change = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.Houseindisasterareas];
            const groupIndex = updatedHouse.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (groupIndex !== -1) {
                updatedHouse[groupIndex].frequncy_disaster = value;
            }

            return { ...prevState, Houseindisasterareas: updatedHouse };
        });
    };
    //disaster_response
    const handleResponse2Change = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.Houseindisasterareas];
            const groupIndex = updatedHouse.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (groupIndex !== -1) {
                updatedHouse[groupIndex].disaster_response = value;
            }

            return { ...prevState, Houseindisasterareas: updatedHouse };
        });
    };
    //other 3
    const [otherHouse, setOtherHouse] = useState(""); //มาเก็บ input text
    const handleOtherHouseChange = (e) => {
        const { id, checked } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (checked) {
            setFormData((prevState) => {
                const updatedHouse = [...prevState.Houseindisasterareas];
                const otherIndex = updatedHouse.findIndex(
                    (group) => group.disaster_type === ""
                );

                if (otherIndex === -1) {
                    updatedHouse.push({
                        is_in_disaster: true,
                        disaster_type: "",
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }

                return { ...prevState, Houseindisasterareas: updatedHouse };
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                Houseindisasterareas: prevState.Houseindisasterareas.filter(
                    (group) => group.disaster_type !== otherFarmland
                ),
            }));
            setOtherHouse(""); // ล้างค่าที่กรอกเมื่อยกเลิก checkbox
        }
    };
    //disaster_type
    const handleOtherInputHouseChange = (e) => {
        const value = e.target.value;

        setOtherHouse(value); // อัปเดตสถานะ local
        setFormData((prevState) => {
            const updatedHouse = [...prevState.Houseindisasterareas];
            const otherIndex = updatedHouse.findIndex(
                (group) =>
                    group.disaster_type === "" || group.disaster_type === otherHouse
            );

            if (otherIndex !== -1) {
                updatedHouse[otherIndex].disaster_type = value;
            }

            return { ...prevState, Houseindisasterareas: updatedHouse };
        });
    };

    //4
    const handleFarmlandFChange = (event) => {
        const { name, value } = event.target;
        setIsOtherChecked({});
        if (name === "is_in_disaster" && value === "false") {
            setFormData((prevData) => ({
                ...prevData,
                Farmlandindisasterareas: [
                    {
                        is_in_disaster: false,
                        disaster_type: "",
                        frequncy_disaster: "",
                        disaster_response: "",
                    },
                ],
            }));
        }
    };

    const handleFarmlandTChange = (event) => {
        const { id } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            Farmlandindisasterareas: [
                // {
                //     is_in_disaster: null,
                //     disaster_type: "",
                //     frequncy_disaster: "",
                //     disaster_response: "",
                // }
            ], // รีเซ็ตข้อมูลใน Farmlandindisasterareas ให้ว่าง
        }));
        setIsOtherChecked((prev) => ({
            ...prev,
            [id]: event.target.checked,
        }));
    };

    const handleFarmlandCheckboxChange = (groupValue, checked) => {
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const groupIndex = updatedFarmland.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (checked) {
                if (groupIndex === -1) {
                    updatedFarmland.push({
                        is_in_disaster: true,
                        disaster_type: groupValue,
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }
            } else {
                if (groupIndex !== -1) {
                    updatedFarmland.splice(groupIndex, 1);
                }
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };

    const handleFrequncyChange = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const groupIndex = updatedFarmland.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (groupIndex !== -1) {
                updatedFarmland[groupIndex].frequncy_disaster = value;
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };

    const handleResponseChange = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const groupIndex = updatedFarmland.findIndex(
                (group) => group.disaster_type === groupValue
            );

            if (groupIndex !== -1) {
                updatedFarmland[groupIndex].disaster_response = value;
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };

    //other 4
    const [otherFarmland, setOtherFarmland] = useState(""); //มาเก็บ input text

    const handleOtherFarmlandChange = (e) => {
        const { id, checked } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (checked) {
            setFormData((prevState) => {
                const updatedFarmland = [...prevState.Farmlandindisasterareas];
                const otherIndex = updatedFarmland.findIndex(
                    (group) => group.disaster_type === ""
                );

                if (otherIndex === -1) {
                    updatedFarmland.push({
                        is_in_disaster: true,
                        disaster_type: "",
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }

                return { ...prevState, Farmlandindisasterareas: updatedFarmland };
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                Farmlandindisasterareas: prevState.Farmlandindisasterareas.filter(
                    (group) => group.disaster_type !== otherFarmland
                ),
            }));
            setOtherFarmland(""); // ล้างค่าที่กรอกเมื่อยกเลิก checkbox
        }
    };

    //disaster_type
    const handleOtherInputFarmlandChange = (e) => {
        const value = e.target.value;

        setOtherFarmland(value); // อัปเดตสถานะ local
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const otherIndex = updatedFarmland.findIndex(
                (group) => group.disaster_type === "" || group.disaster_type === otherFarmland
            );

            if (otherIndex !== -1) {
                updatedFarmland[otherIndex].disaster_type = value;
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };

    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
    };

    return (
        <>
            {/* 3 */}
            <div className="p-5 bg-gray-100 rounded-lg shadow-lg mt-4">
                <div className="Container">
                    <h1 className="text-lg font-bold text-gray-700 mb-5">
                        3. ในระยะเวลา 5 ปีที่ผ่านมา (พ.ศ.2560-2564)
                        ครัวเรือนของท่านมีบ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติหรือไม่
                    </h1>

                    <div className="flex flex-col gap-2 pl-12">
                        {/* Radio Button - ไม่อยู่ */}
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                id="is_in_disaster_0"
                                name="is_in_disaster"
                                value={false}
                                onChange={handleHouseFChange}
                            />
                            <span className="ml-2">ไม่อยู่</span>
                        </label>

                        {/* Radio Button - อยู่ */}
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                id="is_in_disaster_1"
                                name="is_in_disaster"
                                value={true}
                                onChange={handleHouseTChange}
                            />
                            <span className="ml-2">อยู่ (ตอบได้มากกว่า 1 ข้อ)</span>
                        </label>
                    </div>

                    {isOtherChecked2.is_in_disaster_1 && (
                        <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                            <table
                                className="table-auto w-full border-collapse"
                                style={{ tableLayout: "fixed" }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            className="border px-4 py-2 bg-gray-200 text-gray-700"
                                            style={{ width: "70%" }}
                                        >
                                            ประเภทกลุ่มกิจกรรม
                                        </th>
                                        <th
                                            className="border px-4 py-2 bg-gray-200 text-gray-700"
                                            style={{ width: "25%" }}
                                        >
                                            ความถี่ประสบภัยพิบัติ
                                        </th>
                                        <th
                                            className="border px-4 py-2 bg-gray-200 text-gray-700"
                                            style={{ width: "30%" }}
                                        >
                                            การรับมือกับภัยพิบัติ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*1*/}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            {/* Checkbox สำหรับเลือกประเภทภัยพิบัติ */}
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="อุทกภัย"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>อุทกภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            {/* Dropdown สำหรับเลือกความถี่ของภัยพิบัติ */}
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("อุทกภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        //handleResponseChange
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("อุทกภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 2 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ดินโคลนถล่ม"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ดินโคลนถล่ม</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ดินโคลนถล่ม", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"

                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ดินโคลนถล่ม", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 3 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="วาตภัย"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>วาตภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("วาตภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("วาตภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 4 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="อัคคีภัย"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>อัคคีภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("อัคคีภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("อัคคีภัย", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 5 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>
                                                    ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม
                                                </span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 6 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยแล้ง"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยแล้ง</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยแล้ง", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยแล้ง", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 7 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ไฟจากไฟป่าและหมอกควัน"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ไฟจากไฟป่าและหมอกควัน</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ไฟจากไฟป่าและหมอกควัน", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ไฟจากไฟป่าและหมอกควัน", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 8 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยโรคระบาดในมนุษย์"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยโรคระบาดในมนุษย์</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยโรคระบาดในมนุษย์", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยโรคระบาดในมนุษย์", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 9 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยจากแมลง สัตว์ ศัตรูพืชระบาด</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยจากแมลง สัตว์ ศัตรูพืชระบาด", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยจากแมลง สัตว์ ศัตรูพืชระบาด", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 10 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยโรคระบาดสัตว์ และสัตว์น้ำ</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยโรคระบาดสัตว์ และสัตว์น้ำ", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยโรคระบาดสัตว์ และสัตว์น้ำ", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 11 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change("ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change("ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)", e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* อื่น */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    id="disaster_type_10"
                                                    name="disaster_type"
                                                    onChange={handleOtherHouseChange}
                                                />
                                                <span>อื่นๆ (ระบุ)</span>
                                                {isOtherChecked2.disaster_type_10 && (
                                                    <input
                                                        type="text"
                                                        value={otherHouse}
                                                        onChange={handleOtherInputHouseChange}
                                                        placeholder="ระบุ..."
                                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                )}
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncy2Change(otherHouse, e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">
                                                    ไม่เคยประสบภัยพิบัติ
                                                </option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">
                                                    1 ครั้ง (ในรอบ 5ปี)
                                                </option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">
                                                    ทุกปี (ปีละ 1 ครั้ง)
                                                </option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">
                                                    มากกว่าปีละ 1 ครั้ง
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            className="border px-4 py-3 text-center flex"
                                        >
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponse2Change(otherHouse, e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">
                                                    ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง
                                                </option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">
                                                    ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ
                                                </option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้">
                                                    {" "}
                                                    ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว
                                                    เข้าสู่ภาวะปกติได้
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* 4 */}
            <div className="p-5 bg-gray-100 rounded-lg shadow-lg mt-4">
                <div className="Container">
                    <h1 className="text-lg font-bold text-gray-700 mb-5">
                        4. ในระยะเวลา 5 ปีที่ผ่านมา (พ.ศ.2560-2564) ครัวเรือนของท่านมีที่ทำกิน (รวมชายฝั่งทะเล กรณีชาวประมงพื้นบ้าน และแหล่งน้ำจืดธรรมชาติ
                        กรณีชาวประมงพื้นบ้านและการเพาะเลี้ยงสัตว์น้ำน้ำจืด) อยู่ในพื้นที่ภัยพิบัติหรือไม่
                    </h1>
                    <div className="flex flex-col gap-2 pl-12">
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                id="is_in_disaster_0"
                                name="is_in_disaster"
                                value={false}
                                onChange={handleFarmlandFChange}
                            />
                            <span className="ml-2">ไม่อยู่ </span>
                        </label>
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                id="is_in_disaster_1"
                                name="is_in_disaster"
                                value={true}
                                onChange={handleFarmlandTChange}
                            />
                            <span className="ml-2">อยู่ (ตอบได้มากกว่า 1 ข้อ) </span>
                        </label>
                    </div>

                    {isOtherChecked.is_in_disaster_1 && (
                        <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                            <table className="table-auto w-full border-collapse" style={{ tableLayout: "fixed" }}>
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "70%" }}>
                                            ประเภทกลุ่มกิจกรรม
                                        </th>
                                        <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "25%" }}>
                                            ความถี่ภัยพิบัติ
                                        </th>
                                        <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "30%" }}>
                                            การรับมือกับภัยพิบัติ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*1*/}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="อุทกภัย"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>อุทกภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "อุทกภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex"
                                        //handleResponseChange
                                        >
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "อุทกภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 2 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ดินโคลนถล่ม"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ดินโคลนถล่ม</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ดินโคลนถล่ม",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex" >
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ดินโคลนถล่ม",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 3 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="วาตภัย"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>วาตภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "วาตภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "วาตภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง<">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 4 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="อัคคีภัย"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>อัคคีภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "อัคคีภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "อัคคีภัย",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 5 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 6 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยแล้ง"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยแล้ง</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยแล้ง",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>

                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยแล้ง",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 7 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ไฟจากไฟป่าและหมอกควัน"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ไฟจากไฟป่าและหมอกควัน</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ไฟจากไฟป่าและหมอกควัน",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ไฟจากไฟป่าและหมอกควัน",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 8 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยโรคระบาดในมนุษย์"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยโรคระบาดในมนุษย์</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยโรคระบาดในมนุษย์",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยโรคระบาดในมนุษย์",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 9 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยจากแมลง สัตว์ ศัตรูพืชระบาด</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 10 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>ภัยโรคระบาดสัตว์ และสัตว์น้ำ</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยโรคระบาดสัตว์ และสัตว์น้ำ",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>

                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยโรคระบาดสัตว์ และสัตว์น้ำ",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 11 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                    onChange={(e) =>
                                                        handleFarmlandCheckboxChange(
                                                            e.target.value,
                                                            e.target.checked
                                                        )
                                                    }

                                                />
                                                <span>ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {/* 12 */}
                                    <tr>
                                        <td className="border px-4 py-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    id="disaster_type_10"
                                                    name="disaster_type"
                                                    onChange={handleOtherFarmlandChange}
                                                />
                                                <span>อื่นๆ (ระบุ)</span>
                                                {
                                                    isOtherChecked.disaster_type_10 && (
                                                        <input type="text"
                                                            //handleOtherInputFarmlandChange
                                                            //handleOtherFarmlandChange  
                                                            value={otherFarmland}
                                                            onChange={handleOtherInputFarmlandChange}
                                                            placeholder="ระบุ..."
                                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"

                                                        />
                                                    )
                                                }
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md" defaultValue=""
                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        otherFarmland,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">2-3 ครั้ง (ในรอบ5ปี)</option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center flex">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full" defaultValue=""
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        otherFarmland,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>เลือกสถานะ</option>
                                                <option value="ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง">ไม่ได้รับความช่วยเหลือ/ช่วยเหลือตัวเอง</option>
                                                <option value="ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ">ได้รับการช่วยเหลือและชดเชยเยียวยาจากภาครัฐ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ">ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติ</option>
                                                <option value="ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว"> ชุมชนมีระบบบริหารจัดการรองรับภัยพิบัติและสามารถฟื้นตัว เข้าสู่ภาวะปกติได้</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                        submit
                    </button>

                </div>
            </div>
        </>
    )


}


export default Naturalcapital2