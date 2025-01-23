import React from "react";
import Modal from "../../Modal";
import { Icon } from "@iconify/react";

const CareerModal = ({ show, onClose }) => {
  const Career = [
    "พืชเกษตร",
    "ประมง",
    "ปศุสัตว์",
    "รับจ้างภาคการเกษตร",
    "รับจ้างทั่วไปนอกภาคการเกษตร(รายวัน)",
    "ลูกจ้างทั่วไป บ.เอกชน",
    "ลูกจ้างหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "รับราชการ/พนักงาหน่วยงานภาครัฐ/รัฐวิสาหกิจ",
    "ธุรกิจส่วนตัว/งานบริการ",
  ];

  return (
    <>
      <Modal
        title="เพิ่มทักษะอาชีพ"
        show={show}
        icon="material-symbols:psychiatry-rounded"
        onClose={onClose}
        size="6xl"
      >
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-4">
            โปรดเลือกทักษะอาชีพเพิ่มเติม
          </h2>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-2">
              {Career.map((data, index) => (
                <div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {data}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-base font-semibold my-4">
            อาชีพอื่นๆ
            <span className="pl-4 text-sm font-medium my-4">
              (กดเครื่องหมาย + เพื่อเพิ่มอาชีพ)
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-2">
              <div className="flex-grow">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  อาชีพ(1)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5"
                    placeholder="ระบุอาชีพ"
                    required
                  />
                  <button
                    //onClick={() => removeInputField(index)}
                    className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    <Icon
                      icon="material-symbols:delete-forever-rounded"
                      className=" mt-0.5 text-lg"
                    />
                  </button>

                  <button
                    //onClick={addInputField}
                    className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    <Icon
                      icon="material-symbols:add-2-rounded"
                      className=" mt-0.5 text-lg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/**SUBMIT BTN */}
          <div className="flex justify-end gap-4 mt-7">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CareerModal;
