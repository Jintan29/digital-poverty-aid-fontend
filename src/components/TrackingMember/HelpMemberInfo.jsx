import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");


const HelpMemberInfo = ({ helpData }) => {
    const {id} = useParams();
  const TABLE_HEAD = [
    "#",
    "วันที่ช่วยเหลือ",
    "ทุนการดำรงชีพ",
    "องค์ประกอบเชิงยืนยันของทุนการดำรงชีพ ",
    "การช่วยเหลือ",
    "หน่วยงานที่ช่วยเหลือ",
    "จำนวนเงินที่ช่วยเหลือ",
    "รายละเอียดอย่างย่อ",
  ];

  return (
    <div>
      <Card className="h-full w-full overflow-x-auto max-w-6xl ">
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
            {helpData.length > 0 ? (
              helpData.map((help) => (
                <tr key={help.id} className="even:bg-blue-gray-50/50">
                  {/* ปุ่มลบ */}
                  <td className="p-4">
                    <Link to={`/admin/helpLog/${id}`}>
                      <button
                        onClick={() => handleDelete(help.id)}
                        className="text-blue-500 hover:text-blue-700 p-2"
                      >
                        <Icon
                          icon="material-symbols:edit-rounded"
                          className="mr-2"
                          width="20"
                          height="20"
                        />
                      </button>
                    </Link>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {dayjs(help.help_date).format("DD MMMM BBBB")}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {help.capital}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {help.components}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {help.help_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {help.agency}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {parseFloat(help.amount).toLocaleString()} บาท
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {help.description}
                    </Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  ไม่พบข้อมูลการช่วยเหลือ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default HelpMemberInfo;
