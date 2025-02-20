import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import IndividualRecordModal from "../../../components/HelpLog/IndividualRecord/IndividualRecordModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");

const HelpInfo = () => {
  const [member, setMember] = useState({});
  const [helpData, setHelpData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    loadMemberData();
  }, []);

  const loadMemberData = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/help-member/find-help/${id}`,
        config.headers()
      );
      setMember(res.data.result);
      setHelpData(res.data.result.HelpMembers);
      if (res.data.msg === "ไม่พบข้อมูลสมาชิก") {
        navigate("/admin/*");
      }
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  //ลบการช่วยเหลือ
  const handleDelete = async(id)=>{
    try{
      const resSwal = await Swal.fire({
        title:'ลบข้อมูล',
        text:'ต้องการลบข้อมูลการช่วยเหลือใช่หรือไม่',
        icon:'warning',
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:'ยกเลิก',
        confirmButtonText:'ยืนยัน'
      })
      if(resSwal.isConfirmed){
        const resAPI = await axios.delete(config.api_path+`/help-member/delete/${id}`,config.headers())
        if(resAPI.data.message ==='success'){
          Swal.fire({
            title:'ลบข้อมูลสำเร็จ',
            icon:'success',
            showConfirmButton:false,
            timer:1500
          })
          loadMemberData()
        }
      }
    }catch(err){
      Swal.fire({
        title:'error',
        text: err.response?.data?.message || err.message,
        icon:'error'
      })
    }
  }

  return (
    <div className="justify-center my-10">
      {/* Main Content */}
      <header className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">แสดงข้อมูลการช่วยเหลือ</h3>
        <div className="flex space-x-4">
          <Link to={"/admin/helpLog"}>
            <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded">
              <Icon
                icon="material-symbols:keyboard-return-rounded"
                className="mr-2"
                width="18px"
              />
              ย้อนกลับ
            </button>
          </Link>
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
              <strong>ชื่อ-สกุล:</strong> {member?.title} {member?.fname}{" "}
              {member?.lname}
            </p>
            <p className="mt-4">
              <strong>ที่อยู่:</strong>{" "}
              {member.Household?.house_number +
                " " +
                "ต." +
                member.Household?.subdistrict +
                " " +
                member.Household?.district +
                " " +
                "จ. " +
                member.Household?.province +
                " " +
                member.Household?.postcode}
            </p>
          </div>
          <div>
            <p>
              <strong>ปีที่สำรวจ:</strong>{" "}
              {dayjs(member.createdAt).format("DD MMMM BBBB")}
            </p>
            <div className="mt-2">
              <p>
                <strong>ข้อมูลการช่วยเหลือ</strong>
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  ได้รับการช่วยเหลือ ({helpData.length})
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  สมาชิกในครัวเรือนได้รับการช่วยเหลือ ({member.totalGetHelp})
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
            {helpData.length > 0 ? (
              helpData.map((help) => (
                <tr key={help.id} className="even:bg-blue-gray-50/50">
                  {/* ปุ่มลบ */}
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(help.id)}
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
                      {dayjs(help.help_date).format("DD MMMM BBBB")}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {member?.title} {member?.fname} {member?.lname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {member.Household?.house_code}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {member.Household?.house_number +
                        " " +
                        "ต." +
                        member.Household?.subdistrict +
                        " " +
                        member.Household?.district +
                        " " +
                        "จ. " +
                        member.Household?.province +
                        " " +
                        member.Household?.postcode}
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
      <IndividualRecordModal
        loadMemberData={loadMemberData}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default HelpInfo;
