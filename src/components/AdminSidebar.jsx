import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "flowbite";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {  
  const [dropdownOpen, setDropdownOpen] = useState({}); //ex. { 2: false, 1: true }

  //เปิดปิด sub menu ตาม index ที่รับเข้ามา { index : (T/F) }
  const toggleDropdown = (index)=>{
    setDropdownOpen((prev)=>({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const sidebarItem = [
    { name: "Dashbord", link: "#", logo: "mdi:chart-pie" },
    {
      name: "ค้นหาสมาชิกครัวเรือน",
      link: "/admin/find-members",
      logo: "material-symbols:group-search",
    },
    {
      name: "ระบบติดตามข้อมูล",
      link: "/admin/find-members",
      logo: "material-symbols:rubric-rounded",
      submenu:[
        {name:'ติดตามรายบุคคล',link:'/admin/track-member/'},
        {name:'ติดตามครัวเรือน',link:'/admin/track-household'},
      ]
    },
    {
      name: "จัดการผู้ใช้งานระบบ",
      link: "#",
      logo: "material-symbols:person-rounded",
      submenu:[
        {name:'ข้อมูลผู้ใช้งาน',link:'/admin/manage-user'},
        {name:'อนุมัติผู้ใช้ใหม่',link:'/admin/approve-user'}
      ]
    },
    {
      name: "กลับหน้าหลัก",
      link: "/",
      logo: "material-symbols-light:keyboard-backspace",
    },
    { name: "ออกจากระบบ", link: "#", logo: "ic:round-log-out" },
  ];

  return (
    <>
      {/* Backdrop สำหรับปิด sidebar*/}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-softdark dark:bg-gray-800">
          <div className="flex justify-center  mb-10">
            <img src="/Logo.png" className="w-32 h-32 border-4 rounded-full" />
          </div>

          <ul className="space-y-2 font-medium">
            {sidebarItem.map((item, index) => (
              <li key={index}>
                {/* เช็คว่า Item ที่ loop มามี sub ?  */}
                {item.submenu ? (
                  <>
                  {/* ถ้ามี sub ให้แสดง btn เอาไว้เปิด/ปิด */}
                  <button
                  type="button"
                  className="flex hover:bg-graydark items-center w-full p-2 text-base text-bodydark1 transition duration-75 rounded-lg group"
                  onClick={()=>toggleDropdown(index)}
                  >
                    <span className="text-gray-500">
                      <Icon icon={item.logo} width='25' height='25' />
                    </span>
                    <span className="flex-1 ms-3 text-left">{item.name}</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                  </button>
                  {/* หัวข้อย่อยหากมี sub */}
                  <ul
                  className={`${
                    dropdownOpen[index] ? "block" : "hidden"
                  } py-2 space-y-2 pl-8`}>
                    {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center p-2 text-bodydark1 transition duration-75 rounded-lg group hover:bg-graydark"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  </>
                ):(
                  <Link
                    to={item.link}
                    className="flex items-center p-2 text-bodydark1 rounded-lg dark:text-white hover:bg-graydark dark:hover:bg-gray-700 group"
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      <Icon icon={item.logo} width="25" height="25" />
                    </span>
                    <span className="ms-3">{item.name}</span>
                  </Link>
                )}

              </li>
            ))}

          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
