import React from "react";

const FinancialCapital = ({financialCapital}) => {
  return (
    <div className="pt-4 pb-6">
      <h3 className="text-2xl font-bold mb-4">
        ตอนที่ 3 ทุนการเงิน(ครัวเรือน)
      </h3>

      {/* Section */}
      <div className="col-span-3 w-full p-10 mt-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          {/* 4.1 */}
          <div className="border-2 border-green-600 p-2  bg-green-100 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-lg dark:text-green-400">
              ครัวเรือนของท่านมีการออมหรือไม่ (ไม่มี)
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-3xl text-right text-green-500 font-bold">{financialCapital.NoSaving}</p>
          </div>

          {/* 5.2 */}
          <div className="border-2 border-green-600 p-2  bg-green-100 rounded-xl">
            <p className="tracking-tight text-green-500 md:text-lg dark:text-green-400">
              ครัวเรือนของท่านมีหนี้สินหรือไม่ (มี)
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-3xl text-right text-green-500 font-bold">{financialCapital.HasDebt}</p>
          </div>

          {/* 6.1 */}
          <div className="border-2 border-green-600 p-2  bg-green-100 rounded-xl">
            <p className="tracking-tighter text-green-500 md:text-sm dark:text-green-400">
              ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่ (ไม่มี)
            </p>
            <hr className="border-green-500 my-2" />
            <p className="text-3xl text-right text-green-500 font-bold">{financialCapital.NoOccupationalproperty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCapital;
