import React from "react";
import Modal from "../../Modal";

const WelfareModal = ({ show, onClose }) => {

    //สวัสดิการ
    const availableBenefits = [
      "ไม่ได้รับ",
      "เด็กแรกเกิด",
      "เบี้ยผู้สูงอายุ/คนชรา",
      "เบี้ยคนพิการ",
      "ประกันสังคม(มาตรา33)",
      "ประกันตนเอง(ม.40)",
      "บัตรสวัสดิการแห่งรัฐ",
      "การเยียวยาโควิดจากรัฐ",
      "ไม่ทราบ",
      "ทุนการศึกษา",
      "เบี้ยซ่อมแซมบ้าน",
      "อุปกรณ์ช่วยเหลือคนพิการ",
    ];
  

  return (
    <>
      <Modal
        title="เพิ่มสวัสดิการ"
        show={show}
        icon="material-symbols:family-restroom-rounded"
        onClose={onClose}
        size="5xl"
      >
        <>
          <div className="p-2">
            <h2 className="text-lg font-semibold mb-4">
              ตัวอย่างสวัสดิการในระบบ
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid  grid-cols-4 gap-x-4 gap-y-2">
                {availableBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                  >
                    • {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 bg-white p-6 pl-2 rounded-lg shadow-m ">
              <h3 className="text-base font-semibold mb-6 text-gray-800 e">
                เพิ่มสวัสดิการที่ได้รับ
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-6 bg-slate-50 p-3 rounded-md">
                  {/* สวัสดิการ */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      สวัสดิการ
                    </label>

                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                      placeholder="ระบุสวัสดิการที่ได้รับ"
                      // value={formData.averageExpense}
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     averageExpense: e.target.value,
                      //   })
                      // }
                      required
                    />
                  </div>

                  {/* จำนวน */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      จำนวน(บาท)
                    </label>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        ฿
                      </span>
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
                        placeholder="0.00"
                        // value={formData.averageExpense}
                        // onChange={(e) =>
                        //   setFormData({
                        //     ...formData,
                        //     averageExpense: e.target.value,
                        //   })
                        // }
                        required
                      />
                    </div>
                  </div>

                  {/* ความถี่ */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      ความถี่
                    </label>

                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                      placeholder="0.00"
                      // value={formData.averageExpense}
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     averageExpense: e.target.value,
                      //   })
                      // }
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                    // onClick={() =>
                    //   setFormData({
                    //     averageIncome: "",
                    //     averageExpense: "",
                    //     inflationRate: "",
                    //   })
                    // }
                  >
                    ล้างข้อมูล
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  >
                    บันทึกข้อมูล
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default WelfareModal;
