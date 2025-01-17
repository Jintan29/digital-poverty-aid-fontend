import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const HouseholdInfo = ({ household }) => {
  return (
    <>
      <div class=" w-full p-6 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <header>
          <h3 class="flex items-center mb-2 text-2xl font-bold tracking-tight text-customBlue  border-b pb-2 ">
            ข้อมูลครัวเรือน
            <Icon
              icon="material-symbols:garage-home-rounded"
              width={25}
              height={25}
              className="ml-3"
            />
          </h3>
        </header>

        <section className="grid grid-cols-1 gap-2 pt-2">
          <div className="text-lg font-bold">{household?.house_code}</div>
          <div className="text-lg font-medium">
            หมู่บ้าน : {household?.village}
          </div>
          <div className="text-lg font-medium">
            บ้านเลขที่ : {household?.house_number} ต.{household?.subdistrict}
          </div>
          <div className="text-lg font-medium">อ.{household?.district}</div>
          <div className="text-lg font-medium">จ.{household?.province}</div>
          <div className="text-lg font-medium">
            รหัสปณ : {household?.postcode}
          </div>

          <div className="text-lg font-medium">หัวหน้าครัวเรือน:</div>
          <div className="text-lg font-medium">
            {household?.host_title} {household?.host_fname} {household?.host_lname}
          </div>
        </section>

        <div className="flex justify-center mt-6">
          <Link
            to={`/admin/track-household/${household?.id}`}
            type="button"
            class=" flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <Icon
              width={20}
              height={20}
              className="mr-2"
              icon="material-symbols:other-houses-rounded"
            />
            แสดงรายละเอียด
          </Link>
        </div>
      </div>
    </>
  );
};

export default HouseholdInfo;
