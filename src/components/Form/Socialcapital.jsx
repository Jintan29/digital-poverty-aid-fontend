import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

function Socialcapital({ setCurrentPage, setMainFormData, mainFormData }) {
  const [formData, setFormData] = useState({
    Activitygrouptype: [],
    Activitytype: [],
  });

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
        const otherIndex = updatedActivitygrouptype.findIndex((group) =>
          group.activity_group.startsWith(prefixOtherGroup)
        );

        if (otherIndex === -1) {
          updatedActivitygrouptype.push({
            activity_group: prefixOtherGroup,
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
          (group) => !group.activity_group.startsWith(prefixOtherGroup) //ลบ Obj
        ),
      }));
    }
  };

  const handleActivityGroupOther = (prefixO, field, value) => {
    setFormData((prevState) => {
      const updatedActivitygrouptype = [...prevState.Activitygrouptype];
      const groupIndex = updatedActivitygrouptype.findIndex((group) =>
        group.activity_group.startsWith(prefixO)
      );

      if (groupIndex !== -1) {
        updatedActivitygrouptype[groupIndex][field] = value; // ใช้ field เพื่ออัปเดตคีย์ที่ต้องการ
      }

      return { ...prevState, Activitygrouptype: updatedActivitygrouptype };
    });
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;

    setOtherActivity(value); // อัปเดตสถานะ local
    setFormData((prevState) => {
      const updatedActivitygrouptype = [...prevState.Activitygrouptype];
      const otherIndex = updatedActivitygrouptype.findIndex(
        (group) =>
          group.activity_group === "" || group.activity_group === otherActivity
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
          value === "true" ? true : value === "false" ? false : null;
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

  const handleActivityChange = (groupValue, checked) => {
    setFormData((prevState) => {
      const updatedActivitytype = [...prevState.Activitytype];
      const groupIndex = updatedActivitytype.findIndex(
        (group) => group?.activity.startsWith(groupValue) // Match by prefix
      );

      if (checked) {
        if (groupIndex === -1) {
          // Add new entry
          updatedActivitytype.push({
            activity: groupValue,
            frequncy: "",
            participation_level: "",
          });
        }
      } else {
        if (groupIndex !== -1) {
          // Remove matching entry
          updatedActivitytype.splice(groupIndex, 1);
        }
      }

      return { ...prevState, Activitytype: updatedActivitytype };
    });
  };


  const handleFrequncyCgange = (groupValue, field, value) => {
    setFormData((prevState) => {
      const updatedActivitytype = [...prevState.Activitytype];
      const groupIndex = updatedActivitytype.findIndex((group) =>
        group.activity.startsWith(groupValue)
      );

      if (groupIndex !== -1) {
        updatedActivitytype[groupIndex][field] = value; // ใช้ field เพื่ออัปเดตคีย์ที่ต้องการ
      }

      return { ...prevState, Activitytype: updatedActivitytype };
    });
  };

  //show other input txt
  const prefix = "อื่นๆ";
  const prefixOtherGroup = "กลุ่มอื่น ๆ";

  const handleShowData = () => {
    console.log("Form Data Submitted:", formData);
  };

  //load data
  useEffect(() => {
    if (mainFormData.Socialcapital) {
      setFormData(mainFormData.Socialcapital);
    }
  }, [mainFormData])


  const validateGrouptype = (formData) => {
    const { Activitygrouptype } = formData;

    // Check for incomplete entries
    const incompleteGroups = Activitygrouptype.filter(
      (group) =>
        group.activity_group &&
        (group.is_member === undefined || group.dependency === undefined || group.dependency === "")
    );

    if (incompleteGroups.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะ",
        text: "กรุณากรอกข้อมูลให้ครบถ้วนในแต่ละกลุ่มที่เลือก",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    // Ensure the input text is filled for "กลุ่มอื่น ๆ" if selected
    const otherGroup = Activitygrouptype.find((group) =>
      group.activity_group.startsWith(prefixOtherGroup)
    );

    if (otherGroup && otherGroup.activity_group === prefixOtherGroup) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูล",
        text: "กรุณากรอกชื่อกลุ่มในช่อง 'กลุ่มอื่น ๆ'",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    // Ensure at least one valid entry exists
    const isValid = Activitygrouptype.some(
      (group) =>
        group.activity_group &&
        group.is_member !== undefined &&
        group.dependency !== undefined &&
        group.dependency !== ""
    );

    if (!isValid) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะ",
        text: "กรุณาเลือกข้อมูลให้ครบถ้วนในประเภทกลุ่มกิจกรรม อย่างน้อย 1 กลุ่ม",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    return true;
  };


  const validateType = (formData) => {
    const { Activitytype } = formData;
  
    // Check for incomplete entries
    const incompleteActivities = Activitytype.filter((group) => {
      const isOtherActivity = group.activity && group.activity.startsWith("อื่นๆ"); // เช็คว่าเป็นตัวเลือก "อื่นๆ"
      const isOtherActivityEmpty = isOtherActivity && group.activity.trim() === "อื่นๆ"; // เช็คว่าไม่ได้กรอกข้อความเพิ่มเติม
      return (
        (!group.frequncy || !group.participation_level) || // Ensure all required fields are filled
        isOtherActivityEmpty // Ensure "อื่นๆ" has additional text
      );
    });
  
    if (incompleteActivities.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะ",
        text: "กรุณากรอกข้อมูลให้ครบถ้วนในแต่ละกิจกรรมที่เลือก หรือเพิ่มรายละเอียด",
        confirmButtonText: "ตกลง",
      });
      return false;
    }
  
    // Ensure at least one valid entry exists
    const isValid = Activitytype.some(
      (group) =>
        group.activity && 
        group.frequncy && 
        group.participation_level && 
        (!group.activity.startsWith("อื่นๆ") || group.activity.trim() !== "อื่นๆ") // Ensure "อื่นๆ" has valid text
    );
  
    if (!isValid) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะ",
        text: "กรุณาเลือกข้อมูลให้ครบถ้วนในประเภทกิจกรรม อย่างน้อย 1 กิจกรรม",
        confirmButtonText: "ตกลง",
      });
      return false;
    }
  
    return true;
  };
  


  //next page
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateGrouptype(formData)) {
      return; // Stop submission if validation fails
    }

    if (!validateType(formData)) {
      return; // Stop submission if validation fails
    }

    setMainFormData((prevData) => ({
      ...prevData,
      Socialcapital: formData,
    }));

    setCurrentPage(8);
  };

  //ย้อนกลับ
  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      Socialcapital: formData,
    }));
    setCurrentPage(6);
  };

  return ( 
    <div className="mb-6 mx-10 m-5 p-5 rounded-lg" >
      <div className="Container">
        <h1 className="text-xl font-bold text-gray-700 mb-5">
          ส่วนที่ 5 การเกื้อกูลและระบบรองรับทางสังคม (ทุนทางสังคม)
        </h1>
        {/* ตาราง */}
        <div className="mt-5 bg-white p-4 rounded-lg  max-w-4xl overflow-x-auto">
          <table
            className="table-auto border-collapse"
            style={{ width: '800px' }}
          >
            <thead>
              <tr>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "50%" }}
                >
                  ประเภทกลุ่มกิจกรรม
                </th>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "25%" }}
                >
                  การเป็นสมาชิก
                </th>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "25%" }}
                >
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
                    <span>
                      1) กลุ่มอาชีพ/การผลิต/แปรรูป (เช่น กลุ่มเมล็ดพันธุ์
                      กลุ่มทอ ผ้า/จักสาน/หัตถกรรม กลุ่มแปรรูปผลผลิต
                      กลุ่มด้านการเกษตร และเลี้ยงสัตว์ กลุ่มปัจจัยการผลิต)
                    </span>
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
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
                    <span>
                      2) กลุ่มการเงิน (เช่น กองทุนหมู่บ้าน กองทุนเงินล้าน กลุ่ม
                      ออมทรัพย์)
                    </span>
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
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
                    <span>
                      {" "}
                      3) กลุ่มสวัสดิการสังคม (เช่น กลุ่มฌาปนกิจ
                      กองทุนสวัสดิการชุมชน)
                    </span>
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
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
                    <span>
                      4) กลุ่มด้านสังคม (เช่น กลุ่มเยาวชน กลุ่มผู้สูงอายุ
                      กลุ่มสตรี/ แม่บ้าน กลุ่มศาสนา)
                    </span>
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
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
                    <span>
                      {" "}
                      5) กลุ่มทรัพยากรธรรมชาติ (เช่น กลุ่มอนุรักษ์
                      กลุ่มผู้ใช้น้ำ)
                    </span>
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
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
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
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
                      checked={formData.Activitygrouptype.some((group) =>
                        group.activity_group.startsWith(prefixOtherGroup)
                      )}
                      onChange={handleOtherChange}
                    />
                    <span>6) กลุ่มอื่น ๆ</span>
                    {formData.Activitygrouptype.some((group) => //find in array
                      group.activity_group.startsWith(prefixOtherGroup)
                    ) && (
                        <input
                          type="text"
                          placeholder="ระบุ..."
                          className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                          value={formData.Activitygrouptype?.find((e) =>
                            e.activity_group.startsWith(prefixOtherGroup)).activity_group.slice(prefixOtherGroup.length)}
                          onChange={e => handleActivityGroupOther(prefixOtherGroup, 'activity_group', prefixOtherGroup + e.target.value)}
                        />
                      )}
                  </label>
                </td>
                <td className="border px-4 py-3 text-center">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
                    id="is_member_5"
                    name="is_member"
                    value={
                      formData.Activitygrouptype.find(
                        (group) => group.activity_group.startsWith(prefixOtherGroup)
                      )?.is_member ?? ""
                    }
                    onChange={(e) =>
                      handleActivityGroupOther(prefixOtherGroup, 'is_member', e.target.value)
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value={false}>ไม่เป็น</option>
                    <option value={true}>เป็น</option>
                  </select>
                </td>
                <td className="border px-4 py-3 text-center ">
                  <select
                    className="border rounded px-2 py-1 rounded-lg shadow-md "
                    id="dependency_5"
                    name="dependency"
                    value={
                      formData.Activitygrouptype.find(
                        (group) => group.activity_group.startsWith(prefixOtherGroup)
                      )?.dependency ?? ""
                    }
                    onChange={(e) =>
                      handleActivityGroupOther(prefixOtherGroup, 'dependency', e.target.value)
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="พึ่งพาได้มาก">พึ่งพาได้มาก</option>
                    <option value="พึ่งพาได้บ้าง">พึ่งพาได้บ้าง</option>
                    <option value="พึ่งพาไม่ได้เลย">พึ่งพาไม่ได้เลย</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* กิจกรรม */}
        <div className="mt-5 bg-white p-4 rounded-lg max-w-4xl overflow-x-auto">
          <table
            className="table-auto border-collapse"
            style={{ width: '800px' }}
          >
            <thead>
              <tr>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "50%" }}
                >
                  ประเภทกิจกรรม
                </th>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "25%" }}
                >
                  ระดับการมีส่วนร่วม
                </th>
                <th
                  className="border px-4 py-2 bg-gray-200 text-gray-700"
                  style={{ width: "25%" }}
                >
                  ความถี่ในการเข้าร่วม
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
                      name="activity_group_Test"
                      checked={formData.Activitytype?.some(
                        (group) => group?.activity === "กิจกรรมทางศาสนา"
                      )}
                      value="กิจกรรมทางศาสนา"
                      onChange={(e) =>
                        handleActivityChange(e.target.value, e.target.checked)
                      }
                    />
                    <span>1) กิจกรรมทางศาสนา</span>
                  </label>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="frequncy_0"
                    name="frequncy"
                    value={
                      formData.Activitytype.find(
                        (group) => group.activity === "กิจกรรมทางศาสนา"
                      )?.frequncy ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมทางศาสนา",
                        "frequncy",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่ร่วม">ไม่ร่วม</option>
                    <option value="เข้าร่วมรับรู้ รับฟัง">
                      เข้าร่วมรับรู้ รับฟัง
                    </option>
                    <option value="แสดงความคิดเห็น">แสดงความคิดเห็น</option>
                    <option value="ตัดสินใจ">ตัดสินใจ</option>
                  </select>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="participation_level"
                    name="participation_level_1"
                    value={
                      formData.Activitytype.find(
                        (group) => group.activity === "กิจกรรมทางศาสนา"
                      )?.participation_level ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมทางศาสนา",
                        "participation_level",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่เคยเข้าร่วมเลย">ไม่เคยเข้าร่วมเลย</option>
                    <option value="เข้าร่วมบางครั้ง">เข้าร่วมบางครั้ง</option>
                    <option value="เข้าร่วมทุกครั้ง">เข้าร่วมทุกครั้ง</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 mr-2 rounded"
                      id="activity_2"
                      name="activity_2"
                      checked={formData.Activitytype?.some(
                        (group) => group?.activity === "กิจกรรมประชาสัมพันธ์"
                      )}
                      value="กิจกรรมประชาสัมพันธ์"
                      onChange={(e) =>
                        handleActivityChange(e.target.value, e.target.checked)
                      }
                    />
                    <span>2) กิจกรรมประชาสัมพันธ์</span>
                  </label>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="is_member_0"
                    name="is_member"
                    value={
                      formData.Activitytype.find(
                        (group) => group.activity === "กิจกรรมประชาสัมพันธ์"
                      )?.frequncy ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมประชาสัมพันธ์",
                        "frequncy",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่ร่วม">ไม่ร่วม</option>
                    <option value="เข้าร่วมรับรู้ รับฟัง">
                      เข้าร่วมรับรู้ รับฟัง
                    </option>
                    <option value="แสดงความคิดเห็น">แสดงความคิดเห็น</option>
                    <option value="ตัดสินใจ">ตัดสินใจ</option>
                  </select>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    value={
                      formData.Activitytype.find(
                        (group) => group.activity === "กิจกรรมประชาสัมพันธ์"
                      )?.participation_level ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมประชาสัมพันธ์",
                        "participation_level",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่เคยเข้าร่วมเลย">ไม่เคยเข้าร่วมเลย</option>
                    <option value="เข้าร่วมบางครั้ง">เข้าร่วมบางครั้ง</option>
                    <option value="เข้าร่วมทุกครั้ง">เข้าร่วมทุกครั้ง</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 mr-2 rounded"
                      id="activity_group_0"
                      name="activity_group_Test"
                      checked={formData.Activitytype?.some(
                        (group) =>
                          group?.activity ===
                          "กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม"
                      )}
                      value="กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม"
                      onChange={(e) =>
                        handleActivityChange(e.target.value, e.target.checked)
                      }
                    />
                    <span>3) กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม</span>
                  </label>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="is_member_0"
                    name="is_member"
                    value={
                      formData.Activitytype.find(
                        (group) =>
                          group.activity ===
                          "กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม"
                      )?.frequncy ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม",
                        "frequncy",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่ร่วม">ไม่ร่วม</option>
                    <option value="เข้าร่วมรับรู้ รับฟัง">
                      เข้าร่วมรับรู้ รับฟัง
                    </option>
                    <option value="แสดงความคิดเห็น">แสดงความคิดเห็น</option>
                    <option value="ตัดสินใจ">ตัดสินใจ</option>
                  </select>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="is_member_0"
                    name="is_member"
                    value={
                      formData.Activitytype.find(
                        (group) =>
                          group.activity ===
                          "กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม"
                      )?.participation_level ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        "กิจกรรมทางการพัฒนา อนุรักษ์ และสิ่งแวดล้อม",
                        "participation_level",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่เคยเข้าร่วมเลย">ไม่เคยเข้าร่วมเลย</option>
                    <option value="เข้าร่วมบางครั้ง">เข้าร่วมบางครั้ง</option>
                    <option value="เข้าร่วมทุกครั้ง">เข้าร่วมทุกครั้ง</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 mr-2 rounded"
                      id="activity_group_0"
                      name="activity_group_Test"
                      checked={!!formData.Activitytype.find((e) =>
                        e.activity.startsWith(prefix)
                      )}
                      value={prefix}
                      onChange={(e) =>
                        handleActivityChange(e.target.value, e.target.checked)
                      }
                    />
                    <span>4) อื่นๆ (ระบุ)</span>
                    {formData.Activitytype?.find((e) =>
                      e.activity.startsWith(prefix)
                    ) ? (
                      <input
                        type="text"
                        placeholder="ระบุ..."
                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={formData.Activitytype.find((e) =>
                          e.activity.startsWith(prefix)
                        ).activity.slice(prefix.length)}
                        onChange={(e) =>
                          handleFrequncyCgange(
                            prefix,
                            "activity",
                            prefix + e.target.value
                          )
                        }
                      />
                    ) : (
                      ""
                    )}
                  </label>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="is_member_0"
                    name="is_member"
                    value={
                      formData.Activitytype.find((group) =>
                        group.activity.startsWith(prefix)
                      )?.participation_level ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(
                        prefix,
                        "participation_level",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่ร่วม">ไม่ร่วม</option>
                    <option value="เข้าร่วมรับรู้ รับฟัง">
                      เข้าร่วมรับรู้ รับฟัง
                    </option>
                    <option value="แสดงความคิดเห็น">แสดงความคิดเห็น</option>
                    <option value="ตัดสินใจ">ตัดสินใจ</option>
                  </select>
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    className="border  px-2 py-1 rounded-lg shadow-md"
                    id="is_member_0"
                    name="is_member"
                    value={
                      formData.Activitytype.find((group) =>
                        group.activity.startsWith(prefix)
                      )?.frequncy ?? ""
                    }
                    onChange={(e) =>
                      handleFrequncyCgange(prefix, "frequncy", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      เลือกสถานะ
                    </option>
                    <option value="ไม่เคยเข้าร่วมเลย">ไม่เคยเข้าร่วมเลย</option>
                    <option value="เข้าร่วมบางครั้ง">เข้าร่วมบางครั้ง</option>
                    <option value="เข้าร่วมทุกครั้ง">เข้าร่วมทุกครั้ง</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>

      <div className="flex justify-end mt-4">

        <button
          type="button"
          className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3"
          onClick={(e) => handlePrevPage()}
        >
          <Icon
            icon="material-symbols:arrow-left-rounded"
            width="25"
            height="25"
          />
          ย้อนกลับ
        </button>

        <button
          type="button"
          className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          onClick={(e) => handleSubmit(e)}
        >
          หน้าถัดไป
          <Icon
            icon="material-symbols:arrow-right-rounded"
            width="25"
            height="25"
          />
        </button>
      </div>
    </div>
  );
}

export default Socialcapital;
