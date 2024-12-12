import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export const Southern = ({ setCurrentPage, setMainFormData, mainFormData }) => {
  const [formData, setFormData] = useState({
    effect: "",
    urgent_to_do: "",
    effect_in_life: [],
    effect_in_work: [],
  });

  //load data
  useEffect(() => {
    if (mainFormData.UnrestIn3Southern) {
      setFormData(mainFormData.UnrestIn3Southern);
    }
  }, [mainFormData]);

  //NextPage
  const handleSubmit = (e) => {
    // e.preventDefault()
    setMainFormData((prevData) => ({
      ...prevData,
      UnrestIn3Southern: formData,
    }));
    setCurrentPage(9);

    // setCurrentPage(2);
  };

  //prevPage
  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      UnrestIn3Southern: formData,
    }));
    setCurrentPage(7);
  };

  const handleInputChange = (field, value) => {
    const updateData = { ...formData };
    updateData[field] = value;
    setFormData(updateData);
  };

  const handleCheckboxChange = (field, value, checked) => {
    const updateData = { ...formData };

    if (checked) {
      updateData[field] = [...updateData[field], value];
    } else {
      const index = updateData[field].findIndex(
        (
          e //หาข index ที่ขึ้นต้นได้ value ที่ส่งมา
        ) => e.startsWith(value)
      );

      if (index > -1) {
        updateData[field].splice(index, 1);
      }
    }
    setFormData(updateData);
  };

  //อื่นๆ
  const prefix = "อื่นๆ ";

  const handleOtherInput = (prefixO, field, value) => {
    setFormData((prevData) => {
      const updateData = [...prevData[field]];
      const Index = updateData.findIndex((e) => e.startsWith(prefixO));

      if (Index >= 0) {
        updateData[Index] = value;
      } else {
        updateData.push(value);
      }
      return {
        ...prevData,
        [field]: updateData,
      };
    });
  };

  const handleShowData = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="px-7">
        <div className="Container ">
          <h3 className="text-black text-lg font-bold px-5 py-5">
            ส่วนที่ 6 ความไม่สงบในพื้นที่ 3 ชายแดนภาคใต้
          </h3>
          {/* ฟอร์มสำหรับกรอกข้อมูล */}
          <form onSubmit={handleShowData}>
            {/* ส่วนคำถามที่2.1.เกี่ยวกับผลกระทบ */}
            <h2>
              2. ผลกระทบจากสถานการณ์ความไม่สงบในพื้นที่ (เฉพาะจังหวัดนราธิวาส
              ยะลา และปัตตานี)
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
                  checked={formData.effect === "มากที่สุด" ? true : false}
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
                  checked={formData.effect === "มาก" ? true : false}
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
                  checked={formData.effect === "ปานกลาง" ? true : false}
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
                  checked={formData.effect === "น้อย" ? true : false}
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
                  checked={formData.effect === "น้อยที่สุด" ? true : false}
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
            checked={
              formData.effect_in_life.includes("การใช้ชีวิตประจำวัน")
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            value="การประกอบอาชีพ"
            checked={
              formData.effect_in_life.includes("การประกอบอาชีพ") ? true : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            value="การประกอบกิจกรรมทางศาสนา"
            checked={
              formData.effect_in_life.includes("การประกอบกิจกรรมทางศาสนา")
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            value="การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ"
            checked={
              formData.effect_in_life.includes(
                "การร่วมกิจกรรมกับชุมชน การพักผ่อนหย่อนใจ"
              )
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            checked={
              formData.effect_in_life.some((e) => e.startsWith(prefix))
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange("effect_in_life", prefix, e.target.checked)
            }
            // } // เรียกฟังก์ชันเมื่อเลือก checkbox
            className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
          />
          <label className="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
            <span className="text-gray-900 dark:text-gray-300 text-sm">
              อื่นๆ (ระบุ)
            </span>
          </label>

          {/* แสดง input text เฉพาะเมื่อ checkbox ถูกเลือก */}
          {formData.effect_in_life.some((e) => e.startsWith(prefix)) && (
            <input
              type="text"
              value={
                formData.effect_in_life
                  .find((item) => item.startsWith(prefix))
                  ?.substring(prefix.length) || ""
              }
              onChange={(e) =>
                handleOtherInput(
                  prefix,
                  "effect_in_life",
                  prefix + e.target.value
                )
              }
              className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
              placeholder="ระบุ"
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
            checked={
              formData.effect_in_work.includes(
                "เกิดปัญหาด้านสุขภาพทั้งร่างกายและจิตใจ"
              )
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            checked={
              formData.effect_in_work.includes(
                "ขาดแรงงานในการผลิต แปรรูป และจำหน่ายสินค้า"
              )
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            checked={
              formData.effect_in_work.includes("ขาดสถานที่ในการจำหน่ายสินค้า")
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
            checked={
              formData.effect_in_work.includes(
                "ขาดความรู้ในการพัฒนา ปรับปรุงการผลิต และการจำหน่าย"
              )
                ? true
                : false
            }
            onChange={(e) =>
              handleCheckboxChange(
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
              checked={
                formData.effect_in_work.includes("ขาดเงินทุนในการประกอบการ")
                  ? true
                  : false
              }
              onChange={(e) =>
                handleCheckboxChange(
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
              checked={
                formData.effect_in_work.includes("ขาดที่ดินสำหรับทำการผลิต")
                  ? true
                  : false
              }
              onChange={(e) =>
                handleCheckboxChange(
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
              checked={
                formData.effect_in_work.includes("ขาดแหล่งน้ำในการผลิต")
                  ? true
                  : false
              }
              onChange={(e) =>
                handleCheckboxChange(
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
              checked={
                formData.effect_in_work.includes(
                  "ขาดระบบคมนาคมเพื่อนำผลิตออกจากพื้นที่"
                )
                  ? true
                  : false
              }
              onChange={(e) =>
                handleCheckboxChange(
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
              checked={
                formData.effect_in_work.includes(
                  "ขาดระบบเทคโนโลยีสารสนเทศสมัยใหม่"
                )
                  ? true
                  : false
              }
              onChange={(e) =>
                handleCheckboxChange(
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
              checked={formData.effect_in_work.some((e) =>
                e.startsWith(prefix)
              )}
              onChange={(e) =>
                handleCheckboxChange("effect_in_work", prefix, e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label className="ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
              <span className="text-gray-900 dark:text-gray-300 text-sm">
                อื่นๆ (ระบุ)
              </span>
            </label>

            {formData.effect_in_work.some((e) => e.startsWith(prefix)) && (
              <input
                type="text"
                value={
                  formData.effect_in_work
                    .find((item) => item.startsWith(prefix))
                    ?.substring(prefix.length) || ""
                }
                onChange={(e) =>
                  handleOtherInput(
                    prefix,
                    "effect_in_work",
                    prefix + e.target.value
                  )
                }
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
                checked={
                  formData.urgent_to_do ===
                  "ปรับปรุงและพัฒนาระบบคมนาคมขนส่งในพื้นที่"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "เพิ่มการเข้าถึงปัจจัยพื้นฐานในการผลิต"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "ปรับปรุงและพัฒนาคุณภาพปัจจัยพื้นฐานในการผลิต"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "พัฒนาโครงข่ายการสื่อสารรองรับเทคโนโลยีสมัยใหม่"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "ส่งเสริมความรู้ในการประกอบอาชีพ และสร้างรายได้"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "ส่งเสริมการแปรูป และการตลาดสำหรับผลิตภัณฑ์ในพื้นที่"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do ===
                  "ส่งเสริมการมีส่วนร่วมในการแก้ไขปัญหา"
                    ? true
                    : false
                }
                onChange={(e) => {
                  handleInputChange("urgent_to_do", e.target.value);
                }}
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
                checked={
                  formData.urgent_to_do.startsWith(prefix) ? true : false
                }
                value={prefix}
                onChange={(e) =>
                  handleInputChange("urgent_to_do", e.target.value)
                }
                className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded-full focus:ring-blue-600 blue:focus:ring-blue-600 blue:ring-offset-gray-800 
            focus:ring-2 blue:bg-gray-700 blue:border-gray-800 ms-8 text-sm font-medium text-blue-500 blue:text-gray-400"
              />
              <span className="ml-4 text-sm font-medium text-dark-500">
                {" "}
                อื่นๆ(ระบุ){" "}
              </span>
            </label>

            {formData.urgent_to_do.startsWith(prefix) && (
              <input
                type="text"
                placeholder="ระบุ..."
                value={
                  formData.urgent_to_do.startsWith(prefix)
                    ? formData.urgent_to_do.slice(prefix.length)
                    : ""
                }
                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) =>
                  handleInputChange("urgent_to_do", prefix + e.target.value)
                }
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={(e) => handlePrevPage()}
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
              หน้าถัดไป
              <Icon
                icon="material-symbols:arrow-right-rounded"
                width="25"
                height="25"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Southern;
