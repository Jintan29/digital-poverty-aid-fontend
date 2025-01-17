import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import debounce from "lodash/debounce";
import { Icon } from "@iconify/react";
import config from "../../../config";
import { Link } from "react-router-dom";

const TrackHousehold = () => {
  const [house, setHouse] = useState([]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null); //menu icon
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;

  const fetchData = async (page, searchTerm) => {
    try {
      const response = await axios.get(
        config.api_path + `/house-hold/searchByHouseCode`,
        {
          params: {
            page: page,
            search: searchTerm,
            limit,
          },
          ...config.headers(),
        }
      );
      setHouse(response.data.results);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  //หน่วงเวลา
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      setCurrentPage(1);
      fetchData(1, value);
    }, 500),
    []
  );

  const handleInputChange = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, search);
  };

  //ปุ่ม Paginate
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }
    return <div className=" mt-4">{pages}</div>;
  };

  // ปุ่มค้นหา
  const handleMenuToggle = (index) => {
    if (openMenuIndex === index) {
      // ถ้ากดที่แถวเดิม ให้ปิด menu
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

   // ติดตามการกดนอก menu
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".relative")) {
          setOpenMenuIndex(null);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

  return (
    <>
      <div className="mx-5 my-5">
        <div className="flex flex-col  justify-center  ">
          <div className="block text-center text-2xl font-bold">
            <h1>ระบบติดตามครัวเรือน</h1>
          </div>
          <div className="block text-center text-base mb-5 mt-2">
            <h3>
              ค้นหาครัวเรือนของท่านโดยการกรอก รหัสบ้าน หรือ
              ชื่อเจ้าบ้านเพื่อดูข้อมูล
            </h3>
          </div>
        </div>

        {/*Search box */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <div className="flex mb-4 w-80 md:w-96 mt-4">
            <input
              type="search"
              id="search"
              className="flex-grow py-3 px-3 text-xs text-gray-900 border border-gray-300 rounded-l-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
              placeholder="HC-xxxx / ชื่อจริง"
              value={search}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-sm text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/*Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table
            id="table-content"
            className=" w-full text-l text-center text-gray-500 dark:text-gray-400 border-collapse"
          >
            <thead className="text-l uppercase bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
              <tr className="border-b border-gray-700 dark:border-gray-900">
                <th
                  scope="col"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-800 width: 5%"
                >
                  ลำดับที่
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 width: 20% "
                >
                  รหัสบ้าน
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 width: 30%"
                >
                  เจ้าบ้าน
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 width: 40%"
                >
                  ที่อยู่
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50  width: 20%"
                ></th>
              </tr>
            </thead>

            <tbody>
              {house && house.length > 0 ? (
                house.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-500 dark:border-gray-900"
                  >
                    <td className="px-6 py-4 text-black bg-gray-50">
                      {(currentPage - 1) * limit + index + 1}
                    </td>

                    <td className="px-6 py-4 font-semibold bg-gray-100 dark:bg-gray-900 text-black">
                      {data.house_code}
                    </td>

                    <th
                      scope="row"
                      className="px-6 py-4 font-medium bg-gray-50 text-gray-900 whitespace-nowrap  dark:text-white dark:bg-gray-900"
                    >
                      {data.host_title +
                        " " +
                        data.host_fname +
                        " " +
                        data.host_lname}
                    </th>

                    <td className="px-6 py-4 text-black  bg-gray-100 ">
                      {data.house_number +
                        "ต." +
                        data.subdistrict +
                        " " +
                        "อ. " +
                        data.district +
                        " " +
                        "จ. " +
                        data.province +
                        " " +
                        data.postcode}
                    </td>

                    <td className="px-6 py-3 text-black relative bg-gray-50">
                      <div className="relative inline-block">
                        <button
                          onClick={() => handleMenuToggle(index)}
                          className="text-slate-700 hover:text-slate-900 focus:outline-none"
                        >
                          <Icon
                            icon="material-symbols:search-rounded"
                            width="1em"
                            height="1em"
                          />
                        </button>

                        {openMenuIndex === index && (
                            <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-20">
                              <Link
                                to={`/admin/track-household/${data.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                ดูข้อมูลครัวเรือน
                              </Link>
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-red-500 text-center">
                    ไม่พบข้อมูล กรอกรหัสบ้าน หรือ ชื่อเจ้าบ้านให้ถูกต้อง
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {house.length > 0 ? (
          <div className="flex justify-end mr-5">{renderPagination()}</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TrackHousehold;
