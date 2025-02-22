import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const LineLoginStatistics = () => {
  // กำหนดข้อมูลสำหรับหัวตาราง
  const TABLE_HEAD = [
    "รหัสบ้าน(HC)",
    "ชื่อ-นามสกุล",
    "Userid",
    "Action",
    "วัน/เดือน/ปี",
  ];

  // ข้อมูลตัวอย่างในตาราง
  const TABLE_ROWS = [
    {
      HC: "1234",
      name: "กาย เจ",
      userid: "JJ",
      action: "login",
      date: "23/04/18",
    },
    {
      HC: "1234",
      name: "กาย เจ",
      userid: "JJ",
      action: "login",
      date: "23/04/18",
    },
    {
      HC: "1234",
      name: "กาย เจ",
      userid: "JJ",
      action: "login",
      date: "23/04/18",
    },
    {
      HC: "1234",
      name: "กาย เจ",
      userid: "JJ",
      action: "login",
      date: "23/04/18",
    },
  ];

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg">
      <div className="p-4 mb-4">
        <h1 className="font-bold text-left">
          <span className="text-2xl font-bold">สถิติการเข้าใช้ Line user</span>
        </h1>
      </div>

      {/* แสดงตาราง */}
      <Card className="h-full w-full rounded-lg  mt-4 flex justify-center items-center">
        <table className="w-full min-w-max table-auto  text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ HC, name, userid, action, date }) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {HC}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {userid}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {action}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* การแบ่งหน้า */}
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LineLoginStatistics;
