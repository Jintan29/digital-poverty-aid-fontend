import React from "react";
import RealName from "../../../components/FindHousehold/RealName"
// import RealName from "../../../components/Household/RealName";

const TrackMember = () => {
  return (
    <>
      <div className="mx-5 my-5">
        <div className="flex flex-col  justify-center  ">
          <div className="block text-center text-2xl font-bold">
            <h1>ระบบติดตามรายบุคคล</h1>
          </div>
          <div className="block text-center text-base mb-5 mt-2">
            <h3>
              ค้นหาสมาชิกครัวเรือนโดยการกรอกชื่อจริงให้ถูกต้อง
            </h3>
          </div>
        </div>
        <RealName/>
      </div>
    </>
  );
};

export default TrackMember;
