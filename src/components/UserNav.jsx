import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "Form", href: "/form", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserNav = () => {
  //เอา current ไป map แทน navigation
  const [currentPage, setCurrentPage] = useState(navigation);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.user }));

  const handlePageChange = (name) => {
    setCurrentPage((prevPages) =>
      prevPages.map((page) => ({
        ...page,
        current: page.name === name,
      }))
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");

    setCurrentPage((prevPages) =>
      prevPages.map((page) => ({
        ...page,
        current: page.name === "Login",
      }))
    );
  };
  return (
    <>
      {/* Render for all user */}
      <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            </div>

            {/* จัดโครงสร้าง flex ให้ปุ่มเมนูชิดซ้าย และปุ่ม Profile/Login ชิดขวา */}
            <div className="flex flex-1 items-center justify-start sm:justify-between">
              
              {/* นำปุ่มที่สร้างไว้มา loop แสดงผล PC */}
              <div className="flex space-x-4">
                {currentPage.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handlePageChange(item.name)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right Side - ปุ่ม Profile หรือปุ่ม Login (ชิดขวา) */}
              <div className="flex items-center ml-auto">
                {user && Object.keys(user).length > 0 ? (
                  <Menu as="div" className="flex flex-row ml-3">
                    <div className="span text-white mx-5 mt-2">
                      {user?.role && user?.status
                        ? `${user.status} : ${user.name}`
                        : ""}
                    </div>

                    <div>
                      <MenuButton className="relative flex items-center justify-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                      className="absolute mt-12 right-0 z-10  w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <Link
                          to={"/admin"}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Dashbord
                        </Link>
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
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {currentPage.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};

export default UserNav;
