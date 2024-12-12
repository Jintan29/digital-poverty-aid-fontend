import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

function Naturalcapital2({setCurrentPage,setMainFormData,mainFormData}) {
    const [formData, setFormData] = useState(
        {
            Farmlandindisasterareas: {//4
                is_in_disaster: null,
                disaster_type: "",
                frequncy_disaster: "",
                disaster_response: "",
            },
            HouseInDisasterAreas: { //3
                is_in_disaster: null,
                disaster_type: "",
                frequncy_disaster: "",
                disaster_response: "",
            },
        }
    );

    useEffect(()=>{
        if(mainFormData.Naturalcapital.Farmlandindisasterareas){
            setFormData((prevData)=>({
                ...prevData,
                Farmlandindisasterareas: mainFormData.Naturalcapital.Farmlandindisasterareas,
                HouseInDisasterAreas: mainFormData.Naturalcapital.HouseInDisasterAreas
            }))
        }
    },[mainFormData])

    const handleLogData =()=>{
        console.log("now formData is ");
        console.log(formData);
        
        console.log('mainData is ');
        console.log(mainFormData);
        
        
    }

    const handlePrevPage = ()=>{
        setMainFormData((prevData)=>({
            ...prevData,
            //เอาค่าเก่าใน Natural ไว้
            Naturalcapital:{
                ...prevData.Naturalcapital,
                ...formData
            }
        }))

        setCurrentPage(5)
    }

    //nextpage ยังไม่ได้ทำ
    const handleNextPage = ()=>{
        setMainFormData((prevData)=>({
            ...prevData,
            Naturalcapital:{
                ...prevData.Naturalcapital,
                ...formData
            }
        }))

        setCurrentPage(7)
    }

    const [isOtherChecked, setIsOtherChecked] = useState({});
    //3
    //false
    const handleHouseFChange = (event) => {
        const { name, value } = event.target;
        if (name === "is_in_disaster_house" && value === "false") {
            setFormData((prevData) => ({
                ...prevData,
                HouseInDisasterAreas: [
                    {
                        is_in_disaster: false,  // รีเซ็ตเป็น false เท่านั้น
                        disaster_type: "",  // เคลียร์ค่า
                        frequncy_disaster: "",  // เคลียร์ค่า
                        disaster_response: "",  // เคลียร์ค่า
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
            HouseInDisasterAreas: [
                // {
                //     is_in_disaster: null,
                //     disaster_type: "",
                //     frequncy_disaster: "",
                //     disaster_response: "",
                // }
            ], // รีเซ็ตข้อมูลใน HouseInDisasterAreas ให้ว่าง
        }));
        setIsOtherChecked((prev) => ({
            ...prev,
            [id]: event.target.checked,
        }));
    };
    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ  text, checkbox
    const handleHouseCheckboxChange = (groupValue, checked) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.HouseInDisasterAreas];
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

            return { ...prevState, HouseInDisasterAreas: updatedHouse };
        });
    };
    const handleFrequncy2Change = (prefixHouse, value) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.HouseInDisasterAreas];
            const groupIndex = updatedHouse.findIndex((group) =>
                group.disaster_type.startsWith(prefixHouse)
            );

            if (groupIndex !== -1) {
                updatedHouse[groupIndex].frequncy_disaster = value;
            }

            return { ...prevState, HouseInDisasterAreas: updatedHouse };
        });
    };

    const handleResponse2Change = (prefixHouse, value) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.HouseInDisasterAreas];
            const groupIndex = updatedHouse.findIndex((group) =>
                group.disaster_type.startsWith(prefixHouse)
            );

            if (groupIndex !== -1) {
                updatedHouse[groupIndex].disaster_response = value;
            }

            return { ...prevState, HouseInDisasterAreas: updatedHouse };
        });
    };

    const OtherHouse = (prefix) => (e) => {
        const { checked } = e.target;

        setFormData((prevState) => {
            const updatedHouse = [...prevState.HouseInDisasterAreas];
            const groupIndex = updatedHouse.findIndex(
                (group) => group.disaster_type === prefix
            );

            if (checked) {
                if (groupIndex === -1) {
                    updatedHouse.push({
                        is_in_disaster: true,
                        disaster_type: prefix,
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }
            } else {
                if (groupIndex !== -1) {
                    updatedHouse.splice(groupIndex, 1);
                }
            }

            return { ...prevState, HouseInDisasterAreas: updatedHouse };
        });
    };

    const handleHouseInputChange = (prefix, value) => {
        setFormData((prevState) => {
            const updatedHouse = [...prevState.HouseInDisasterAreas];
            const groupIndex = updatedHouse.findIndex(
                (group) => group.disaster_type.startsWith(prefix)
            );

            if (groupIndex !== -1) {
                updatedHouse[groupIndex].disaster_type = `${prefix} ${value}`;
            }

            return { ...prevState, HouseInDisasterAreas: updatedHouse };
        });
    };


    const prefixHouse = "อื่นๆ (ระบุ)"

    //4
    const handleFarmlandFChange = (event) => {
        const { name, value } = event.target;
        if (name === "is_in_disaster_farm" && value === "false") {
            setFormData((prevData) => ({
                ...prevData,
                Farmlandindisasterareas:[ {
                    ...prevData.Farmlandindisasterareas,
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



    const handleResponseChange = (prefixHouse, value) => {
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const groupIndex = updatedFarmland.findIndex((group) =>
                group.disaster_type.startsWith(prefixHouse)
            );

            if (groupIndex !== -1) {
                updatedFarmland[groupIndex].disaster_response = value;
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };


    const handleFrequncyChange = (prefix, value) => {
        setFormData((prevState) => {
            const updatedFarmland = [...prevState.Farmlandindisasterareas];
            const groupIndex = updatedFarmland.findIndex(
                (group) => group.disaster_type.startsWith(prefix)
            );

            if (groupIndex !== -1) {
                updatedFarmland[groupIndex].frequncy_disaster = value;
            }

            return { ...prevState, Farmlandindisasterareas: updatedFarmland };
        });
    };

    const OtherFarm = (prefix) => (e) => {
        const { checked } = e.target;

        setFormData((prevState) => {
            const updateFarm = [...prevState.Farmlandindisasterareas];
            const groupIndex = updateFarm.findIndex(
                (group) => group.disaster_type === prefix
            );

            if (checked) {
                if (groupIndex === -1) {
                    updateFarm.push({
                        is_in_disaster: true,
                        disaster_type: prefix,
                        frequncy_disaster: "",
                        disaster_response: "",
                    });
                }
            } else {
                if (groupIndex !== -1) {
                    updateFarm.splice(groupIndex, 1);
                }
            }

            return { ...prevState, Farmlandindisasterareas: updateFarm };
        });
    };

    const handleFarmInputChange = (prefix, value) => {
        setFormData((prevState) => {
            const updateFarm = [...prevState.Farmlandindisasterareas];
            const groupIndex = updateFarm.findIndex(
                (group) => group.disaster_type.startsWith(prefix)
            );

            if (groupIndex !== -1) {
                updateFarm[groupIndex].disaster_type = `${prefix} ${value}`;
            }

            return { ...prevState, Farmlandindisasterareas: updateFarm };
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
                                name="is_in_disaster_house"
                                checked={formData.HouseInDisasterAreas[0]?.is_in_disaster === false}
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
                                id="is_in_disaster_house_1"
                                checked={formData.HouseInDisasterAreas.length === 0 || formData.HouseInDisasterAreas[0]?.is_in_disaster === true}
                                value={true}
                                onChange={handleHouseTChange}
                            />
                            <span className="ml-2">อยู่ (ตอบได้มากกว่า 1 ข้อ)</span>
                        </label>
                    </div>

                    {(formData.HouseInDisasterAreas.length === 0 || formData.HouseInDisasterAreas[0]?.is_in_disaster === true) && (
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
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-blue-600 mr-2 rounded"
                                                    value="อุทกภัย"
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "อุทกภัย"
                                                    )}
                                                    onChange={(e) =>
                                                        handleHouseCheckboxChange(e.target.value, e.target.checked)
                                                    }
                                                />
                                                <span>อุทกภัย</span>
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "อุทกภัย"
                                                )?.frequncy_disaster || ""}
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
                                        <td className="border px-4 py-3 text-center flex">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "อุทกภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "วาตภัย"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "วาตภัย"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "วาตภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "อัคคีภัย"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "อัคคีภัย"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "อัคคีภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                )?.frequncy_disaster || ""}
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
                                                //  
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยแล้ง"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยแล้ง"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยแล้ง"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                    )}
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
                                                //  
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                )?.frequncy_disaster || ""}
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

                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                    )}
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
                                                //  
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                )?.frequncy_disaster || ""}
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
                                                //  
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                    )}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                )?.frequncy_disaster || ""}
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
                                                value={formData.HouseInDisasterAreas.find(
                                                    (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type.startsWith(prefixHouse)
                                                    )}
                                                    onChange={OtherHouse(prefixHouse)}
                                                />
                                                <span>อื่นๆ (ระบุ)</span>
                                                {
                                                    formData.HouseInDisasterAreas.some(
                                                        (group) => group.disaster_type.startsWith(prefixHouse)
                                                    ) && (
                                                        <input
                                                            type="text"
                                                            value={
                                                                formData.HouseInDisasterAreas.find((group) =>
                                                                    group.disaster_type.startsWith(prefixHouse)
                                                                )?.disaster_type.slice(prefixHouse.length + 1) || ""
                                                            }
                                                            onChange={(e) =>
                                                                handleHouseInputChange(prefixHouse, e.target.value)
                                                            }
                                                            placeholder="ระบุ..."
                                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                        />
                                                    )}
                                            </label>

                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={
                                                    formData.HouseInDisasterAreas.find((group) =>
                                                        group.disaster_type.startsWith(prefixHouse)
                                                    )?.frequncy_disaster || ""
                                                }
                                                onChange={(e) =>
                                                    handleFrequncy2Change(prefixHouse, e.target.value)
                                                }
                                            >
                                                <option value="" disabled>
                                                    เลือกสถานะ
                                                </option>
                                                <option value="ไม่เคยประสบภัยพิบัติ">ไม่เคยประสบภัยพิบัติ</option>
                                                <option value="1 ครั้ง (ในรอบ 5ปี)">1 ครั้ง (ในรอบ 5ปี)</option>
                                                <option value="2-3 ครั้ง (ในรอบ5ปี)">
                                                    2-3 ครั้ง (ในรอบ5ปี)
                                                </option>
                                                <option value="ทุกปี (ปีละ 1 ครั้ง)">ทุกปี (ปีละ 1 ครั้ง)</option>
                                                <option value="มากกว่าปีละ 1 ครั้ง">มากกว่าปีละ 1 ครั้ง</option>
                                            </select>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select
                                                className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={
                                                    formData.HouseInDisasterAreas.find((group) =>
                                                        group.disaster_type.startsWith(prefixHouse)
                                                    )?.disaster_response || ""
                                                }
                                                onChange={(e) =>
                                                    handleResponse2Change(prefixHouse, e.target.value)
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
                                name="is_in_disaster_farm"
                                checked={formData.Farmlandindisasterareas[0]?.is_in_disaster === false}
                                value={false}
                                onChange={handleFarmlandFChange}
                            />
                            <span className="ml-2">ไม่อยู่ </span>
                        </label>
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                id="is_in_disaster_farm_1"
                                checked={formData.Farmlandindisasterareas.length === 0 || formData.Farmlandindisasterareas[0]?.is_in_disaster === true}
                                value={true}
                                onChange={handleFarmlandTChange}
                            />
                            <span className="ml-2">อยู่ (ตอบได้มากกว่า 1 ข้อ) </span>
                        </label>
                    </div>

                    {(formData.Farmlandindisasterareas.length === 0 || formData.Farmlandindisasterareas[0]?.is_in_disaster === true) && (
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "อุทกภัย"
                                                    )}
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
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "อุทกภัย"
                                                )?.frequncy_disaster || ""}
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
                                        >
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "อุทกภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                    )}
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
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ดินโคลนถล่ม"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "วาตภัย"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "วาตภัย"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "วาตภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "อัคคีภัย"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "อัคคีภัย"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "อัคคีภัย"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากสารเคมีและวัตถุอันตราย/โรงงานอุตสาหกรรม"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยแล้ง"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยแล้ง"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยแล้ง"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ไฟจากไฟป่าและหมอกควัน"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดในมนุษย์"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากแมลง สัตว์ ศัตรูพืชระบาด"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                    )}
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
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยโรคระบาดสัตว์ และสัตว์น้ำ"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                    )}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                )?.frequncy_disaster || ""}
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={formData.Farmlandindisasterareas.find(
                                                    (group) => group.disaster_type === "ภัยจากสถานการณ์ความไม่สงบ (ภัยจากมนุษย์)"
                                                )?.disaster_response || ""}
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
                                                    checked={formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type.startsWith(prefixHouse)
                                                    )}
                                                    onChange={OtherFarm(prefixHouse)}
                                                />
                                                <span>อื่นๆ (ระบุ)</span>
                                                {
                                                    formData.Farmlandindisasterareas.some(
                                                        (group) => group.disaster_type.startsWith(prefixHouse)
                                                    ) && (
                                                        <input type="text"
                                                            placeholder="ระบุ..."
                                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                            value={
                                                                formData.Farmlandindisasterareas.find((group) =>
                                                                    group.disaster_type.startsWith(prefixHouse)
                                                                )?.disaster_type.slice(prefixHouse.length + 1) || ""
                                                            }
                                                            onChange={(e) =>
                                                                handleFarmInputChange(prefixHouse, e.target.value)
                                                            }
                                                        />
                                                    )
                                                }
                                            </label>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                                value={
                                                    formData.Farmlandindisasterareas.find((group) =>
                                                        group.disaster_type.startsWith(prefixHouse)
                                                    )?.frequncy_disaster || ""
                                                }

                                                onChange={(e) =>
                                                    handleFrequncyChange(
                                                        prefixHouse,
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
                                            <select className="border rounded px-2 py-1 rounded-lg shadow-md w-full"
                                                value={
                                                    formData.Farmlandindisasterareas.find((group) =>
                                                        group.disaster_type.startsWith(prefixHouse)
                                                    )?.disaster_response || ""
                                                }
                                                onChange={(e) =>
                                                    handleResponseChange(
                                                        prefixHouse,
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

                </div>
            </div>

            {/* <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleLogData}>
                LogData
            </button>

            <button type="button"
            onClick={e=>handlePrevPage()} 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" >
                ย้อนกลับ
            </button>

            
            <button type="button"
            onClick={e=>handleNextPage()} 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" >
                ส่งข้อมูลไปMain
            </button> */}

             <div className="flex justify-end mt-4">
             <button type="button"
            onClick={e=>handlePrevPage()} 
            className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3" >
                 <Icon
                  icon="material-symbols:arrow-left-rounded"
                  width="25"
                  height="25"
                />
                ย้อนกลับ
            </button>

            <button type="button"
            onClick={e=>handleNextPage()} 
            className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" >
                หน้าถัดไป
                <Icon
                  icon="material-symbols:arrow-right-rounded"
                  width="25"
                  height="25"
                />
            </button>
             </div>
        </>
    )


}


export default Naturalcapital2