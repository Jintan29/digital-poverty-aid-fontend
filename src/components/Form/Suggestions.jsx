import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Suggestions = ({ setCurrentPage, setMainFormData, mainFormData,handleSubmitMain }) => {
  const [formData, setFormData] = useState({
    suggest_informer: "",
    suggest_surway_team: "",
    resource: [],
  });

  //load data
  useEffect(() => {
    if (mainFormData.Suggestion) {
      setFormData(mainFormData.Suggestion);
    }
  }, [mainFormData]);

  //Nextpage
  const handleSubmit = async(e) => {
    e.preventDefault();

    //สร้างตัวแปรมาเก็บค่าเพื่อสร้างข้อมูลแยกไม่ต้องรอ mainData
    const updateData = {
      ...mainFormData,
      Suggestion:formData
    }

    setMainFormData(updateData);
    //send API
    await handleSubmitMain(updateData)
  };

  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      Suggestion: formData,
    }));

    setCurrentPage(8);
  };

  const handleLog = () => {
    console.log(formData);
  };

  const handleInputChange = (field, value) => {
    const updataData = { ...formData };
    updataData[field] = value;
    setFormData(updataData);
  };

  const handleCheckboxChange = (value, checked) => {
    const updataData = { ...formData };

    if (checked) {
      updataData.resource = [
        ...updataData.resource,
        value,
      ]; // clone และเอา value ไปต่อท้าย arr
    } else {
      const index = updataData.resource.findIndex((e) =>
        e.startsWith(value)
      );

      if (index > -1) {
        updataData.resource.splice(index, 1);
      }
    }
    setFormData(updataData);
  };
  const prefix = "อื่นๆ ";

  const handleOtherInputChange = (prefixO, value) => {
    setFormData((prevData) => {
      const updateData = [...prevData.resource]; //clone arr ใน field เดิม
      const index = updateData.findIndex((e) => e.startsWith(prefixO));

      if (index > -1) {
        updateData[index] = value;
      } else {
        updateData.push(value);
      }

      return {
        ...prevData,
        resource: updateData,
      };
    });
  };

  const handleShowData = (e) => {
    e.preventDefault();
    console.log(formData);
    //console.log(selectedOptions);
  };

  return (
    <>
      <div className="mx-8">
        <h3 className="text-black text-lg font-bold px-5 py-5">
          ส่วนที่ 7 ความคิดเห็นต่อและข้อเสนอแนะ
        </h3>

        <form onSubmit={handleShowData}>
          <div>
            <label htmlFor="suggest_informer">
              1. ข้อเสนอแนะจากผู้ให้ข้อมูล หรือเจ้าของบ้าน
              ต่อหน่วยงานที่เกี่ยวข้องในการดำเนินการแก้ไขปัญหาความยากจน
            </label>
            <textarea
              id="suggest_informer"
              name="suggest_informer"
              value={formData.suggest_informer}
              onChange={(e) =>
                handleInputChange("suggest_informer", e.target.value)
              }
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }}
            />

            <label htmlFor="suggest_surway_team">
              2. ข้อเสนอแนะหรือความคิดเห็นของอาสาสมัคร (ข้อสังเกต ปัญหา
              อุปสรรคในการเก็บข้อมูล)
            </label>
            <textarea
              id="suggest_surway_team"
              name="suggest_surway_team"
              value={formData.suggest_surway_team}
              onChange={(e) =>
                handleInputChange("suggest_surway_team", e.target.value)
              }
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }} // ตั้งความกว้างที่ 50%
            />
          </div>

          {/* ส่วนของ checkbox */}
          <h3>แหล่งที่มาของครัวเรือนเข้ารับการสำรวจ (เลือกได้มากกว่า 1 ข้อ)</h3>

          <div className="flex flex-col ">
            <label className="mt-2">
              <input
                id="resource 1"
                type="checkbox"
                name="resource"
                value="จปฐ./กชช.2ค."
                checked={
                  formData.resource.includes("จปฐ./กชช.2ค.")
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              จปฐ./กชช.2ค.
            </label>

            <label className="mt-2">
              <input
                id="resource 2"
                type="checkbox"
                name="resource"
                value="TPMAP"
                checked={
                  formData.resource.includes("TPMAP") ? true : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              TPMAP
            </label>

            <label className="mt-2">
              <input
                id="resource 3"
                type="checkbox"
                name="resource"
                value="พมจ."
                checked={
                  formData.resource.includes("พมจ.") ? true : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              พมจ.
            </label>

            <label className="mt-2">
              <input
                id="resource 4"
                type="checkbox"
                name="resource"
                value="พอช."
                checked={
                  formData.resource.includes("พอช.") ? true : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              พอช.
            </label>

            <label className="mt-2">
              <input
                id="resource 5"
                type="checkbox"
                name="resource"
                value="TPผู้นำชุมชน/อสม./อพมMAP"
                checked={
                  formData.resource.includes(
                    "TPผู้นำชุมชน/อสม./อพมMAP"
                  )
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              ผู้นำชุมชน/อสม./อพม
            </label>

            <label className="mt-2">
              <input
                id="resource 6"
                type="checkbox"
                name="resource"
                value="ผู้นำศาสนา"
                checked={
                  formData.resource.includes("ผู้นำศาสนา")
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              ผู้นำศาสนา
            </label>

            <label className="mt-2">
              <input
                id="resource 7"
                type="checkbox"
                name="resource"
                value="อบต./อปท."
                checked={
                  formData.resource.includes("อบต./อปท.")
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              อบต./อปท.
            </label>

            <label className="mt-2">
              <input
                id="resource 8"
                type="checkbox"
                name="resource"
                value="ชาวบ้าน"
                checked={
                  formData.resource.includes("ชาวบ้าน")
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              ชาวบ้าน
            </label>

            <label className="mt-2">
              <input
                id="resource 9"
                type="checkbox"
                name="resource"
                value="อาสาสมัครสำรวจข้อมูล"
                checked={
                  formData.resource.includes("อาสาสมัครสำรวจข้อมูล")
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              อาสาสมัครสำรวจข้อมูล
            </label>

            <label className="mt-2">
              <input
                id="resource_10" // ตั้ง id เพื่อเชื่อมโยงกับ label
                type="checkbox"
                name="resource"
                value={prefix}
                checked={
                  formData.resource.some((e) =>
                    e.startsWith(prefix)
                  )
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, e.target.checked)
                }
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
              />
              <label
                for="default-checkbox"
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              />
              อื่นๆ
              {formData.resource.some((e) =>
                e.startsWith(prefix)
              ) && (
                <input
                  type="text"
                  value={
                    formData.resource
                      ?.find((e) => e.startsWith(prefix))
                      ?.slice(prefix.length) || ""
                  }
                  onChange={(e) =>
                    handleOtherInputChange(prefix, prefix + e.target.value)
                  }
                  className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
                  placeholder="ระบุ"
                />
              )}
            </label>
          </div>

        </form>

        <div className="flex justify-end mt-4">
        <button
              type="button"
              onClick={(e) => handlePrevPage(e)}
              className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3"
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
              onClick={(e) => handleSubmit(e)}
              className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              <Icon
                  icon="material-symbols:save-outline-rounded"
                  width="25"
                  height="25"
                />
              บันทึกข้อมูล
            </button>
            
        </div>

      </div>
    </>
  );
};

export default Suggestions;
