import React from "react";
import { Doughnut } from "react-chartjs-2";

const WelfareDoughnutChart = ({ socialWelfare, donughtData, hasWelfare }) => {
  return (
    <div className=" w-full p-3 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* เช็คเงื่อนไขก่อนแสดง chart */}
      {!hasWelfare ? (
        <div className="text-center py-8 text-gray-500 text-2xl">
          ไม่ได้รับสวัสดิการ
        </div>
      ) : (
        donughtData &&
        donughtData.labels && (
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-4 flex justify-center">
              สวัสดิการสังคม
            </h2>
            <Doughnut
              data={donughtData}
              width={400}
              height={400}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  tooltip: {
                    callbacks: {
                      //ดึงค่าจากข้อมูลที่ hover ออกมาแสดง
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed || 0; //parsed คือข้อมูลที่ map label/data มาแล้ว
                        //freq
                        const welfare = socialWelfare.find(
                          (data) => data.welfare === label
                        );
                        const freq = welfare ? welfare.frequency : "";
                        return `${label}: ${value.toLocaleString()} บาท (${freq})`;
                      },
                    },
                  },
                },
                // ปรับขนาดของกราฟ
                cutout: "50%", // ค่าเริ่มต้นคือ 50%, ปรับให้เล็กลงหรือใหญ่ขึ้นตามต้องการ
                radius: "80%", // ค่าเริ่มต้นคือ 100%, ปรับให้เล็กลงเพื่อทำให้กราฟเล็กลง
              }}
            />

            {/* ผลรวม */}
          </div>
        )
      )}
    </div>
  );
};

export default WelfareDoughnutChart;
