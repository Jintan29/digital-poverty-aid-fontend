import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import IndividualRecordModal from "./IndividualRecord/IndividualRecordModal";

const ShowHelp = ({ data, goBack }) => {
  const [showModal, setShowModal] = useState(false);
  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "#",
    "วันที่ช่วยเหลือ",
    "ชื่อ-นามสกุล",
    "HC",
    "ที่อยู่",
    "ทุนการดำรงชีพ",
    "องค์ประกอบเชิงยืนยันของทุนการดำรงชีพ ",
    "การช่วยเหลือ",
    "หน่วยงานที่ช่วยเหลือ",
    "จำนวนเงินที่ช่วยเหลือ",
    "รายละเอียดอย่างย่อ",
  ];
  // กำหนดข้อมูลในตารางตัวอย่าง
  const TABLE_ROWS = [
    {
      assistanceDate: "13/02/2025",
      name: "นางมา ทับทิมจันทร์",
      HC: "001",
      address: "101 ม.2 บ้านใหม่ไทยเจริญ ต.เนินมะปราง อ.เนินมะปราง จ.พิษณุโลก",
      costofliving: "ทุนมนุษย์",
      confirmationcapital: "การศึกษาสูงสุด",
      assistance: "ทุนการศึกษา",
      assistance_agencies: "องค์กรภาคเอกชน",
      amount: "3000",
      details: "ช่วยเหลือเรื่องทุนการศึกษา",
    },
  ];

  return (
    <div className="justify-center mb-2">
      {/* Main Content */}
      <header className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">แสดงข้อมูลการช่วยเหลือ</h3>
        <div className="flex space-x-4">
          <button
            onClick={goBack}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded"
          >
            <Icon
              icon="material-symbols:keyboard-return-rounded"
              className="mr-2"
              width="18px"
            />
            กลับไปหน้าตาราง
          </button>
          <button
            onClick={(e) => setShowModal(true)}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded"
          >
            <Icon icon="ic:round-plus" className="mr-2" width="18px" />
            เพิ่มข้อมูลการช่วยเหลือ
          </button>
        </div>
      </header>

      <section className="mt-6 bg-white p-4 rounded-2xl shadow-xl">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="">
              <strong>ชื่อ-สกุล:</strong> {data?.name || ""}
            </p>
            <p className="mt-4">
              <strong>ที่อยู่:</strong> {data?.address || ""}
            </p>
          </div>
          <div>
            <p>
              <strong>ปีที่สำรวจ:</strong> {data?.assistanceDate || ""}
            </p>
            <div className="mt-2">
              <p>
                <strong>ข้อมูลการช่วยเหลือ</strong>
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  ได้รับการช่วยเหลือ (0)
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  สมาชิกในครัวเรือนได้รับการช่วยเหลือ (0)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ตารางแสดงข้อมูลเพิ่มเติม */}
      <Card className="h-full w-full overflow-scroll mt-8">
        <table className="w-full min-w-max table-auto text-center ">
          {/* ส่วนหัวของตาราง*/}
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          {/* ส่วนข้อมูลภายในตาราง */}
          <tbody>
            {TABLE_ROWS.map(
              ({
                assistanceDate,
                name,
                HC,
                address,
                costofliving,
                confirmationcapital,
                assistance,
                assistance_agencies,
                amount,
                details,
              }) => (
                <tr key={name} className="even:bg-blue-gray-50/50">
                  {/* ปุ่มลบ */}
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Icon
                        icon="mdi:minus-circle-outline"
                        className="mr-2"
                        width="20"
                        height="20"
                      />
                    </button>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {assistanceDate}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {HC}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {address}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {costofliving}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {confirmationcapital}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {assistance}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {assistance_agencies}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {details}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
      <IndividualRecordModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ShowHelp;
