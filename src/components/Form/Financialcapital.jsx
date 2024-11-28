import React, { useState } from "react";

function Financialcapital() {
    const [formData, setFormData] = useState({
        Agriculturalincome: [
            {
                plants: [],
                livestock: [],
                fishing: [],
            }
        ],
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
        Saving: [
            // {
            //     is_has_saving: null,
            //     saving_type: " ",
            //     amount: 0.0,
            // }
        ],
        Occupationalproperty: [{
            property_type: [],
            is_has_property: null,
        }],
        Debt: [{
            is_has_debt: null,
            description: " ",
        }],
        Creditsources: [
            //     {
            //     form: " ",
            //     outstanding_amount: 0.0,
            // }
        ]
    })


    // ฟังก์ชันสำหรับจัดการการเลือก checkbox
    const handleCheckboxChange = (category, field, value, checked) => {
        setFormData((prevData) => {
            const updatedFieldData = [...prevData[category][0][field]];

            if (checked) {
                if (!updatedFieldData.includes(value)) {
                    updatedFieldData.push(value);
                }
            } else {
                const index = updatedFieldData.indexOf(value);
                if (index > -1) {
                    updatedFieldData.splice(index, 1);
                }
            }

            return {
                ...prevData,
                [category]: [
                    {
                        ...prevData[category][0],
                        [field]: updatedFieldData,
                    },
                ],
            };
        });
    };

    // ฟังก์ชันสำหรับกรอกข้อมูลเพิ่มเติม
    const handleInputChange = (category, field, value) => {
        setFormData((prevData) => {
            const updatedFieldData = prevData[category][0][field];

            // ตรวจสอบว่าเป็นอาเรย์แล้วเพิ่มข้อมูล
            if (!updatedFieldData.includes(value)) {
                return {
                    ...prevData,
                    [category]: [
                        {
                            ...prevData[category][0],
                            [field]: [...updatedFieldData, value],
                        },
                    ],
                };
            }

            return prevData;
        });
    };


    // ฟังก์ชันสำหรับจัดการ checkbox "อื่น ๆ"
    const handleOtherCheckboxChange = (e, category, field, valuePrefix) => {
        const { id, checked } = e.target;
        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (!checked) {
            setFormData((prevData) => {
                const filteredFieldData = prevData[category][0][field].filter(
                    (item) => !item.startsWith(valuePrefix)
                );

                return {
                    ...prevData,
                    [category]: [
                        {
                            ...prevData[category][0],
                            [field]: filteredFieldData,
                        },
                    ],
                };
            });
        }
    };

    //ข้อ 2
    // Handler function for managing Non-AGI income checkbox changes
    const handleNonAGIincomeCheckboxChange = (e) => {
        const { id, checked, value } = e.target; // ดึง `id`, `checked` (สถานะ), และ `value` (ชื่อรายได้) จาก event target

        // อัปเดตสถานะการเลือกของ checkbox ใน state `isOtherChecked`
        setIsOtherChecked((prevState) => ({
            ...prevState, // คงค่าของ state เดิมไว้
            [id]: checked, // ตั้งค่าใหม่สำหรับ checkbox ที่มี id นี้
        }));

        // อัปเดตข้อมูลใน state `formData`
        setFormData((prevData) => {
            // ค้นหาตำแหน่งใน array `NonAGIincome` ที่มี `income_type` ตรงกับ value
            const existingIndex = prevData.NonAGIincome.findIndex(item => item.income_type === value);

            if (checked) {
                // กรณี checkbox ถูกติ๊ก
                if (existingIndex === -1) {
                    // หากไม่มีข้อมูลที่ตรงกันใน array `NonAGIincome` ให้เพิ่มรายการใหม่
                    return {
                        ...prevData, // คงค่าของ state เดิมไว้
                        NonAGIincome: [
                            ...prevData.NonAGIincome, // เพิ่มรายการใหม่ใน array เดิม
                            { income_type: value, amount_per_year: 0, cost_per_year: 0 } // ข้อมูลเริ่มต้น
                        ]
                    };
                }
            } else {
                // กรณี checkbox ถูกยกเลิกการติ๊ก
                if (existingIndex > -1) {
                    // หากมีข้อมูลใน array `NonAGIincome` ให้ลบออก
                    const updatedNonAGIincome = [...prevData.NonAGIincome]; // คัดลอก array เดิม
                    updatedNonAGIincome.splice(existingIndex, 1); // ลบรายการที่ตำแหน่ง `existingIndex`
                    return { ...prevData, NonAGIincome: updatedNonAGIincome }; // อัปเดต state ด้วย array ใหม่
                }
            }
            return prevData; // หากไม่มีการเปลี่ยนแปลงใด ๆ ให้คืนค่า state เดิม
        });
    };

    // Handler function for updating numerical fields in Non-AGI income
    const updateNonAGIincomeFields = (incomeType, field, value) => {
        setFormData((prevData) => {
            // คัดลอก array `NonAGIincome` จาก state เดิม
            const updatedNonAGIincome = [...prevData.NonAGIincome];

            // ค้นหาตำแหน่งใน array ที่มี `income_type` ตรงกับ `incomeType`
            const index = updatedNonAGIincome.findIndex(item => item.income_type === incomeType);

            if (index !== -1) {
                // หากพบรายการที่ตรงกัน อัปเดตค่าของฟิลด์ที่ระบุ (เช่น `amount_per_year` หรือ `cost_per_year`)
                updatedNonAGIincome[index][field] = parseFloat(value); // แปลงค่าเป็นตัวเลขแบบ float ก่อนเก็บ
            }

            // คืนค่า state ใหม่ที่มีการอัปเดต array `NonAGIincome`
            return { ...prevData, NonAGIincome: updatedNonAGIincome };
        });
    };


    //3
    const [otherExpense, setOtherExpense] = useState("");

    const handleHouseholdChange = (e) => {
        const { id, checked, value } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        setFormData((prevData) => {
            const existingIndex = prevData.Householdexpenses.findIndex(item => item.expenses_type === value);

            if (checked) {
                if (existingIndex === -1) {
                    return {
                        ...prevData,
                        Householdexpenses: [
                            ...prevData.Householdexpenses,
                            { expenses_type: value, amount_per_month: 0 }
                        ]
                    };
                }
            } else {
                if (existingIndex > -1) {
                    const updatedHouseholdexpenses = [...prevData.Householdexpenses];
                    updatedHouseholdexpenses.splice(existingIndex, 1);
                    return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
                }
            }
            return prevData;
        });
    };

    const handletInputHouseholdChange = (expenses_type, field, value) => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = [...prevData.Householdexpenses];
            const index = updatedHouseholdexpenses.findIndex(item => item.expenses_type === expenses_type);

            if (index !== -1) {
                updatedHouseholdexpenses[index][field] = parseFloat(value);
            } else if (expenses_type === otherExpense) {
                updatedHouseholdexpenses.push({ expenses_type, [field]: parseFloat(value) });
            }

            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
    };

    const handleOtherExpenseChange = (e) => {
        const value = e.target.value;
        setOtherExpense(value);

        setFormData((prevData) => {
            const existingIndex = prevData.Householdexpenses.findIndex(item => item.expenses_type === value);

            if (existingIndex === -1 && value) {
                return {
                    ...prevData,
                    Householdexpenses: [
                        ...prevData.Householdexpenses,
                        { expenses_type: value, amount_per_month: 0 }
                    ]
                };
            }
            return prevData;
        });
    };

    const handleOtherCheckboxClear = () => {
        setFormData((prevData) => {
            const updatedHouseholdexpenses = prevData.Householdexpenses.filter(
                (item) => item.expenses_type !== otherExpense
            );
            return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        });
        setOtherExpense("");
    };


    //4
    const handleSavingChange = (event) => {
        const { name, value } = event.target;
        setIsOtherChecked({});
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


    const [isOtherChecked, setIsOtherChecked] = useState({});

    const handleRadio1Change = (event) => {
        const { id } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            Saving: [], // รีเซ็ตข้อมูลใน Saving ให้ว่าง
        }));
        setIsOtherChecked((prev) => ({
            ...prev,
            [id]: event.target.checked,
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



    const [otherSaving, setOtherSaving] = useState(""); // เก็บค่า input สำหรับการออมอื่นๆ

    // ฟังก์ชันสำหรับจัดการ checkbox การออมอื่นๆ
    const handleOtherSavingChange = (e) => {
        const { id, checked } = e.target;

        // อัปเดตการแสดงผลของ input "การออมอื่นๆ"
        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (checked) {
            // เมื่อเลือก checkbox การออมอื่นๆ ให้เพิ่มข้อมูลลงใน Saving
            setFormData((prevState) => {
                const updatedSaving = [...prevState.Saving];

                updatedSaving.push({
                    is_has_saving: true, // ตั้งค่า is_has_saving เป็น true
                    saving_type: "การออมอื่นๆ", // กำหนดค่า saving_type
                    amount: 0.0,
                });

                return {
                    ...prevState,
                    Saving: updatedSaving,
                };
            });
        } else {
            // ถ้ายกเลิกการเลือก checkbox จะลบข้อมูลที่เกี่ยวข้อง
            setFormData((prevState) => ({
                ...prevState,
                Saving: prevState.Saving.filter(
                    (group) => !group.saving_type.startsWith("การออมอื่นๆ")
                ),
            }));

            // เคลียร์ค่า input และค่าของ amount
            setOtherSaving("");
            const amountFieldId = `amount_${id.split('_')[1]}`;
            const amountField = document.getElementById(amountFieldId);
            if (amountField) {
                amountField.value = "";
            }
        }
    };

    const handleOtherInputSavingChange = (e) => {
        const value = e.target.value;

        setOtherSaving(value); // Update local state for the input
        setFormData((prevState) => {
            const updatedSaving = [...prevState.Saving];
            const otherIndex = updatedSaving.findIndex(
                (group) => group.saving_type.startsWith("การออมอื่นๆ")
            );

            if (otherIndex !== -1) {
                updatedSaving[otherIndex].saving_type = `การออมอื่นๆ ${value}`;
            }

            return { ...prevState, Saving: updatedSaving };
        });
    };

    // ฟังก์ชันสำหรับการจัดการ outstanding amount
    const handleOtherAmount = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedSaving = [...prevState.Saving];
            const groupIndex = updatedSaving.findIndex(
                (group) => group.saving_type.startsWith(groupValue)
            );

            if (groupIndex !== -1) {
                updatedSaving[groupIndex].amount = parseFloat(value) || 0;
            } else {
                updatedSaving.push({
                    saving_type: `${groupValue} ${otherSaving}`,
                    amount: parseFloat(value) || 0,
                });
            }

            return { ...prevState, Saving: updatedSaving };
        });
    };











    //5
    const [debtData, setDebtData] = useState({ description_3: false });

    const handleDebtChange = (event) => {
        const value = event.target.value === "true" ? true : false;

        setFormData((prevData) => ({
            ...prevData,
            Debt: [{ ...prevData.Debt[0], is_has_debt: value }],
        }));
    };

    const handleOutstandingAmountChange = (value, creditSource) => {
        setFormData((prevFormData) => {
            const updatedCreditsources = prevFormData.Creditsources.map((item) =>
                item.form === creditSource ? { ...item, outstanding_amount: parseFloat(value) } : item
            );
            return { ...prevFormData, Creditsources: updatedCreditsources };
        });
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;

        setFormData((prevData) => ({
            ...prevData,
            Debt: [{ ...prevData.Debt[0], description: value }],
        }));

        // รีเซ็ต description_3 ให้เป็น false เมื่อเปลี่ยนไปตัวเลือกอื่น
        setDebtData({ description_3: false });
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
                updatedCreditsources = updatedCreditsources.filter((item) => item.form !== value);

                // Reset the specific amount input field based on checkbox id
                const amountFieldId = `outstanding_amount_${id.split('_')[1]}`;
                document.getElementById(amountFieldId).value = "";
            }

            return {
                ...prevFormData,
                Creditsources: updatedCreditsources,
            };
        });
    };


    const [otherForm, setotherForm] = useState("");
    const handleOtherFormChange = (e) => {
        const { id, checked } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (!checked) {
            // Remove corresponding entry from Creditsources
            setFormData((prevState) => ({
                ...prevState,
                Creditsources: prevState.Creditsources.filter(
                    (group) => !group.form.startsWith("แหล่งอื่น ๆ")
                ),
            }));

            // Clear the input value when checkbox is unchecked
            setotherForm("");

            // Clear the outstanding amount input field
            const amountFieldId = `outstanding_amount_${id.split('_')[1]}`;
            const amountField = document.getElementById(amountFieldId);
            if (amountField) {
                amountField.value = "";
            }
        }
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;

        setotherForm(value); // Update local state for the input
        setFormData((prevState) => {
            const updatedCreditsources = [...prevState.Creditsources];
            const otherIndex = updatedCreditsources.findIndex(
                (group) => group.form.startsWith("แหล่งอื่น ๆ")
            );

            if (otherIndex !== -1) {
                updatedCreditsources[otherIndex].form = `แหล่งอื่น ๆ ${value}`;
            }

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };

    const handleOtherOutstandingAmount = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedCreditsources = [...prevState.Creditsources];
            const groupIndex = updatedCreditsources.findIndex(
                (group) => group.form.startsWith(groupValue)
            );

            if (groupIndex !== -1) {
                updatedCreditsources[groupIndex].outstanding_amount = parseFloat(value) || 0;
            } else {
                updatedCreditsources.push({
                    form: `${groupValue} ${otherForm}`,
                    outstanding_amount: parseFloat(value) || 0,
                });
            }

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };

    const [otherForm4, setotherForm4] = useState("");
    const handleOtherForm4Change = (e) => {
        const { id, checked } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (!checked) {
            // Remove corresponding entry from Creditsources
            setFormData((prevState) => ({
                ...prevState,
                Creditsources: prevState.Creditsources.filter(
                    (group) => !group.form.startsWith("กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)")
                ),
            }));

            // Clear the input value when checkbox is unchecked
            setotherForm4("");

            // Clear the outstanding amount input field
            const amountFieldId = `outstanding_amount_${id.split('_')[1]}`;
            const amountField = document.getElementById(amountFieldId);
            if (amountField) {
                amountField.value = "";
            }
        }
    };
    const handleOtherInput4Change = (e) => {
        const value = e.target.value;

        setotherForm4(value); // Update local state for the input
        setFormData((prevState) => {
            const updatedCreditsources = [...prevState.Creditsources];
            const otherIndex = updatedCreditsources.findIndex(
                (group) => group.form.startsWith("กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)")
            );

            if (otherIndex !== -1) {
                updatedCreditsources[otherIndex].form = `กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.) ${value}`;
            }

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };
    const handleOtherOutstandingAmount4 = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedCreditsources = [...prevState.Creditsources];
            const groupIndex = updatedCreditsources.findIndex(
                (group) => group.form.startsWith(groupValue)
            );

            if (groupIndex !== -1) {
                updatedCreditsources[groupIndex].outstanding_amount = parseFloat(value) || 0;
            } else {
                updatedCreditsources.push({
                    form: `${groupValue} ${otherForm4}`,
                    outstanding_amount: parseFloat(value) || 0,
                });
            }

            return { ...prevState, Creditsources: updatedCreditsources };
        });
    };


    //6
    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        const isChecked = value === "true"; // Convert string "true"/"false" to boolean

        setFormData((prevData) => ({
            ...prevData,
            Occupationalproperty: prevData.Occupationalproperty.map((item) => ({
                ...item,
                [name]: isChecked,
                property_type: isChecked ? item.property_type : [], // Reset property_type if false
            })),
        }));
    };




    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
    };


    return (
        <>
            <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
                <div className="Container">
                    <h1 className="text-xl font-bold text-gray-700 mb-5">
                        ส่วนที่ 3 สภาพพื้นฐานทางเศรษฐกิจ (ทุนการเงิน)
                    </h1>

                    {/* Section 1.1: รายได้จากการเกษตร */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-700 mb-5 ">
                            1. รายได้จากการเกษตรของครัวเรือนมาจากอะไร (ตอบได้มากกว่า 1 ข้อ)
                        </h2>
                        <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">1.1) พืชเกษตร</h3>
                        <div className="pl-10">
                            {/* 1 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_0"
                                    value="ไม่ได้เพาะปลูกพืชเกษตร"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "plants", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700"> 0) ไม่ได้เพาะปลูกพืชเกษตร</label>
                            </div>
                            {/* 2 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_1"
                                    value="ทำนา"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "plants", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">  1) ทำนา</label>
                            </div>
                            {/* 3 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_2"
                                    onChange={(e) => handleOtherCheckboxChange(e, "Agriculturalincome", "plants", "ทำสวนผัก")}
                                />
                                <label htmlFor="" className="font text-gray-700"> 2) ทำสวนผัก</label>
                                {isOtherChecked.plants_2 && (
                                    <input
                                        type="text"
                                        placeholder="ระบุ..."
                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        onBlur={(e) => {
                                            if (isOtherChecked.plants_2) {
                                                handleInputChange("Agriculturalincome", "plants", "ทำสวนผัก " + e.target.value);
                                            }
                                        }}
                                    />
                                )}

                            </div>
                            {/* 4 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_3"
                                    onChange={(e) => handleOtherCheckboxChange(e, "Agriculturalincome", "plants", "ทำสวนผลไม้")}
                                />
                                <label htmlFor="" className="font text-gray-700"> 3) ทำสวนผลไม้</label>
                                {isOtherChecked.plants_3 && (
                                    <input
                                        type="text"
                                        placeholder="ระบุ..."
                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        onBlur={(e) => {
                                            if (isOtherChecked.plants_3) {
                                                handleInputChange("Agriculturalincome", "plants", "ทำสวนผลไม้ " + e.target.value);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                            {/* 5 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_4"
                                    value="พืชอื่นๆ เช่น มันสำปะหลัง อ้อย ถั่วเหลือง ถั่วลิสง ฯลฯ"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "plants", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700"> 4) พืชอื่นๆ เช่น มันสำปะหลัง อ้อย ถั่วเหลือง ถั่วลิสง ฯลฯ</label>
                            </div>
                            {/* 6 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="plants"
                                    id="plants_5"
                                    value="อื่นๆ เช่น ชา กาแฟ ยางพารา ปาล์มน้ำมัน ฯลฯ"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "plants", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700"> 5) อื่นๆ เช่น ชา กาแฟ ยางพารา ปาล์มน้ำมัน ฯลฯ</label>
                            </div>

                        </div>
                    </div>

                    {/* Section 1.2: ปศุสัตว์ */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">1.2) ปศุสัตว์</h3>
                        <div className="pl-10">
                            {/* 1 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="livestock"
                                    id="livestock_0"
                                    value="ไม่ได้ทำปศุสัตว์"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "livestock", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    0) ไม่ได้ทำปศุสัตว์
                                </label>
                            </div>
                            {/* 2 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="livestock"
                                    id="livestock_1"
                                    value="เลี้ยงสัตว์บก (เช่น โค/กระบือ)"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "livestock", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    1) เลี้ยงสัตว์บก (เช่น โค/กระบือ)
                                </label>
                            </div>
                            {/* 3 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="livestock"
                                    id="livestock_2"
                                    value="หมู/ไก่/เป็ด/อื่นๆ"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "livestock", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    2) หมู/ไก่/เป็ด/อื่นๆ
                                </label>
                            </div>
                            {/* 4 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="livestock"
                                    id="livestock_3"
                                    value="ทำฟาร์มสัตว์น้ำ เช่น ปลา/กุ้ง"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "livestock", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    3) ทำฟาร์มสัตว์น้ำ เช่น ปลา/กุ้ง
                                </label>
                            </div>
                            {/* 5 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    className="mr-2 rounded"
                                    name="livestock"
                                    id="livestock_4"
                                    onChange={(e) => handleOtherCheckboxChange(e, "Agriculturalincome", "livestock", "อื่นๆ (กบ/ปู/ปลิง/ผึ้ง)")}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    4) อื่นๆ (กบ/ปู/ปลิง/ผึ้ง)
                                </label>
                                {
                                    isOtherChecked.livestock_4 && (
                                        <input
                                            type="text"
                                            placeholder="ระบุ..."
                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            onBlur={(e) => {
                                                if (isOtherChecked.livestock_4) {
                                                    handleInputChange("Agriculturalincome", "livestock", "อื่นๆ (กบ/ปู/ปลิง/ผึ้ง) " + e.target.value);
                                                }
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </div>

                    </div>

                    {/* Section 1.3: ปศุสัตว์ */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">1.3) ประมงค์</h3>
                        <div className="pl-10">
                            {/* 1 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    name="fishing"
                                    id="fishing_0"
                                    className="mr-2 rounded"
                                    value="ไม่ได้ทำประมงค์"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "fishing", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    0) ไม่ได้ทำประมงค์
                                </label>
                            </div>
                            {/* 2 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    name="fishing"
                                    id="fishing_1"
                                    className="mr-2 rounded"
                                    value="ประมงน้ำเค็ม"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "fishing", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    1) ประมงน้ำเค็ม
                                </label>
                            </div>
                            {/* 3 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    name="fishing"
                                    id="fishing_2"
                                    className="mr-2 rounded"
                                    value="ประมงน้ำจืด"
                                    onChange={(e) => handleCheckboxChange("Agriculturalincome", "fishing", e.target.value, e.target.checked)}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    2) ประมงน้ำจืด
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* Section 2 รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)*/}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5 ">
                            2. รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)
                        </h3>
                        <div className="pl-10">
                            {/* 1 */}
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="income_type_0"
                                    name="income_type"
                                    className="mr-2 rounded"
                                    value="รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่"
                                    onChange={(e) => handleNonAGIincomeCheckboxChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่
                                </label>
                                {isOtherChecked.income_type_0 && (
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="....บาท/ปี"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                            onBlur={(e) => updateNonAGIincomeFields("รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่", "amount_per_year", e.target.value)}
                                        />
                                        <label htmlFor=" " className="font text-gray-700 mr-2 ml-4">
                                            ต้นทุน
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="....บาท/ปี"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                            onBlur={(e) => updateNonAGIincomeFields("รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่", "cost_per_year", e.target.value)}
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
                                    value="รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่"
                                    onChange={(e) => handleNonAGIincomeCheckboxChange(e, e.target.value)}
                                />
                                <label htmlFor="income_type_1" className="font text-gray-700 mr-2">
                                    รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่
                                </label>
                                {isOtherChecked.income_type_1 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/ปี"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => updateNonAGIincomeFields("รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่", "amount_per_year", e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: รายจ่ายครัวเรือน */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5 ">
                            3. รายจ่ายครัวเรือน (นอกเหนือจากการลงทุนเพื่อการผลิต) (ตอบได้มากกว่า 1 ข้อ)
                        </h3>
                        <div className="pl-10">
                            {/* 1 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_0"
                                    className="mr-2 rounded"
                                    name="expenses_type"
                                    value="ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="expenses_type_0" className="font text-gray-700 mr-2">
                                    1) ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม
                                </label>
                                {isOtherChecked.expenses_type_0 && (
                                    <input
                                        type="number"
                                        name="amount_per_month"
                                        placeholder="....บาท/เดือน"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 2 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_1"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง พลังงาน) รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    2) ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง พลังงาน) รวม
                                </label>
                                {isOtherChecked.expenses_type_1 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง พลังงาน) รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 3 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox" id="expenses_type_2"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    3) ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม
                                </label>
                                {isOtherChecked.expenses_type_2 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 4 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_3"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    4) ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม ค่าเครื่องแบบนักเรียน สมุด หนังสือ
                                    อินเตอร์เน็ต และอื่น ๆ) รวม
                                </label>
                                {isOtherChecked.expenses_type_3 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 5 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_4"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    5) ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม
                                </label>
                                {isOtherChecked.expenses_type_4 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 6 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_5"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ (ประกันชีวิต/ประกันรถยนต์/ประกันอุบัติเหตุ/ประกันอัคคีภัย) รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    6) ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ (ประกันชีวิต/ประกันรถยนต์/ประกัน
                                    อุบัติเหตุ/ประกันอัคคีภัย) รวม
                                </label>
                                {isOtherChecked.expenses_type_5 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ (ประกันชีวิต/ประกันรถยนต์/ประกันอุบัติเหตุ/ประกันอัคคีภัย) รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 7 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_6"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา บริจาค รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    7) ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา บริจาค รวม
                                </label>
                                {isOtherChecked.expenses_type_6 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา บริจาค รวม", e.target.name, e.target.value)}
                                    />
                                )}

                            </div>
                            {/* 8 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_7"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    8) ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม
                                </label>
                                {isOtherChecked.expenses_type_7 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม", e.target.name, e.target.value)}
                                    />
                                )}

                            </div>
                            {/* 9 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_8"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    9) ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม
                                </label>
                                {isOtherChecked.expenses_type_8 && (
                                    <input
                                        type="number"
                                        name="amount_per_month"
                                        placeholder="....บาท/เดือน"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 10 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_9"
                                    className="mr-2 rounded"
                                    value="ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง บุหรี่ ยาสูบ รวม"
                                    onChange={(e) => handleHouseholdChange(e, e.target.value)}
                                />
                                <label htmlFor="" className="font text-gray-700 mr-2">
                                    10) ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง บุหรี่ ยาสูบ รวม
                                </label>
                                {isOtherChecked.expenses_type_9 && (
                                    <input
                                        type="number"
                                        placeholder="....บาท/เดือน"
                                        name="amount_per_month"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                        onBlur={(e) => handletInputHouseholdChange("ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง บุหรี่ ยาสูบ รวม", e.target.name, e.target.value)}
                                    />
                                )}
                            </div>
                            {/* 11 */}
                            <div className="flex items-center mb-4">
                                <input type="checkbox"
                                    id="expenses_type_10"
                                    className="mr-2 rounded"
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setIsOtherChecked((prev) => ({
                                            ...prev,
                                            expenses_type_10: checked
                                        }));
                                        if (!checked) handleOtherCheckboxClear("expenses_type_10");
                                    }}
                                />
                                <label htmlFor="expenses_type_10" className="font text-gray-700 mr-2">
                                    11) ค่าใช้จ่ายอื่น ๆ (ระบุ)
                                </label>
                                {isOtherChecked.expenses_type_10 && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="ระบุค่าใช้จ่าย..."
                                            name="expenses_type"
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                                            onBlur={handleOtherExpenseChange}
                                        />
                                        <input
                                            type="number"
                                            name="amount_per_month"
                                            placeholder="....บาท/เดือน"
                                            onBlur={(e) => handletInputHouseholdChange(otherExpense, e.target.name, e.target.value)}
                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-4"
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Section 4: Does the household have savings? */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5">
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
                                    />
                                    <span className="font text-gray-700 mr-2">0) ไม่มี</span>
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
                                        onChange={handleRadio1Change}
                                    />
                                    <span className="font text-gray-700 mr-2">1) มี (ระบุประเภทการออม)</span>
                                </label>
                                {
                                    isOtherChecked.is_has_saving_1 && (
                                        <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                                            <table className="table-auto w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border px-4 py-2 bg-gray-200 text-gray-700">ประเภทการออม</th>
                                                        <th className="border px-4 py-2 bg-gray-200 text-gray-700">จำนวนเงินรวม (บาท)</th>
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
                                                                    onChange={handleSavingCheckBoxChange}
                                                                />
                                                                <span>1. เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)</span>
                                                            </label>
                                                        </td>
                                                        <td className="border px-4 py-3 text-center">
                                                            <input
                                                                type="number"
                                                                placeholder="จำนวนเงินบาทรวม"
                                                                id="amount_0"
                                                                name="amount"
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
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
                                                                    onChange={handleSavingCheckBoxChange}
                                                                />
                                                                <span>2. เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)</span>
                                                            </label>
                                                        </td>
                                                        <td className="border px-4 py-3 text-center">
                                                            <input
                                                                type="number"
                                                                placeholder="จำนวนเงินบาทรวม"
                                                                id="amount_1"
                                                                name="amount"
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
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
                                                                    onChange={handleSavingCheckBoxChange}
                                                                />
                                                                <span>3. เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน</span>
                                                            </label>
                                                        </td>
                                                        <td className="border px-4 py-3 text-center">
                                                            <input
                                                                type="number"
                                                                placeholder="จำนวนเงินบาทรวม"
                                                                id="amount_2"
                                                                name="amount"
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
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
                                                                    onChange={handleSavingCheckBoxChange}
                                                                />
                                                                <span>4. พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)</span>
                                                            </label>
                                                        </td>
                                                        <td className="border px-4 py-3 text-center">
                                                            <input
                                                                type="number"
                                                                placeholder="จำนวนเงินบาทรวม"
                                                                id="amount_3"
                                                                name="amount"
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
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
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
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
                                                                    value="การออมอื่นๆ"
                                                                    onChange={handleOtherSavingChange}
                                                                />
                                                                <span>6. การออมอื่นๆ </span>
                                                                {
                                                                    isOtherChecked.saving_type_5 && (
                                                                        <input
                                                                            type="text"
                                                                            placeholder="ระบุ..."
                                                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                            value={otherSaving} // ใช้ค่าอื่นๆ ที่เก็บใน state
                                                                            onChange={handleOtherInputSavingChange}
                                                                        />

                                                                    )
                                                                }
                                                            </label>
                                                        </td>
                                                        <td className="border px-4 py-3 text-center">
                                                            <input
                                                                type="number"
                                                                placeholder="จำนวนเงินบาทรวม"
                                                                id="amount_5"
                                                                name="amount"
                                                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                                                                onChange={(e) =>
                                                                    handleOtherAmount("การออมอื่นๆ", e.target.value)
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5">
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
                                    value={false}
                                    onChange={handleDebtChange}
                                />
                                <label htmlFor="" className="font text-gray-700">
                                    1) ไม่มี เนื่องจาก <strong>(เลือกได้ 1 ข้อ)</strong>
                                </label>
                            </div>
                            {
                                formData.Debt[0].is_has_debt === false && (
                                    <div className="pl-10">
                                        <div className="mb-4">
                                            <input
                                                type="radio"
                                                id="description_0"
                                                name="description"
                                                className="mr-2"
                                                value="ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน"
                                                onChange={handleDescriptionChange}
                                            />
                                            <label htmlFor="description_0" className="text-gray-700">
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
                                                onChange={handleDescriptionChange}
                                            />
                                            <label htmlFor="" className="text-gray-700">
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
                                                onChange={handleDescriptionChange}

                                            />
                                            <label htmlFor="" className="text-gray-700">
                                                ไม่ต้องการเป็นหนี้
                                            </label>
                                        </div>

                                        <div className="mb-4">
                                            <input
                                                type="radio"
                                                id="description_3"
                                                name="description"
                                                className="mr-2"
                                                onChange={() => setDebtData({ description_3: true })}
                                            />
                                            <label htmlFor="description_3" className="text-gray-700">
                                                อื่น ๆ (ระบุ)
                                            </label>
                                            {debtData.description_3 && (
                                                <input
                                                    type="text"
                                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-[10px]"
                                                    placeholder="ระบุ...."
                                                    onChange={handleOtherDescriptionChange}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            }

                            {/* Radio option 2 สำหรับ มีหนี้ */}
                            <div className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    id="is_has_debt_1"
                                    name="is_has_debt"
                                    className="mr-2"
                                    value={true}
                                    onChange={handleDebtChange}
                                />
                                <label htmlFor="has-debt" className="font text-gray-700">
                                    2) มี <strong>(ตอบได้มากกว่า 1 ข้อ)</strong>
                                </label>
                            </div>
                            {
                                formData.Debt[0].is_has_debt === true && (
                                    <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                                        <table className="table-auto w-full border-collapse" style={{ tableLayout: "fixed" }}>
                                            <thead>
                                                <tr>
                                                    <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "70%" }}>
                                                        แหล่งสินเชื่อ <br />
                                                        (สถาบันการเงิน/ กองทุน/ เงินบุคคล)
                                                    </th>
                                                    <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "30%" }}>
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>1. ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            id="outstanding_amount_0"
                                                            name="outstanding_amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>2. ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกü่า ร้อยละ 15 ต่อปี)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_1"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>3. กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            id="outstanding_amount_2"
                                                            name="outstanding_amount"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)")}
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
                                                                value="กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)"
                                                                onChange={handleOtherForm4Change}
                                                            />
                                                            <span>4. กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.) </span>
                                                            {
                                                                isOtherChecked.form_3 && (
                                                                    <input type="text"
                                                                        placeholder="อื่นๆ ระบุ"
                                                                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                        value={otherForm4}
                                                                        onChange={handleOtherInput4Change}
                                                                    />
                                                                )
                                                            }
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_3"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) =>
                                                                handleOtherOutstandingAmount4(
                                                                    "กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)",
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
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ธนาคารเพื่อการเกษตรและสหกรณ์")}
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
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ธนาคารออมสิน")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>7. ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_6"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>8. สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_7"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>9. ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_8"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>10. เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_9"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)")}
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
                                                                onChange={(e) => handleCreditSourceChange(e, 0)}
                                                            />
                                                            <span>11. กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้
                                                                ในอนาคต (กอร.)</span>
                                                        </label>
                                                    </td>
                                                    <td className="border px-4 py-3">
                                                        <input
                                                            type="number"
                                                            id="outstanding_amount_10"
                                                            name="outstanding_amount"
                                                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) => handleOutstandingAmountChange(e.target.value, "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)")}
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
                                                                value="แหล่งอื่น ๆ"
                                                                onChange={handleOtherFormChange}
                                                            />
                                                            <span>12. แหล่งอื่น ๆ </span>
                                                            {isOtherChecked.form_11 && (
                                                                <input type="text"
                                                                    placeholder="(ระบุ)......................"
                                                                    className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                    value={otherForm}
                                                                    onChange={handleOtherInputChange}
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
                                                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                                                            onChange={(e) =>
                                                                handleOtherOutstandingAmount(
                                                                    "แหล่งอื่น ๆ",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {/* Section 6: Does the household have assets for occupation? */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-5">
                            6. ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่
                        </h3>
                        <div className="pl-10">
                            <div className="mt-3">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-600 mr-2"
                                        id="is_has_property_0"
                                        name="is_has_property"
                                        value={false}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="font text-gray-700 mr-2">1) ไม่มี</span>
                                </label>
                            </div>

                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-600 mr-2"
                                        id="is_has_property_1"
                                        name="is_has_property"
                                        value={true}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="font text-gray-700 mr-2">2) มี และได้ใช้เพื่อประกอบอาชีพ (ตอบได้มากกว่า 1 ข้อ)</span>
                                </label>
                                {
                                    formData.Occupationalproperty[0]?.is_has_property && (
                                        <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                                            <ul className="space-y-3">
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            id="property_type_0"
                                                            name="property_type"
                                                            value="เครื่องจักรกล เช่น รถไถนาขนาดเล็ก เครื่องตัดหญ้า ฯลฯ"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 1) เครื่องจักรกล เช่น รถไถนาขนาดเล็ก เครื่องตัดหญ้า ฯลฯ</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            id="property_type_1"
                                                            name="property_type"
                                                            value="รถมอเตอร์ไซค์ (รับจ้าง/ส่งของ)"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 2) รถมอเตอร์ไซค์ (รับจ้าง/ส่งของ)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id="property_type_2"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            value="รถแท็กซี่"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 3) รถแท็กซี่</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id="property_type_6"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            value="รถยนต์ (รับจ้าง/ค้าขาย)"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 4) รถยนต์ (รับจ้าง/ค้าขาย)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_4"
                                                            value="เรือประมง เรือติดเครื่องยนตร์"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 5) เรือประมง เรือติดเครื่องยนตร์</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            id="property_type_5"
                                                            name="property_type"
                                                            value="แผงขายของ"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 6) แผงขายของ</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_6"
                                                            value="รถโชเล่ย์ (รถพ่วงข้าง)"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 7) รถโชเล่ย์ (รถพ่วงข้าง)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_7"
                                                            value="ยุ้งฉาง"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2"> 8) ยุ้งฉาง</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_8"
                                                            value="หุ้น/กองทุน"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2">9) หุ้น/กองทุน</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_9"
                                                            value="แชร์ (ที่ยังไม่ได้เปีย)"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2">10) แชร์ (ที่ยังไม่ได้เปีย)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_10"
                                                            value="สัตว์เลี้ยง (ที่มีมูลค่า)"
                                                            onChange={(e) => handleCheckboxChange("Occupationalproperty", "property_type", e.target.value, e.target.checked)}
                                                        />
                                                        <span className="ml-2">11) สัตว์เลี้ยง (ที่มีมูลค่า)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                                            name="property_type"
                                                            id="property_type_7"
                                                            onChange={(e) => handleOtherCheckboxChange(e, "Occupationalproperty", "property_type", "อื่น ๆ")}
                                                        />
                                                        <span className="ml-2">อื่น ๆ</span>
                                                    </label>
                                                    {isOtherChecked.property_type_7 && (
                                                        <span className="ml-2 inline-flex items-center">
                                                            <input
                                                                type="text"
                                                                placeholder=" (ระบุ)..."
                                                                name="property_type_7"
                                                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                                style={{ minWidth: "200px" }}
                                                                onBlur={(e) => {
                                                                    if (isOtherChecked.property_type_7) {
                                                                        handleInputChange("Occupationalproperty", "property_type", "อื่น ๆ" + e.target.value);
                                                                    }
                                                                }}
                                                            />
                                                        </span>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>

                    <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                        submit
                    </button>

                </div>
            </div>
        </>
    )

}

export default Financialcapital