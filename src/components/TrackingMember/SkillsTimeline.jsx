import React from "react";
import { Icon } from "@iconify/react";
//แปลง พศ (day js)
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.locale("th");
dayjs.extend(buddhistEra);


const SkillsTimeline = ({ carrer }) => {
  return (
    <div className="h-[90vh] overflow-y-auto  w-full p-3 mt-7 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-xl my-4 font-semibold mb-4 flex justify-center">
        ทักษะ และ อาชีพในแต่ละช่วง
      </h2>
      <ol class="relative border-s border-gray-200 dark:border-gray-700">
        {carrer && carrer.length > 0
          ? carrer.map((data, index) => (
              <li class="mb-10 ms-6">
                <span class="absolute flex items-center justify-center w-9 h-9 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Icon
                    width={32}
                    height={32}
                    icon="material-symbols:edit-calendar-rounded"
                    className=""
                  />
                </span>
                <h3 class="flex items-center ml-5 mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {data.career_type}

                  {index === 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                      ล่าสุด
                    </span>
                  )}
                </h3>

                <p class="mb-4 ml-5 text-base font-normal text-gray-500 dark:text-gray-400">
                  {dayjs(data.createdAt).format("DD MMMM BBBB")}
                </p>
              </li>
            ))
          : ""}
      </ol>
    </div>
  );
};

export default SkillsTimeline;
