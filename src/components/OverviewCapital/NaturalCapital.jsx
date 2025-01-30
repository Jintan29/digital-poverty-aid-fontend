import React from "react";

const NaturalCapital = () => {
  return (
    <div className="pt-4 pb-6">
      <h3 className="text-2xl font-bold mb-4">
        ตอนที่ 4 ทุนธรรมชาติ (ครัวเรือน)
      </h3>
      {/* Section */}
      <div className="col-span-3 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-yellow-600 dark:border-yellow-400">
        <div className="grid grid-cols-2 gap-4">
          {/* 3 */}
          <div className="border-2 border-yellow-600 p-2  bg-yellow-100 rounded-xl">
            <p className="tracking-tight text-yellow-500 md:text-lg dark:text-yellow-400">
              ครัวเรือนของท่านมีบ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติหรือไม่ (อยู่)
            </p>
            <hr className="border-yellow-500 my-2" />
            <p className="text-3xl text-right text-yellow-500 font-bold">100</p>
          </div>

          {/* 4 */}
          <div className="border-2 border-yellow-600 p-2  bg-yellow-100 rounded-xl">
            <p className="tracking-tight text-yellow-500 md:text-lg dark:text-yellow-400">
              ครัวเรือนของท่านมีที่ทำกินอยู่ในพื้นที่ภัยพิบัติหรือไม่ (อยู่)
            </p>
            <hr className="border-yellow-500 my-2" />
            <p className="text-3xl text-right text-yellow-500 font-bold">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalCapital;
