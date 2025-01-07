import axios from "axios";
import React, { useState } from "react";

export const TestAPI = () => {
  const [data, setData] = useState({});

  const handleFetch = async () => {
    try {
      await axios
        .get(
          "/sradss/api/01poor.php?API-TOKEN=MzBiZDdhY2EyODY1YWNiZmU0Nzc0OW&&province_id=65&&yearget=all&mode=1"
        )
        .then((res) => {
          console.log(res);
          setData(res);
        });
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <button onClick={(e) => handleFetch()}>ยิงAPI</button>
      <br />
      ข้อมูล
      <br />
      {data && Object.keys(data).length > 0 ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // This formats the object as a string with indentation
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};
