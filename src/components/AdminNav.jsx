import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNav = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => ({ ...state.user }));

  return (
    <div>
      
      <Disclosure as="nav" className="bg-white fixed top-0 z-20 w-full shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* เปิด/ปิด sidebar */}
              <div className="flex items-center justify-between h-16">
                <button
                  onClick={toggleSidebar}
                  className="text-slate-500  p-2 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                  <Icon
                    icon="heroicons-outline:menu-alt-2"
                    className="w-6 h-6"
                  />
                </button>
              </div>
              
               {/* Desktop Sidebar Toggle */}
            </div>
            <div className="hidden sm:flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <Icon icon="heroicons-outline:menu-alt-2" className="w-6 h-6" />
            </button>
          </div>


            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}

              {user && Object.keys(user).length > 0 ? (
                <Menu as="div" className="flex flex-row ml-3">
                  <div className="span text-slate-500 mx-5 mt-2">
                    {user?.role && user?.status
                      ? `${user.role} : ${user.status}`
                      : ""}
                  </div>

                  <div>
                    <MenuButton className="relative flex items-center justify-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                      <div className="flex items-center justify-center bg-rose-500 rounded-full w-10 h-10">
                        <Icon
                          icon="material-symbols:manage-accounts-rounded"
                          className="text-white"
                          width="28"
                          height="28"
                        />
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute mt-9 right-0 z-10  w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Dashbord
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={(e) => handleLogout()}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 data-[focus]:bg-gray-100"
                      >
                        ออกจากระบบ
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  type="button"
                  class="mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <Link to={"/login"}>เข้าสู่ระบบ</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default AdminNav;
