import Modal from "../../Modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IndividualRecordModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    costofliving: "", // ทุนการดำรงชีพ
    confirmationcapital: "", // ยืนยันทุน
    assistance: "", // การช่วยเหลือ
    assistance_agencies: "", // หน่วยงานที่ช่วยเหลือ
    amount: "", // จำนวนเงินที่ช่วยเหลือ
    assistanceDate: "", // วันที่ช่วยเหลือ
    details: "", // รายละเอียด
  });

  // ตัวเลือกของ "องค์ประกอบเชิงยืนยันของทุน" ตามทุนที่เลือก
  const confirmationOptions = {
    ทุนมนุษย์: [
      "การศึกษาสูงสุด",
      "ระดับการศึกษาและสถานภาพการศึกษา",
      "อาชีพและทักษะอาชีพ",
      "สุขภาพร่างกาย",
      "รายได้เฉลี่ยต่อเดือน",
      "สวัสดิการที่ต้องได้รับจากภาครัฐ",
    ],
    ทุนกายภาพ: [
      "การเป็นเจ้าของที่อยู่อาศัย",
      "สภาพที่อยู่อาศัย",
      "สุขลักษณะของที่อยู่อาศัย",
      "ไฟฟ้า/ประปา/อุปกรณ์สารสนเทศ",
      "ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่อยู่อาศัย",
      "ช่องทางการสื่อสาร ความถูกต้องน่าเชื่อถือข้อมูล",
      "แหล่งข้อมูลข่าวสารที่เกี่ยวข้องกับการดำรงชีพและสร้างรายได้",
      "การใช้ประโยชน์จากเทคโนโลยีดิจิทัลในการขอรับสวัสดิการภาครัฐและได้รับประโยชน์ในการดำรงชีพและสร้างรายได้จากเทคโนโลยีดิจิทัล",
    ],
    ทุนทางเศรษฐกิจ: [
      "รายได้เฉลี่ยรวมของครัวเรือน/ปี",
      "รายจ่ายเฉลี่ยของครัวเรือน/ปี",
      "การออม",
      "หนี้สิน",
      "ทรัพย์สินเพื่อการประกอบอาชีพ",
    ],
    ทุนธรรมชาติ: [
      "ความมั่นคงของที่ทำกิน",
      "การใช้น้ำเพื่อการเกษตร",
      "ปัญหาเกี่ยวกับพื้นที่ทำกิน",
      "ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่ทำกิน",
      "การใช้ประโยชน์จากทรัพยากรธรรมชาติเพื่อการยังชีพ",
      "การใช้ประโยชน์จากทรัพยากรธรรมชาติในพื้นที่เพื่อสร้างรายได้",
      "บ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติทางธรรมชาติ",
      "ที่ทำกินอยู่ในพื้นที่ภัยพิบัติทางธรรมชาติ",
    ],
    ทุนทางสังคม: [
      "การเข้าร่วมกลุ่มกิจกรรม",
      "การเข้าร่วมกิจกรรมของชุมชน",
      "การช่วยเหลือกันเมื่อคนในชุมชนประสบความเดือดร้อน",
      "การกำหนดกฎระเบียบในการอยู่ร่วมกันของชุมชน",
      "การปฏิบัติตามกฎระเบียบข้อตกลงการอยู่ร่วมกันของชุมชน",
      "สวัสดิการที่ต้องได้รับจากภาครัฐ",
      "การจัดการปัญหาความขัดแย้งของชุมชน",
      "ผู้ที่มีความรู้ในการแก้ปัญหาและพัฒนาชุมชน",
      "เคยได้ใช้ความรู้จากผู้ที่มีความรู้ในการแก้ปัญหา",
      "ประสบการณ์ในการพัฒนาหรือแก้ไขปัญหาของชุมชน",
      "การมีส่วนหนึ่งร่วมในการบริหารจัดการชุมชนองค์กรกลุ่มหรือสถาบันในชุมชน",
    ],
  };

  // อัปเดตค่าเมื่อมีการเปลี่ยนแปลง input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "costofliving" && { confirmationcapital: "" }), // รีเซ็ตค่า Dropdown องค์ประกอบทุนเมื่อเปลี่ยนทุนการดำรงชีพ
    }));
  };

  // ฟังก์ชันจัดการเมื่อมีการส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onClose(); // ปิด modal หากฟอร์มถูกต้อง
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <>
      <Modal
        title="บันทึกการช่วยเหลือ"
        show={show}
        onClose={onClose}
        size="4xl"
        icon="material-symbols:person-edit-rounded"
      >
        <div className="justify-center mb-2 p-4">
          <h3 className="font-bold">
            <span className="text-red-600">**</span>
            <span className="text-blue-600">
              เลือกทุนการดำรงชีพและองค์ประกอบเชิงยืนยันของทุนการดำรงชีพที่สอดคล้องกับการช่วยเหลือ
            </span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 ">
              {/* ทุนการดำรงชีพ */}
              <div className="ml-12">
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">ทุนการดำรงชีพ</span>
                </label>
                <select
                  name="costofliving"
                  value={formData.costofliving}
                  onChange={(e) =>
                    setFormData({ ...formData, costofliving: e.target.value })
                  }
                  className="w-3/4 border rounded px-3 py-2 rounded-xl pl-4 text-gray-500 text-sm"
                >
                  {/* Dropdown */}
                  <option value="">-กรุณาเลือกทุนการดำรงชีพ-</option>
                  <option value="ทุนมนุษย์">ทุนมนุษย์</option>
                  <option value="ทุนกายภาพ">ทุนกายภาพ</option>
                  <option value="ทุนทางเศรษฐกิจ">ทุนทางเศรษฐกิจ</option>
                  <option value="ทุนธรรมชาติ">ทุนธรรมชาติ</option>
                  <option value="ทุนทางสังคม">ทุนทางสังคม</option>
                </select>
              </div>

              {/* องค์ประกอบเชิงยืนยันของทุนการดำรงชีพ */}
              <div>
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">
                    องค์ประกอบเชิงยืนยันของทุนการดำรงชีพ
                  </span>
                </label>
                <select
                  name="confirmationcapital"
                  value={formData.confirmationcapital}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmationcapital: e.target.value,
                    })
                  }
                  className="w-3/4 border rounded px-3 py-2 rounded-xl pl-4 text-gray-500 text-sm"
                  disabled={!formData.costofliving} // ปิดใช้งานหากยังไม่เลือกทุนการดำรงชีพ
                >
                  <option value="">- กรุณาเลือก -</option>
                  {formData.costofliving &&
                    confirmationOptions[formData.costofliving].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              {/* การช่วยเหลือ */}
              <div className="ml-12">
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">การช่วยเหลือ</span>
                </label>
                <input
                  type="text"
                  name="assistance"
                  value={formData.assistance}
                  onChange={(e) =>
                    setFormData({ ...formData, assistance: e.target.value })
                  }
                  className="w-3/4 border rounded px-3 py-2 rounded-xl"
                  placeholder="ระบุชื่อการช่วยเหลือ"
                />
              </div>

              {/* หน่วยงานที่ช่วยเหลือ */}
              <div>
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">หน่วยงานที่ช่วยเหลือ</span>
                </label>
                <input
                  type="text"
                  name="assistance_agencies"
                  value={formData.assistance_agencies}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assistance_agencies: e.target.value,
                    })
                  }
                  className="w-3/4 border rounded px-3 py-2 rounded-xl"
                  placeholder="ระบุหน่วยงานที่ช่วยเหลือ"
                />
              </div>

              {/* จำนวนเงินที่ช่วยเหลือ */}
              <div className="ml-12">
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">จำนวนเงินที่ช่วยเหลือ</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  min=""
                  className="w-3/4 border rounded px-3 py-2 rounded-xl"
                  placeholder="ระบุจำนวนเงินที่ช่วยเหลือ"
                />
              </div>

              {/* วันที่ช่วยเหลือ */}
              <div>
                <label className="block font-medium mb-2">
                  <span className="text-red-600">*</span>
                  <span className="text-black">วันที่ช่วยเหลือ</span>
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={
                    formData.assistanceDate
                      ? new Date(formData.assistanceDate)
                      : null
                  }
                  oonChange={(date) =>
                    setFormData({ ...formData, assistanceDate: date })
                  }
                  className="w-3/4 border rounded px-3 py-2 rounded-xl"
                  placeholderText="เลือกวันที่"
                />
              </div>
            </div>

            {/* รายละเอียดอย่างย่อ */}
            <div className="ml-12">
              <label className="block font-medium mb-2 text-black">
                รายละเอียดอย่างย่อ
              </label>
              <textarea
                type="text"
                name="details"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                className="w-full border rounded px-3 py-2 rounded-xl"
                placeholder="อธิบายการช่วยเหลือ..."
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-xl"
            >
              บันทึกการช่วยเหลือ
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default IndividualRecordModal;
