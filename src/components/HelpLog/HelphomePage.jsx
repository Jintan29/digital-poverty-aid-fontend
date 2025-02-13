import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const HelphomePage = ({ setSelectedHelp }) => {
  const [formData, setFormData] = useState({
    district: "", //อำเภอ
    subdistrict: "", //ตำบล
    year: "", //ปีสำรวจ
    cardnumber: "", //เลขบัตร ปชช
    houseCode: "", //เลขบ้าน
    name: "", //ชื่อ
  });
  // SHOE ตาราง
  const [showTable, setShowTable] = useState(false);

  // ตัวเลือก"ตำบล"ของอำเภอ
  const subdistrictOptions = {
    เมืองพิษณุโลก: [
      "ในเมือง",
      "วังน้ำคู้",
      "วัดจันทร์",
      "วัดพริก",
      "ท่าทอง",
      "ท่าโพธิ์",
      "สมอแข",
      "ดอนทอง",
      "บ้านป่า",
      "ปากโทก",
      "หัวรอ",
      "จอมทอง",
      "บ้านกร่าง",
      "บ้านคลอง",
      "พลายชุมพล",
      "มะขามสูง",
      "อรัญญิก",
      "บึงพระ",
      "ไผ่ขอดอน",
      "งิ้วงาม",
    ],
    นครไทย: [
      "นครไทย",
      "หนองกะท้าว",
      "บ้านแยง",
      "เนินเพิ่ม",
      "นาบัว",
      "นครชุม",
      "น้ำกุ่ม",
      "ยางโกลน",
      "บ่อโพธิ์",
      "บ้านพร้าว",
      "ห้วยเฮี้ย",
    ],
    เนินมะปราง: [
      "ชมพู",
      "บ้านมุง",
      "ไทรย้อย",
      "วังโพรง",
      "บ้านน้อยซุ้มขี้เหล็ก",
      "เนินมะปราง",
      "วังยาง",
    ],
    ชาติตระการ: [
      "ป่าแดง",
      "ชาติตระการ",
      "สวนเมี่ยง",
      "บ้านดง",
      "บ่อภาค",
      "ท่าสะแก",
    ],
    บางกระทุ่ม: [
      "บางกระทุ่ม",
      "บ้านไร่",
      "โคกสลุด",
      "สนามคลี",
      "ท่าตาล",
      "ไผ่ล้อม",
      "นครป่าหมาก",
      "เนินกุ่ม",
      "วัดตายม",
    ],
    บางระกำ: [
      "บางระกำ",
      "ปลักแรด",
      "พันเสา",
      "วังอิทก",
      "บึงกอก",
      "หนองกุลา",
      "ชุมแสงสงคราม",
      "นิคมพัฒนา",
      "บ่อทอง",
      "ท่านางงาม",
      "คุยม่วง",
    ],
    พรหมพิราม: [
      "พรหมพิราม",
      "ท่าช้าง",
      "วงฆ้อง",
      "มะตูม",
      "หอกลอง",
      "ศรีภิรมย์",
      "ตลุกเทียม",
      "วังวน",
      "หนองแขม",
      "มะต้อง",
      "ทับยายเชียง",
      "ดงประคำ",
    ],
    วังทอง: [
      "วังทอง",
      "พันชาลี",
      "แม่ระกา",
      "บ้านกลาง",
      "วังพิกุล",
      "แก่งโสภา",
      "ท่าหมื่นราม",
      "วังนกแอ่น",
      "หนองพระ",
      "ชัยนาม",
      "ดินทอง",
    ],
    วัดโบสถ์: ["วัดโบสถ์", "ท่างาม", "ทองแท้", "บ้านยาง", "หินลาด", "คันโช้ง"],
  };

  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "ปีที่สำรวจ",
    "ชื่อ-นามสกุล",
    "HC",
    "จำนวสมาชิก",
    "ที่อยู่",
    "บันทึกการช่วยเหลือ",
  ];

  // ข้อมูลตัวอย่างในตาราง
  const TABLE_ROWS = [
    {
      date: "2566",
      name: "สมชาย ใจดี",
      HC: "HC-65090041571",
      members: "2",
      address: "197 ม.1 บ้านพุกระโดน ต.ไทรย้อย อ.เนินมะปราง จ.พิษณุโลก",
    },
    {
      date: "2566",
      name: "เจเจ ใจดี",
      HC: "HC-65090041571",
      members: "3",
      address: "197 ม.1 บ้านพุกระโดน ต.ไทรย้อย อ.เนินมะปราง จ.พิษณุโลก",
    },
    {
      date: "2566",
      name: " ใจดี",
      HC: "HC-65090041571",
      members: "2",
      address: "197 ม.1 บ้านพุกระโดน ต.ไทรย้อย อ.เนินมะปราง จ.พิษณุโลก",
    },
  ];

  // อัปเดตค่าเมื่อมีการเปลี่ยนแปลง input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" && { subdistrict: "" }), // รีเซ็ตค่า Dropdown ตำบลเมื่อเปลี่ยนอำเภอ
    }));
  };

  // ฟังก์ชันจัดการเมื่อมีการส่งฟอร์ม
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form Submitted:", formData);
  //   };

  return (
    <div className="justify-center mb-2">
      <div className="col-span-2 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium mb-2">อำเภอ</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              {/* Dropdown */}
              <option>-กรุณาเลือกอำเภอ-</option>
              <option>เมืองพิษณุโลก</option>
              <option>นครไทย</option>
              <option>เนินมะปราง</option>
              <option>ชาติตระการ</option>
              <option>บางกระทุ่ม</option>
              <option>บางระกำ</option>
              <option>พรหมพิราม</option>
              <option>วัดโบสถ์</option>
              <option>วังทอง</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">ตำบล</label>
            <select
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>กรุณาเลือกตำบล</option>
              {formData.district &&
                subdistrictOptions[formData.district].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">ปีที่สำรวจ</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>-กรุณาเลือกปีที่สำรวจ-</option>
              <option>2567</option>
              <option>2566</option>
              <option>2565</option>
              <option>2564</option>
              <option>2563</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              รหัสบ้าน (HC)
            </label>
            <input
              type="text"
              name="houseCode"
              value={formData.houseCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="รหัสบ้าน (HC)"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              รหัสบัตรประชาชน
            </label>
            <input
              type="text"
              name="idCard"
              value={formData.idCard}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="รหัสบัตรประชาชน"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
              placeholder="ไม่ต้องใส่คำหน้าชื่อ"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowTable(true)} // กดปุ่มแล้วให้แสดงตาราง
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <Icon icon="heroicons-solid:search" className="mr-2" />
            แสดงรายชื่อ
          </button>
        </div>
      </div>

      {/* แสดงตารางถ้า showTable เป็น true */}
      {showTable && (
        <Card className="h-full w-full overflow-scroll mt-8 flex justify-center items-center">
          <table className="w-full min-w-max table-auto text-center">
            {/* ส่วนหัวของตาราง */}
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {/* ข้อมูลในตาราง */}
            <tbody>
              {TABLE_ROWS.map(({ date, name, HC, members, address }) => (
                <tr key={name} className="even:bg-blue-gray-50/50">
                  <td className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {HC}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {members}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {address}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      onClick={() => setSelectedHelp(date, name, HC, members, address)}
                      // ส่งข้อมูลไป ShowHelp
                    >
                      <Icon icon="heroicons-solid:search" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

export default HelphomePage;
