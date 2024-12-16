import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";


function Naturalcapital({ setCurrentPage, setMainFormData, mainFormData }) {
  const [formData, setFormData] = useState({
    PBresourceforlive: [
      {
        is_use_PB_resoc: null,
        rescource: "",
        distanceKM: 0.0,
        description: "",
      },
    ],
    PBresourceforincome: [
      {
        is_use_PB_resoc: null,
        rescource: "",
        distanceKM: 0.0,
        description: "",
      },
    ],
  });

  // load data
  useEffect(() => {
    if (mainFormData.Naturalcapital) {
      setFormData((prevData) => ({
        ...prevData,
        PBresourceforlive: mainFormData.Naturalcapital.PBresourceforlive,
        PBresourceforincome: mainFormData.Naturalcapital.PBresourceforincome,
      }));
    }
  }, [mainFormData]);


  const validatePbforlive = (formData) => {
    const prefix = "อื่นๆ";

    // ตรวจสอบว่า PBresourceforlive มีการเลือก is_use_PB_resoc หรือไม่
    const isLiveSelected = formData.PBresourceforlive[0]?.is_use_PB_resoc !== null;
    if (!isLiveSelected) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะการใช้ประโยชน์จากทรัพยากรธรรมชาติ",
        text: "โปรดเลือกว่าครัวเรือนของท่านใช้ประโยชน์จากทรัพยากรธรรมชาติเพื่อการยังชีพหรือไม่",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    // ตรวจสอบข้อมูลในแต่ละรายการ
    if (formData.PBresourceforlive[0]?.is_use_PB_resoc) {
      for (let i = 0; i < formData.PBresourceforlive.length; i++) {
        const item = formData.PBresourceforlive[i];

        // ตรวจสอบว่าแหล่งทรัพยากรถูกระบุหรือไม่
        if (!item.rescource.trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุแหล่งทรัพยากร (รายการที่ ${i + 1})`,
            text: "กรุณากรอกชื่อแหล่งทรัพยากรในพื้นที่ที่ใช้ประโยชน์",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบว่า ระยะทางถูกระบุ และมีค่ามากกว่า 0
        if (!item.distanceKM || item.distanceKM <= 0) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุระยะห่าง (รายการที่ ${i + 1})`,
            text: "กรุณากรอกระยะห่างจากที่อยู่อาศัยเป็นตัวเลขที่มากกว่า 0",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบว่ามีคำอธิบายหรือไม่
        if (!item.description.trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุลักษณะการใช้ประโยชน์ (รายการที่ ${i + 1})`,
            text: "โปรดเลือกลักษณะการใช้ประโยชน์จากทรัพยากร",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบกรณี "อื่นๆ" ต้องกรอกข้อมูลเพิ่มเติม
        if (item.description.startsWith(prefix) && !item.description.replace(prefix, "").trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุคำอธิบายเพิ่มเติม (รายการที่ ${i + 1})`,
            text: "คุณได้เลือก 'อื่นๆ' โปรดกรอกคำอธิบายเพิ่มเติมในช่องข้อความ",
            confirmButtonText: "ตกลง",
          });
          return false;
        }
      }
    }

    // หากข้อมูลครบถ้วน
    return true;
  };

  const validatePbforincome = (formData) => {
    const isIncomeSelected = formData.PBresourceforincome[0]?.is_use_PB_resoc !== null;

    if (!isIncomeSelected) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกสถานะการใช้ประโยชน์จากทรัพยากรธรรมชาติ",
        text: "โปรดเลือกว่าครัวเรือนของท่านใช้ประโยชน์จากทรัพยากรธรรมชาติเพื่อสร้างรายได้หรือไม่",
        confirmButtonText: "ตกลง",
      });
      return false;
    }

    if (formData.PBresourceforincome[0]?.is_use_PB_resoc) {
      for (let i = 0; i < formData.PBresourceforincome.length; i++) {
        const item = formData.PBresourceforincome[i];

        // ตรวจสอบว่าแหล่งทรัพยากรถูกระบุหรือไม่
        if (!item.rescource.trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุแหล่งทรัพยากร (รายการที่ ${i + 1})`,
            text: "กรุณากรอกชื่อแหล่งทรัพยากรในพื้นที่ที่ใช้ประโยชน์",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบว่า ระยะทางถูกระบุ และมีค่ามากกว่า 0
        if (!item.distanceKM || item.distanceKM <= 0) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุระยะห่าง (รายการที่ ${i + 1})`,
            text: "กรุณากรอกระยะห่างจากที่อยู่อาศัยเป็นตัวเลขที่มากกว่า 0",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบว่ามีคำอธิบายหรือไม่
        if (!item.description.trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุลักษณะการใช้ประโยชน์ (รายการที่ ${i + 1})`,
            text: "โปรดเลือกลักษณะการใช้ประโยชน์จากทรัพยากร",
            confirmButtonText: "ตกลง",
          });
          return false;
        }

        // ตรวจสอบกรณี "อื่นๆ" ต้องกรอกข้อมูลเพิ่มเติม
        if (item.description.startsWith(prefix) && !item.description.replace(prefix, "").trim()) {
          Swal.fire({
            icon: "warning",
            title: `กรุณาระบุคำอธิบายเพิ่มเติม (รายการที่ ${i + 1})`,
            text: "คุณได้เลือก 'อื่นๆ' โปรดกรอกคำอธิบายเพิ่มเติมในช่องข้อความ",
            confirmButtonText: "ตกลง",
          });
          return false;
        }
      }
    }


    return true;
  };

  //next page
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePbforlive(formData)) {
      return; // หยุดการทำงานถ้าไม่ผ่านการตรวจสอบ
    }

    if (!validatePbforincome(formData)) {
      return; // หยุดการทำงานถ้าไม่ผ่านการตรวจสอบ
    }

    setMainFormData((prevData) => ({
      ...prevData,
      Naturalcapital: {
        ...prevData.Naturalcapital,
        ...formData,
      },
    }));
    setCurrentPage(6);
  };

  //prev page
  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      Naturalcapital: {
        ...prevData.Naturalcapital,
        ...formData,
      },
    }));

    setCurrentPage(4);
  };

  const prefix = "อื่นๆ";

  //ส่วน1.1
  const handlePBliveChange = (event) => {
    const { value } = event.target;
    const isUsePBResoc = value === "true"; // Convert string to boolean

    setFormData((prev) => ({
      ...prev,
      PBresourceforlive: [
        {
          ...prev.PBresourceforlive[0],
          is_use_PB_resoc: isUsePBResoc,
          rescource: isUsePBResoc
            ? "" // Clear the rescource value if true
            : "ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่", // Set default value if false
          distanceKM: isUsePBResoc ? prev.PBresourceforlive[0].distanceKM : 0.0, // Reset to default
          description: isUsePBResoc
            ? prev.PBresourceforlive[0].description
            : "", // Reset to default
        },
      ],
    }));
  };

  const handleResourceChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforlive];
      updatedResources[index] = {
        ...updatedResources[index],
        rescource: `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
      };
      return { ...prev, PBresourceforlive: updatedResources };
    });
  };

  const handledistanceKMChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforlive];
      updatedResources[index] = {
        ...updatedResources[index],
        distanceKM: parseFloat(value),
      };
      return { ...prev, PBresourceforlive: updatedResources };
    });
  };

  // ฟังก์ชันเก็บค่าจาก radio และ text input
  const handleDescriptionChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforlive];
      updatedResources[index] = {
        ...updatedResources[index],
        description: value,
      };
      return { ...prev, PBresourceforlive: updatedResources };
    });
  };

  const handleOtherDescriptionChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforlive];
      updatedResources[index] = {
        ...updatedResources[index],
        description: `${prefix} ${value.trim()}`,
      };
      return { ...prev, PBresourceforlive: updatedResources };
    });
  };

  const addDatalive = () => {
    setFormData((prev) => ({
      ...prev,
      PBresourceforlive: [
        ...prev.PBresourceforlive,
        {
          is_use_PB_resoc: true,
          rescource: "",
          distanceKM: 0.0,
          description: "",
        },
      ],
    }));
  };

  const removeDataLive = (index) => {
    setFormData((prev) => {
      // ถ้ามีมากกว่าหนึ่งรายการ
      if (prev.PBresourceforlive.length > 1) {
        const updatedResources = prev.PBresourceforlive.filter(
          (_, i) => i !== index
        );
        return { ...prev, PBresourceforlive: updatedResources };
      } else {
        // ไม่ให้ลบจนเหลือ 0 รายการ
        return prev;
      }
    });
  };

  //2
  const handlePBIncomeChange = (event) => {
    const { value } = event.target;
    const isUsePBResoc = value === "true"; // Convert string to boolean

    setFormData((prev) => ({
      ...prev,
      PBresourceforincome: [
        {
          ...prev.PBresourceforincome[0],
          is_use_PB_resoc: isUsePBResoc,
          rescource: isUsePBResoc
            ? "" // Clear the rescource value if true
            : "ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่", // Set default value if false
          distanceKM: isUsePBResoc
            ? prev.PBresourceforincome[0].distanceKM
            : 0.0, // Reset to default
          description: isUsePBResoc
            ? prev.PBresourceforincome[0].description
            : "", // Reset to default
        },
      ],
    }));
  };

  const handleResourceIncomeChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforincome];
      updatedResources[index] = {
        ...updatedResources[index],
        rescource: `ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ${value}`,
      };
      return { ...prev, PBresourceforincome: updatedResources };
    });
  };

  const handledistanceKMIncomeChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforincome];
      updatedResources[index] = {
        ...updatedResources[index],
        distanceKM: parseFloat(value),
      };
      return { ...prev, PBresourceforincome: updatedResources };
    });
  };

  const handleDescriptionIncomeChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforincome];
      updatedResources[index] = {
        ...updatedResources[index],
        description: value,
      };
      return { ...prev, PBresourceforincome: updatedResources };
    });
  };

  const handleOtherDescriptionIncomeChange = (event, index) => {
    const { value } = event.target;

    setFormData((prev) => {
      const updatedResources = [...prev.PBresourceforincome];
      updatedResources[index] = {
        ...updatedResources[index],
        description: `${prefix} ${value.trim()}`,
      };
      return { ...prev, PBresourceforincome: updatedResources };
    });
  };

  const addDataincome = () => {
    setFormData((prev) => ({
      ...prev,
      PBresourceforincome: [
        ...prev.PBresourceforincome,
        {
          is_use_PB_resoc: true,
          rescource: "",
          distanceKM: 0.0,
          description: "",
        },
      ],
    }));
  };

  const removeDataincome = (index) => {
    setFormData((prev) => {
      // ถ้ามีมากกว่าหนึ่งรายการ
      if (prev.PBresourceforincome.length > 1) {
        const updatedResources = prev.PBresourceforincome.filter(
          (_, i) => i !== index
        );
        return { ...prev, PBresourceforincome: updatedResources };
      } else {
        // ไม่ให้ลบจนเหลือ 0 รายการ
        return prev;
      }
    });
  };

  const handleShowData = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-gray-700 mb-5 mt-4">
          ส่วนที่ 4 ทรัพยากรธรรมชาติ และภัยพิบัติต่างๆ (ทุนทรัพยากรธรรมชาติ)
        </h1>
      </div>
      {/* 1 */}
      <div className="p-5 bg-blue-100 rounded-lg shadow-lg">
        <div className="Container">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-5">
              1. ครัวเรือนของท่านได้ใช้ประโยชน์จากทรัพยากรธรรมชาติในพื้นที่ เช่น
              ที่สาธารณะ ทุ่งหญ้า ป่า แม่น้ำ ลำธาร ชายฝั่งทะเล หรืออื่นๆ <br />
              <span className="text-red-500">เพื่อการยังชีพ</span>
              หรือไม่
              (กรณีมีหลายพื้นที่ให้ระบุชื่อแหล่งทรัพยากรและระยะทางระหว่างที่อยู่อาศัยกับแหล่ง
              ทรัพยากรธรรมชาติที่ได้ใช้ประโยชน์)
            </h2>
            {/* Radio Button Options with padding */}
            <div className="flex flex-col gap-2 pl-12">
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  id="is_use_PB_resoc_0"
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  name="is_use_PB_resoc"
                  checked={
                    formData.PBresourceforlive[0]?.is_use_PB_resoc === false
                  }
                  value={false}
                  onChange={handlePBliveChange}
                />
                <span className="ml-2">ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  id="is_use_PB_resoc_1"
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  name="is_use_PB_resoc"
                  checked={
                    formData.PBresourceforlive[0]?.is_use_PB_resoc === true
                  }
                  value={true}
                  onChange={handlePBliveChange}
                />
                <span className="ml-2">
                  ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร
                </span>
              </label>
            </div>

            {formData.PBresourceforlive[0]?.is_use_PB_resoc &&
              formData.PBresourceforlive.map((liveData, index) => (
                <div key={index} className="mt-4 pl-12">
                  <label className="flex items-center text-gray-700 ml-6">
                    <span className="text-lg font-bold">
                      {" "}
                      {/* เพิ่มขนาดและทำตัวหนา */}
                      ระบุแหล่งทรัพยากร{" "}
                      <span className="text-blue-600 text-xl">
                        {index + 1}
                      </span>{" "}
                      {/* เพิ่มสีและขนาดที่เด่นให้หมายเลข */}
                    </span>
                    <input
                      type="text"
                      placeholder="ระบุ..."
                      value={
                        liveData.rescource
                          ? liveData.rescource.replace(
                            "ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ",
                            ""
                          )
                          : ""
                      }
                      className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      onChange={(e) => handleResourceChange(e, index)}
                    />
                    <button
                      type="button"
                      onClick={() => removeDataLive(index)}
                      className="items-center py-3 px-6 ml-3 border border-transparent text-lg font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                    >
                      <Icon
                        icon="material-symbols:delete-forever-outline-rounded"
                        className="w-3 h-3"
                      />
                    </button>
                  </label>
                  <label className="flex items-center text-gray-700 mt-4 gap-2">
                    <span>ระยะห่างจากที่อยู่อาศัย</span>
                    <input
                      type="number"
                      placeholder="ระยะห่างจากที่อยู่อาศัย.."
                      value={liveData.distanceKM || ""}
                      className="px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      onChange={(e) => handledistanceKMChange(e, index)}
                    />
                    <span>กม. (เลือกได้ 1 ข้อ)</span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_0`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description_${index}`}
                      value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                      checked={
                        liveData.description ===
                        "สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                      }
                      onChange={(e) => handleDescriptionChange(e, index)}
                    />
                    <span className="ml-2">
                      สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล
                    </span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_1`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description_${index}`}
                      value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                      checked={
                        liveData.description ===
                        "สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                      }
                      onChange={(e) => handleDescriptionChange(e, index)}
                    />
                    <span className="ml-2">
                      สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา
                    </span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_2`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description_${index}`}
                      value={prefix}
                      checked={liveData.description.startsWith(prefix)}
                      onChange={(e) => handleDescriptionChange(e, index)}
                    />
                    <span className="ml-2">อื่นๆ</span>
                    {liveData.description.startsWith(prefix) && (
                      <input
                        type="text"
                        placeholder="ระบุ..."
                        value={liveData.description.replace(prefix, "")}
                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => handleOtherDescriptionChange(e, index)}
                      />
                    )}
                  </label>
                </div>
              ))}
          </div>
          <div className="mt-4 ml-45">
            <button
              className="flex bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
              onClick={addDatalive}
            >
              <Icon
                icon="material-symbols:add-circle-outline-rounded"
                className="mr-2 mt-0.5"
                width="20"
                height="20"
              />
              เพิ่มแหล่งทรัพยากร
            </button>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="p-5 bg-blue-100 rounded-lg shadow-lg mt-4">
        <div className="Container">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-5">
              2. ครัวเรือนของท่านได้ใช้ประโยชน์จากทรัพยากรธรรมชาติในพื้นที่ เช่น
              ที่สาธารณะ ทุ่งหญ้า ป่า แม่น้ำ ลำธาร ชายฝั่งทะเล หรืออื่นๆ <br />
              <span className="text-red-500">เพื่อสร้างรายได้</span>{" "}
              หรือไม่(กรณีมีหลายพื้นที่ให้ระบุชื่อแหล่งทรัพยากรและระยะทางระหว่างที่อยู่อาศัยกับแหล่ง{" "}
              <br />
              ทรัพยากรธรรมชาติที่ได้ใช้ประโยชน์)
            </h2>
            <div className="flex flex-col gap-2 pl-12">
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  id="is_use_PB_resoc_0"
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  name="is_use_PB_resoc2"
                  checked={
                    formData.PBresourceforincome[0]?.is_use_PB_resoc === false
                  }
                  value={false}
                  onChange={handlePBIncomeChange}
                />
                <span className="ml-2">ไม่ใช้ประโยชน์จากทรัพยากรในพื้นที่</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  id="is_use_PB_resoc_1"
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  name="is_use_PB_resoc2"
                  value={true}
                  checked={
                    formData.PBresourceforincome[0]?.is_use_PB_resoc === true
                  }
                  onChange={handlePBIncomeChange}
                />
                <span className="ml-2">
                  ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร
                </span>
              </label>
            </div>
            {formData.PBresourceforincome[0]?.is_use_PB_resoc && // ตรวจสอบว่า is_use_PB_resoc เป็น true
              formData.PBresourceforincome.map((incomeData, index) => (
                <div key={index} className="mt-4 pl-12">
                  <label className="flex items-center text-gray-700 ml-6">
                    <span className="text-lg font-bold">
                      {" "}
                      {/* เพิ่มขนาดและทำตัวหนา */}
                      ระบุแหล่งทรัพยากร{" "}
                      <span className="text-blue-600 text-xl">
                        {index + 1}
                      </span>{" "}
                      {/* เพิ่มสีและขนาดที่เด่นให้หมายเลข */}
                    </span>

                    <input
                      type="text"
                      placeholder="ระบุ..."
                      value={
                        incomeData.rescource
                          ? incomeData.rescource.replace(
                            "ใช้ประโยชน์จากทรัพยากรในพื้นที่ ระบุแหล่งทรัพยากร ",
                            ""
                          )
                          : ""
                      }
                      className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      onChange={(e) => handleResourceIncomeChange(e, index)}
                    />
                    <button
                      type="button"
                      onClick={() => removeDataincome(index)}
                      className="items-center py-3 px-6 ml-3 border border-transparent text-lg font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                    >
                      <Icon
                        icon="material-symbols:delete-forever-outline-rounded"
                        className="w-3 h-3"
                      />
                    </button>
                  </label>
                  <label className="flex items-center text-gray-700 mt-4 gap-2">
                    <span>ระยะห่างจากที่อยู่อาศัย</span>
                    <input
                      type="number"
                      placeholder="ระยะห่างจากที่อยู่อาศัย.."
                      value={incomeData.distanceKM || ""}
                      className="px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      onChange={(e) => handledistanceKMIncomeChange(e, index)}
                    />
                    <span>กม. (เลือกได้ 1 ข้อ)</span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_0`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description2_${index}`}
                      value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                      checked={
                        incomeData.description ===
                        "สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล"
                      }
                      onChange={(e) => handleDescriptionIncomeChange(e, index)}
                    />
                    <span className="ml-2">
                      สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้บางฤดูกาล
                    </span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_1`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description2_${index}`}
                      value="สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                      checked={
                        incomeData.description ===
                        "สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา"
                      }
                      onChange={(e) => handleDescriptionIncomeChange(e, index)}
                    />
                    <span className="ml-2">
                      สามารถเข้าใช้ประโยชน์เพื่อสร้างรายได้ตลอดเวลา
                    </span>
                  </label>
                  <label className="flex items-center text-gray-700 pl-12 mt-4">
                    <input
                      type="radio"
                      id={`description_${index}_2`}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      name={`description2_${index}`}
                      value={prefix}
                      checked={incomeData.description.startsWith(prefix)}
                      onChange={(e) => handleDescriptionIncomeChange(e, index)}
                    />
                    <span className="ml-2">อื่นๆ</span>
                    {incomeData.description.startsWith(prefix) && (
                      <input
                        type="text"
                        placeholder="ระบุ..."
                        value={incomeData.description.replace(prefix, "")}
                        className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) =>
                          handleOtherDescriptionIncomeChange(e, index)
                        }
                      />
                    )}
                  </label>
                </div>
              ))}
          </div>
          <div className="mt-4 ml-45">
            <button
              className="flex  bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
              onClick={addDataincome}
            >
              <Icon
                icon="material-symbols:add-circle-outline-rounded"
                className="mr-2 mt-0.5"
                width="20"
                height="20"
              />
              เพิ่มแหล่งทรัพยากร
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <button
          type="button"
          className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-3"
          onClick={(e) => handlePrevPage()}
        >
          <Icon
            icon="material-symbols:arrow-left-rounded"
            width="25"
            height="25"
          />
          ย้อนกลับ
        </button>

        <button
          type="button"
          className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          onClick={(e) => handleSubmit(e)}
        >
          หน้าถัดไป
          <Icon
            icon="material-symbols:arrow-right-rounded"
            width="25"
            height="25"
          />
        </button>
      </div>
    </>
  );
}

export default Naturalcapital;
