import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../../config";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
//แปลง พศ (day js)
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.locale("th");
dayjs.extend(buddhistEra);
//chartJS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
//rechart
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";

const TrackingMemberId = () => {
  const [member, setMember] = useState({});
  const [memberFinancial, setMemberFinancial] = useState([]);
  const [charData, setChartData] = useState([]); //กราฟแรก
  const { id } = useParams();

  const [socialWelfare, setSocialWelfare] = useState([]);
  const [donughtData, setDonughtData] = useState({});

  const [carrer, setCarrer] = useState([]);

  //สำหรับ load ข้อมูลเท่านั้น
  useEffect(() => {
    loadData();
    loadFinancial();
  }, []);

  //สำหรับรวม data หลัง call api (rechart)
  useEffect(() => {
    if (member && member.agv_income != null && member.inflation != null) {
      const initData = [
        {
          month: formatDate(member.createdAt),
          income: member.agv_income,
          inflation: member.inflation,
        },
      ];

      const financialData = memberFinancial.map((data, index) => ({
        // return [{},{},..]
        month: formatDate(data.createdAt),
        income: data.agv_income,
        inflation: data.inflation,
      }));

      setChartData([...initData, ...financialData]);
      console.log(initData);
    }
  }, [member, memberFinancial]);

  //Donut + social welfare
  useEffect(() => {
    //แยก label , value เป็น {} เตรียมแสดงผล
    if (socialWelfare.length > 0) {
      const labels = socialWelfare.map((data) => data.welfare);
      const dataValue = socialWelfare.map((data) => data.amount);

      const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#E7E9ED",
        "#FF6384",
        "#36A2EB",
      ];

      setDonughtData({
        labels: labels,
        datasets: [
          {
            label: "จำนวนเงินสวัสดิการ",
            data: dataValue,
            backgroundColor: backgroundColors.slice(0, labels.length),
            hoverBackgroundColor: backgroundColors.slice(0, labels.length),
          },
        ],
      });
    }
  }, [socialWelfare]);

  const loadData = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-household/findOne/${id}`,
        config.headers()
      );
      setMember(res.data.data);
      setSocialWelfare(res.data.data.SocialWelfares);
      setCarrer(res.data.data.Careers);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  const loadFinancial = async () => {
    try {
      const res = await axios.get(
        config.api_path + `/member-household/findCapital/${id}`,
        config.headers()
      );
      setMemberFinancial(res.data.results);
    } catch (err) {
      Swal.fire({
        title: "errors",
        icon: "error",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  //แปลงวันจาก createdAt
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const option = { month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("th-TH", option).format(date);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border border-gray-300 p-3 rounded shadow-lg">
          <p className="label text-lg font-semibold">{label}</p>
          {payload.map((data, index) => {
            if (data.dataKey === "income") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value.toLocaleString()} บาทต่อเดือน
                </p>
              );
            }
            if (data.dataKey === "inflation") {
              return (
                <p key={index} style={{ color: data.color }} className="mb-1">
                  {data.name}: {data.value}% ต่อปี
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
  };

  return (
    <>
      <div className="mx-3 my-5">
        <h2 className="text-2xl font-semibol">ระบบติดตามข้อมูลรายบุคคล</h2>

        <div className="grid grid-cols-3 gap-4">
          <div class="col-span-2  w-full p-6 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <header>
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">
                {member.title + " " + member.fname + " " + member.lname}
              </h3>
            </header>

            <section className="grid grid-cols-2 gap-2 pt-2">
              <div className="text-lg font-medium">เพศ : {member.sex}</div>

              <div className="text-lg font-medium">
                อายุ : {member.age_yaer}
              </div>

              <div className="text-lg font-medium">
                เบอร์โทรศัพท์ : {member.phone}
              </div>

              <div className="text-lg font-medium">
                สุขภาพ : {member.health}
              </div>

              <div className="text-lg font-medium">
                สถานะในบ้าน : {member.status_in_house}
              </div>

              <div className="text-lg font-medium">
                ระดับการศึกษาสูงสุด : {member.max_education}
              </div>

              <div className="text-lg font-medium">
                ระดับการศึกษาปัจจุบัน : {member.current_edu_level}
              </div>

              <div className="text-lg font-medium">
                พูด: {member.can_speak_TH}
              </div>

              <div className="text-lg font-medium">
                อ่าน: {member.can_read_TH}
              </div>

              <div className="text-lg font-medium">
                เขียน: {member.can_write_TH}
              </div>

              <div className="text-lg font-medium col-span-2  flex flex-wrap items-start gap-2">
                <span className="mr-4">อาชีพ:</span>

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

          <div class=" w-full p-6 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <header>
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-customBlue ">
                ข้อมูลครัวเรือน
              </h3>
            </header>

            <section className="grid grid-cols-1 gap-2 pt-2">
              <div className="text-lg font-bold">
                {member.Household?.house_code}
              </div>

              <div className="text-lg font-medium">
                {member.Household?.house_number} ต.
                {member.Household?.subdistrict}
              </div>

              <div className="text-lg font-medium">
                อ.{member.Household?.district} จ.{member.Household?.province}
              </div>

              <div className="text-lg font-medium">
                รหัสปณ : {member.Household?.postcode}
              </div>

              <div className="text-lg font-medium">
                จำนวนสมาชิกในครัวเรือน : 10
              </div>

              <div className="text-lg font-medium">
                หัวหน้าครัวเรือน: {member.Household?.host_title}{" "}
                {member.Household?.host_fname} {member.Household?.host_lname}
              </div>
            </section>

            <div className="flex justify-center mt-3">
              <button
                type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                รายละเอียด
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-10">
          รายได้เปรียบเทียบอัตตราเงินเฟ้อ
        </h2>

        <div className=" mt-10 pt-10 flex justify-center rounded-lg shadow bg-white">
          <ComposedChart width={900} height={400} data={charData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis
              yAxisId="left"
              label={{
                value: "รายได้เฉลี่ย",
                angle: -90,
                position: "outsideLeft",
                dx: -25,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "อัตตราเงินเฟ้อ (%)",
                angle: -90,
                position: "outsideRight",
                dx: 25,
              }}
            />
            <RechartsTooltip content={CustomTooltip} />
            <RechartsLegend />
            <Bar
              yAxisId="left"
              dataKey="income"
              barSize={20}
              fill="#413ea0"
              name={"รายได้เฉลี่ย"}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="inflation"
              stroke="red"
              name={"อัตราเงินเฟ้อ"}
            />
          </ComposedChart>
        </div>

        <h2 className="text-xl font-bold mt-10">
          สวัสดิการที่ได้รับ และ ไทม์ไลน์ทักษะอาชีพ
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className=" w-full p-3 mt-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {donughtData && donughtData.labels && (
              <div className="my-8">
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
              </div>
            )}
          </div>

          {/* skill */}
          <div className="w-full p-3 mt-7 bg-white border border-gray-200 rounded-lg shadow">
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
        </div>
      </div>
    </>
  );
};

export default TrackingMemberId;
