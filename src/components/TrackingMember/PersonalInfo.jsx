import React from "react";
import { Icon } from "@iconify/react";

const PersonalInfo = ({ member, carrer }) => {
  return (
    <>
      <div class="col-span-3  w-full p-6 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <header>
          <h3 class="flex items-center mb-2 text-2xl font-bold tracking-tight text-green-500  border-b pb-2 ">
            ข้อมูลส่วนบุคคล
            <Icon
              icon="material-symbols:person-rounded"
              width={25}
              height={25}
              className="ml-3"
            />
          </h3>
        </header>

        <section className="grid grid-cols-2 gap-2 pt-2">
          <div className="col-span-2">
            <h4 class="text-xl font-bold">
              {member.title + " " + member.fname + " " + member.lname}
            </h4>
          </div>
          <div className="text-lg font-medium">
            <span className="font-bold"> เพศ </span> : {member.sex}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> อายุ </span> : {member.age} ปี
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> เบอร์โทรศัพท์ </span> : {member.phone}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> สุขภาพ </span> : {member.health}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> สถานะตามทะเบียนบ้าน </span> :{" "}
            {member.status_in_house}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> ระดับการศึกษาสูงสุด </span> :{" "}
            {member.max_education}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> ระดับการศึกษาปัจจุบัน </span> :{" "}
            {member.current_edu_level}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> พูด </span> : {member.can_speak_TH}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> อ่าน </span> : {member.can_read_TH}
          </div>

          <div className="text-lg font-medium">
            <span className="font-bold"> เขียน </span> : {member.can_write_TH}
          </div>

          <div className="text-lg font-lg col-span-2  ">
            <span className="font-bold"> หมายเลขบัตรประชาชน </span> :{" "}
            {member.national_id}
          </div>

          <div className="text-lg font-medium flex items-start gap-2 my-2">
            <span className="font-bold mr-4">สถานะการทำงาน :</span>
            <span
              className={`${
                member.work_status === "ไม่ทำงาน"
                  ? "bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                  : member.work_status === "ทำงาน"
                  ? "bg-green-100 text-green-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                  : member.work_status === "ว่างงาน"
                  ? "bg-yellow-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-gray-500 text-white" // กรณีค่าอื่นๆ
              }`}
            >
              {member.work_status}
            </span>
          </div>

          <div className="text-lg font-medium col-span-2  flex flex-wrap items-start gap-2">
            <span className="font-bold mr-4">อาชีพ:</span>

            {carrer && carrer.length > 0 ? (
              carrer.map((data, index) => (
                <span
                  key={index}
                  className="bg-yellow-100  text-red-700 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >
                  {data.career_type}
                </span>
              ))
            ) : (
              <span>ไม่มีข้อมูล</span>
            )}
          </div>


        </section>
      </div>
    </>
  );
};

export default PersonalInfo;
