import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
function Financialcapital({ setCurrentPage, setMainFormData, mainFormData }) {
  const [formData, setFormData] = useState({
    Agriculturalincome: [
      {
        plants: [],
        livestock: [],
        fishing: [],
      },
    ],
    NonAGIincome: [
      // {
      //     income_type: " ",
      //     amount_per_yaer: 0.0,
      //     cost_per_year: 0.0,
      // }
    ],
    Householdexpenses: [
      // {
      //     expenses_type: " ",
      //     amount_per_month: 0.0,
      // }
    ],
    Saving: [
      {
        is_has_saving: null,
        saving_type: " ",
        amount: 0.0,
      },
    ],
    Occupationalproperty: [
      {
        property_type: [],
        is_has_property: null,
      },
    ],
    Debt: [
      {
        is_has_debt: null,
        description: " ",
      },
    ],
    Creditsources: [],
  });

  //load data
  useEffect(() => {
    if (mainFormData.Financialcapital) {
      setFormData(mainFormData.Financialcapital);
    }
  }, [mainFormData]);

  //Next page
  const handleSave = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      Financialcapital: formData,
    }));
    setCurrentPage(5);
  };

  const handlePrevPage = () => {
    setMainFormData((prevData) => ({
      ...prevData,
      Financialcapital: formData,
    }));
    setCurrentPage(3);
  };

  const [isOtherChecked, setIsOtherChecked] = useState({});

  //1
  const Prefixplant2 = "ทำสวนผัก";
  const Prefixplant = "ทำสวนผลไม้";
  const Prefixlivestock = "อื่นๆ (กบ/ปู/ปลิง/ผึ้ง)";

  // ฟังก์ชันสำหรับจัดการการเลือก checkbox
  const handleCheckboxChange = (category, field, value, checked) => {
    setFormData((prevData) => {
      const updatedFieldData = [...prevData[category][0][field]];

      if (checked) {
        if (!updatedFieldData.includes(value)) {
          updatedFieldData.push(value);
        }
      } else {
        const index = updatedFieldData.indexOf(value);
        if (index > -1) {
          updatedFieldData.splice(index, 1);
        }
      }

      return {
        ...prevData,
        [category]: [
          {
            ...prevData[category][0],
            [field]: updatedFieldData,
          },
        ],
      };
    });
  };

  // ฟังก์ชันสำหรับจัดการ checkbox "อื่น ๆ"
  const handleOtherCheckboxChange = (e, category, field, valuePrefix) => {
    const { id, checked } = e.target;
    setIsOtherChecked((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    if (!checked) {
      setFormData((prevData) => {
        const filteredFieldData = prevData[category][0][field].filter(
          (item) => !item.startsWith(valuePrefix)
        );

        return {
          ...prevData,
          [category]: [
            {
              ...prevData[category][0],
              [field]: filteredFieldData,
            },
          ],
        };
      });
    }
  };

  const handleOtherPlantChange = (prefix) => (e) => {
    const { checked } = e.target;
    setIsOtherChecked((prevState) => ({
      ...prevState,
      [prefix]: checked,
    }));

    setFormData((prevState) => {
      const updatedPlants = [...prevState.Agriculturalincome[0].plants];

      if (checked) {
        // ถ้า checkbox ถูกเลือกและยังไม่มีใน array ให้เพิ่ม
        if (!updatedPlants.some((plant) => plant.startsWith(prefix))) {
          updatedPlants.push(prefix);
        }
      } else {
        // ถ้า checkbox ถูกยกเลิกให้ลบค่าออก
        const index = updatedPlants.findIndex((plant) =>
          plant.startsWith(prefix)
        );
        if (index !== -1) {
          updatedPlants.splice(index, 1);
        }
      }

      return {
        ...prevState,
        Agriculturalincome: [
          {
            ...prevState.Agriculturalincome[0],
            plants: updatedPlants,
          },
        ],
      };
    });
  };

  const handlePlantInputChange = (prefix, value) => {
    setFormData((prevState) => {
      const updatedPlants = [...prevState.Agriculturalincome[0].plants];

      const index = updatedPlants.findIndex((plant) =>
        plant.startsWith(prefix)
      );
      if (index !== -1) {
        // อัปเดตค่าใหม่พร้อมเว้นวรรค
        updatedPlants[index] = `${prefix} ${value}`; // เพิ่มช่องว่างระหว่าง prefix และ value
      }
      return {
        ...prevState,
        Agriculturalincome: [
          {
            ...prevState.Agriculturalincome[0],
            plants: updatedPlants,
          },
        ],
      };
    });
  };

  const handleOtherLivestock = (prefix) => (e) => {
    const { checked } = e.target;
    setIsOtherChecked((prevState) => ({
      ...prevState,
      [prefix]: checked,
    }));
    setFormData((prevState) => {
      const updatedLivestock = [...prevState.Agriculturalincome[0].livestock];

      if (checked) {
        // ตรวจสอบว่า prefix อยู่ใน array หรือยัง
        if (
          !updatedLivestock.some((livestock) => livestock.startsWith(prefix))
        ) {
          updatedLivestock.push(prefix); // เพิ่ม prefix หากยังไม่มี
        }
      } else {
        const index = updatedLivestock.findIndex((livestock) =>
          livestock.startsWith(prefix)
        );
        if (index !== -1) {
          updatedLivestock.splice(index, 1); // ลบ prefix หากยกเลิกการเลือก
        }
      }

      return {
        ...prevState,
        Agriculturalincome: [
          {
            ...prevState.Agriculturalincome[0],
            livestock: updatedLivestock,
          },
        ],
      };
    });
  };

  const handleLivestockInputChange = (prefix, value) => {
    setFormData((prevState) => {
      const updatedLivestock = [...prevState.Agriculturalincome[0].livestock];

      const index = updatedLivestock.findIndex((livestock) =>
        livestock.startsWith(prefix)
      );
      if (index !== -1) {
        updatedLivestock[index] = `${prefix} ${value}`;
      }
      return {
        ...prevState,
        Agriculturalincome: [
          {
            ...prevState.Agriculturalincome[0],
            livestock: updatedLivestock,
          },
        ],
      };
    });
  };

  //ข้อ 2
  const prefixIncomeType = "รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่";
  const prefixIncomeType2 = "รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่";
  // Handler function for managing Non-AGI income checkbox changes
  const handleNonAGIincomeCheckboxChange = (e, incomeType) => {
    const { checked } = e.target; // ดึง `checked` จาก event target

    // อัปเดตสถานะการเลือกของ checkbox ใน state `isOtherChecked`
    setIsOtherChecked((prevState) => ({
      ...prevState,
      [incomeType]: checked, // ใช้ incomeType แทน id
    }));

    // อัปเดตข้อมูลใน state `formData`
    setFormData((prevData) => {
      const existingIndex = prevData.NonAGIincome.findIndex(
        (item) => item.income_type === incomeType
      );

      if (checked) {
        if (existingIndex === -1) {
          // หากไม่มีข้อมูลใน NonAGIincome เพิ่มข้อมูลใหม่
          return {
            ...prevData,
            NonAGIincome: [
              ...prevData.NonAGIincome,
              { income_type: incomeType, amount_per_year: 0, cost_per_year: 0 }, // ข้อมูลเริ่มต้น
            ],
          };
        }
      } else {
        if (existingIndex > -1) {
          const updatedNonAGIincome = [...prevData.NonAGIincome];
          updatedNonAGIincome.splice(existingIndex, 1); // ลบข้อมูลออกจาก NonAGIincome
          return { ...prevData, NonAGIincome: updatedNonAGIincome };
        }
      }

      return prevData; // ถ้าไม่มีการเปลี่ยนแปลงให้คืนค่า state เดิม
    });
  };
  // Handler function for updating numerical fields in Non-AGI income
  const updateNonAGIincomeFields = (incomeType, field, value) => {
    setFormData((prevData) => {
      // คัดลอก array `NonAGIincome` จาก state เดิม
      const updatedNonAGIincome = [...prevData.NonAGIincome];

      // ค้นหาตำแหน่งใน array ที่มี `income_type` ตรงกับ `incomeType`
      const index = updatedNonAGIincome.findIndex(
        (item) => item.income_type === incomeType
      );

      if (index !== -1) {
        // หากพบรายการที่ตรงกัน อัปเดตค่าของฟิลด์ที่ระบุ (เช่น `amount_per_year` หรือ `cost_per_year`)
        updatedNonAGIincome[index][field] = parseFloat(value); // แปลงค่าเป็นตัวเลขแบบ float ก่อนเก็บ
      }

      // คืนค่า state ใหม่ที่มีการอัปเดต array `NonAGIincome`
      return { ...prevData, NonAGIincome: updatedNonAGIincome };
    });
  };

  //3
  const prefixExperss1 =
    "ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม";
  const prefixExperss2 =
    "ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง พลังงาน) รวม";
  const prefixExperss3 =
    "ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม";
  const prefixExperss4 =
    "ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม";
  const prefixExperss5 = "ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม";
  const prefixExperss6 =
    "ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ (ประกันชีวิต/ประกันรถยนต์/ประกันอุบัติเหตุ/ประกันอัคคีภัย) รวม";
  const prefixExperss7 =
    "ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา บริจาค รวม";
  const prefixExperss8 = "ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม";
  const prefixExperss9 = "ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม";
  const prefixExperss10 =
    "ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง บุหรี่ ยาสูบ รวม";
  const prefixExperss11 = "ค่าใช้จ่ายอื่น ๆ (ระบุ)";

  const handleHouseholdChange = (e) => {
    const { checked, value } = e.target;

    setIsOtherChecked((prevState) => ({
      ...prevState,
      [value]: checked, // ใช้ `value` เป็น key ใน state
    }));

    setFormData((prevData) => {
      const existingIndex = prevData.Householdexpenses.findIndex(
        (item) => item.expenses_type === value
      );

      if (checked) {
        // เพิ่มค่าใหม่เมื่อ checkbox ถูกเลือก
        if (existingIndex === -1) {
          return {
            ...prevData,
            Householdexpenses: [
              ...prevData.Householdexpenses,
              { expenses_type: value, amount_per_month: 0 },
            ],
          };
        }
      } else {
        // ลบค่าเมื่อ checkbox ถูกยกเลิก
        if (existingIndex > -1) {
          const updatedHouseholdexpenses = [...prevData.Householdexpenses];
          updatedHouseholdexpenses.splice(existingIndex, 1);
          return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
        }
      }
      return prevData; // ไม่มีการเปลี่ยนแปลง
    });
  };

  const handletInputHouseholdChange = (expenses_type, field, value) => {
    setFormData((prevData) => {
      const updatedHouseholdexpenses = [...prevData.Householdexpenses];
      const index = updatedHouseholdexpenses.findIndex(
        (item) => item.expenses_type === expenses_type
      );

      if (index !== -1) {
        // อัปเดตค่าฟิลด์ที่ระบุ
        updatedHouseholdexpenses[index][field] = parseFloat(value) || 0;
      }

      return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
    });
  };

  const handletOrtherInputHouseholdChange = (value) => {
    setFormData((prevData) => {
      const updatedHouseholdexpenses = [...prevData.Householdexpenses];
      const index = updatedHouseholdexpenses.findIndex((item) =>
        item.expenses_type.startsWith(prefixExperss11)
      );

      if (index !== -1) {
        updatedHouseholdexpenses[
          index
        ].expenses_type = `${prefixExperss11} ${value}`;
      }

      return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
    });
  };

  const handleOtherExpenseChange = (e) => {
    const value = parseFloat(e.target.value) || 0; // Ensure value is a number
    setFormData((prevData) => {
      const updatedHouseholdexpenses = [...prevData.Householdexpenses];
      const index = updatedHouseholdexpenses.findIndex((item) =>
        item.expenses_type.startsWith(prefixExperss11)
      );

      if (index !== -1) {
        updatedHouseholdexpenses[index].amount_per_month = value;
      }

      return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
    });
  };

  const handleOtherCheckboxClear = (event) => {
    const isChecked = event.target.checked;
    setFormData((prevData) => {
      const updatedHouseholdexpenses = [...prevData.Householdexpenses];
      const index = updatedHouseholdexpenses.findIndex((item) =>
        item.expenses_type.startsWith(prefixExperss11)
      );

      if (isChecked) {
        if (index === -1) {
          updatedHouseholdexpenses.push({
            expenses_type: prefixExperss11,
            amount_per_month: 0,
          });
        }
      } else {
        if (index !== -1) {
          updatedHouseholdexpenses.splice(index, 1);
        }
      }

      return { ...prevData, Householdexpenses: updatedHouseholdexpenses };
    });
  };

  //4
  const prefixSaving = "การออมอื่นๆ";
  const handleSavingChange = (event) => {
    const { name, value } = event.target;
    setIsOtherChecked({});
    if (name === "is_has_saving" && value === "false") {
      setFormData((prevData) => ({
        ...prevData,
        Saving: [
          {
            is_has_saving: false,
            saving_type: "",
            amount: 0.0,
          },
        ],
      }));
    }
  };

  const handleRadio1Change = (event) => {
    const { id } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      Saving: [
        // {
        //     is_has_saving: true,
        //     saving_type: " ",
        //     amount: 0.0,
        // }
      ], // รีเซ็ตข้อมูลใน Saving ให้ว่าง
    }));
    setIsOtherChecked((prev) => ({
      ...prev,
      [id]: event.target.checked,
    }));
  };

  const handleSavingCheckBoxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedSaving = [...prevFormData.Saving];
      if (checked) {
        // เพิ่มข้อมูลในกรณีที่เลือก checkbox
        updatedSaving.push({
          is_has_saving: true,
          saving_type: value,
          amount: 0.0,
        });
      } else {
        // ลบข้อมูลในกรณีที่ยกเลิกการเลือก checkbox
        return {
          ...prevFormData,
          Saving: updatedSaving.filter((item) => item.saving_type !== value),
        };
      }

      return {
        ...prevFormData,
        Saving: updatedSaving,
      };
    });
  };

  const handleAmountChange = (e, savingType) => {
    const { value } = e.target;

    setFormData((prevFormData) => {
      const updatedSaving = prevFormData.Saving.map((item) =>
        item.saving_type === savingType
          ? {
              ...item,
              amount: parseFloat(value) || 0.0, // เก็บค่า amount เป็นตัวเลข
            }
          : item
      );
      return {
        ...prevFormData,
        Saving: updatedSaving,
      };
    });
  };

  //
  const handleOtherSavingChange = (e) => {
    const { checked } = e.target;

    setFormData((prevFormData) => {
      const updatedSaving = [...prevFormData.Saving];

      if (checked) {
        // Add the new entry with empty saving_type to allow input
        updatedSaving.push({
          is_has_saving: true,
          saving_type: prefixSaving + " ", // Add a space instead of a hyphen
          amount: 0.0,
        });
      } else {
        // Remove the saving type for "อื่น ๆ" from the array
        return {
          ...prevFormData,
          Saving: updatedSaving.filter(
            (item) => !item.saving_type.startsWith(prefixSaving)
          ),
        };
      }

      return {
        ...prevFormData,
        Saving: updatedSaving,
      };
    });
  };

  const handleOtherInputSavingChange = (e) => {
    const { value } = e.target;

    setFormData((prevFormData) => {
      const updatedSaving = prevFormData.Saving.map((item) =>
        item.saving_type.startsWith(prefixSaving)
          ? {
              ...item,
              saving_type: prefixSaving + " " + value, // Update the saving_type based on input
            }
          : item
      );

      return {
        ...prevFormData,
        Saving: updatedSaving,
      };
    });
  };

  const handleOtherAmount = (e, savingType) => {
    const { value } = e.target;

    setFormData((prevFormData) => {
      const updatedSaving = prevFormData.Saving.map((item) =>
        item.saving_type.startsWith(savingType) // Ensure we're updating the correct item
          ? {
              ...item,
              amount: parseFloat(value) || 0.0, // Update amount, default to 0 if invalid input
            }
          : item
      );

      return {
        ...prevFormData,
        Saving: updatedSaving,
      };
    });
  };

  //5
  const prefixCredit = "แหล่งอื่น ๆ";
  const prefixCredit2 =
    "กองทุนหมู่บ้าน/กองทุนเงินล้าน/โครงการแก้ไขปัญหาความยากจน (กขคจ.)";

  const handleDebtChange = (event) => {
    const value = event.target.value === "true" ? true : false;

    setFormData((prevData) => {
      let updatedFormData = { ...prevData };

      // ถ้า value เป็น true เคลียร์ค่าใน description
      if (value === true) {
        updatedFormData.Debt[0].description = " "; // เคลียร์ค่าใน description
      }

      // ถ้า value เป็น false เคลียร์ค่าใน form และ outstanding_amount
      if (value === false) {
        updatedFormData.Creditsources = []; // เคลียร์ Creditsources ทั้งหมด
      }

      return {
        ...updatedFormData,
        Debt: [{ ...updatedFormData.Debt[0], is_has_debt: value }],
      };
    });
  };

  const handleOutstandingAmountChange = (value, creditSource) => {
    setFormData((prevFormData) => {
      const updatedCreditsources = prevFormData.Creditsources.map((item) =>
        item.form === creditSource
          ? { ...item, outstanding_amount: parseFloat(value) }
          : item
      );
      return { ...prevFormData, Creditsources: updatedCreditsources };
    });
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    const prefix = "อื่น ๆ"; // ค่าที่ต้องการตรวจสอบ

    setFormData((prevData) => {
      // ถ้า value ตรงกับ prefix "อื่น ๆ" ให้ทำงานต่อ
      if (value === prefix) {
        return {
          ...prevData,
          Debt: [{ ...prevData.Debt[0], description: value }],
        };
      }

      // ถ้า value ไม่ตรงกับ prefix "อื่น ๆ", จะทำการอัพเดต description โดยไม่มีการส่ง description_3
      return {
        ...prevData,
        Debt: [{ ...prevData.Debt[0], description: value }],
      };
    });
  };

  const handleOtherDescriptionChange = (event) => {
    const value = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      Debt: [{ ...prevData.Debt[0], description: `อื่น ๆ: ${value}` }],
    }));
  };

  const handleCreditSourceChange = (e, amount) => {
    const { checked, value, id } = e.target;

    setFormData((prevFormData) => {
      let updatedCreditsources = [...prevFormData.Creditsources];

      if (checked) {
        updatedCreditsources.push({
          form: value,
          outstanding_amount: amount || 0, // เก็บจำนวนเงินที่คงค้าง
        });
      } else {
        // Remove credit source and reset outstanding amount
        updatedCreditsources = updatedCreditsources.filter(
          (item) => item.form !== value
        );

        // Reset the specific amount input field based on checkbox id
        const amountFieldId = `outstanding_amount_${id.split("_")[1]}`;
        document.getElementById(amountFieldId).value = "";
      }

      return {
        ...prevFormData,
        Creditsources: updatedCreditsources,
      };
    });
  };

  const handleOtherFormChange = (e, prefixCredit) => {
    const { checked } = e.target;

    setFormData((prevState) => {
      const updatedCreditsources = checked
        ? [
            ...prevState.Creditsources,
            { form: `${prefixCredit} `, outstanding_amount: "" },
          ]
        : prevState.Creditsources.filter(
            (item) => !item.form.startsWith(prefixCredit)
          );

      return { ...prevState, Creditsources: updatedCreditsources };
    });
  };

  const handleOtherInputChange = (e, prefixCredit) => {
    const value = e.target.value;

    setFormData((prevState) => {
      const updatedCreditsources = prevState.Creditsources.map((group) =>
        group.form.startsWith(prefixCredit)
          ? { ...group, form: `${prefixCredit} ${value}` }
          : group
      );

      return { ...prevState, Creditsources: updatedCreditsources };
    });
  };

  const handleOtherOutstandingAmount = (prefixCredit, value) => {
    setFormData((prevState) => {
      const updatedCreditsources = prevState.Creditsources.map((group) =>
        group.form.startsWith(prefixCredit)
          ? { ...group, outstanding_amount: parseFloat(value) || 0 }
          : group
      );

      return { ...prevState, Creditsources: updatedCreditsources };
    });
  };

  //6
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    const isChecked = value === "true"; // Convert string "true"/"false" to boolean

    setFormData((prevData) => ({
      ...prevData,
      Occupationalproperty: prevData.Occupationalproperty.map((item) => ({
        ...item,
        [name]: isChecked,
        property_type: isChecked ? item.property_type : [], // Reset property_type if false
      })),
    }));
  };

  const handleOtherProperty = (prefix) => (e) => {
    const { checked } = e.target;
    setIsOtherChecked((prevState) => ({
      ...prevState,
      [prefix]: checked,
    }));
    setFormData((prevState) => {
      const updatedProperty = [
        ...prevState.Occupationalproperty[0].property_type,
      ];

      if (checked) {
        // ตรวจสอบว่า prefix อยู่ใน array หรือยัง
        if (
          !updatedProperty.some((property_type) =>
            property_type.startsWith(prefix)
          )
        ) {
          updatedProperty.push(prefix); // เพิ่ม prefix หากยังไม่มี
        }
      } else {
        const index = updatedProperty.findIndex((property_type) =>
          property_type.startsWith(prefix)
        );
        if (index !== -1) {
          updatedProperty.splice(index, 1); // ลบ prefix หากยกเลิกการเลือก
        }
      }

      return {
        ...prevState,
        Occupationalproperty: [
          {
            ...prevState.Occupationalproperty[0],
            property_type: updatedProperty,
          },
        ],
      };
    });
  };

  const handlePropertyInputChange = (prefix, value) => {
    setFormData((prevState) => {
      const updatedProperty = [
        ...prevState.Occupationalproperty[0].property_type,
      ];

      const index = updatedProperty.findIndex((property_type) =>
        property_type.startsWith(prefix)
      );
      if (index !== -1) {
        updatedProperty[index] = `${prefix} ${value}`;
      }
      return {
        ...prevState,
        Occupationalproperty: [
          {
            ...prevState.Occupationalproperty[0],
            property_type: updatedProperty,
          },
        ],
      };
    });
  };

  const prefix = "อื่น ๆ";

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
        <div className="Container">
          <h1 className="text-xl font-bold text-gray-700 mb-5">
            ส่วนที่ 3 สภาพพื้นฐานทางเศรษฐกิจ (ทุนการเงิน)
          </h1>

          {/* Section 1.1: รายได้จากการเกษตร */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-5 ">
              1. รายได้จากการเกษตรของครัวเรือนมาจากอะไร (ตอบได้มากกว่า 1 ข้อ)
            </h2>
            <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">
              1.1) พืชเกษตร
            </h3>
            <div className="pl-10">
              {/* 1 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_0"
                  value="ไม่ได้เพาะปลูกพืชเกษตร"
                  checked={formData.Agriculturalincome[0].plants.includes(
                    "ไม่ได้เพาะปลูกพืชเกษตร"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "plants",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  {" "}
                  0) ไม่ได้เพาะปลูกพืชเกษตร
                </label>
              </div>
              {/* 2 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_1"
                  value="ทำนา"
                  checked={formData.Agriculturalincome[0].plants.includes(
                    "ทำนา"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "plants",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  {" "}
                  1) ทำนา
                </label>
              </div>
              {/* 3 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_2"
                  checked={formData.Agriculturalincome[0].plants.some((plant) =>
                    plant.startsWith(Prefixplant2)
                  )}
                  onChange={handleOtherPlantChange(Prefixplant2)}
                />
                <label htmlFor="plants_2" className="font text-gray-700">
                  2) ทำสวนผัก
                </label>
                {formData.Agriculturalincome[0].plants.some((plant) =>
                  plant.startsWith(Prefixplant2)
                ) && (
                  <input
                    type="text"
                    placeholder="ระบุ..."
                    className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={
                      formData.Agriculturalincome[0].plants
                        .find((plant) => plant.startsWith(Prefixplant2))
                        ?.slice(Prefixplant2.length + 1) || "" // +1 เพื่อลบช่องว่างที่เพิ่มไว้
                    }
                    onChange={(e) =>
                      handlePlantInputChange(Prefixplant2, e.target.value)
                    }
                  />
                )}
              </div>
              {/* 4 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_3"
                  checked={formData.Agriculturalincome[0].plants.some((plant) =>
                    plant.startsWith(Prefixplant)
                  )}
                  onChange={handleOtherPlantChange(Prefixplant)}
                />
                <label htmlFor="plants_3" className="font text-gray-700">
                  3) ทำสวนผลไม้
                </label>
                {formData.Agriculturalincome[0].plants.some((plant) =>
                  plant.startsWith(Prefixplant)
                ) && (
                  <input
                    type="text"
                    placeholder="ระบุ..."
                    className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={
                      formData.Agriculturalincome[0].plants
                        .find((plant) => plant.startsWith(Prefixplant))
                        ?.slice(Prefixplant.length + 1) || ""
                    }
                    onChange={(e) =>
                      handlePlantInputChange(Prefixplant, e.target.value)
                    }
                  />
                )}
              </div>
              {/* 5 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_4"
                  value="พืชอื่นๆ เช่น มันสำปะหลัง อ้อย ถั่วเหลือง ถั่วลิสง ฯลฯ"
                  checked={formData.Agriculturalincome[0].plants.includes(
                    "พืชอื่นๆ เช่น มันสำปะหลัง อ้อย ถั่วเหลือง ถั่วลิสง ฯลฯ"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "plants",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  {" "}
                  4) พืชอื่นๆ เช่น มันสำปะหลัง อ้อย ถั่วเหลือง ถั่วลิสง ฯลฯ
                </label>
              </div>
              {/* 6 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="plants"
                  id="plants_5"
                  value="อื่นๆ เช่น ชา กาแฟ ยางพารา ปาล์มน้ำมัน ฯลฯ"
                  checked={formData.Agriculturalincome[0].plants.includes(
                    "อื่นๆ เช่น ชา กาแฟ ยางพารา ปาล์มน้ำมัน ฯลฯ"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "plants",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  {" "}
                  5) อื่นๆ เช่น ชา กาแฟ ยางพารา ปาล์มน้ำมัน ฯลฯ
                </label>
              </div>
            </div>
          </div>

          {/* Section 1.2: ปศุสัตว์ */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">
              1.2) ปศุสัตว์
            </h3>
            <div className="pl-10">
              {/* 1 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="livestock"
                  id="livestock_0"
                  value="ไม่ได้ทำปศุสัตว์"
                  checked={formData.Agriculturalincome[0].livestock.includes(
                    "ไม่ได้ทำปศุสัตว์"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "livestock",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  0) ไม่ได้ทำปศุสัตว์
                </label>
              </div>
              {/* 2 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="livestock"
                  id="livestock_1"
                  value="เลี้ยงสัตว์บก (เช่น โค/กระบือ)"
                  checked={formData.Agriculturalincome[0].livestock.includes(
                    "เลี้ยงสัตว์บก (เช่น โค/กระบือ)"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "livestock",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  1) เลี้ยงสัตว์บก (เช่น โค/กระบือ)
                </label>
              </div>
              {/* 3 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="livestock"
                  id="livestock_2"
                  value="หมู/ไก่/เป็ด/อื่นๆ"
                  checked={formData.Agriculturalincome[0].livestock.includes(
                    "หมู/ไก่/เป็ด/อื่นๆ"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "livestock",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  2) หมู/ไก่/เป็ด/อื่นๆ
                </label>
              </div>
              {/* 4 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="livestock"
                  id="livestock_3"
                  value="ทำฟาร์มสัตว์น้ำ เช่น ปลา/กุ้ง"
                  checked={formData.Agriculturalincome[0].livestock.includes(
                    "ทำฟาร์มสัตว์น้ำ เช่น ปลา/กุ้ง"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "livestock",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  3) ทำฟาร์มสัตว์น้ำ เช่น ปลา/กุ้ง
                </label>
              </div>
              {/* 5 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  name="livestock"
                  id="livestock_4"
                  checked={formData.Agriculturalincome[0].livestock.some(
                    (livestock) => livestock.startsWith(Prefixlivestock)
                  )}
                  onChange={handleOtherLivestock(Prefixlivestock)}
                  //handleOtherLivestock ,handleLivestockInputChange
                />
                <label htmlFor="" className="font text-gray-700">
                  4) อื่นๆ (กบ/ปู/ปลิง/ผึ้ง)
                </label>
                {formData.Agriculturalincome[0].livestock.some((livestock) =>
                  livestock.startsWith(Prefixlivestock)
                ) && (
                  <input
                    type="text"
                    placeholder="ระบุ..."
                    className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={
                      formData.Agriculturalincome[0].livestock
                        .find((livestock) =>
                          livestock.startsWith(Prefixlivestock)
                        )
                        ?.slice(Prefixlivestock.length + 1) || "" // +1 เพื่อลบช่องว่างที่เพิ่มไว้
                    }
                    onChange={(e) =>
                      handleLivestockInputChange(
                        Prefixlivestock,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 1.3: ปศุสัตว์ */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5 pl-5">
              1.3) ประมงค์
            </h3>
            <div className="pl-10">
              {/* 1 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="fishing"
                  id="fishing_0"
                  className="mr-2 rounded"
                  value="ไม่ได้ทำประมงค์"
                  checked={formData.Agriculturalincome[0].fishing.includes(
                    "ไม่ได้ทำประมงค์"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "fishing",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  0) ไม่ได้ทำประมงค์
                </label>
              </div>
              {/* 2 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="fishing"
                  id="fishing_1"
                  className="mr-2 rounded"
                  value="ประมงน้ำเค็ม"
                  checked={formData.Agriculturalincome[0].fishing.includes(
                    "ประมงน้ำเค็ม"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "fishing",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  1) ประมงน้ำเค็ม
                </label>
              </div>
              {/* 3 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="fishing"
                  id="fishing_2"
                  className="mr-2 rounded"
                  value="ประมงน้ำจืด"
                  checked={formData.Agriculturalincome[0].fishing.includes(
                    "ประมงน้ำจืด"
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "Agriculturalincome",
                      "fishing",
                      e.target.value,
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="" className="font text-gray-700">
                  2) ประมงน้ำจืด
                </label>
              </div>
            </div>
          </div>

          {/* Section 2 รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)*/}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5 ">
              2. รายได้ที่นอกภาคการเกษตร (เฉลี่ย/ปี)
            </h3>
            <div className="pl-10">
              {/* 1 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="income_type_0"
                  name="income_type"
                  className="mr-2 rounded"
                  checked={formData.NonAGIincome.some(
                    (item) => item.income_type === prefixIncomeType
                  )} // ตรวจสอบว่า income_type ตรงกับ prefixIncomeType หรือไม่
                  onChange={(e) =>
                    handleNonAGIincomeCheckboxChange(e, prefixIncomeType)
                  } // ส่งค่า prefixIncomeType ไปใน onChange
                />
                <label
                  htmlFor="income_type_0"
                  className="font text-gray-700 mr-2"
                >
                  รายได้จากการประกอบอาชีพนอกภาคการเกษตรในพื้นที่
                </label>

                {formData.NonAGIincome.some(
                  (item) => item.income_type === prefixIncomeType
                ) && ( // ตรวจสอบว่ามี income_type ตรงกับ prefixIncomeType
                  <div className="flex items-center">
                    <input
                      type="number"
                      placeholder="....บาท/ปี"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                      value={
                        formData.NonAGIincome.find(
                          (item) => item.income_type === prefixIncomeType
                        )?.amount_per_year || ""
                      } // ใช้ค่าใน NonAGIincome ที่ตรงกับ prefixIncomeType
                      onChange={(e) =>
                        updateNonAGIincomeFields(
                          prefixIncomeType,
                          "amount_per_year",
                          e.target.value
                        )
                      }
                    />
                    <label htmlFor=" " className="font text-gray-700 mr-2 ml-4">
                      ต้นทุน
                    </label>
                    <input
                      type="number"
                      placeholder="....บาท/ปี"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                      value={
                        formData.NonAGIincome.find(
                          (item) => item.income_type === prefixIncomeType
                        )?.cost_per_year || ""
                      } // ใช้ค่าใน NonAGIincome ที่ตรงกับ prefixIncomeType
                      onChange={(e) =>
                        updateNonAGIincomeFields(
                          prefixIncomeType,
                          "cost_per_year",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}
              </div>
              {/* 2 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="income_type_1"
                  name="income_type"
                  className="mr-2 rounded"
                  checked={formData.NonAGIincome.some(
                    (item) => item.income_type === prefixIncomeType2
                  )}
                  onChange={(e) =>
                    handleNonAGIincomeCheckboxChange(e, prefixIncomeType2)
                  }
                />
                <label
                  htmlFor="income_type_1"
                  className="font text-gray-700 mr-2"
                >
                  รายได้จากลูกหลานส่งกลับมาจากการทำงานนอกพื้นที่
                </label>
                {formData.NonAGIincome.some(
                  (item) => item.income_type === prefixIncomeType2
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/ปี"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.NonAGIincome.find(
                        (item) => item.income_type === prefixIncomeType2
                      )?.amount_per_year || ""
                    }
                    onChange={(e) =>
                      updateNonAGIincomeFields(
                        prefixIncomeType2,
                        "amount_per_year",
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 3: รายจ่ายครัวเรือน */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5 ">
              3. รายจ่ายครัวเรือน (นอกเหนือจากการลงทุนเพื่อการผลิต)
              (ตอบได้มากกว่า 1 ข้อ)
            </h3>
            <div className="pl-10">
              {/* 1 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_0"
                  className="mr-2 rounded"
                  name="expenses_type"
                  value={prefixExperss1}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss1
                  )}
                  onChange={handleHouseholdChange}
                />
                <label
                  htmlFor="expenses_type_0"
                  className="font text-gray-700 mr-2"
                >
                  1) ค่าใช้จ่ายเฉลี่ยเพื่อการบริโภค (อาหาร เครื่องดื่ม) รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss1
                ) && (
                  <input
                    type="number"
                    name="amount_per_month"
                    placeholder="....บาท/เดือน"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss1
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss1,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 2 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_1"
                  className="mr-2 rounded"
                  value={prefixExperss2}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss2
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  2) ค่าใช้จ่ายเฉลี่ยเพื่อการอุปโภค (ของใช้ในครัวเรือน เดินทาง
                  พลังงาน) รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss2
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss2
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss2,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 3 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_2"
                  className="mr-2 rounded"
                  value={prefixExperss3}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss3
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  3) ค่าใช้จ่ายเฉลี่ย น้ำ ไฟ โทรศัพท์ อินเตอร์เน็ตบ้าน รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss3
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss3
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss3,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 4 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_3"
                  className="mr-2 rounded"
                  value={prefixExperss4}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss4
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  4) ค่าใช้จ่ายเฉลี่ยเพื่อการศึกษา (ค่าเทอม
                  ค่าเครื่องแบบนักเรียน สมุด หนังสือ อินเตอร์เน็ต และอื่น ๆ) รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss4
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss4
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss4,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 5 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_4"
                  className="mr-2 rounded"
                  value={prefixExperss5}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss5
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  5) ค่าใช้จ่ายเฉลี่ยเพื่อการรักษาพยาบาล รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss5
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss5
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss5,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 6 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_5"
                  className="mr-2 rounded"
                  value={prefixExperss6}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss6
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  6) ค่าใช้จ่ายเฉลี่ยเพื่อการประกันภัยต่าง ๆ
                  (ประกันชีวิต/ประกันรถยนต์/ประกัน อุบัติเหตุ/ประกันอัคคีภัย)
                  รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss6
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss6
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss6,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 7 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_6"
                  className="mr-2 rounded"
                  value={prefixExperss7}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss7
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  7) ค่าใช้จ่ายเฉลี่ยด้านสังคม (งานบวช งานแต่ง งานศพ) ศาสนา
                  บริจาค รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss7
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss7
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss7,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 8 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_7"
                  className="mr-2 rounded"
                  value={prefixExperss8}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss8
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  8) ค่าใช้จ่ายเพื่อความบันเทิง ท่องเที่ยว รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss8
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss8
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss8,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 9 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_8"
                  className="mr-2 rounded"
                  value={prefixExperss9}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss9
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  9) ค่าใช้จ่ายในการเสี่ยงโชค เช่น ล๊อตเตอรี่ หวย รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss9
                ) && (
                  <input
                    type="number"
                    name="amount_per_month"
                    placeholder="....บาท/เดือน"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss9
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss9,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 10 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_9"
                  className="mr-2 rounded"
                  value={prefixExperss10}
                  checked={formData.Householdexpenses.some(
                    (item) => item.expenses_type === prefixExperss10
                  )}
                  onChange={handleHouseholdChange}
                />
                <label htmlFor="" className="font text-gray-700 mr-2">
                  10) ค่าใช้จ่ายในการซื้อเครื่องดื่มแอลกอฮอล์ เครื่องดื่มชูกำลัง
                  บุหรี่ ยาสูบ รวม
                </label>
                {formData.Householdexpenses.some(
                  (item) => item.expenses_type === prefixExperss10
                ) && (
                  <input
                    type="number"
                    placeholder="....บาท/เดือน"
                    name="amount_per_month"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                    value={
                      formData.Householdexpenses.find(
                        (item) => item.expenses_type === prefixExperss10
                      )?.amount_per_month || ""
                    }
                    onChange={(e) =>
                      handletInputHouseholdChange(
                        prefixExperss10,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
              {/* 11 */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="expenses_type_10"
                  className="mr-2 rounded"
                  value={prefixExperss11}
                  checked={formData.Householdexpenses.some((item) =>
                    item.expenses_type.startsWith(prefixExperss11)
                  )}
                  onChange={handleOtherCheckboxClear}
                />
                <label
                  htmlFor="expenses_type_10"
                  className="font text-gray-700 mr-2"
                >
                  11) ค่าใช้จ่ายอื่น ๆ (ระบุ)
                </label>
                {formData.Householdexpenses.some((item) =>
                  item.expenses_type.startsWith(prefixExperss11)
                ) && (
                  <>
                    <input
                      type="text"
                      placeholder="ระบุค่าใช้จ่าย..."
                      name="expenses_type"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200"
                      value={
                        formData.Householdexpenses.find((item) =>
                          item.expenses_type.startsWith(prefixExperss11)
                        )?.expenses_type.slice(prefixExperss11.length + 1) || ""
                      }
                      onChange={(e) =>
                        handletOrtherInputHouseholdChange(e.target.value)
                      }
                    />
                    <input
                      type="number"
                      name="amount_per_month"
                      placeholder="....บาท/เดือน"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-4"
                      value={
                        formData.Householdexpenses.find((item) =>
                          item.expenses_type.startsWith(prefixExperss11)
                        )?.amount_per_month || ""
                      }
                      onChange={handleOtherExpenseChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Does the household have savings? */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5">
              4. ครัวเรือนของท่านมีการออมหรือไม่
            </h3>
            <div className="pl-10">
              {/* Radio buttons for "ไม่มี" */}
              <div className="mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 mr-2"
                    id="is_has_saving_0"
                    name="is_has_saving"
                    value={false}
                    onChange={handleSavingChange}
                    checked={
                      formData.Saving &&
                      formData.Saving[0]?.is_has_saving === false
                    }
                  />
                  <span className="font text-gray-700 mr-2">0) ไม่มี</span>
                </label>
              </div>

              {/* Radio buttons for "มี" */}
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 mr-2"
                    id="is_has_saving_1"
                    name="is_has_saving"
                    value={true}
                    checked={
                      formData.Saving?.length === 0 ||
                      formData.Saving[0]?.is_has_saving === true
                    }
                    onChange={handleRadio1Change}
                  />
                  <span className="font text-gray-700 mr-2">
                    1) มี (ระบุประเภทการออม)
                  </span>
                </label>
                {(formData.Saving?.length === 0 ||
                  formData.Saving[0]?.is_has_saving === true) && (
                  <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 bg-gray-200 text-gray-700">
                            ประเภทการออม
                          </th>
                          <th className="border px-4 py-2 bg-gray-200 text-gray-700">
                            จำนวนเงินรวม (บาท)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_0"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value="เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                checked={formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                )}
                                onChange={handleSavingCheckBoxChange}
                              />
                              <span>
                                1. เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย
                                พระเครื่อง ของสะสมที่มีค่า)
                              </span>
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_0"
                              name="amount"
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              value={
                                formData.Saving.find(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                )?.amount || "" // แสดงค่าจำนวนเงินหรือเว้นว่างถ้าไม่มีข้อมูล
                              }
                              disabled={
                                !formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                )
                              }
                              onChange={(e) =>
                                handleAmountChange(
                                  e,
                                  "เงินสด และทรัพย์สิน (เช่น ทอง เพชร พลอย พระเครื่อง ของสะสมที่มีค่า)"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_1"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value="เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                checked={formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                )}
                                onChange={handleSavingCheckBoxChange}
                              />
                              <span>
                                2. เงินฝากกับสถาบันการเงิน (ธนาคาร
                                หน่วยประกันชีวิต)
                              </span>
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_1"
                              name="amount"
                              value={
                                formData.Saving.find(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                )?.amount || "" // แสดงค่าจำนวนเงินหรือเว้นว่างถ้าไม่มีข้อมูล
                              }
                              disabled={
                                !formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                )
                              }
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              onChange={(e) =>
                                handleAmountChange(
                                  e,
                                  "เงินฝากกับสถาบันการเงิน (ธนาคาร หน่วยประกันชีวิต)"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_2"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value="เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                checked={formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                )}
                                onChange={handleSavingCheckBoxChange}
                              />
                              <span>
                                3. เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน
                                กลุ่มสัจจะ กองทุนหมู่บ้าน
                              </span>
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_2"
                              name="amount"
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              value={
                                formData.Saving.find(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                )?.amount || ""
                              }
                              disabled={
                                !formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                )
                              }
                              onChange={(e) =>
                                handleAmountChange(
                                  e,
                                  "เงินฝากกับสหกรณ์ กลุ่มออมทรัพย์ กองทุนชุมชน กลุ่มสัจจะ กองทุนหมู่บ้าน"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_3"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value="พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                checked={formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                )}
                                onChange={handleSavingCheckBoxChange}
                              />
                              <span>
                                4. พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)
                              </span>
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_3"
                              name="amount"
                              value={
                                formData.Saving.find(
                                  (item) =>
                                    item.saving_type ===
                                    "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                )?.amount || ""
                              }
                              disabled={
                                !formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                )
                              }
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              onChange={(e) =>
                                handleAmountChange(
                                  e,
                                  "พันธบัตร/สลากออมทรัพย์ (ออมสิน ธกส. ฯลฯ)"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_4"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value="กองทุนการออมแห่งชาติ (กอช.)"
                                onChange={handleSavingCheckBoxChange}
                                checked={formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "กองทุนการออมแห่งชาติ (กอช.)"
                                )}
                              />
                              <span>5. กองทุนการออมแห่งชาติ (กอช.)</span>
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_4"
                              name="amount"
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              value={
                                formData.Saving.find(
                                  (item) =>
                                    item.saving_type ===
                                    "กองทุนการออมแห่งชาติ (กอช.)"
                                )?.amount || ""
                              }
                              disabled={
                                !formData.Saving.some(
                                  (item) =>
                                    item.saving_type ===
                                    "กองทุนการออมแห่งชาติ (กอช.)"
                                )
                              }
                              onChange={(e) =>
                                handleAmountChange(
                                  e,
                                  "กองทุนการออมแห่งชาติ (กอช.)"
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="saving_type_5"
                                name="saving_type"
                                className="form-checkbox text-blue-600 mr-2 rounded"
                                value={prefixSaving}
                                checked={formData.Saving.some((item) =>
                                  item.saving_type.startsWith(prefixSaving)
                                )}
                                onChange={handleOtherSavingChange}
                              />
                              <span>6. การออมอื่นๆ </span>
                              {formData.Saving.some((group) =>
                                group.saving_type.startsWith(prefixSaving)
                              ) && (
                                <input
                                  type="text"
                                  placeholder="ระบุ..."
                                  className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                  value={formData.Saving?.find((e) =>
                                    e.saving_type.startsWith(prefixSaving)
                                  )
                                    ?.saving_type.slice(prefixSaving.length)
                                    .trim()} // Remove the "prefixSaving" part and leading spaces
                                  onChange={handleOtherInputSavingChange}
                                />
                              )}
                            </label>
                          </td>
                          <td className="border px-4 py-3 text-center">
                            <input
                              type="number"
                              placeholder="จำนวนเงินบาทรวม"
                              id="amount_5"
                              name="amount"
                              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-1/2"
                              value={
                                formData.Saving.find((item) =>
                                  item.saving_type.startsWith(prefixSaving)
                                )?.amount || ""
                              }
                              disabled={
                                !formData.Saving.some((item) =>
                                  item.saving_type.startsWith(prefixSaving)
                                )
                              }
                              onChange={(e) =>
                                handleOtherAmount(e, prefixSaving)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5">
              5. ครัวเรือนของท่านมีหนี้สินหรือไม่
            </h3>
            <div className="pl-10">
              {/* Radio option 1 สำหรับ ไม่มีหนี้ */}
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="is_has_debt_0"
                  name="is_has_debt"
                  className="mr-2"
                  checked={formData.Debt[0].is_has_debt === false}
                  value={false}
                  onChange={handleDebtChange}
                />
                <label htmlFor="" className="font text-gray-700">
                  1) ไม่มี เนื่องจาก <strong>(เลือกได้ 1 ข้อ)</strong>
                </label>
              </div>
              {formData.Debt[0].is_has_debt === false && (
                <div className="pl-10">
                  <div className="mb-4">
                    <input
                      type="radio"
                      id="description_0"
                      name="description"
                      className="mr-2"
                      value="ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน"
                      checked={
                        formData.Debt[0].description ===
                        "ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน"
                      }
                      onChange={handleDescriptionChange}
                    />
                    <label htmlFor="description_0" className="text-gray-700">
                      ไม่มีหลักทรัพย์/ไม่มีบุคคลค้ำประกัน
                    </label>
                  </div>

                  <div className="mb-4">
                    <input
                      type="radio"
                      id="description_1"
                      name="description"
                      className="mr-2"
                      value="ไม่มีความสามารถในการชำระคืน"
                      checked={
                        formData.Debt[0].description ===
                        "ไม่มีความสามารถในการชำระคืน"
                      }
                      onChange={handleDescriptionChange}
                    />
                    <label htmlFor="" className="text-gray-700">
                      ไม่มีความสามารถในการชำระคืน
                    </label>
                  </div>

                  <div className="mb-4">
                    <input
                      type="radio"
                      id="description_2"
                      name="description"
                      className="mr-2"
                      value="ไม่ต้องการเป็นหนี้"
                      checked={
                        formData.Debt[0].description === "ไม่ต้องการเป็นหนี้"
                      }
                      onChange={handleDescriptionChange}
                    />
                    <label htmlFor="" className="text-gray-700">
                      ไม่ต้องการเป็นหนี้
                    </label>
                  </div>
                  <div className="mb-4">
                    <input
                      type="radio"
                      id="description_3"
                      name="description"
                      className="mr-2"
                      value={prefix}
                      checked={formData.Debt[0].description.startsWith(prefix)}
                      onChange={handleDescriptionChange}
                    />
                    <label htmlFor="description_3" className="text-gray-700">
                      อื่น ๆ (ระบุ)
                    </label>
                    {formData.Debt[0].description.startsWith(prefix) && (
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 ml-[10px]"
                        placeholder="ระบุ...."
                        value={
                          formData.Debt[0].description.startsWith(`${prefix}:`)
                            ? formData.Debt[0].description.replace(
                                `${prefix}: `,
                                ""
                              )
                            : ""
                        }
                        onChange={handleOtherDescriptionChange}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Radio option 2 สำหรับ มีหนี้ */}
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="is_has_debt_1"
                  name="is_has_debt"
                  className="mr-2"
                  value={true}
                  checked={formData.Debt[0].is_has_debt === true}
                  onChange={handleDebtChange}
                />
                <label htmlFor="has-debt" className="font text-gray-700">
                  2) มี <strong>(ตอบได้มากกว่า 1 ข้อ)</strong>
                </label>
              </div>
              {formData.Debt[0].is_has_debt === true && (
                <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                  <table
                    className="table-auto w-full border-collapse"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      <tr>
                        <th
                          className="border px-4 py-2 bg-gray-200 text-gray-700"
                          style={{ width: "70%" }}
                        >
                          แหล่งสินเชื่อ <br />
                          (สถาบันการเงิน/ กองทุน/ เงินบุคคล)
                        </th>
                        <th
                          className="border px-4 py-2 bg-gray-200 text-gray-700"
                          style={{ width: "30%" }}
                        >
                          จำนวนเงินกู้ที่คงค้าง (บาท)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="form_0"
                              name="form"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              value="ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              1. ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            id="outstanding_amount_0"
                            name="outstanding_amount"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                              )?.outstanding_amount || ""
                            }
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ญาติ/เพื่อน/เพื่อนบ้าน (ไม่มีค่าตอบแทนอื่นใด)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_1"
                              name="form"
                              value="ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              2. ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกü่า
                              ร้อยละ 15 ต่อปี)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_1"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ญาติ/เพื่อน/เพื่อนบ้าน(อัตราดอกเบี้ยต่ำกว่า ร้อยละ 15 ต่อปี)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_2"
                              name="form"
                              value="กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              3. กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์
                              และกลุ่มกองทุน)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            id="outstanding_amount_2"
                            name="outstanding_amount"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "กองทุนการเงินของชุมชน (สหกรณ์ กลุ่มออมทรัพย์ และกลุ่มกองทุน)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_3"
                              name="form"
                              value={prefixCredit2}
                              checked={formData.Creditsources.some((source) =>
                                source.form.startsWith(prefixCredit2)
                              )}
                              onChange={(e) =>
                                handleOtherFormChange(e, prefixCredit2)
                              }
                            />
                            <span>4. {prefixCredit2}</span>
                            {formData.Creditsources.some((source) =>
                              source.form.startsWith(prefixCredit2)
                            ) && (
                              <input
                                type="text"
                                placeholder="อื่นๆ ระบุ"
                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={
                                  formData.Creditsources.find((source) =>
                                    source.form.startsWith(prefixCredit2)
                                  )?.form.slice(prefixCredit2.length + 1) || ""
                                }
                                onChange={(e) =>
                                  handleOtherInputChange(e, prefixCredit2)
                                }
                              />
                            )}
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_3"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find((source) =>
                                source.form.startsWith(prefixCredit2)
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOtherOutstandingAmount(
                                prefixCredit2,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_4"
                              name="form"
                              value="ธนาคารเพื่อการเกษตรและสหกรณ์"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form === "ธนาคารเพื่อการเกษตรและสหกรณ์"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>5. ธนาคารเพื่อการเกษตรและสหกรณ์</span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_4"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form === "ธนาคารเพื่อการเกษตรและสหกรณ์"
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ธนาคารเพื่อการเกษตรและสหกรณ์"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_5"
                              name="form"
                              value="ธนาคารออมสิน"
                              checked={formData.Creditsources.some(
                                (item) => item.form === "ธนาคารออมสิน"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>6. ธนาคารออมสิน</span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_5"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            value={
                              formData.Creditsources.find(
                                (item) => item.form === "ธนาคารออมสิน"
                              )?.outstanding_amount || ""
                            }
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ธนาคารออมสิน"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_6"
                              name="form"
                              value="ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              7. ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์
                              กรุงไทย อิสลาม SME ธอส. ฯลฯ)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_6"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                              )
                            }
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "ธนาคารพาณิชย์อื่น ๆ (เช่น กสิกร ไทยพาณิชย์ กรุงไทย อิสลาม SME ธอส. ฯลฯ)"
                              )?.outstanding_amount || ""
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_7"
                              name="form"
                              value="สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              8. สถาบันการเงินเอกชน (ไฟแนนซ์,
                              บัตรกดเงินสด/บัตรผ่อนสินค้า)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_7"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "สถาบันการเงินเอกชน (ไฟแนนซ์, บัตรกดเงินสด/บัตรผ่อนสินค้า)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_8"
                              name="form"
                              value="ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              9. ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา
                              เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_8"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                              )?.outstanding_amount || ""
                            }
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "ร้านค้าอุปโภค บริโภค และปัจจัยการผลิต (ปุ๋ย ยา เครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ฯลฯ)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_9"
                              name="form"
                              value="เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              10. เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15
                              ต่อปี)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_9"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                              )?.outstanding_amount || ""
                            }
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "เงินกู้นอกระบบ (อัตราดอกเบี้ยเกินกว่าร้อยละ 15 ต่อปี)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_10"
                              name="form"
                              value="กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                              checked={formData.Creditsources.some(
                                (item) =>
                                  item.form ===
                                  "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                              )}
                              onChange={(e) => handleCreditSourceChange(e, 0)}
                            />
                            <span>
                              11. กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
                              กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้
                              ในอนาคต (กอร.)
                            </span>
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_10"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            value={
                              formData.Creditsources.find(
                                (item) =>
                                  item.form ===
                                  "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                              )?.outstanding_amount || ""
                            }
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            onChange={(e) =>
                              handleOutstandingAmountChange(
                                e.target.value,
                                "กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.) กองทุนเงินกู้ยืมเพื่อการศึกษาที่ผูกกับรายได้ในอนาคต (กอร.)"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 mr-2 rounded"
                              id="form_11"
                              name="form"
                              value={prefixCredit}
                              checked={formData.Creditsources.some((source) =>
                                source.form.startsWith(prefixCredit)
                              )}
                              onChange={(e) =>
                                handleOtherFormChange(e, prefixCredit)
                              }
                            />
                            <span>12. {prefixCredit}</span>
                            {formData.Creditsources.some((source) =>
                              source.form.startsWith(prefixCredit)
                            ) && (
                              <input
                                type="text"
                                placeholder="(ระบุ)......................"
                                className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={
                                  formData.Creditsources.find((source) =>
                                    source.form.startsWith(prefixCredit)
                                  )?.form.slice(prefixCredit.length + 1) || ""
                                }
                                onChange={(e) =>
                                  handleOtherInputChange(e, prefixCredit)
                                }
                              />
                            )}
                          </label>
                        </td>
                        <td className="border px-4 py-3">
                          <input
                            type="number"
                            id="outstanding_amount_11"
                            name="outstanding_amount"
                            placeholder="จำนวนเงินกู้ที่คงค้าง"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition duration-200 w-full"
                            value={
                              formData.Creditsources.find((source) =>
                                source.form.startsWith(prefixCredit)
                              )?.outstanding_amount || ""
                            }
                            onChange={(e) =>
                              handleOtherOutstandingAmount(
                                prefixCredit,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Section 6: Does the household have assets for occupation? */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-5">
              6. ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่
            </h3>
            <div className="pl-10">
              <div className="mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 mr-2"
                    id="is_has_property_0"
                    name="is_has_property"
                    value={false}
                    checked={formData.Occupationalproperty.every(
                      (item) => item.is_has_property === false
                    )}
                    onChange={handleRadioChange}
                  />
                  <span className="font text-gray-700 mr-2">1) ไม่มี</span>
                </label>
              </div>

              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 mr-2"
                    id="is_has_property_1"
                    name="is_has_property"
                    value={true}
                    checked={formData.Occupationalproperty.some(
                      (item) => item.is_has_property === true
                    )}
                    onChange={handleRadioChange}
                  />
                  <span className="font text-gray-700 mr-2">
                    2) มี และได้ใช้เพื่อประกอบอาชีพ (ตอบได้มากกว่า 1 ข้อ)
                  </span>
                </label>
                {formData.Occupationalproperty[0]?.is_has_property && (
                  <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
                    <ul className="space-y-3">
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            id="property_type_0"
                            name="property_type"
                            value="เครื่องจักรกล เช่น รถไถนาขนาดเล็ก เครื่องตัดหญ้า ฯลฯ"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "เครื่องจักรกล เช่น รถไถนาขนาดเล็ก เครื่องตัดหญ้า ฯลฯ"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            {" "}
                            1) เครื่องจักรกล เช่น รถไถนาขนาดเล็ก เครื่องตัดหญ้า
                            ฯลฯ
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            id="property_type_1"
                            name="property_type"
                            value="รถมอเตอร์ไซค์ (รับจ้าง/ส่งของ)"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "รถมอเตอร์ไซค์ (รับจ้าง/ส่งของ)"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            {" "}
                            2) รถมอเตอร์ไซค์ (รับจ้าง/ส่งของ)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            id="property_type_2"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            value="รถแท็กซี่"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "รถแท็กซี่"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2"> 3) รถแท็กซี่</span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            id="property_type_6"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            value="รถยนต์ (รับจ้าง/ค้าขาย)"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "รถยนต์ (รับจ้าง/ค้าขาย)"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            {" "}
                            4) รถยนต์ (รับจ้าง/ค้าขาย)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_4"
                            value="เรือประมง เรือติดเครื่องยนตร์"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "เรือประมง เรือติดเครื่องยนตร์"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            {" "}
                            5) เรือประมง เรือติดเครื่องยนตร์
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            id="property_type_5"
                            name="property_type"
                            value="แผงขายของ"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "แผงขายของ"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2"> 6) แผงขายของ</span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_6"
                            value="รถโชเล่ย์ (รถพ่วงข้าง)"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "รถโชเล่ย์ (รถพ่วงข้าง)"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            {" "}
                            7) รถโชเล่ย์ (รถพ่วงข้าง)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_7"
                            value="ยุ้งฉาง"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "ยุ้งฉาง"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2"> 8) ยุ้งฉาง</span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_8"
                            value="หุ้น/กองทุน"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "หุ้น/กองทุน"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">9) หุ้น/กองทุน</span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_9"
                            value="แชร์ (ที่ยังไม่ได้เปีย)"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "แชร์ (ที่ยังไม่ได้เปีย)"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            10) แชร์ (ที่ยังไม่ได้เปีย)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_10"
                            value="สัตว์เลี้ยง (ที่มีมูลค่า)"
                            checked={formData.Occupationalproperty[0].property_type.includes(
                              "สัตว์เลี้ยง (ที่มีมูลค่า)"
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "Occupationalproperty",
                                "property_type",
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <span className="ml-2">
                            11) สัตว์เลี้ยง (ที่มีมูลค่า)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600 mr-2 rounded"
                            name="property_type"
                            id="property_type_7"
                            value={prefix}
                            checked={formData.Occupationalproperty[0].property_type.some(
                              (property_type) =>
                                property_type.startsWith(prefix)
                            )}
                            onChange={handleOtherProperty(prefix)}
                          />
                          <span className="ml-2">อื่น ๆ</span>
                        </label>
                        {formData.Occupationalproperty[0].property_type.some(
                          (property_type) => property_type.startsWith(prefix)
                        ) && (
                          <span className="ml-2 inline-flex items-center">
                            <input
                              type="text"
                              placeholder=" (ระบุ)..."
                              name="property_type_7"
                              className="ml-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                              style={{ minWidth: "200px" }}
                              value={
                                formData.Occupationalproperty[0].property_type
                                  .find((property_type) =>
                                    property_type.startsWith(prefix)
                                  )
                                  ?.slice(prefix.length + 1) || "" // +1 เพื่อลบช่องว่างที่เพิ่มไว้
                              }
                              onChange={(e) =>
                                handlePropertyInputChange(
                                  prefix,
                                  e.target.value
                                )
                              }
                            />
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

         
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={(e) => handlePrevPage()}
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
            type="button"
            onClick={(e) => handleSave()}
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
    </>
  );
}

export default Financialcapital;
