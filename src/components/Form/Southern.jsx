import React, { useState } from "react";

export const Southern = () => {
  //ใช้ useState เพื่อเก็บค่าที่ผู้ใช้กรอกในฟอร์ม
  const [selectedOption, setSelectedOption] = useState({
    urgent_to_do: false,
  }); //เก็บค่าการเลือกของผู้ใช้ (radio buttons)
  const [formData, setFormData] = useState({
    //เก็บข้อมูลจาก input
    UnrestIn3Southern: [
      {
        effect: "",
        urgent_to_do: "",
        effect_in_life: [],
        effect_in_work: [],
      },
    ],
    // effect: '',   // เก็บข้อความผลกระทบที่ผู้ใช้กรอก
    // form_id: '',  // เป็นตัวแปรที่จะเก็บ id ของฟอร์ม
    // urgent_to_do: '',  // เก็บข้อความสำหรับสิ่งที่ต้องดำเนินการโดยเร่งด่วน
    // effect_in_life: [],  // เก็บผลกระทบที่เกิดขึ้นกับชีวิตในรูปแบบ array (checkbox)
    // effect_in_work: []  // เก็บผลกระทบที่เกิดขึ้นกับการทำงานในรูปแบบ array (checkbox)
  });

  // ฟังก์ชันการเปลี่ยนแปลงใน radio button
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      UnrestIn3Southern: [
        {
          ...prevData.UnrestIn3Southern[0],
          [field]: value,
        },
      ],
    }));
  };
  const handleIncomeRadioChange = (e) => {
    const { value, id } = e.target;

    // เช็คว่าเป็น radio "อื่นๆ" หรือไม่
    if (id === "urgent_to_do_8") {
      setIsOtherChecked({ ...isOtherChecked, urgent_to_do_8: true });
    } else {
      setIsOtherChecked({ ...isOtherChecked, urgent_to_do_8: false });
    }

    setFormData((prevData) => ({
      ...prevData,
      UnrestIn3Southern: prevData.UnrestIn3Southern.map((item, index) => {
        if (index === 0) {
          return { ...item, urgent_to_do: value }; // อัพเดตค่าเฉพาะใน index ที่ต้องการ
        }
        return item;
      }),
    }));
  };

  const handleIncomeOtherInputChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      UnrestIn3Southern: prev.UnrestIn3Southern.map((item, index) => {
        if (index === 0) {
          return { ...item, urgent_to_do: `อื่นๆ: ${value}` };
        }
        return item;
      }),
    }));
  };
  
  //2.2-2.3
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="Container">
        <h3 className="text-black text-lg font-bold px-5 py-5">
          ส่วนที่ 6 ความไม่สงบในพื้นที่ 3 ชายแดนภาคใต้
        </h3>
        {/* ฟอร์มสำหรับกรอกข้อมูล */}
        <form onSubmit={handleSubmit}>
          {/* ส่วนคำถามที่2.1.เกี่ยวกับผลกระทบ */}
          <h2>
            2. ผลกระทบจากสถานการณ์ความไม่สงบในพื้นที่ (เฉพาะจังหวัดนราธิวาส ยะลา
            และปัตตานี)
          </h2>

          {/* คำถามส่วนที่2.1 */}
          <p>2.1. สถานการณ์ความไม่สงบในพื้นที่ มีผลกระทบต่อท่านมากเพียงใด</p>
          <div>
            <label>
              <input
                id="effect"
                name="effect"
                type="radio"
                value="มากที่สุด"
                // checked={selectedOption21 === "มากที่สุด"}
                onChange={(e) => {
                  handleInputChange("effect", e.target.value);
                }}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                มากที่สุด
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="effect"
                name="effect"
                type="radio"
                value="มาก"
                onChange={(e) => {
                  handleInputChange("effect", e.target.value);
                }}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">มาก</span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="effect"
                name="effect"
                type="radio"
                value="ปานกลาง"
                onChange={(e) => {
                  handleInputChange("effect", e.target.value);
                }}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ปานกลาง
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                id="effect"
                name="effect"
                type="radio"
                value="น้อย"
                onChange={(e) => {
                  handleInputChange("effect", e.target.value);
                }}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">น้อย</span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="effect"
                name="effect"
                type="radio"
                value="น้อยที่สุด"
                onChange={(e) => {
                  handleInputChange("effect", e.target.value);
                }}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400 "
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                น้อยที่สุด
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* Checkbox สำหรับ "การใช้ชีวิตประจำวัน" */}
      {/* คำถามส่วนที่2.2 */}
      <form onSubmit={handleSubmit}>
        <h2>
          2.2. ปัญหาความไม่สงบในพื้นที่ มีผลกระทบต่อการดำรงชีวิตด้านใดมากที่สุด
          (ตอบได้มากกว่า 1 ข้อ)
        </h2>
        <div>
          <input
            id="effect_in_life 1"
            name="effect_in_life"
            type="checkbox"
            value="การใช้ชีวิตประจำวัน"
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_life",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            การใช้ชีวิตประจำวัน
          </label>
        </div>

        <div>
          <input
            id="effect_in_life 2"
            name="effect_in_life"
            type="checkbox"
            value="การประกอบอาชีพ "
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_life",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            การประกอบอาชีพ
          </label>
        </div>

        <div>
          <input
            id="effect_in_life 3"
            name="effect_in_life"
            type="checkbox"
            value="การประกอบกิจกรรมทางศาสนา "
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_life",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            การประกอบกิจกรรมทางศาสนา
          </label>
        </div>
        <div>
          <input
            id="effect_in_life 4"
            name="effect_in_life"
            type="checkbox"
            value="การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ "
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_life",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ
          </label>
        </div>
        {/* Checkbox สำหรับ "กิจกรรมอื่นๆ (ระบุ)" */}
        <div>
          <input
            type="checkbox"
            id="effect_in_life_5"
            name="effect_in_life"
            onChange={(e) =>
              handleOtherCheckboxChange(
                e,
                "UnrestIn3Southern",
                "effect_in_life",
                "อื่นๆ"
              )
            } // เรียกฟังก์ชันเมื่อเลือก checkbox
            className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label className="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
            <span className="text-gray-900 dark:text-gray-300 text-sm">
              อื่นๆ (ระบุ)
            </span>
          </label>

          {/* แสดง input text เฉพาะเมื่อ checkbox ถูกเลือก */}
          {isOtherChecked.effect_in_life_5 && (
            <input
              type="text"
              onBlur={(e) => {
                if (isOtherChecked.effect_in_life_5) {
                  handleInputOtherChange(
                    "UnrestIn3Southern",
                    "effect_in_life",
                    "อื่นๆ " + e.target.value
                  );
                }
              }}
              className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
              placeholder="ระบุ" // ข้อความที่แสดงใน input เมื่อต้องการให้กรอก
            />
          )}
        </div>

        {/* ส่วนคำถามที่ 2.3 เกี่ยวกับผลกระทบต่อการประกอบอาชีพ */}
        {/* ส่วนคำถามที่2.3 */}
        <h2>
          2.3. ปัญหาความไม่สงบในพื้นที่ ส่งผลต่อการประกอบอาชีพอย่างไร
          (ตอบได้มากกว่า 1 ข้อ)
        </h2>
        <div>
          <input
            id="effect_in_work 1"
            name="effect_in_work"
            type="checkbox"
            value="เกิดปัญหาด้านสุขภาพทั้งร่างกายและจิตใจ"
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_work",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            เกิดปัญหาด้านสุขภาพทั้งร่างกายและจิตใจ
          </label>
        </div>
        <div>
          <input
            id="effect_in_work 2"
            name="effect_in_work"
            type="checkbox"
            value="ขาดแรงงานในการผลิต แปรรูป และจำหน่ายสินค้า"
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_work",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            ขาดแรงงานในการผลิต แปรรูป และจำหน่ายสินค้า
          </label>
        </div>
        <div>
          <input
            id="effect_in_work 3"
            name="effect_in_work"
            type="checkbox"
            value="ขาดสถานที่ในการจำหน่ายสินค้า"
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_work",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            ขาดสถานที่ในการจำหน่ายสินค้า
          </label>
        </div>
        <div>
          <input
            id="effect_in_work 4"
            name="effect_in_work"
            type="checkbox"
            value="ขาดความรู้ในการพัฒนา ปรับปรุงการผลิต และการจำหน่าย"
            onChange={(e) =>
              handleCheckboxChange(
                "UnrestIn3Southern",
                "effect_in_work",
                e.target.value,
                e.target.checked
              )
            }
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label
            for="default-checkbox"
            class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            ขาดความรู้ในการพัฒนา ปรับปรุงการผลิต และการจำหน่าย
          </label>
          <div>
            <input
              id="effect_in_work 5"
              name="effect_in_work"
              type="checkbox"
              value="ขาดเงินทุนในการประกอบการ"
              onChange={(e) =>
                handleCheckboxChange(
                  "UnrestIn3Southern",
                  "effect_in_work",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ขาดเงินทุนในการประกอบการ
            </label>
          </div>
          <div>
            <input
              id="effect_in_work 6"
              name="effect_in_work"
              type="checkbox"
              value="ขาดที่ดินสำหรับทำการผลิต"
              onChange={(e) =>
                handleCheckboxChange(
                  "UnrestIn3Southern",
                  "effect_in_work",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ขาดที่ดินสำหรับทำการผลิต
            </label>
          </div>
          <div>
            <input
              id="effect_in_work 7"
              name="effect_in_work"
              type="checkbox"
              value="ขาดแหล่งน้ำในการผลิต"
              onChange={(e) =>
                handleCheckboxChange(
                  "UnrestIn3Southern",
                  "effect_in_work",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ขาดแหล่งน้ำในการผลิต
            </label>
          </div>
          <div>
            <input
              id="effect_in_work 8"
              name="effect_in_work"
              type="checkbox"
              value="ขาดระบบคมนาคมเพื่อนำผลิตออกจากพื้นที่"
              onChange={(e) =>
                handleCheckboxChange(
                  "UnrestIn3Southern",
                  "effect_in_work",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ขาดระบบคมนาคมเพื่อนำผลิตออกจากพื้นที่
            </label>
          </div>
          <div>
            <input
              id="effect_in_work 9"
              name="effect_in_work"
              type="checkbox"
              value="ขาดระบบเทคโนโลยีสารสนเทศสมัยใหม่"
              onChange={(e) =>
                handleCheckboxChange(
                  "UnrestIn3Southern",
                  "effect_in_work",
                  e.target.value,
                  e.target.checked
                )
              }
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ขาดระบบเทคโนโลยีสารสนเทศสมัยใหม่
            </label>
          </div>
          <div>
            <input
              id="effect_in_work_10"
              name="effect_in_work"
              type="checkbox"
              onChange={(e) =>
                handleOtherCheckboxChange(
                  e,
                  "UnrestIn3Southern",
                  "effect_in_work",
                  "อื่นๆ"
                )
              }
              className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label className="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
              <span className="text-gray-900 dark:text-gray-300 text-sm">
                อื่นๆ (ระบุ)
              </span>
            </label>

            {isOtherChecked.effect_in_work_10 && (
              <input
                type="text"
                onBlur={(e) => {
                  if (isOtherChecked.effect_in_work_10) {
                    handleInputOtherChange(
                      "UnrestIn3Southern",
                      "effect_in_work",
                      "อื่นๆ " + e.target.value
                    );
                  }
                }}
                className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
                placeholder="ระบุ"
              />
            )}
          </div>

          {/* ส่วนคำถามที่ 2.4 เกี่ยวกับสิ่งที่ต้องดำเนินการเร่งด่วน */}
          {/* ส่วนคำถามที่2.4 */}
          <h2>
            2.4.
            สิ่งที่ควรดำเนินการโดยเร่งด่วนเพื่อลดผลกระทบหรือความเดือดร้อนจากปัญหาความไม่สงบในพื้นที่
          </h2>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่"
                //checked={selectedOption24 === "ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต"
                //checked={selectedOption24 === "เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต"
                //checked={selectedOption24 === "ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่"
                //checked={selectedOption24 === "พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้"
                // checked={selectedOption24 === "ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่"
                //checked={selectedOption24 === "ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่"}
                //onChange={handleOptionChange24}
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="urgent_to_do"
                name="urgent_to_do"
                type="radio"
                value="ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา"
                onChange={handleIncomeRadioChange}
                for="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
                      focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span class="ml-4 text-sm font-medium text-dark-500">
                ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา
              </span>
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                id="urgent_to_do_8"
                name="urgent_to_do"
                type="radio"
                value="อื่นๆ"
                onChange={handleIncomeRadioChange}
                className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
            focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span className="ml-4 text-sm font-medium text-dark-500">
                {" "}
                อื่นๆ(ระบุ){" "}
              </span>
            </label>

            {/* ช่องกรอกข้อความสำหรับ "อื่นๆ" */}
            {isOtherChecked.urgent_to_do_8 && (
              <input
                type="text"
                placeholder="ระบุ..."
                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={handleIncomeOtherInputChange}
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            ส่งฟอร์ม
          </button>
        </div>
      </form>
    </>
  );
};

export default Southern;
