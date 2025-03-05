import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
function PhysicalCapital({ setCurrentPage, setMainFormData, mainFormData }) {
  const [formData, setFormData] = useState({
    lat: null,
    lon: null,
    is_has_house: "",
    house_rent: null,
    house_status_law: "",
    house_status: "",
    electricity_status: "",
    alternative_energy: "",
    has_home_phone: null,
    phone: "",
    water_for_agriculture: "",
    house_access_road: "",
    workplace_access_road: "",
    use_tech_get_benefit_gov: null,
    benefit_form_tech: null,
    news: [],
    agricultural_land: [],
    land_use_issuse: [],

    HouseHygiene: {
      item_storage: "",
      drainage_system: "",
      toilet: "",
      garbage: "",
    },

    UtilityWater: {
      plumbing_water: "",
      water_other_sources: "",
      water_purchase: null,
    },

    UrbanArea: {
      is_use_area_to_work: "",
      has_prolem_in_area: "",
    },
  });

  // ตัวแปร state สำหรับแสดงเลขค่าเช่าเฉพาะใน input (ไม่ต้องส่งไป API)
  const [rentNumberForDisplay, setRentNumberForDisplay] = useState("");

  const validateArr = () => {
    if (formData.agricultural_land.length <= 0) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "หัวข้อ8 พื้นที่ทำกินทางการเกษตร",
        icon: "warning",
      });
      return false;
    }

    if (formData.news.length <= 0) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "หัวข้อ13 การรับรู้ข้อมูลข่าวสารของหน่วยงานราชการ",
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  const handleInputChange = (field, value) => {
    const update = { ...formData }; //clone
    update[field] = value; //assign

    // clear house status in law
    if (field === "is_has_house" && value !== "มีบ้านและที่ดินเป็นของตนเอง") {
      update["house_status_law"] = "";
    }

    if (field === "is_has_house" && value !== "เช่าบ้าน/เช่าห้องอยู่") {
      update["house_rent"] = 0;
    }

    //แก้ pin (lat,lon) กรณีกรอกแล้วลบ
    if (field === 'lat' && value ==''){
      update['lat'] = null
    }
    if (field === 'lon' && value ==''){
      update['lon'] = null
    }

    setFormData(update);
  };

  const handleInputSubjChange = (subj, field, value) => {
    //นำค่าไป update ใน state โดยตรง
    setFormData((prevData) => ({
      ...prevData,
      [subj]: {
        ...prevData[subj],
        [field]: value,
      },
    }));
  };

  // load data form main
  useEffect(() => {
    // ถ้ามี PhysicalCapital ใน mainFormData แปลว่าเราเคยกรอกมาแล้ว
    if (mainFormData.PhysicalCapital) {
      const updatedFormData = mainFormData.PhysicalCapital;
      setFormData(updatedFormData);

      // ตรวจสอบว่า UrbanArea.is_use_area_to_work มีค่าอะไรเพื่อเซต no11 ให้ตรง
      const choice = updatedFormData.UrbanArea?.is_use_area_to_work || "";
      if (choice.startsWith(prefix)) {
        // ไม่ใช้ ระบุกิจกรรม/อาชีพ
        setNo11({ career: true, rent: false, other: false });
      } else if (choice.includes("ค่าเช่า")) {
        // มีคำว่า "ค่าเช่า" แสดงว่าเป็นการเช่า
        setNo11({ career: false, rent: true, other: false });
      } else {
        // กรณีอื่น ๆ
        // เช่น "ใช้บ้าน/อาคารของตนเองประกอบกิจกรรม/อาชีพ"
        // หรือกรณีอื่นที่อาจจะต้องการตรวจสอบเพิ่มเติม
        setNo11({ career: false, rent: false, other: false });
      }

      // ตัวอย่างเช็คเงื่อนไขอื่น ๆ
      if (updatedFormData.water_for_agriculture?.startsWith("อื่น ๆ")) {
        setIsOther(true);
      }
      if (updatedFormData.land_use_issuse?.length >= 2) {
        setHasProblem10(true);
      }
    }
  }, [mainFormData]);

  // โหลดค่าเดิมเมื่อ component ถูก mount หรือเมื่อ formData เปลี่ยน
useEffect(() => {
  // สมมติค่าเดิม เช่น "ใช้พื้นที่/แผง/อาคาร โดยการเช่าผู้อื่น ค่าเช่า500บาท/เดือน"
  const rentString = formData.UrbanArea.is_use_area_to_work || "";

  // เช็คว่ามี "ค่าเช่า" กับ "บาท/เดือน" หรือเปล่า
  if (rentString.includes("ค่าเช่า") && rentString.includes("บาท/เดือน")) {
    // หา index ของข้อความ
    const start = rentString.indexOf("ค่าเช่า") + "ค่าเช่า".length; // +6
    const end = rentString.indexOf("บาท/เดือน");
    // ตัด substring มาเก็บ
    const numericValue = rentString.slice(start, end).trim(); // "500"
    
    setRentNumberForDisplay(numericValue);
  } else {
    // ถ้าไม่ match ก็เคลียร์เป็นช่องว่าง
    setRentNumberForDisplay("");
  }
}, [formData.UrbanArea.is_use_area_to_work]);

  const handleCheckboxChange = (field, value, checked) => {
    const updateData = { ...formData };

    if (checked) {
      updateData[field] = [...updateData[field], value];
    } else {
      const index = updateData[field].indexOf(value);

      if (index > -1) {
        updateData[field].splice(index, 1);
      }
    }

    setFormData(updateData);
  };

  // 9
  const [isOther, setIsOther] = useState(false);
  const [hasProblem, setHasProblem] = useState(false);

  //10
  const [hasProblem10, setHasProblem10] = useState(false);

  //11
  const [isOther11, setIsOther11] = useState(false);

  //11.1
  const [no11, setNo11] = useState({
    career: false,
    rent: false,
    other: false,
  });

  //next page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateArr()) {
      return;
    }

    setMainFormData((prevData) => ({
      ...prevData,
      PhysicalCapital: formData,
    }));

    setCurrentPage(4);
  };

  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      PhysicalCapital: formData,
    }));
    setCurrentPage(2);
  };

  const handleLogdata = () => {
    console.log(formData);
  };

  //11
  const prefix = "ไม่ใช้พื้นที่ชุมชนเมืองประกอบอาชีพ ";
  const prefix2 = "อื่นๆ";
  const prefix11_3 = "มี";

  //12
  const prefix12 = "มีการเดินทางรูปแบบอื่น";
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-6 mx-10 mt-2">
          <div className="Container">
            <h2 className="text-black text-xl font-bold  py-5">
              ส่วนที่ 2 ข้อมูลด้านกายภาพและสาธารณูปโภคสาธารณูปการ (ทุนกายภาพ)
            </h2>
          </div>

          <h3 className="text-black text-base font-bold py-2">
            1. ให้ระบบ pin location ของบ้านด้วย GIS (ทศนิยม 6-8 ตำแหน่ง)
          </h3>
{/* pin */}
          <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
            <div>
              <label
                htmlFor="lat"
                className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
              >
                ละติจูด
              </label>
              <input
                type="text"
                name="lat"
                value={formData.lat}
                onChange={(e) => {
                  handleInputChange(e.target.name, e.target.value);
                }}
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div>
              <label
                htmlFor="lon"
                className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
              >
                ลองจิจูด
              </label>
              <input
                type="text"
                name="lon"
                value={formData.lon}
                onChange={(e) => {
                  handleInputChange(e.target.name, e.target.value);
                }}
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
              />
            </div>
          </div>

          <h3 className="text-black text-base font-bold py-2">
            2. ท่านและสมาชิกครัวเรือนมีบ้านเป็นของตนเองหรือไม่ (เลือกได้ 1 ข้อ)
          </h3>
{/* 2 */}
          <div className="mt-2 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                name="is_has_house"
                type="radio"
                required
                value="ไม่มีบ้านพักอาศัยเป็นหลักแหล่ง"
                checked={
                  formData.is_has_house === "ไม่มีบ้านพักอาศัยเป็นหลักแหล่ง"
                }
                onChange={(e) => {
                  handleInputChange("is_has_house", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                ไม่มีบ้านพักอาศัยเป็นหลักแหล่ง (เช่น อาศัยที่สาธารณะพักนอน)
              </label>
            </div>

            <div className="flex items-center gap-x-3">
              <input
                name="is_has_house"
                type="radio"
                value="อาศัยอยู่กับผู้อื่น"
                checked={formData.is_has_house === "อาศัยอยู่กับผู้อื่น"}
                onChange={(e) => {
                  handleInputChange("is_has_house", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                อาศัยอยู่กับผู้อื่น
              </label>
            </div>

            <div className="flex items-center gap-x-3">
              <input
                name="is_has_house"
                type="radio"
                value="เช่าบ้าน/เช่าห้องอยู่"
                checked={formData.is_has_house.startsWith(
                  "เช่าบ้าน/เช่าห้องอยู่"
                )}
                onChange={(e) => {
                  handleInputChange("is_has_house", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                เช่าบ้าน/เช่าห้องอยู่
              </label>

              {formData.is_has_house === "เช่าบ้าน/เช่าห้องอยู่" && (
                <div className="">
                  <label className="  text-m font-medium leading-6 pr-3 text-gray-900">
                    ค่าเช่า
                  </label>
                  <input
                    name="house_rent"
                    type="number"
                    placeholder="ระบุ"
                    value={formData.house_rent}
                    onChange={(e) => {
                      handleInputChange(
                        e.target.name,
                        parseInt(e.target.value)
                      );
                    }}
                    required
                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-2.5"
                  />
                  <label className="text-m font-medium mt-3 pl-3">
                    บาท/เดือน
                  </label>
                </div>
              )}
            </div>

            <div className="flex items-center gap-x-3">
              <input
                name="is_has_house"
                type="radio"
                value="ปลูกบ้านในที่ดินผู้อื่น"
                checked={formData.is_has_house === "ปลูกบ้านในที่ดินผู้อื่น"}
                onChange={(e) => {
                  handleInputChange("is_has_house", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                ปลูกบ้านในที่ดินผู้อื่น เช่น ญาติ ที่ดินสาธารณะ หน่วยงานภาครัฐ
                เอกชน ศาสนสถาน เป็นต้น
              </label>
            </div>

            {/* ตัวเลือกหลัก */}
            <div>
              <div className="flex items-center gap-x-3">
                <input
                  name="is_has_house"
                  type="radio"
                  value="มีบ้านและที่ดินเป็นของตนเอง"
                  onChange={(e) => {
                    handleInputChange("is_has_house", e.target.value);
                  }}
                  checked={
                    formData.is_has_house === "มีบ้านและที่ดินเป็นของตนเอง"
                  }
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="block text-m font-medium leading-6 text-gray-900">
                  มีบ้านและที่ดินเป็นของตนเอง
                  (หมายถึงที่เอกสารสิทธิตามกฎหมายที่ดิน)
                </label>
              </div>

              {/* check render sub option*/}
              {formData.is_has_house === "มีบ้านและที่ดินเป็นของตนเอง" && (
                <div className="ml-6 mt-2 space-y-4">
                  <div className="flex items-center gap-x-3">
                    <input
                      name="house_status_law"
                      type="radio"
                      required
                      value="บ้านไม่ติดจำนองหรือค้ำประกัน"
                      checked={
                        formData.house_status_law ===
                        "บ้านไม่ติดจำนองหรือค้ำประกัน"
                      }
                      onChange={(e) => {
                        handleInputChange("house_status_law", e.target.value);
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label className="block text-m font-medium leading-6 text-gray-900">
                      บ้านไม่ติดจำนองหรือค้ำประกัน
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      name="house_status_law"
                      type="radio"
                      value="บ้านติดจำนองหรือค้ำประกันกับสถาบันการเงิน ธนาคาร"
                      checked={
                        formData.house_status_law ===
                        "บ้านติดจำนองหรือค้ำประกันกับสถาบันการเงิน ธนาคาร"
                      }
                      onChange={(e) => {
                        handleInputChange("house_status_law", e.target.value);
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label className="block text-m font-medium leading-6 text-gray-900">
                      บ้านติดจำนองหรือค้ำประกันกับสถาบันการเงิน ธนาคาร
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      name="house_status_law"
                      type="radio"
                      value="บ้านติดจำนองหรืบ้านติดจำนองหรือค้ำประกันกับเจ้าหนี้นอกระบบอค้ำประกัน"
                      checked={
                        formData.house_status_law ===
                        "บ้านติดจำนองหรืบ้านติดจำนองหรือค้ำประกันกับเจ้าหนี้นอกระบบอค้ำประกัน"
                      }
                      onChange={(e) => {
                        handleInputChange("house_status_law", e.target.value);
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label className="block text-m font-medium leading-6 text-gray-900">
                      บ้านติดจำนองหรือค้ำประกันกับเจ้าหนี้นอกระบบ
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <h3 className="text-black text-base font-bold py-2 mt-2">
            3. สภาพบ้านที่อยู่อาศัยในปัจจุบันเป็นอย่างไร (เลือกได้ 1 ข้อ)
          </h3>
 {/* ข้อ 3  */}
          <div className="mt-2 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                name="house_status"
                type="radio"
                required
                value="บ้านทรุดโทรม หรือ วัสดุก่อสร้างไม่ถาวร"
                checked={
                  formData.house_status ===
                  "บ้านทรุดโทรม หรือ วัสดุก่อสร้างไม่ถาวร"
                }
                onChange={(e) => {
                  handleInputChange("house_status", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                บ้านทรุดโทรม หรือ วัสดุก่อสร้างไม่ถาวร เช่น ไม้ไผ่ แผ่นไม้อัด
                มุงจาก มุงหลังคา
              </label>
            </div>

            <div className="flex items-center gap-x-3">
              <input
                name="house_status"
                type="radio"
                value="บ้านไม้หรือตึก หลังคามุงกระเบื้องสังกะสี ที่มีสภาพแข็งแรงปานกลาง"
                checked={
                  formData.house_status ===
                  "บ้านไม้หรือตึก หลังคามุงกระเบื้องสังกะสี ที่มีสภาพแข็งแรงปานกลาง"
                }
                onChange={(e) => {
                  handleInputChange("house_status", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                บ้านไม้หรือตึก หลังคามุงกระเบื้องสังกะสี ที่มีสภาพแข็งแรงปานกลาง
              </label>
            </div>

            <div className="flex items-center gap-x-3">
              <input
                name="house_status"
                type="radio"
                value="บ้านไม้อาคารไม้/ตึกที่มีสภาพมั่นคงแข็งแรง"
                checked={
                  formData.house_status ===
                  "บ้านไม้อาคารไม้/ตึกที่มีสภาพมั่นคงแข็งแรง"
                }
                onChange={(e) => {
                  handleInputChange("house_status", e.target.value);
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="block text-m font-medium leading-6 text-gray-900">
                บ้านไม้อาคารไม้/ตึกที่มีสภาพมั่นคงแข็งแรง
              </label>
            </div>
          </div>
{/* 4 */}
          <h3 className="text-black text-base font-bold py-2 mt-2">
            4. ความเป็นระเบียบเรียบร้อย และถูกลักษณะของบ้านพักอาศัย
          </h3>

          <div className="my-3">
            1. บ้านพักอาศัยมีการจัดเก็บสิ่งของเป็นระเบียบไม่รกรุงรัง
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2 ml-3">
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="item_storage_yes"
                name="HouseHygiene_item_storage"
                required
                type="radio"
                value="ใช่ (ไม่รก)"
                checked={formData.HouseHygiene.item_storage === "ใช่ (ไม่รก)"}
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "item_storage",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ใช่ (ไม่รก)
              </label>
            </div>
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="item_storage_no"
                name="HouseHygiene_item_storage"
                type="radio"
                value="ไม่ใช่ (รก)"
                checked={formData.HouseHygiene.item_storage === "ไม่ใช่ (รก)"}
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "item_storage",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ไม่ใช่ (รก)
              </label>
            </div>
          </div>

          <div className="my-3">
            2.บ้านพักอาศัยมีการจัดการระบบระบายน้ำในบ้าน
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2 ml-3">
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="drainage_system_yes"
                name="HouseHygiene_dra"
                type="radio"
                required
                value="ใช่ (มีระบบระบายน้ำ)"
                checked={
                  formData.HouseHygiene.drainage_system ===
                  "ใช่ (มีระบบระบายน้ำ)"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "drainage_system",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ใช่ (มีระบบระบายน้ำ)
              </label>
            </div>
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="drainage_system_no"
                name="HouseHygiene_dra"
                type="radio"
                value="ไม่ใช่ (ไม่มีระบายน้ำ)"
                checked={
                  formData.HouseHygiene.drainage_system ===
                  "ไม่ใช่ (ไม่มีระบายน้ำ)"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "drainage_system",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ไม่ใช่ (ไม่มีระบายน้ำ)
              </label>
            </div>
          </div>

          <div className="my-3">
            3. บ้านพักอาศัยมีห้องส้วมที่สะอาด แข็งแรง ระบายน้ำดีไม่มีกลิ่น
          </div>

          <div className="flex flex-row ml-3">
            <div className="">
              <input
                id="toilet_y"
                name="HouseHygiene_toilet"
                type="radio"
                required
                value="(ใช่)บ้านพักอาศัยมีห้องส้วมที่สะอาด แข็งแรง ระบายน้ำดีไม่มีกลิ่น"
                checked={
                  formData.HouseHygiene.toilet ===
                  "(ใช่)บ้านพักอาศัยมีห้องส้วมที่สะอาด แข็งแรง ระบายน้ำดีไม่มีกลิ่น"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "toilet",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ใช่
              </label>
            </div>
            <div className="px-10">
              <input
                id="toilet_n"
                name="HouseHygiene_toilet"
                type="radio"
                value="บ้านพักอาศัยมีห้องส้วมที่ไม่สะอาด "
                checked={
                  formData.HouseHygiene.toilet ===
                  "บ้านพักอาศัยมีห้องส้วมที่ไม่สะอาด"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "toilet",
                    "บ้านพักอาศัยมีห้องส้วมที่ไม่สะอาด"
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ไม่ใช่
              </label>
            </div>
          </div>

          <div className="my-3">
            4. บ้านพักอาศัยมีการคัดแยกขยะและกำหนดจุดทิ้งขยะที่ชัดเจน
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-2 ml-3">
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="garbage_y"
                name="HouseHygiene_gb"
                type="radio"
                required
                value="มีการแยกขยะ และกำหนดจุดทิ้งขยะชัดเจน"
                checked={
                  formData.HouseHygiene.garbage ===
                  "มีการแยกขยะ และกำหนดจุดทิ้งขยะชัดเจน"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "garbage",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ใช่ (มี)
              </label>
            </div>
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                id="garbage_n"
                name="HouseHygiene_gb"
                type="radio"
                value="ไม่มีการแยกขยะ และกำหนดจุดทิ้งขยะชัดเจน"
                checked={
                  formData.HouseHygiene.garbage ===
                  "ไม่มีการแยกขยะ และกำหนดจุดทิ้งขยะชัดเจน"
                }
                onChange={(e) => {
                  handleInputSubjChange(
                    "HouseHygiene",
                    "garbage",
                    e.target.value
                  );
                }}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label className="px-3 text-m font-medium leading-6 text-gray-900">
                ไม่ใช่ (ไม่มี)
              </label>
            </div>
          </div>

          {/* ส่วน 5  */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              5.การใช้ไฟฟ้าหรือพลังงานทางเลือก
            </h3>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                5.1 ครัวเรือนของท่านมีไฟฟ้าหรือไม่
              </h3>

              <div className="flex flex-col xl:flex-row xl:gap-6 ml-3">
                <div className="flex items-center mb-4 xl:mb-0">
                  <input
                    name="electricity_status"
                    type="radio"
                    required
                    value="ไม่มีไฟฟ้าใช้"
                    checked={formData.electricity_status === "ไม่มีไฟฟ้าใช้"}
                    onChange={(e) => {
                      handleInputChange("electricity_status", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มีไฟฟ้าใช้(ใช้แสงสว่างอื่น เช่น เทียน ตะเกียง แบตเตอรี่
                    เครื่องปั่นไฟ โซลาเชล)
                  </label>
                </div>

                <div className="flex items-center mb-4 xl:mb-0">
                  <input
                    name="electricity_status"
                    type="radio"
                    value="ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง)"
                    checked={
                      formData.electricity_status ===
                      "ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง)"
                    }
                    onChange={(e) => {
                      handleInputChange("electricity_status", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง)
                  </label>
                </div>

                <div className="flex items-center mb-4 xl:mb-0">
                  <input
                    name="electricity_status"
                    type="radio"
                    value="มีมิเตอร์ไฟฟ้าของตนเอง"
                    checked={
                      formData.electricity_status === "มีมิเตอร์ไฟฟ้าของตนเอง"
                    }
                    onChange={(e) => {
                      handleInputChange("electricity_status", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มีมิเตอร์ไฟฟ้าของตนเอง
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                5.2 ครัวเรือนของท่านได้ใช้พลังงานทางเลือกหรือไม่ (เช่น
                พลังงานแสงอาทิตย์ พลังงานน้ำ พลังงานลม เครื่องปั่นไฟ แก๊สชีวภาพ
                แก๊สชีวมวล เป็นต้น)
              </h3>

              <div className="flex flex-row ml-3 ">
                <div className="">
                  <input
                    name="alternative_energy"
                    type="radio"
                    required
                    value="ใช้พลังงานทางเลือก"
                    checked={
                      formData.alternative_energy === "ใช้พลังงานทางเลือก"
                    }
                    onChange={(e) => {
                      handleInputChange(e.target.name, e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ใช้
                  </label>
                </div>

                <div className="px-10">
                  <input
                    name="alternative_energy"
                    type="radio"
                    value="ไม่มีการใช้พลังงานทางเลือก"
                    checked={
                      formData.alternative_energy ===
                      "ไม่มีการใช้พลังงานทางเลือก"
                    }
                    onChange={(e) => {
                      handleInputChange(e.target.name, e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่ใช้
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* ส่วน6 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              6.น้ำในการอุปโภคบริโภคของครัวเรือนท่านมาจากแหล่งใด
            </h3>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                6.1 น้ำจากระบบประปา
              </h3>

              <div className="flex flex-row ml-3 ">
                <div className="">
                  <input
                    name="UtilityWater_plumb"
                    id="plumbing_water_y"
                    type="radio"
                    required
                    value="ใช้น้ำประปา"
                    checked={
                      formData.UtilityWater.plumbing_water === "ใช้น้ำประปา"
                    }
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "plumbing_water",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ใช้
                  </label>
                </div>

                <div className="px-10">
                  <input
                    name="UtilityWater_plumb"
                    id="plumbing_water_n"
                    type="radio"
                    required
                    value="ไม่มีการใช้น้ำประปา"
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "plumbing_water",
                        e.target.value
                      );
                    }}
                    checked={
                      formData.UtilityWater.plumbing_water ===
                      "ไม่มีการใช้น้ำประปา"
                    }
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่ใช้
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                6.2 น้ำจากแหล่งต่าง ๆ (เช่น น้ำบ่อ น้ำห้วย บาดาล อ่างเก็บน้ำ
                น้ำฝน)
              </h3>

              <div className="flex flex-col md:flex-row md:gap-4 ml-3 ">
                <div className="flex items-center mb-4 md:mb-0">
                  <input
                    id="other_y"
                    name="UtilityWater_other"
                    type="radio"
                    required
                    value="มีน้ำจากแหล่งอื่น ๆ ใช้เพียงพอตลอดปี"
                    checked={
                      formData.UtilityWater.water_other_sources ===
                      "มีน้ำจากแหล่งอื่น ๆ ใช้เพียงพอตลอดปี"
                    }
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "water_other_sources",
                        "มีน้ำจากแหล่งอื่น ๆ ใช้เพียงพอตลอดปี"
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    เพียงพอตลอดปี
                  </label>
                </div>

                <div className="flex items-center mb-4 md:mb-0">
                  <input
                    id="other_n"
                    name="UtilityWater_other"
                    type="radio"
                    value="น้ำจากแหล่งน้ำอื่นไม่เพียงพอ"
                    checked={
                      formData.UtilityWater.water_other_sources ===
                      "น้ำจากแหล่งน้ำอื่นไม่เพียงพอ"
                    }
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "water_other_sources",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่เพียงพอ
                  </label>
                </div>

                <div className="flex items-center mb-4 md:mb-0">
                  <input
                    id="other_n_rs"
                    name="UtilityWater_other"
                    type="radio"
                    value="ไม่ใช้น้ำจากแหล่งอื่น"
                    checked={
                      formData.UtilityWater.water_other_sources ===
                      "ไม่ใช้น้ำจากแหล่งอื่น"
                    }
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "water_other_sources",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่ใช้
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                6.3 ซื้อน้ำ (น้ำถัง น้ำชนิด ตู้กดน้ำดื่ม)
              </h3>

              <div className="flex flex-row ml-3 ">
                <div className="">
                  <input
                    id="water_purchase_y"
                    name="UtilityWater_purchase"
                    type="radio"
                    value="true"
                    required
                    checked={formData.UtilityWater.water_purchase === true}
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "water_purchase",
                        true
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ซื้อ
                  </label>
                </div>

                <div className="px-10">
                  <input
                    name="UtilityWater_purchase"
                    id="water_purchase_n"
                    type="radio"
                    value="ไม่ซื้อน้ำ"
                    required
                    checked={formData.UtilityWater.water_purchase === false}
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UtilityWater",
                        "water_purchase",
                        false
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่ซื้อ
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* ส่วน 7 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              7.ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่ (โทรศัพท์บ้าน
              โทรศัพท์มือถือ เครื่องคอมพิวเตอร์และสัญญาณอินเทอร์เน็ต)
            </h3>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                7.1 โทรศัพท์บ้าน
              </h3>

              <div className="flex flex-row ml-3 ">
                <div className="">
                  <input
                    name="has_home_phone"
                    type="radio"
                    required
                    value={false}
                    checked={formData.has_home_phone === false}
                    //convert str -> bool
                    onChange={(e) => {
                      handleInputChange("has_home_phone", false);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มี
                  </label>
                </div>

                <div className="px-10">
                  <input
                    name="has_home_phone"
                    type="radio"
                    value={true}
                    checked={formData.has_home_phone === true}
                    onChange={(e) => {
                      handleInputChange("has_home_phone", true);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มี
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                7.2 โทรศัพท์มือถือ
              </h3>

              <div className="flex flex-col lg:flex-row lg:gap-6 ml-3 ">
                <div className="flex items-center mb-4 lg:mb-0">
                  <input
                    name="phone"
                    type="radio"
                    required
                    value="ไม่มีโทรศัทพ์มือถือ"
                    checked={formData.phone === "ไม่มีโทรศัทพ์มือถือ"}
                    onChange={(e) => {
                      handleInputChange("phone", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มี
                  </label>
                </div>

                <div className="flex items-center mb-4 lg:mb-0">
                  <input
                    name="phone"
                    type="radio"
                    value="มีโทรศัพท์มือถือแต่ไม่มีอินเทอร์เน็ต"
                    checked={
                      formData.phone === "มีโทรศัพท์มือถือแต่ไม่มีอินเทอร์เน็ต"
                    }
                    onChange={(e) => {
                      handleInputChange("phone", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มีโทรศัพท์มือถือแต่ไม่มีอินเทอร์เน็ต
                  </label>
                </div>

                <div className="flex items-center mb-4 lg:mb-0">
                  <input
                    name="phone"
                    type="radio"
                    value="มีโทรศัทพ์มือถือและมีอินเตอร์เน็ต"
                    checked={
                      formData.phone === "มีโทรศัทพ์มือถือและมีอินเตอร์เน็ต"
                    }
                    onChange={(e) => {
                      handleInputChange("phone", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มีโทรศัทพ์มือถือและมีอินเตอร์เน็ต
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* ส่วน8 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              8. ครัวเรือนของท่านมีพื้นที่ทำกินทางการเกษตรหรือไม่
              (ตอบได้มากกว่า1ข้อ)
            </h3>

            <div className="grid gap-2 mb-6 mt-6 md:grid-row  mx-3 ">
              {/* CheckBox */}

              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  value="ไม่มีที่ทำกินทางการเกษตร/ไม่ได้ทำการเกษตร"
                  checked={formData.agricultural_land.includes(
                    "ไม่มีที่ทำกินทางการเกษตร/ไม่ได้ทำการเกษตร"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  ไม่มีที่ทำกินทางการเกษตร/ไม่ได้ทำการเกษตร (ข้ามไปตอบข้อ 11)
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  value="มีพื้นที่ทำกินเป็นของตนเอง โดยมีเอกสารแสดงความเป็นเจ้าของ"
                  checked={formData.agricultural_land.includes(
                    "มีพื้นที่ทำกินเป็นของตนเอง โดยมีเอกสารแสดงความเป็นเจ้าของ"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  มีพื้นที่ทำกินเป็นของตนเอง โดยมีเอกสารแสดงความเป็นเจ้าของ
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  checked={formData.agricultural_land.includes(
                    "มีพื้นที่ทำกินที่มีเอกสารแสดงสิทธิ์การครอบครอง (ส.ค.1 , สปก)"
                  )}
                  value="มีพื้นที่ทำกินที่มีเอกสารแสดงสิทธิ์การครอบครอง (ส.ค.1 , สปก)"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  มีพื้นที่ทำกินที่มีเอกสารแสดงสิทธิ์การครอบครอง (ส.ค.1 , สปก)
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  checked={formData.agricultural_land.includes(
                    "มีพื้นที่ทำกินที่มีเอกสารแสดงการเป็นเจ้าของ (ภบท.5/6/11)"
                  )}
                  value="มีพื้นที่ทำกินที่มีเอกสารแสดงการเป็นเจ้าของ (ภบท.5/6/11)"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  มีพื้นที่ทำกินที่มีเอกสารแสดงการเป็นเจ้าของ (ภบท.5/6/11) เช่น
                  เขตป่าสงวน/อุทยาน หรืออื่นๆ
                </label>
              </div>
              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  value="ไม่มีพื้นที่ทำกินเป็นของตนเองแต่อาศัยพื้นที่ของบุคคลอื่นทำโดยไม่มีค่าเช่า"
                  checked={formData.agricultural_land.includes(
                    "ไม่มีพื้นที่ทำกินเป็นของตนเองแต่อาศัยพื้นที่ของบุคคลอื่นทำโดยไม่มีค่าเช่า"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  ไม่มีพื้นที่ทำกินเป็นของตนเองแต่อาศัยพื้นที่ของบุคคลอื่นทำ
                  โดยไม่มีค่าเช่า
                </label>
              </div>
              <div class="">
                <input
                  type="checkbox"
                  name="agricultural_land"
                  checked={formData.agricultural_land.includes("เช่าที่ทำกิน")}
                  value="เช่าที่ทำกิน"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  เช่าที่ทำกิน
                </label>
              </div>
            </div>
          </div>
          {/* ส่วน9 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              9.ครัวเรือนของท่านใช้น้ำเพื่อทำการเกษตรจากแหล่งใดเป็นหลัก
              (เลือกได้ 1 ข้อ)
            </h3>

            <div className="">
              <div className="flex flex-col  ml-3 ">
                <div className="">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    value="แม่น้ำ ลำห้วย ลำเหมือง"
                    checked={
                      formData.water_for_agriculture ===
                      "แม่น้ำ ลำห้วย ลำเหมือง"
                    }
                    onChange={(e) => {
                      handleInputChange(
                        "water_for_agriculture",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    แม่น้ำ ลำห้วย ลำเหมือง
                  </label>
                </div>

                <div className="">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    value="อ่างเก็บน้ำ สระน้ำหมู่บ้าน"
                    checked={
                      formData.water_for_agriculture ===
                      "อ่างเก็บน้ำ สระน้ำหมู่บ้าน"
                    }
                    onChange={(e) => {
                      handleInputChange(
                        "water_for_agriculture",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    อ่างเก็บน้ำ สระน้ำหมู่บ้าน
                  </label>
                </div>
                <div className="">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    value="น้ำใต้ดิน (บ่อน้ำผิวดิน น้ำบาดาล)"
                    checked={
                      formData.water_for_agriculture ===
                      "น้ำใต้ดิน (บ่อน้ำผิวดิน น้ำบาดาล)"
                    }
                    onChange={(e) => {
                      handleInputChange(
                        "water_for_agriculture",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    น้ำใต้ดิน (บ่อน้ำผิวดิน น้ำบาดาล)
                  </label>
                </div>
                <div className="">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    value="น้ำฝน"
                    checked={formData.water_for_agriculture === "น้ำฝน"}
                    onChange={(e) => {
                      handleInputChange(
                        "water_for_agriculture",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    น้ำฝน
                  </label>
                </div>
                <div className="">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    value="คลองชลประทาน"
                    checked={formData.water_for_agriculture === "คลองชลประทาน"}
                    onChange={(e) => {
                      handleInputChange(
                        "water_for_agriculture",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    คลองชลประทาน
                  </label>
                </div>

                <div className=" ">
                  <input
                    name="water_for_agriculture"
                    type="radio"
                    checked={formData.water_for_agriculture.startsWith(
                      "อื่น ๆ"
                    )}
                    onChange={() => {
                      handleInputChange("water_for_agriculture", "อื่น ๆ");
                      setIsOther(true);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />

                  <label className=" text-m px-3 font-medium leading-6 text-gray-900 mt-2">
                    อื่น ๆ
                  </label>

                  {isOther === true && (
                    <input
                      name="water_for_agriculture"
                      type="text"
                      // value={formData.water_for_agriculture}
                      placeholder="ระบุ"
                      onChange={(e) => {
                        handleInputChange(
                          "water_for_agriculture",
                          "อื่น ๆ" + e.target.value
                        );
                      }}
                      className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-2.5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ส่วน10 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              10. ครัวเรือนของท่านมีปัญหาเกี่ยวกับพื้นที่ทำกินหรือไม่
            </h3>

            <div className="">
              <div className="flex flex-col ml-3 ">
                <div className="flex items-center gap-x-3">
                  <input
                    name="land_use_issuse"
                    type="radio"
                    value="ไม่มีปัญหาเกี่ยวกับพื้นที่ทำกิน"
                    checked={formData.land_use_issuse.includes(
                      "ไม่มีปัญหาเกี่ยวกับพื้นที่ทำกิน"
                    )}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        land_use_issuse: ["ไม่มีปัญหาเกี่ยวกับพื้นที่ทำกิน"], //ล้างค่า
                      }));
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="block text-m font-medium leading-6 text-gray-900">
                    ไม่มีปัญหา
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-x-3">
                <input
                  name="land_use_issuse"
                  type="radio"
                  value="มีปัญหา"
                  onChange={(e) => {
                    setFormData((prevData) => {
                      const newLandUseIssue = prevData.land_use_issuse.filter(
                        (issue) => issue !== "ไม่มีปัญหาเกี่ยวกับพื้นที่ทำกิน"
                      );

                      if (!newLandUseIssue.includes("มีปัญหา")) {
                        newLandUseIssue.push("มีปัญหา");
                      }

                      return {
                        ...prevData,
                        land_use_issuse: newLandUseIssue,
                      };
                    });
                  }}
                  checked={formData.land_use_issuse.includes("มีปัญหา")}
                  className="h-4 w-4 border-gray-300 ml-3 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="block text-m  font-medium leading-6 text-gray-900">
                  มีปัญหา (ตอบได้มากกว่า1ข้อ)
                </label>
              </div>
            </div>

            {formData.land_use_issuse.includes("มีปัญหา") && (
              <div className="ml-4">
                <div class="">
                  <input
                    name="land_use_issuse"
                    type="checkbox"
                    value="น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดปี"
                    checked={formData.land_use_issuse.includes(
                      "น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดปี"
                    )}
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดปี
                  </label>
                </div>

                <div class="">
                  <input
                    name="land_use_issuse"
                    type="checkbox"
                    value="ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี"
                    checked={formData.land_use_issuse.includes(
                      "ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี"
                    )}
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี
                  </label>
                </div>

                <div class="">
                  <input
                    type="checkbox"
                    name="land_use_issuse"
                    value="ไม่มีเอกสารสิทธิ์ในที่ดิน"
                    checked={formData.land_use_issuse.includes(
                      "ไม่มีเอกสารสิทธิ์ในที่ดิน"
                    )}
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    ไม่มีเอกสารสิทธิ์ในที่ดิน
                  </label>
                </div>

                <div class="">
                  <input
                    type="checkbox"
                    name="land_use_issuse"
                    value="ที่ดินติดจำนอง"
                    checked={formData.land_use_issuse.includes(
                      "ที่ดินติดจำนอง"
                    )}
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    ที่ดินติดจำนอง
                  </label>
                </div>

                <div class="">
                  <input
                    type="checkbox"
                    name="land_use_issuse"
                    checked={formData.land_use_issuse.includes(
                      "อยู่ในพื้นที่เสี่ยงภัย เช่น อุทกภัย ดินถล่ม"
                    )}
                    value="อยู่ในพื้นที่เสี่ยงภัย เช่น อุทกภัย ดินถล่ม"
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    อยู่ในพื้นที่เสี่ยงภัย เช่น อุทกภัย ดินถล่ม
                  </label>
                </div>

                <div class="">
                  <input
                    type="checkbox"
                    name="land_use_issuse"
                    checked={formData.land_use_issuse.includes(
                      "เข้าถึงยาก (เช่น ไม่มีถนนหรือถนนไม่ดี เข้าได้บางฤดูกาล)"
                    )}
                    value="เข้าถึงยาก (เช่น ไม่มีถนนหรือถนนไม่ดี เข้าได้บางฤดูกาล)"
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    เข้าถึงยาก (เช่น ไม่มีถนนหรือถนนไม่ดี เข้าได้บางฤดูกาล)
                  </label>
                </div>

                <div class="">
                  <input
                    type="checkbox"
                    name="land_use_issuse"
                    checked={formData.land_use_issuse.includes("อื่น ๆ (ระบุ)")}
                    value="อื่น ๆ (ระบุ)"
                    onChange={(e) => {
                      handleCheckboxChange(
                        e.target.name,
                        e.target.value,
                        e.target.checked
                      );
                    }}
                    class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    อื่น ๆ
                  </label>
                </div>
              </div>
            )}
          </div>
          {/* 11 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              11. กรณีครัวเรือนของท่านไม่ได้ประกอบอาชีพด้านเกษตรกรรม
              (พื้นที่ชุมชนเมือง)
            </h3>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                11.1 ครัวเรือนของท่านใช้พื้นที่ในการประกอบอาชีพหรือไม่
              </h3>

              <div className="flex flex-col ml-3 ">
                <div className="mt-2">
                  <input
                    name="UrbanArea_problem"
                    type="radio"
                    required
                    checked={formData.UrbanArea.is_use_area_to_work.startsWith(
                      prefix
                    )}
                    onChange={() => {
                      handleInputSubjChange(
                        "UrbanArea",
                        "is_use_area_to_work",
                        prefix
                      );
                      setNo11(() => ({
                        career: true,
                        rent: false,
                        other: false,
                      }));
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่ใช้ ระบุกิจกรรม/อาชีพ
                  </label>

                  {/* เงื่อนไขในการแสดง input text เมื่อเลือก "ไม่ใช้ ระบุกิจกรรม/อาชีพ" */}
                  {formData.UrbanArea.is_use_area_to_work.startsWith(
                    prefix
                  ) && (
                    <input
                      name="UrbanArea_problem"
                      id="is_use_area_to_work_no_work"
                      type="text"
                      placeholder="ระบุ"
                      required
                      value={
                        formData.UrbanArea.is_use_area_to_work.startsWith(
                          prefix
                        )
                          ? formData.UrbanArea.is_use_area_to_work.slice(
                              prefix.length
                            )
                          : formData.UrbanArea.is_use_area_to_work
                      }
                      onChange={(e) => {
                        handleInputSubjChange(
                          "UrbanArea",
                          "is_use_area_to_work",
                          prefix + e.target.value
                        );
                      }}
                      className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/7 p-1.2"
                    />
                  )}
                </div>

                <div className="mt-2">
                  <input
                    id="is_use_area_to_work_home"
                    name="UrbanArea_problem"
                    type="radio"
                    value="ใช้บ้าน/อาคารของตนเองประกอบกิจกรรม/อาชีพ"
                    checked={
                      formData.UrbanArea.is_use_area_to_work ===
                      "ใช้บ้าน/อาคารของตนเองประกอบกิจกรรม/อาชีพ"
                    }
                    onChange={(e) => {
                      setNo11(() => ({
                        career: false,
                        rent: false,
                        other: false,
                      }));
                      handleInputSubjChange(
                        "UrbanArea",
                        "is_use_area_to_work",
                        e.target.value
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ใช้บ้าน/อาคารของตนเองประกอบกิจกรรม/อาชีพ
                  </label>
                </div>

                <div className="mt-2 flex items-center">
                  <input
                    name="UrbanArea_problem"
                    type="radio"
                    value=""
                    checked={formData.UrbanArea.is_use_area_to_work.startsWith(
                      "ใช้พื้นที่/แผง/อาคาร"
                    )}
                    onChange={() => {
                      handleInputSubjChange(
                        "UrbanArea",
                        "is_use_area_to_work",
                        "ใช้พื้นที่/แผง/อาคาร"
                      );
                      setNo11(() => ({
                        career: false,
                        rent: true,
                        other: false,
                      }));
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ใช้พื้นที่/แผง/อาคาร โดยการเช่าผู้อื่น
                  </label>

                  {no11.rent && (
                    <div className="flex items-center ml-4">
                      <label className="text-m font-medium leading-6 pr-3 text-gray-900">
                        ค่าเช่า
                      </label>
                      <input
                        id="is_use_area_to_work_rent"
                        name="UrbanArea_problem"
                        type="number"
                        required
                        value={rentNumberForDisplay}
                        placeholder="ระบุ"
                        onChange={(e) => {
                          const numericValue = e.target.value; // ตัวเลขที่ user กรอก
                          setRentNumberForDisplay(numericValue); // set ลง state ที่โชว์เฉยๆ
                  
                          // ประกอบ string แล้วอัปเดตลง formData เหมือนเดิม
                          const newString =
                            "ใช้พื้นที่/แผง/อาคาร โดยการเช่าผู้อื่น" +
                            " ค่าเช่า" +
                            numericValue +
                            "บาท/เดือน";
                  
                          handleInputSubjChange("UrbanArea", "is_use_area_to_work", newString);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-1.5"
                      />
                      <label className="text-m font-medium pl-3">
                        บาท/เดือน
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    name="UrbanArea_problem"
                    type="radio"
                    value="อื่นๆ (ระบุ) ...."
                    checked={formData.UrbanArea.is_use_area_to_work.startsWith(
                      "อื่นๆ"
                    )}
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UrbanArea",
                        "is_use_area_to_work",
                        prefix2
                      );
                      setNo11(() => ({
                        career: false,
                        rent: false,
                        other: true,
                      }));
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    อื่นๆ
                  </label>
                  {formData.UrbanArea.is_use_area_to_work.startsWith(
                    prefix2
                  ) && (
                    <input
                      name="UrbanArea_problem"
                      id="other"
                      type="text"
                      placeholder="ระบุ"
                      value={
                        formData.UrbanArea.is_use_area_to_work.startsWith(
                          prefix2
                        )
                          ? formData.UrbanArea.is_use_area_to_work.slice(
                              prefix2.length
                            )
                          : formData.UrbanArea.is_use_area_to_work
                      }
                      onChange={(e) => {
                        handleInputSubjChange(
                          "UrbanArea",
                          "is_use_area_to_work",
                          prefix2 + e.target.value
                        );
                      }}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-1.5"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                11.2
                ครัวเรือนของท่านมีปัญหาในการใช้พื้นที่เพื่อประกอบอาชีพหรือไม่
              </h3>

              <div className="flex flex-col ml-3 ">
                <div className="">
                  <input
                    name="has_prolem_in_area"
                    type="radio"
                    required
                    checked={
                      formData.UrbanArea.has_prolem_in_area ===
                      "ไม่มีปัญหาในการใช้พื้นที่เพื่อประกอบอาชีพ"
                    }
                    value="ไม่มี"
                    onChange={(e) => {
                      setHasProblem(false);
                      handleInputSubjChange(
                        "UrbanArea",
                        "has_prolem_in_area",
                        "ไม่มีปัญหาในการใช้พื้นที่เพื่อประกอบอาชีพ"
                      );
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มี
                  </label>
                </div>

                <div className="">
                  <input
                    name="has_prolem_in_area"
                    type="radio"
                    checked={formData.UrbanArea.has_prolem_in_area.startsWith(
                      prefix11_3
                    )}
                    onChange={(e) => {
                      handleInputSubjChange(
                        "UrbanArea",
                        "has_prolem_in_area",
                        prefix11_3
                      );
                      setHasProblem(true);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มี
                  </label>

                  {formData.UrbanArea.has_prolem_in_area &&
                    formData.UrbanArea.has_prolem_in_area.startsWith(
                      prefix11_3
                    ) && (
                      <input
                        name="has_prolem_in_area"
                        type="text"
                        placeholder="ระบุ"
                        required
                        value={
                          formData.UrbanArea.has_prolem_in_area.startsWith(
                            prefix11_3
                          )
                            ? formData.UrbanArea.has_prolem_in_area.slice(
                                prefix11_3.length
                              )
                            : formData.UrbanArea.has_prolem_in_area
                        }
                        onChange={(e) => {
                          handleInputSubjChange(
                            "UrbanArea",
                            "has_prolem_in_area",
                            prefix11_3 + e.target.value
                          );
                        }}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-2.5"
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* 12 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              12. ถนน/เส้นทางสาธารณะและการเดินทาง (สังเกตุและสอบถาม)
            </h3>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                12.1 ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่อยู่อาศัย (เลือกได้ 1
                ข้อ)
              </h3>

              <div className="flex flex-col ml-3 ">
                <div className="">
                  <input
                    name="house_access_road"
                    type="radio"
                    required
                    value="ไม่มีถนนเข้าถึงที่อยู่อาศัย"
                    checked={
                      formData.house_access_road ===
                      "ไม่มีถนนเข้าถึงที่อยู่อาศัย"
                    }
                    onChange={(e) => {
                      handleInputChange("house_access_road", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มีถนนเข้าถึงที่อยู่อาศัย
                  </label>
                </div>

                <div className="">
                  <input
                    name="house_access_road"
                    type="radio"
                    value="ถนนเข้าถึงที่อยู่อาศัยใช้การได้บางฤดูกาล"
                    checked={
                      formData.house_access_road ===
                      "ถนนเข้าถึงที่อยู่อาศัยใช้การได้บางฤดูกาล"
                    }
                    onChange={(e) => {
                      handleInputChange("house_access_road", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ถนนเข้าถึงที่อยู่อาศัยใช้การได้บางฤดูกาล
                  </label>
                </div>
                <div className="">
                  <input
                    name="house_access_road"
                    type="radio"
                    value="ถนนเข้าถึงที่อยู่อาศัยใช้การได้"
                    checked={
                      formData.house_access_road ===
                      "ถนนเข้าถึงที่อยู่อาศัยใช้การได้"
                    }
                    onChange={(e) => {
                      handleInputChange("house_access_road", e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ถนนเข้าถึงที่อยู่อาศัยใช้การได้
                  </label>
                </div>

                <div className="">
                  <input
                    name="house_access_road"
                    type="radio"
                    placeholder="มีการเดินทางรูปแบบอื่น (ระบุ)"
                    checked={formData.house_access_road.startsWith(prefix12)}
                    onChange={() => {
                      handleInputChange("house_access_road", prefix12);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มีการเดินทางรูปแบบอื่น
                  </label>
                  {formData.house_access_road.startsWith(prefix12) && (
                    <input
                      type="text"
                      placeholder="ระบุ"
                      value={
                        formData.house_access_road.startsWith(prefix12)
                          ? formData.house_access_road.slice(prefix12.length)
                          : formData.house_access_road
                      }
                      required
                      onChange={(e) => {
                        handleInputChange(
                          "house_access_road",
                          prefix12 + e.target.value
                        );
                      }}
                      className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-2.5"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="">
              <h3 className="text-black text-base font-bold py-2 mt-0 mx-3">
                12.2 ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่ทำกิน (เลือกได้ 1
                ข้อ)
              </h3>

              <div className="flex flex-col ml-3 ">
                <div className="">
                  <input
                    name="workplace_access_road"
                    type="radio"
                    required
                    value="ไม่มีถนนเข้าถึงที่ทำกิน"
                    checked={
                      formData.workplace_access_road ===
                      "ไม่มีถนนเข้าถึงที่ทำกิน"
                    }
                    onChange={(e) => {
                      handleInputChange(e.target.name, e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ไม่มีถนนเข้าถึงที่ทำกิน
                  </label>
                </div>

                <div className="">
                  <input
                    name="workplace_access_road"
                    type="radio"
                    value="ถนนเข้าถึงที่ทำกินใช้การได้บางฤดูกาล"
                    checked={
                      formData.workplace_access_road ===
                      "ถนนเข้าถึงที่ทำกินใช้การได้บางฤดูกาล"
                    }
                    onChange={(e) => {
                      handleInputChange(e.target.name, e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ถนนเข้าถึงที่ทำกินใช้การได้บางฤดูกาล
                  </label>
                </div>
                <div className="">
                  <input
                    name="workplace_access_road"
                    type="radio"
                    value="ถนนเข้าถึงที่ทำกินและใช้การได้"
                    checked={
                      formData.workplace_access_road ===
                      "ถนนเข้าถึงที่ทำกินและใช้การได้"
                    }
                    onChange={(e) => {
                      handleInputChange(e.target.name, e.target.value);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    ถนนเข้าถึงที่ทำกินและใช้การได้
                  </label>
                </div>

                <div className="">
                  <input
                    name="workplace_access_road"
                    type="radio"
                    value="มีการเดินทางรูปแบบอื่น"
                    checked={formData.workplace_access_road.startsWith(
                      prefix12
                    )}
                    onChange={(e) => {
                      handleInputChange(e.target.name, prefix12);
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="px-3 text-m font-medium leading-6 text-gray-900">
                    มีการเดินทางรูปแบบอื่น
                  </label>
                  {formData.workplace_access_road.startsWith(prefix12) && (
                    <input
                      type="text"
                      placeholder="ระบุ"
                      required
                      name="workplace_access_road"
                      value={
                        formData.workplace_access_road.startsWith(prefix12)
                          ? formData.workplace_access_road.slice(
                              prefix12.length
                            )
                          : formData.workplace_access_road
                      }
                      onChange={(e) => {
                        handleInputChange(
                          e.target.name,
                          prefix12 + e.target.value
                        );
                      }}
                      className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/7 p-2.5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* 13 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              13.ครัวเรือนของท่านรับรู้ข้อมูลข่าวสารของหน่วยงานราชการจากแหล่งใด
              (ตอบได้มากกว่า1ข้อ)
            </h3>

            <div className="ml-0">
              <div class="">
                <input
                  name="news"
                  type="checkbox"
                  value="ไม่ได้รับข่าวสาร"
                  checked={formData.news.includes("ไม่ได้รับข่าวสาร")}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  ไม่ได้รับข่าวสาร
                </label>
              </div>

              <div class="">
                <input
                  name="news"
                  type="checkbox"
                  checked={formData.news.includes("โทรทัศน์")}
                  value="โทรทัศน์"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  โทรทัศน์
                </label>
              </div>

              <div class="">
                <input
                  name="news"
                  type="checkbox"
                  checked={formData.news.includes("วิทยุ")}
                  value="วิทยุ"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  วิทยุ
                </label>
              </div>

              <div class="">
                <input
                  name="news"
                  type="checkbox"
                  checked={formData.news.includes("หนังสือพิมพ์")}
                  value="หนังสือพิมพ์"
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  หนังสือพิมพ์
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="วารสาร"
                  checked={formData.news.includes("วารสาร")}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  วารสาร
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="เว็บไซต์/Social media/กลุ่มไลน์"
                  checked={formData.news.includes(
                    "เว็บไซต์/Social media/กลุ่มไลน์"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  เว็บไซต์/Social media/กลุ่มไลน์
                </label>
              </div>

              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="ประชุมหมู่บ้าน"
                  checked={formData.news.includes("ประชุมหมู่บ้าน")}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  ประชุมหมู่บ้าน
                </label>
              </div>
              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="หอกระจายข่าวในหมู่บ้าน"
                  checked={formData.news.includes("หอกระจายข่าวในหมู่บ้าน")}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  หอกระจายข่าวในหมู่บ้าน
                </label>
              </div>
              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="เพื่อนบ้าน ญาติพี่น้อง ร้านค้าในหมู่บ้าน"
                  checked={formData.news.includes(
                    "เพื่อนบ้าน ญาติพี่น้อง ร้านค้าในหมู่บ้าน"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  เพื่อนบ้าน ญาติพี่น้อง ร้านค้าในหมู่บ้าน
                </label>
              </div>
              <div class="">
                <input
                  type="checkbox"
                  name="news"
                  value="ติดประกาศที่เทศบาล/อบต./หน่วยงาน"
                  checked={formData.news.includes(
                    "ติดประกาศที่เทศบาล/อบต./หน่วยงาน"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  ติดประกาศที่เทศบาล/อบต./หน่วยงาน
                </label>
              </div>
              <div class="">
                <input
                  name="news"
                  type="checkbox"
                  value="รถประชาสัมพันธ์ของหน่วยงาน/เจ้าหน้าที่หน่วยงานให้ข้อมูล"
                  checked={formData.news.includes(
                    "รถประชาสัมพันธ์ของหน่วยงาน/เจ้าหน้าที่หน่วยงานให้ข้อมูล"
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked
                    );
                  }}
                  class="w-4 h-4 text-blue-600 ml-3 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-m font-medium text-gray-900 dark:text-gray-300"
                >
                  รถประชาสัมพันธ์ของหน่วยงาน/เจ้าหน้าที่หน่วยงานให้ข้อมูล
                </label>
              </div>
            </div>
          </div>
          {/* 14 */}
          <div>
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              14.ครัวเรือนของท่านใช้เทคโนโลยีดิจิทัลในการขอรับสวัสดิการจากภาครัฐหรือไม่
              (เป๋าตัง / คนละครึ่ง หรือมาตรการอื่น ๆ)
            </h3>

            <div className="flex flex-row ">
              <div className="">
                <input
                  name="use_tech_get_benefit_gov"
                  type="radio"
                  required
                  value={false}
                  checked={formData.use_tech_get_benefit_gov === false}
                  onChange={(e) => {
                    handleInputChange("use_tech_get_benefit_gov", false);
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  ไม่ใช้
                </label>
              </div>
              <div className="px-10">
                <input
                  name="use_tech_get_benefit_gov"
                  type="radio"
                  value={true}
                  checked={formData.use_tech_get_benefit_gov === true}
                  onChange={(e) => {
                    handleInputChange("use_tech_get_benefit_gov", true);
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  ใช้
                </label>
              </div>
            </div>
          </div>
          {/* 15 */}
          <div className="my-10">
            <h3 className="text-black text-base font-bold py-2 mt-5 mb-2">
              15.ครัวเรือนของท่านได้รับประโยชน์ในการดำรงชีพและสร้างรายได้จากเทคโนโลยีดิจิทัลหรือไม่
              ( เช่น การขายสินค้าออนไลน์
              การใช้สื่ออิเล็กทรอนิกส์เพื่อการประกอบอาชีพ)
            </h3>

            <div className="flex flex-row ">
              <div className="">
                <input
                  name="benefit_form_tech"
                  type="radio"
                  required
                  checked={formData.benefit_form_tech === false}
                  value={false}
                  onChange={(e) => {
                    handleInputChange("benefit_form_tech", false);
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  ไม่ได้
                </label>
              </div>
              <div className="px-10">
                <input
                  name="benefit_form_tech"
                  type="radio"
                  value={true}
                  checked={formData.benefit_form_tech === true}
                  onChange={(e) => {
                    handleInputChange("benefit_form_tech", true);
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="px-3 text-m font-medium leading-6 text-gray-900">
                  ได้
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handlePrevPage()}
                className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3"
              >
                <Icon
                  icon="material-symbols:arrow-left-rounded"
                  width="25"
                  height="25"
                />
                ย้อนกลับ
              </button>

              <button
                type="submit"
                className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                หน้าถัดไป
                <Icon
                  icon="material-symbols:arrow-right-rounded"
                  width="25"
                  height="25"
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PhysicalCapital;
