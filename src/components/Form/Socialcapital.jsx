import React, { useState } from "react";


function Socialcapital() {

    const [formData, setFormData] = useState({
        Activitygrouptype: [
            // {
            //     activity_group: "",
            //     is_member: null,
            //     dependency: "",
            // }
        ],

        Activitytype: [
            {
                activity: [],
                participation_level: "",
                frequncy: "",
            }
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


    //ohter
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


    //radio
    const handleRadioChange = (e, field) => {
        const value = e.target.value;

        setFormData((prevData) => {
            const updatedActivitytype = [...prevData.Activitytype];

            // อัปเดตค่า field ที่ระบุใน object แรกของ Activitytype
            if (updatedActivitytype.length > 0) {
                updatedActivitytype[0] = {
                    ...updatedActivitytype[0], // คัดลอกค่าที่มีอยู่ใน object ปัจจุบัน
                    [field]: value, // อัปเดตค่า field ที่ระบุด้วยค่าจาก input radio
                };
            }

            return {
                ...prevData,
                Activitytype: updatedActivitytype,
            };
        });
    };



    const [isOtherChecked, setIsOtherChecked] = useState({});
    const [otherActivity, setOtherActivity] = useState("");

    const handleOtherChange = (e) => {
        const { id, checked } = e.target;

        setIsOtherChecked((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        if (checked) {
            setFormData((prevState) => {
                const updatedActivitygrouptype = [...prevState.Activitygrouptype];
                const otherIndex = updatedActivitygrouptype.findIndex(
                    (group) => group.activity_group === ""
                );

                if (otherIndex === -1) {
                    updatedActivitygrouptype.push({
                        activity_group: "",
                        is_member: null,
                        dependency: "",
                    });
                }

                return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                Activitygrouptype: prevState.Activitygrouptype.filter(
                    (group) => group.activity_group !== otherActivity
                ),
            }));
            setOtherActivity(""); // ล้างค่าที่กรอกเมื่อยกเลิก checkbox
        }
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;

        setOtherActivity(value); // อัปเดตสถานะ local
        setFormData((prevState) => {
            const updatedActivitygrouptype = [...prevState.Activitygrouptype];
            const otherIndex = updatedActivitygrouptype.findIndex(
                (group) => group.activity_group === "" || group.activity_group === otherActivity
            );

            if (otherIndex !== -1) {
                updatedActivitygrouptype[otherIndex].activity_group = value;
            }

            return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
        });
    };


    const handleActivityGroupChange = (groupValue, checked) => {
        setFormData((prevState) => {
            const updatedActivitygrouptype = [...prevState.Activitygrouptype];
            const groupIndex = updatedActivitygrouptype.findIndex(
                (group) => group.activity_group === groupValue
            );

            if (checked) {
                if (groupIndex === -1) {
                    updatedActivitygrouptype.push({
                        activity_group: groupValue,
                        is_member: null,
                        dependency: "",
                    });
                }
            } else {
                if (groupIndex !== -1) {
                    updatedActivitygrouptype.splice(groupIndex, 1);
                }
            }

            return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
        });
    };

    const handleIsMemberChange = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedActivitygrouptype = [...prevState.Activitygrouptype];
            const groupIndex = updatedActivitygrouptype.findIndex(
                (group) => group.activity_group === groupValue
            );

            if (groupIndex !== -1) {
                updatedActivitygrouptype[groupIndex].is_member =
                    value === "true"
                        ? true
                        : value === "false"
                            ? false
                            : null;
            }

            return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
        });
    };

    const handleDependencyChange = (groupValue, value) => {
        setFormData((prevState) => {
            const updatedActivitygrouptype = [...prevState.Activitygrouptype];
            const groupIndex = updatedActivitygrouptype.findIndex(
                (group) => group.activity_group === groupValue
            );

            if (groupIndex !== -1) {
                updatedActivitygrouptype[groupIndex].dependency = value;
            }

            return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
        });
    };



    const handleSubmit = () => {
        console.log("Form Data Submitted:", formData);
    };


    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
            <div className="Container">
                <h1 className="text-xl font-bold text-gray-700 mb-5">
                    ส่วนที่ 5 การเกื้อกูลและระบบรองรับทางสังคม (ทุนทางสังคม)
                </h1>
                {/* ตาราง */}
                <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                    <table className="table-auto w-full border-collapse" style={{ tableLayout: "fixed" }}>
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "70%" }}>
                                    ประเภทกลุ่มกิจกรรม
                                </th>
                                <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "25%" }}>
                                    การเป็นสมาชิก
                                </th>
                                <th className="border px-4 py-2 bg-gray-200 text-gray-700" style={{ width: "30%" }}>
                                    การพึ่งพาในกรณีที่ได้รับความเดือดร้อน
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            id="activity_group_0"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)"
                                            )}
                                            value="กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)"
                                            onChange={(e) =>
                                                handleActivityGroupChange(
                                                    e.target.value,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span>1) กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอ
                                            ผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตร
                                            และเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)
                                        </span>
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_0"
                                        name="is_member"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)"
                                            )?.is_member ?? ""
                                        }
                                        onChange={(e) =>
                                            handleIsMemberChange(
                                                "กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_0"
                                        name="dependency"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)"
                                            )?.dependency ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDependencyChange(
                                                "กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์ กลุ่มทอผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต กลุ่มด้านการเกษตรและเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            id="activity_group_1"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)"
                                            )}
                                            value="กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)"
                                            onChange={(e) =>
                                                handleActivityGroupChange(
                                                    e.target.value,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span>2) กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม
                                            ออมทรัพย์)
                                        </span>
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_1"
                                        name="is_member"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)"
                                            )?.is_member ?? ""
                                        }
                                        onChange={(e) =>
                                            handleIsMemberChange(
                                                "กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_1"
                                        name="dependency"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)"
                                            )?.dependency ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDependencyChange(
                                                "กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม ออมทรัพย์)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            value="กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)"
                                            id="activity_group_2"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)"
                                            )}
                                            onChange={(e) =>
                                                handleActivityGroupChange(
                                                    e.target.value,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span> 3) กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)
                                        </span>
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_2"
                                        name="is_member"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)"
                                            )?.is_member ?? ""
                                        }
                                        onChange={(e) =>
                                            handleIsMemberChange(
                                                "กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_2"
                                        name="dependency"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)"
                                            )?.dependency ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDependencyChange(
                                                "กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ กองทุนสวัสดิการชุมชน)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            id="activity_group_3"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)"
                                            )}
                                            value="กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)"
                                            onChange={(e) =>
                                                handleActivityGroupChange(
                                                    e.target.value,
                                                    e.target.checked
                                                )
                                            }

                                        />
                                        <span>  4) กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/
                                            แม่บ้าน กลุ่มศาสนา)
                                        </span>
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_3"
                                        name="is_member"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)"
                                            )?.is_member ?? ""
                                        }
                                        onChange={(e) =>
                                            handleIsMemberChange(
                                                "กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_3"
                                        name="dependency"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)"
                                            )?.dependency ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDependencyChange(
                                                "กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ กลุ่มสตรี/แม่บ้าน กลุ่มศาสนา)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            id="activity_group_4"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)"
                                            )}
                                            value="กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)"
                                            onChange={(e) =>
                                                handleActivityGroupChange(
                                                    e.target.value,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span>   5) กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)
                                        </span>
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_4"
                                        name="is_member"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)"
                                            )?.is_member ?? ""
                                        }
                                        onChange={(e) =>
                                            handleIsMemberChange(
                                                "กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_4"
                                        name="dependency"
                                        value={
                                            formData.Activitygrouptype.find(
                                                (group) =>
                                                    group.activity_group ===
                                                    "กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)"
                                            )?.dependency ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDependencyChange(
                                                "กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์ กลุ่มผู้ใช้น้ำ)",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 mr-2 rounded"
                                            id="activity_group_5"
                                            name="activity_group"
                                            checked={formData.Activitygrouptype.some(
                                                (group) => group.activity_group === otherActivity
                                            )}
                                            onChange={handleOtherChange}
                                        />
                                        <span>
                                            6) กลุ่มอื่น ๆ
                                        </span>
                                        {isOtherChecked.activity_group_5 && (
                                            <input type="text"
                                                placeholder="ระบุ..."
                                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                value={otherActivity}
                                                onChange={handleOtherInputChange}
                                            />
                                        )}
                                    </label>
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="is_member_5"
                                        name="is_member"
                                        value={formData.Activitygrouptype.find(
                                            (group) => group.activity_group === otherActivity
                                        )?.is_member || ""}
                                        onChange={(e) =>
                                            handleIsMemberChange(otherActivity, e.target.value)
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value={false}>ไม่เป็น</option>
                                        <option value={true}>เป็น</option>

                                    </select>
                                </td>
                                <td className="border px-4 py-3 text-center ">
                                    <select className="border rounded px-2 py-1 rounded-lg shadow-md"
                                        id="dependency_5"
                                        name="dependency"
                                        value={formData.Activitygrouptype.find(
                                            (group) => group.activity_group === otherActivity
                                        )?.dependency || ""}
                                        onChange={(e) =>
                                            handleDependencyChange(otherActivity, e.target.value)
                                        }
                                    >
                                        <option value="" disabled>เลือกสถานะ</option>
                                        <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                                        <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                                        <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ส่วนกิจรกรรม */}
                <div className="mt-8 grid grid-cols-3 gap-6 p-6 bg-white rounded-lg shadow-lg">
                    {/* ประเภทกิจกรรม */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ประเภทกิจกรรม</h3>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox"
                                    className="form-checkbox text-blue-600 rounded"
                                    id="activity_0"
                                    name="activity"
                                    checked={formData.Activitytype[0].activity.includes("กิจกรรมทางศาสนา")}
                                    value="กิจกรรมทางศาสนา"
                                    onChange={(e) => handleCheckboxChange("Activitytype", "activity", e.target.value, e.target.checked)}
                                />
                                <span>กิจกรรมทางศาสนา</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox"
                                    className="form-checkbox text-blue-600 rounded"
                                    id="activity_1"
                                    name="activity"
                                    checked={formData.Activitytype[0].activity.includes("กิจกรรมประชาสัมพันธ์")}
                                    value="กิจกรรมประชาสัมพันธ์"
                                    onChange={(e) => handleCheckboxChange("Activitytype", "activity", e.target.value, e.target.checked)}
                                />
                                <span>กิจกรรมประชาสัมพันธ์</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox"
                                    className="form-checkbox text-blue-600 rounded"
                                    id="activity_2"
                                    name="activity"
                                   checked={formData.Activitytype[0].activity.includes("กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม")}
                                    value="กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม"
                                    onChange={(e) => handleCheckboxChange("Activitytype", "activity", e.target.value, e.target.checked)}
                                />
                                <span>กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox"
                                    className="form-checkbox text-blue-600 rounded"
                                    id="activity_3"
                                    name="activity"
                                    checked={!!isOtherChecked.activity_3}
                                    onChange={(e) => handleOtherCheckboxChange(e, "Activitytype", "activity", "อื่นๆ")}
                                />
                                <span>อื่นๆ (ระบุ)</span>
                                {
                                    isOtherChecked.activity_3 && (
                                        <input
                                            type="text"
                                            placeholder="ระบุ..."
                                            className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            onBlur={(e) => {
                                                if (isOtherChecked.activity_3) {
                                                    handleInputChange("Activitytype", "activity", "อื่นๆ " + e.target.value);
                                                }
                                            }}
                                        />
                                    )
                                }
                            </label>
                        </div>
                    </div>

                    {/* ระดับการมีส่วนร่วม */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ระดับการมีส่วนร่วม</h3>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="participation_level"
                                    checked={formData.Activitytype[0].participation_level === "ไม่ร่วม"}
                                    className="form-radio text-blue-600 "
                                    value="ไม่ร่วม"
                                    onChange={(e) => handleRadioChange(e, 'participation_level')}
                                />
                                <span>ไม่ร่วม</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="participation_level"
                                    className="form-radio text-blue-600 "
                                    checked={formData.Activitytype[0].participation_level === "เข้าร่วมรับรู้ รับฟัง"}
                                    value="เข้าร่วมรับรู้ รับฟัง"
                                    onChange={(e) => handleRadioChange(e, 'participation_level')}
                                />
                                <span>เข้าร่วมรับรู้ รับฟัง</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="participation_level"
                                    className="form-radio text-blue-600 "
                                    checked={formData.Activitytype[0].participation_level === "แสดงความคิดเห็น"}
                                    value="แสดงความคิดเห็น"
                                    onChange={(e) => handleRadioChange(e, 'participation_level')}
                                />
                                <span>แสดงความคิดเห็น</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="participation_level"
                                    className="form-radio text-blue-600 "
                                    checked={formData.Activitytype[0].participation_level === "ตัดสินใจ"}
                                    value="ตัดสินใจ"
                                    onChange={(e) => handleRadioChange(e, 'participation_level')}
                                />
                                <span>ตัดสินใจ</span>
                            </label>
                        </div>
                    </div>

                    {/* ความถี่ในการเข้าร่วม */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ความถี่ในการเข้าร่วม</h3>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="frequency"
                                    className="form-radio text-blue-600"
                                    checked={formData.Activitytype[0].frequncy === "ไม่เคยเข้าร่วมเลย"}
                                    value="ไม่เคยเข้าร่วมเลย"
                                    onChange={(e) => handleRadioChange(e, 'frequncy')}
                                />
                                <span>ไม่เคยเข้าร่วมเลย</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="frequency"
                                    className="form-radio text-blue-600"
                                    checked={formData.Activitytype[0].frequncy === "เข้าร่วมบางครั้ง"}
                                    value="เข้าร่วมบางครั้ง"
                                    onChange={(e) => handleRadioChange(e, 'frequncy')}
                                />
                                <span>เข้าร่วมบางครั้ง</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="frequency"
                                    className="form-radio text-blue-600"
                                    checked={formData.Activitytype[0].frequncy === "เข้าร่วมทุกครั้ง"}
                                    value="เข้าร่วมทุกครั้ง"
                                    onChange={(e) => handleRadioChange(e, 'frequncy')}
                                />
                                <span>เข้าร่วมทุกครั้ง</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                    submit
                </button>
            </div>
        </div>
    )

}



export default Socialcapital