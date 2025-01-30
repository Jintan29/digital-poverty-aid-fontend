import axios from "axios";
import React, { useState } from "react";

const FormAddress = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  //fuction fetch
  const getCoordinatesFromAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;

    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const lat = parseFloat(response.data[0].lat);
        const lon = parseFloat(response.data[0].lon);
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        return { lat, lon };
      } else {
        console.error('No results found for the given address.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getCoordinatesFromAddress(address);
      setCoordinates(res);  // Set the latitude and longitude
      console.log(res);
      
    } catch (error) {
      console.error('Error getting coordinates:', error);
    }
  };

  return  <div>
  <h1>Convert Address to Coordinates</h1>
  <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      placeholder="Enter address" 
      value={address} 
      onChange={handleAddressChange} 
    />
    <button type="submit">Get Coordinates</button>
  </form>

  {coordinates && (
    <div>
      <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lon}</p>
    </div>
  )}
</div>;
};

export default FormAddress;
