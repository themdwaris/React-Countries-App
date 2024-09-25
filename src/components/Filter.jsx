import React from "react";
import { useThemeProvider } from "../context/themeContext";
import { useOutletContext } from "react-router-dom";

const Filter = ({ filter, setFilter, filterByRegion, setFilterByRegion,regions }) => {
  // const {isDark}=useThemeProvider()
  const [isDark]=useOutletContext()
  
  return (
    <div className="w-full flex items-center justify-between mb-6">
      <div className={`w-full max-w-[320px] my-10 flex items-center rounded-full py-3 px-3 ${isDark?"bg-gray-700":"bg-gray-50 border"}`}>
        <span className="text-xl text-gray-400 leading-3">
          <ion-icon name="search-outline"></ion-icon>
        </span>
        <input
          type="text"
          value={filter}
          placeholder="Search country"
          className={`w-full outline-none border-none px-2 text-[16px] leading-3 ${isDark?"bg-gray-700 text-gray-50":"bg-gray-50 text-gray-800"}`}
          onChange={(e) => {
            setFilter(e.target.value.toLowerCase())
            setFilterByRegion("")
          }}
        />
      </div>
      <select
        value={filterByRegion}
        className={`outline-none py-[11px] rounded-full text-[16px] cursor-pointer ml-4 md:ml-0 px-4 ${isDark?"bg-gray-700 text-gray-300":"bg-gray-50 text-gray-700 border"}`}
        onChange={(e)=>{
          setFilterByRegion(e.target.value)
          setFilter("")
        }}
      >
        <option hidden>
          Filter by region
        </option>
        {regions.map((region,index)=>(<option key={index} value={region.toLowerCase()}>{region}</option>))}
      </select>
    </div>
  );
};

export default Filter;
