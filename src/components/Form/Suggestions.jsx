import React, { useState } from "react";

const Suggestions = () => {
  // กำหนด state สำหรับเก็บข้อมูลของฟอร์ม
  const [formData, setFormData] = useState({
    Suggestions: [
      {
        suggest_informer: "", // ช่องกรอกชื่อผู้ให้ข้อมูล
        suggest_survey_team: "",
        resource: [],
      },
    ],
    //  suggest_informer: "", // ช่องกรอกชื่อผู้ให้ข้อมูล
    //  suggest_survey_team: "",  // ช่องกรอกชื่อทีมสำรวจ
    // resource: "", //แหล่งข้อมูล
  });

  const [isOtherChecked, setIsOtherChecked] = useState({});
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
  // ฟังก์ชันสำหรับกรอกข้อมูลเพิ่มเติม
  const handleInputOtherChange = (category, field, value) => {
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
  // ฟังก์ชันการเปลี่ยนแปลงใน checkbox
  // const [selectedOptions, setSelectedOptions] = useState([]); // กำหนดให้เป็น array เริ่มต้น

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     resource: checked
  //       ? [...prev.resource, name] // เพิ่มชื่อ checkbox เมื่อถูกเลือก
  //       : prev.resource.filter((option) => option !== name) // ลบชื่อ checkbox เมื่อยกเลิกการเลือก
  //   }));
  // };

  // // ฟังก์ชันจัดการเมื่อมีการกรอกข้อมูลในช่อง "อื่นๆ"
  // const handleOtherChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     resource: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //console.log(selectedOptions);
  };

  return (
    <>
      <div className="Container">
        <h3 className="text-black text-lg font-bold px-5 py-5">
          ส่วนที่ 7 ความคิดเห็นต่อและข้อเสนอแนะ
        </h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="suggest_informer">
              1. ข้อเสนอแนะจากผู้ให้ข้อมูล หรือเจ้าของบ้าน
              ต่อหน่วยงานที่เกี่ยวข้องในการดำเนินการแก้ไขปัญหาความยากจน
            </label>
            <textarea
              id="suggest_informer"
              name="suggest_informer"
              value={formData.Suggestions[0].suggest_informer}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  Suggestions: [
                    {
                      ...prevData.Suggestions[0],
                      suggest_informer: e.target.value,
                    },
                  ],
                }))
              }
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }} // ตั้งความกว้างที่ 50%
            />

            <label htmlFor="suggest_survey_team">
              2. ข้อเสนอแนะหรือความคิดเห็นของอาสาสมัคร (ข้อสังเกต ปัญหา
              อุปสรรคในการเก็บข้อมูล)
            </label>
            <textarea
              id="suggest_survey_team"
              name="suggest_survey_team"
              value={formData.Suggestions[0].suggest_survey_team}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  Suggestions: [
                    {
                      ...prevData.Suggestions[0],
                      suggest_survey_team: e.target.value,
                    },
                  ],
                }))
              } /*  */
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }} // ตั้งความกว้างที่ 50%
            />
          </div>

          {/* ส่วนของ checkbox */}
          <h3>แหล่งที่มาของครัวเรือนเข้ารับการสำรวจ (เลือกได้มากกว่า 1 ข้อ)</h3>
          <label>
            <input
              id="resource 1"
              type="checkbox"
              name="resource"
              value="จปฐ./กชช.2ค."
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              } // เรียกใช้งานฟังก์ชันเมื่อมีการเปลี่ยนแปลง
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            จปฐ./กชช.2ค.
          </label>

          <label>
            <input
              id="resource 2"
              type="checkbox"
              name="resource"
              value="TPMAP"
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            TPMAP
          </label>

          <label>
            <input
              id="resource 3"
              type="checkbox"
              name="resource"
              value="พมจ."
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            พมจ.
          </label>

          <label>
            <input
              id="resource 4"
              type="checkbox"
              name="resource"
              value="พอช."
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            พอช.
          </label>

          <label>
            <input
              id="resource 5"
              type="checkbox"
              name="resource"
              value="TPผู้นำชุมชน/อสม./อพมMAP"
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ผู้นำชุมชน/อสม./อพม
          </label>

          <label>
            <input
              id="resource 6"
              type="checkbox"
              name="resource"
              value="ผู้นำศาสนา"
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ผู้นำศาสนา
          </label>

          <label>
            <input
              id="resource 7"
              type="checkbox"
              name="resource"
              value="อบต./อปท."
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อบต./อปท.
          </label>

          <label>
            <input
              id="resource 8"
              type="checkbox"
              name="resource"
              value="ชาวบ้าน"
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ชาวบ้าน
          </label>

          <label>
            <input
              id="resource 9"
              type="checkbox"
              name="resource"
              value="อาสาสมัครสำรวจข้อมูล"
              onChange={(e) =>
                handleCheckboxChange(
                  "Suggestions",
                  "resource",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อาสาสมัครสำรวจข้อมูล
          </label>

          <label>
            <input
              id="resource_10" // ตั้ง id เพื่อเชื่อมโยงกับ label
              type="checkbox"
              name="resource"
              onChange={(e) =>
                handleOtherCheckboxChange(e, "Suggestions", "resource", "อื่นๆ")
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อื่นๆ
          </label>

          {isOtherChecked.resource_10 && (
            <input
              type="text"
              onBlur={(e) => {
                if (isOtherChecked.resource_10) {
                  handleInputOtherChange(
                    "Suggestions",
                    "resource",
                    "อื่นๆ " + e.target.value
                  );
                }
              }}
              className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
              placeholder="ระบุ"
            />
          )}
          <div className="mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              ส่งฟอร์ม
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Suggestions;
