import React from "react";

const SocialCapital = () => {
  return (
    <div className="pt-4 pb-6">
      <h3 className="text-2xl font-bold mb-4">
        ตอนที่ 5 ทุนทางสังคม(ครัวเรือน)
      </h3>

      {/* Section */}
      <div className="col-span-3 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          {/* 1*/}
          <div className="border-2 border-purple-600 p-2  bg-purple-100 rounded-xl">
            <p className="tracking-tight text-purple-500 md:text-md dark:text-purple-400">
              ครัวเรือนของท่านเข้าร่วมกลุ่มกิจกรรมของชุมชนใดบ้าง
              (ไม่เข้าร่วมกลุ่มกิจกรรม)
            </p>
            <hr className="border-purple-500 my-2" />
            <p className="text-3xl text-right text-purple-500 font-bold">
              1,500
            </p>
          </div>

          {/* 2 */}
          <div className="border-2 border-purple-600 p-2  bg-purple-100 rounded-xl">
            <p className="tracking-tight text-purple-500 md:text-md dark:text-purple-400">
              ครัวเรือนของท่านเข้าร่วมกิจกรรมของชุมชนอะไรบ้าง
              (ไม่เข้าร่วมกิจกรรม)
            </p>
            <hr className="border-purple-500 my-2" />
            <p className="text-3xl text-right text-purple-500 font-bold">100</p>
          </div>

          {/* 3 */}
          <div className="border-2 border-purple-600 p-2  bg-purple-100 rounded-xl">
            <p className="tracking-tighter text-purple-500 md:text-lg dark:text-purple-400">
              การช่วยเหลือกันเมื่อคนในชุมชน
            </p>
            <hr className="border-purple-500 my-2" />
            <p className="text-3xl text-right text-purple-500 font-bold">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCapital;
