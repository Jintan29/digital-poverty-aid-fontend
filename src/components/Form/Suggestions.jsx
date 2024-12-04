import React, { useEffect, useState } from "react";

const Suggestions = ({setCurrentPage,setMainFormData,mainFormData}) => {

  const [formData, setFormData] = useState({
    Suggestions: 
      {
        suggest_informer: "", 
        suggest_survey_team: "",
        resource: [],
      },

  });

  //load data
  useEffect(()=>{
    if(mainFormData.Suggestions){
      setFormData(mainFormData.Suggestions)
    }
  },[mainFormData])

  //Nextpage
  const handleSubmit = (e)=>{
    e.preventDefault()
    setMainFormData((prevData)=>({
      ...prevData,
      Suggestions: formData
    }))
    setCurrentPage(7)
  }

  const handlePrevPage =()=>{
    setMainFormData((prevData)=>({
      ...prevData,
      Suggestions: formData
    }))

    setCurrentPage(5)
  }

  const handleInputChange = (field,value)=>{
    const updataData = {...formData}
    updataData.Suggestions[field] = value
    setFormData(updataData)
  }

  const handleCheckboxChange = (value,checked)=>{
    const updataData = {...formData}

    if(checked){
      updataData.Suggestions.resource = [...updataData.Suggestions.resource,value]// clone และเอา value ไปต่อท้าย arr
    }else{
      const index = updataData.Suggestions.resource.findIndex((e)=>e.startsWith(value))

      if(index > -1){
        updataData.Suggestions.resource.splice(index,1)
      }
    }
    setFormData(updataData)
    
  }
  const prefix = 'อื่นๆ '

  const handleOtherInputChange = (prefixO,value)=>{
    setFormData((prevData)=>{
      const updateData = [...prevData.Suggestions.resource] //clone arr ใน field เดิม
      const index = updateData.findIndex((e)=>e.startsWith(prefixO))

      if(index > -1){
        updateData[index] = value
      }else{
        updateData.push(value)
      }

      return {...prevData,Suggestions:{
        ...prevData.Suggestions,
        resource:updateData
      }}
    })
  }


  const handleShowData = (e) => {
    e.preventDefault();
    console.log(formData);
    //console.log(selectedOptions);
  };

  return (
    <>
      <div className="mx-8">
        <h3 className="text-black text-lg font-bold px-5 py-5">
          ส่วนที่ 7 ความคิดเห็นต่อและข้อเสนอแนะ
        </h3>

        <form onSubmit={handleShowData}>
          <div>
            <label htmlFor="suggest_informer">
              1. ข้อเสนอแนะจากผู้ให้ข้อมูล หรือเจ้าของบ้าน
              ต่อหน่วยงานที่เกี่ยวข้องในการดำเนินการแก้ไขปัญหาความยากจน
            </label>
            <textarea
              id="suggest_informer"
              name="suggest_informer"
              value={formData.Suggestions.suggest_informer}
              onChange={e=>handleInputChange('suggest_informer',e.target.value)}
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }} 
            />

            <label htmlFor="suggest_survey_team">
              2. ข้อเสนอแนะหรือความคิดเห็นของอาสาสมัคร (ข้อสังเกต ปัญหา
              อุปสรรคในการเก็บข้อมูล)
            </label>
            <textarea
              id="suggest_survey_team"
              name="suggest_survey_team"
              value={formData.Suggestions.suggest_survey_team}
              onChange={e=>handleInputChange('suggest_survey_team',e.target.value)}
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ระบุ"
              rows="1"
              style={{ resize: "none", width: "50%" }} // ตั้งความกว้างที่ 50%
            />
          </div>

          {/* ส่วนของ checkbox */}
          <h3>แหล่งที่มาของครัวเรือนเข้ารับการสำรวจ (เลือกได้มากกว่า 1 ข้อ)</h3>


          <div className="flex flex-col ">
          <label className="mt-2">
            <input
              id="resource 1"
              type="checkbox"
              name="resource"
              value="จปฐ./กชช.2ค."
              checked={formData.Suggestions.resource.includes('จปฐ./กชช.2ค.')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            จปฐ./กชช.2ค.
          </label>

          <label className="mt-2">
            <input
              id="resource 2"
              type="checkbox"
              name="resource"
              value="TPMAP"
              checked={formData.Suggestions.resource.includes('TPMAP')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            TPMAP
          </label>

          <label className="mt-2">
            <input
              id="resource 3"
              type="checkbox"
              name="resource"
              value="พมจ."
              checked={formData.Suggestions.resource.includes('พมจ.')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            พมจ.
          </label>

          <label className="mt-2">
            <input
              id="resource 4"
              type="checkbox"
              name="resource"
              value="พอช."
              checked={formData.Suggestions.resource.includes('พอช.')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            พอช.
          </label>

          <label className="mt-2">
            <input
              id="resource 5"
              type="checkbox"
              name="resource"
              value="TPผู้นำชุมชน/อสม./อพมMAP"
              checked={formData.Suggestions.resource.includes('TPผู้นำชุมชน/อสม./อพมMAP')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ผู้นำชุมชน/อสม./อพม
          </label>

          <label className="mt-2">
            <input
              id="resource 6"
              type="checkbox"
              name="resource"
              value="ผู้นำศาสนา"
              checked={formData.Suggestions.resource.includes('ผู้นำศาสนา')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ผู้นำศาสนา
          </label>

          <label className="mt-2">
            <input
              id="resource 7"
              type="checkbox"
              name="resource"
              value="อบต./อปท."
              checked={formData.Suggestions.resource.includes('อบต./อปท.')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อบต./อปท.
          </label>

          <label className="mt-2">
            <input
              id="resource 8"
              type="checkbox"
              name="resource"
              value="ชาวบ้าน"
              checked={formData.Suggestions.resource.includes('ชาวบ้าน')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            ชาวบ้าน
          </label>

          <label className="mt-2">
            <input
              id="resource 9"
              type="checkbox"
              name="resource"
              value="อาสาสมัครสำรวจข้อมูล"
              checked={formData.Suggestions.resource.includes('อาสาสมัครสำรวจข้อมูล')? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อาสาสมัครสำรวจข้อมูล
          </label>

          <label className="mt-2"> 
            <input
              id="resource_10" // ตั้ง id เพื่อเชื่อมโยงกับ label
              type="checkbox"
              name="resource"
              value={prefix}
              checked={formData.Suggestions.resource.some((e)=>e.startsWith(prefix)) ? true:false}
              onChange={e=>handleCheckboxChange(e.target.value,e.target.checked)}
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ms-8 text-sm font-medium"
            />
            <label
              for="default-checkbox"
              class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            />
            อื่นๆ

            {formData.Suggestions.resource.some((e)=>e.startsWith(prefix)) && (
            <input
              type="text"
              value={formData.Suggestions.resource?.find((e)=>e.startsWith(prefix))?.slice(prefix.length) ||''
              }
              onChange={e=>handleOtherInputChange(prefix,prefix+e.target.value)}
              className="ml-2 bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48"
              placeholder="ระบุ"
            />
          )}
          </label>

          
          </div>
          

          <div className="mt-5">
            <button
              type="button"
              onClick={e=>handleSubmit(e)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              ส่งฟอร์ม
            </button>
            <button
              type="button"
              onClick={e=>handlePrevPage(e)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              ย้อนกลับ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Suggestions;
