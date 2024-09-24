import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Card from "./Card";
import ShimmerLoading from "./ShimmerLoading";

const Home = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterByRegion, setFilterByRegion] = useState("");

  const getCountryData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const result = await res?.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  const regions = data?.map((country) => country?.region);

  const uniqueRegion = regions.filter(
    (region, index) => regions.indexOf(region) == index
  );

  // data?.filter((country) =>
  //   country?.region.toLowerCase().includes(filterByRegion)
  // );
  // console.log(filterCountries);
  // console.log("".includes(""));
 
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-6 xl:px-0">
      <Filter
        filter={filter}
        setFilter={setFilter}
        filterByRegion={filterByRegion}
        setFilterByRegion={setFilterByRegion}
        regions={uniqueRegion}
      />
      {data.length === 0 ? (
        <div className="w-full max-w-6xl mx-auto py-8 px-6 xl:px-0 flex flex-wrap gap-3 items-center">
          {Array.from({ length: 15 }).map((val, index) => (
            <ShimmerLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6 items-center justify-center">
          {data
            ?.filter((country) =>
              filterByRegion
                ? country?.region.toLowerCase().includes(filterByRegion)
                : country?.name?.common.toLowerCase().includes(filter)||country?.region?.toLowerCase().includes(filter)
            )
            .map((country, index) => (
              <Card key={index} country={country} />
            ))}

          
        </div>
      )}
    </div>
  );
};

export default Home;
