import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "flowbite";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState({}); //ex. { 2: false, 1: true }
  const navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าอื่น

  //เปิดปิด sub menu ตาม index ที่รับเข้ามา { index : (T/F) }
  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage
    window.location.href = "/login"; // รีเฟรชหน้าและเปลี่ยนเส้นทางไปหน้า login
  };

  const sidebarItem = [
    { name: "Dashbord", link: "/admin", logo: "mdi:chart-pie" },
    {
      name: "ภาพรวมศักยภาพทุน 5 มิติ",
      link: "/admin/capital",
      logo: "icon-park-solid:hold-interface",
    },
    {
      name: "ระบบ GIS ครัวเรือนยากจน",
      link: "/admin/gis-household",
      logo: "material-symbols:globe-location-pin-sharp",
    },
    {
      name: "ค้นหาสมาชิกครัวเรือน",
      link: "/admin/find-members",
      logo: "material-symbols:group-search",
    },
    {
      name: "บันทึกการช่วยเหลือ",
      link: "/admin/helpLog",
      logo: "mdi:account-edit",
      submenu: [
        {
          name: "บันทึกแบบรายคน",
          link: "/admin/helpLog",
          logo: "mdi:file-document-multiple-outline",
        },
      ],
    },
    {
      name: "ระบบติดตามข้อมูล",
      link: "/admin/find-members",
      logo: "material-symbols:rubric-rounded",
      submenu: [
        {
          name: "ติดตามรายบุคคล",
          link: "/admin/track-member/",
          logo: "mdi:folder-account",
        },
        {
          name: "ติดตามครัวเรือน",
          link: "/admin/track-household",
          logo: "mdi:folder-home",
        },
      ],
    },
    {
      name: "API ",
      link: "/admin/api",
      logo: "material-symbols:integration-instructions-outline-rounded",
      submenu: [
        { name: "ดึงข้อมูลจากระบบหลัก", link: "/admin/add-ApiToken" },
        { name: "เอกสารการใช้งาน", link: "#" },
      ],
    },
    {
      name: "ระบบนำออกข้อมูล",
      link: "/admin/FindAssistance",
      logo: "material-symbols:database-upload-outline-rounded",
    },
    {
      name: "จัดการผู้ใช้งานระบบ",
      link: "#",
      logo: "material-symbols:person-rounded",
      submenu: [
        {
          name: "ข้อมูลผู้ใช้งาน",
          link: "/admin/manage-user",
          logo: "mdi:account-outline",
        },
        {
          name: "อนุมัติผู้ใช้ใหม่",
          link: "/admin/approve-user",
          logo: "mdi:account-plus-outline",
        },
      ],
    },
    {
      name: "สถิติการเข้าใช้งานในระบบ",
      link: "/admin/usagestatistics",
      logo: "mdi:chart-line",
      submenu: [
        {
          name: "สถิติการเข้าใช้งานในระบบ",
          link: "/admin/usagestatistics",
          logo: "mdi:chart-bar",
        },
        {
          name: "การเข้าใช้งานในระบบของผู้ใช้แต่ละราย",
          link: "/admin/Individual-User-Login",
          logo: "mdi:chart-line",
        },
        {
          name: "สถิติการเข้าดูข้อมูลLine user",
          link: "/admin/line-login-statistics",
          logo: "ic:sharp-bar-chart",
        },
      ],
    },
    {
      name: "กลับหน้าหลัก",
      link: "/",
      logo: "material-symbols-light:keyboard-backspace",
    },
    { name: "ออกจากระบบ", action: handleLogout, logo: "ic:round-log-out" },
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
                      onClick={() => toggleDropdown(index)}
                    >
                      <span className="text-gray-500">
                        <Icon icon={item.logo} width="25" height="25" />
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
                      } py-2 space-y-2 pl-8`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center p-2 text-bodydark1 transition duration-75 rounded-lg group hover:bg-graydark"
                          >
                            <span className="mr-2 text-gray-400">
                              <Icon
                                icon={subItem.logo}
                                width="20"
                                height="20"
                              />
                            </span>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.action ? (
                  <button
                    onClick={handleLogout} // ใช้ handleLogout โดยตรง
                    className="flex w-full items-center p-2 text-bodydark1 rounded-lg dark:text-white hover:bg-graydark dark:hover:bg-gray-700 group"
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      <Icon icon={item.logo} width="25" height="25" />
                    </span>
                    <span className="ms-3">{item.name}</span>
                  </button>
                ) : (
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
