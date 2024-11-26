import React, { useState } from "react";

function Naturalcapital() {
    const [formData, setFormData] = useState(
        [
            {
                id: Date.now(),
                PBresourceforlive: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
                PBresourceforincome: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
            }]
    );


    const [formData2, setFormData2] = useState(
        [
            {
                id: Date.now(),
                PBresourceforlive: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
                PBresourceforincome: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
            }]
    );





    //ส่วน1.1
    const handlePBliveChange = (event, index) => {
        const { id, value } = event.target;
        setFormData((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforlive: {
                            ...item.PBresourceforlive,
                            is_use_PB_resoc: id === "is_use_PB_resoc_1",
                            rescource:
                                id === "is_use_PB_resoc_0"
                                    ? "ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่เพื่อยังชีพ"
                                    : `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
                        },
                    }
                    : item
            )
        );
    };

    const handleResourceInputChange = (event, index) => {
        const { value } = event.target;
        setFormData((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforlive: {
                            ...item.PBresourceforlive,
                            rescource: `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
                        },
                    }
                    : item
            )
        );
    };

    const handleDistanceChange = (event, index) => {
        const { value } = event.target;
        setFormData((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforlive: {
                            ...item.PBresourceforlive,
                            distance: parseFloat(value) || 0,
                        },
                    }
                    : item
            )
        );
    };

    const handleRadioChange = (event, index) => {
        const { value, id } = event.target;
        setFormData((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforlive: {
                            ...item.PBresourceforlive,
                            description: id === "description_2" ? `อื่นๆ: ${value}` : value, // Check if id matches "description_2"
                        },
                    }
                    : item
            )
        );
    };


    const handleOtherInputChange = (event, index) => {
        const { value } = event.target;
        setFormData((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        PBresourceforlive: {
                            ...item.PBresourceforlive,
                            description: `อื่นๆ: ${value}`, // เก็บค่าที่กรอกจาก input พร้อมคำว่า "อื่นๆ: "
                        },
                    }
                    : item
            )
        );
    };

    //2
    const handlePBincomeChange = (event, index) => {
        const { id, value } = event.target;
        setFormData2((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforincome: {
                            ...item.PBresourceforincome,
                            is_use_PB_resoc: id === "is_use_PB_resoc_1",
                            rescource:
                                id === "is_use_PB_resoc_0"
                                    ? "ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่เพื่อยังชีพ"
                                    : `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
                        },
                    }
                    : item
            )
        );
    };

    const handlePBincomeInputChange = (event, index) => {
        const { value } = event.target;
        setFormData2((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforincome: {
                            ...item.PBresourceforincome,
                            rescource: `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
                        },
                    }
                    : item
            )
        );
    };

    const handleIncomDistanceChange = (event, index) => {
        const { value } = event.target;
        setFormData2((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforincome: {
                            ...item.PBresourceforincome,
                            distance: parseFloat(value) || 0,
                        },
                    }
                    : item
            )
        );
    };


    const handleIncomeRadioChange = (event, index) => {
        const { value, id } = event.target;
        setFormData2((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        PBresourceforincome: {
                            ...item.PBresourceforincome,
                            description: id === "description_2" ? `อื่นๆ: ${value}` : value, // Check if id matches "description_2"
                        },
                    }
                    : item
            )
        );
    };

    const handleIncomeOtherInputChange = (event, index) => {
        const { value } = event.target;
        setFormData2((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        PBresourceforincome: {
                            ...item.PBresourceforincome,
                            description: `อื่นๆ: ${value}`, // เก็บค่าที่กรอกจาก input พร้อมคำว่า "อื่นๆ: "
                        },
                    }
                    : item
            )
        );
    };





    //loop add
    const addDatalive = () => {
        setFormData((prev) => [
            ...prev,
            {
                id: Date.now(),
                PBresourceforlive: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
            },
        ]);
    };

    //ลบสมาชิคอ่างอิงจาก index
    const delDatalive = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };


    const addDataincome = () => {
        setFormData2((prev) => [
            ...prev,
            {
                id: Date.now(),
                PBresourceforincome: {
                    is_use_PB_resoc: null,
                    rescource: "",
                    distance: 0.0,
                    description: "",
                },
            },
        ]);
    };

    //ลบสมาชิคอ่างอิงจาก index
    const delDataincome = (index) => {
        const updatedData = formData2.filter((_, i) => i !== index);
        setFormData2(updatedData);
    };








    // // ช่องอื่นๆ
    // const [isOtherChecked, setIsOtherChecked] = useState({});
    // const handleOtherRadioChange = (event) => {
    //     const { id, checked } = event.target;
    //     setIsOtherChecked((prevState) => ({
    //         ...prevState,
    //         [id]: checked,
    //     }));
    // };



    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
        console.log("Form Data Submitted:", formData2);
    }; 

    return (
        <>
            <div>
                <h1 className="text-xl font-bold text-gray-700 mb-5 mt-4">
                    ส่วนที่ 4 ทรัพยากรธรรมชาติ และภัยพิบัติต่างๆ (ทุนทรัพยากรธรรมชาติ)
                </h1>
            </div>
            {/* 1 */}
            {formData.map((data, index) => (
                <div key={data.id} className="p-5 bg-blue-100 rounded-lg shadow-lg">
                    <div className="Container">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-700 mb-5">
                                1. ครัวเรือนของท่านได้ใช้ประโยชน์จากทรัพยากรธรรมชาติในพื้นที่ เช่น ที่สาธารณะ ทุ่งหญ้า ป่า แม่น้ำ
                                ลำธาร ชายฝั่งทะเล หรืออื่นๆ <br />
                                <span className="text-red-500">เพื่อการยังชีพ</span>
                                หรือไม่ (กรณีมีหลายพื้นที่ให้ระบุชื่อแหล่งทรัพยากรและระยะทางระหว่างที่อยู่อาศัยกับแหล่ง ทรัพยากรธรรมชาติที่ได้ใช้ประโยชน์) {index + 1}
                            </h2>
                            {/* Radio Button Options with padding */}
                            <div className="flex flex-col gap-2 pl-12">
                                <label className="flex items-center text-gray-700">
                                    <input
                                        type="radio"
                                        id="is_use_PB_resoc_0"
                                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                        name={`is_use_PB_resoc_${index}`}
                                        onChange={(e) => handlePBliveChange(e, index)}
                                    />
                                    <span className="ml-2">ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่เพื่อยังชีพ</span>
                                </label>
                                <label className="flex items-center text-gray-700">
                                    <input
                                        type="radio"
                                        id="is_use_PB_resoc_1"
                                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                        name={`is_use_PB_resoc_${index}`}
                                        onChange={(e) => handlePBliveChange(e, index)}
                                    />
                                    <span className="ml-2">ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร</span>
                                    {data.PBresourceforlive.is_use_PB_resoc && (
                                        <input
                                            type="text"
                                            placeholder="ระบุ..."
                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            onChange={(e) => handleResourceInputChange(e, index)}
                                        />
                                    )}
                                </label>
                            </div>
                            <label className="flex items-center text-gray-700 mt-4 gap-2">
                                <span>ระยะห่างจากที่อยู่อาศัย</span>
                                <input
                                    type="number"
                                    placeholder="ระยะห่างจากที่อยู่อาศัย.."
                                    onChange={(e) => handleDistanceChange(e, index)} // เรียกฟังก์ชัน handleDistanceChange เมื่อมีการเปลี่ยนแปลงค่า
                                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <span>กม. (เลือกได้ 1 ข้อ)</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    id="description_0"
                                    name={`description_${index}`}
                                    value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                                    onChange={(e) => handleRadioChange(e, index)}
                                />
                                <span className="ml-2">สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    id="description_1"
                                    name={`description_${index}`}
                                    value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                                    onChange={(e) => handleRadioChange(e, index)}
                                />
                                <span className="ml-2">สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    id="description_2"
                                    name={`description_${index}`} // Use a unique name for each row
                                    value="อื่นๆ"
                                    onChange={(e) => handleRadioChange(e, index)}
                                />
                                <span className="ml-2">อื่นๆ</span>
                                {formData2[index]?.PBresourceforlive?.description?.startsWith("อื่นๆ") && ( // Check if 'อื่นๆ' is selected for this specific index
                                    <input
                                        type="text"
                                        placeholder="ระบุ..."
                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        onChange={(e) => handleOtherInputChange(e, index)}
                                    />
                                )}
                            </label>
                        </div>
                        {/* Blue Button */}
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
                                onClick={addDatalive}
                            >
                                เพิ่มแหล่งทรัพยากร
                            </button>
                            <button className="bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                                onClick={() => delDatalive(index)}
                            >
                                ลบแหล่งทรัพยากร
                            </button>
                        </div>

                    </div>
                </div>
            ))}

            {/* 2 */}
            {formData2.map((data, index) => (
                <div key={data.id} className="p-5 bg-blue-100 rounded-lg shadow-lg mt-4">
                    <div className="Container">
                        <div className="mb-6 mt-8">
                            <h2 className="text-xl font-bold text-gray-700 mb-5">
                                2. ครัวเรือนของท่านได้ใช้ประโยชน์จากทรัพยากรธรรมชาติในพื้นที่ เช่น ที่สาธารณะ ทุ่งหญ้า ป่า แม่น้ำ  ลำธาร ชายฝั่งทะเล หรืออื่นๆ <br />
                                <span className="text-red-500">เพื่อสร้างรายได้</span> หรือไม่(กรณีมีหลายพื้นที่ให้ระบุชื่อแหล่งทรัพยากรและระยะทางระหว่างที่อยู่อาศัยกับแหล่ง <br />
                                ทรัพยากรธรรมชาติที่ได้ใช้ประโยชน์) {index + 1}
                            </h2>
                            {/* Radio Button Options with padding */}
                            <div className="flex flex-col gap-2 pl-12">
                                <label className="flex items-center text-gray-700">
                                    <input
                                        type="radio"
                                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                        id="is_use_PB_resoc_0"
                                        name={`is_use_PB_resoc_${index}`}
                                        onChange={(e) => handlePBincomeChange(e, index)}

                                    />
                                    <span className="ml-2">ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่เพื่อสร้างรายได้</span>
                                </label>
                                <label className="flex items-center text-gray-700">
                                    <input
                                        type="radio"
                                        id="is_use_PB_resoc_1"
                                        name={`is_use_PB_resoc_${index}`}
                                        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                        onChange={(e) => handlePBincomeChange(e, index)}
                                    />
                                    <span className="ml-2">ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร</span>
                                    {
                                        data.PBresourceforincome.is_use_PB_resoc && (
                                            <input
                                                type="text"
                                                placeholder="ระบุ..."
                                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                onChange={(e) => handlePBincomeInputChange(e, index)}
                                            />
                                        )
                                    }
                                </label>
                            </div>

                            <label className="flex items-center text-gray-700 mt-4 gap-2">
                                <span>ระยะห่างจากที่อยู่อาศัย</span>
                                <input
                                    type="number"
                                    onChange={(e) => handleIncomDistanceChange(e, index)}
                                    placeholder="ระยะห่างจากที่อยู่อาศัย.."
                                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <span>กม. (เลือกได้ 1 ข้อ)</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    id="description_0"
                                    name={`description_${index}`}
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                                    onChange={(e) => handleIncomeRadioChange(e, index)}
                                />
                                <span className="ml-2">สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    id="description_1"
                                    name={`description_${index}`}
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                                    onChange={(e) => handleIncomeRadioChange(e, index)}
                                />
                                <span className="ml-2">สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา</span>
                            </label>
                            <label className="flex items-center text-gray-700 pl-12 mt-4">
                                <input
                                    type="radio"
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    id="description_2"
                                    name={`description_${index}`}
                                    value="อื่นๆ"
                                    onChange={(e) => handleIncomeRadioChange(e, index)}
                                />
                                <span className="ml-2">อื่นๆ</span>
                                {
                                    formData2[index]?.PBresourceforincome?.description?.startsWith("อื่นๆ") && (
                                        <input
                                            type="text"
                                            placeholder="ระบุ..."
                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            onChange={(e) => handleIncomeOtherInputChange(e, index)}
                                        />
                                    )
                                }
                            </label>
                        </div>

                        {/* Blue Button */}
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
                                onClick={addDataincome}
                            >
                                เพิ่มแหล่งทรัพยากร
                            </button>
                            <button className="bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                                onClick={() => delDataincome(index)}
                            >
                                ลบแหล่งทรัพยากร
                            </button>
                        </div>
                    </div>
                </div>
            ))}






            <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                submit
            </button>

        </>
    );

}

export default Naturalcapital;
