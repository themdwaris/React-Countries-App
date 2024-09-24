import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import DetailShimmer from "./DetailShimmer";

const CountryDetail = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  //   const {isDark}=useThemeProvider()
  const [isDark] = useOutletContext();

  const updateCountryData = (result) => {
    setData({
      flag: result?.flags?.svg,
      name: result?.name?.common,
      nativeName: Object.values(result?.name?.nativeName ||{})[0]?.common,
      population: result?.population,
      region: result?.region,
      subRegion: result?.subregion,
      capital: result?.capital,
      tld: result?.tld,
      currencies: Object.values(Object.values(result?.currencies||{})[0]||{}),
      languages: Object.values(result?.languages || {})
        ?.map((lang) => lang)
        ?.join(", "),
      borders: [],
    });

    if (!result?.borders) {
      result.borders = [];
    }
    Promise.all(
      result?.borders?.map(async (border) => {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${border}`
        );
        const [result] = await res.json();
        return result?.name?.common;
      })
    ).then((borders) =>
      setData((prev) => {
        // console.log(borders);
        return { ...prev, borders };
      })
    );
  };

  const fetchSingleCountry = async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${params?.countryDetail}`
      );
      const [result] = await res?.json();
      // console.log(Object.values(Object.values(result?.currencies)[0]));
      //   console.log(result);
      setError(false);
      updateCountryData(result);

      //   setData({
      //     flag: result?.flags?.svg,
      //     name: result?.name?.common,
      //     nativeName: Object.values(result?.name?.nativeName)[0].common,
      //     population: result?.population,
      //     region: result?.region,
      //     subRegion: result?.subregion,
      //     capital: result?.capital,
      //     tld: result?.tld,
      //     currencies: Object.values(Object.values(result?.currencies)[0]),
      //     languages: Object?.values(result?.languages)
      //       ?.map((lang) => lang)
      //       ?.join(", "),
      //     borders: [],
      //   });

      //   if(!result?.borders){
      //     result.borders=[]
      //   }
      //   Promise.all(
      //     result?.borders?.map(async (border) => {
      //       const res = await fetch(
      //         `https://restcountries.com/v3.1/alpha/${border}`
      //       );
      //       const [result] = await res.json();
      //       return result?.name?.common;
      //     })
      //   ).then((borders) => setData((prev) => {
      //     // console.log(borders);
      //     return ({ ...prev, borders })
      //   }));
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (location?.state) {
      updateCountryData(location?.state);
      return;
    } else {
      fetchSingleCountry();
    }
  }, [params]);

  if (error) {
    return (
      <div
        className={`w-full min-h-lvh text-center text-3xl font-semibold mt-8 ${
          isDark ? "bg-gray-900 text-gray-50" : "bg-gray-50 text-gray-800"
        }`}
      >
        Country not found
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-lvh ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-6xl mx-auto py-8 px-6 xl:px-0">
        <button
          className="outline-none text-white text-2xl font-semibold px-7  py-2 rounded-lg cursor-pointer bg-gray-700 shadow-md mt-10 leading-3 transition duration-200 hover:-translate-x-2"
          onClick={() => navigate(-1)}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        {data === undefined ? (
          <div className="w-full max-w-6xl mx-auto py-8 px-6 xl:px-0 flex flex-wrap gap-3 items-center">
            <DetailShimmer />
          </div>
        ) : (
          <div
            className={`mt-8 grid grid-cols-1 md:grid-cols-2 ${
              isDark ? "text-gray-50" : "text-gray-800"
            }`}
          >
            <div className="items-start">
              <img
                src={data?.flag}
                alt="flag"
                className={`w-full md:w-[80%] object-cover ${
                  isDark ? "" : "border"
                }`}
              />
            </div>
            <div className="items-start">
              <p className={`text-3xl font-semibold mt-5 md:mt-0 py-3`}>
                {data?.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <div>
                  <p className="text-[16px] font-semibold mb-4">
                    Native name:
                    <span className="font-normal">
                      &nbsp;{data?.nativeName || data?.name}
                    </span>
                  </p>

                  <p className="text-[16px] font-semibold mb-4">
                    Population:
                    <span className="font-normal">
                    &nbsp; {data?.population?.toLocaleString("en-IN")}
                    </span>
                  </p>
                  <p className="text-[16px] font-semibold mb-4">
                    Region: <span className="font-normal">{data?.region}</span>
                  </p>
                  <p className="text-[16px] font-semibold mb-4">
                    Sub region:
                    <span className="font-normal">
                      &nbsp;{data?.region}
                    </span>
                  </p>
                  <p className="text-[16px] font-semibold mb-4">
                    Capital:
                    <span className="font-normal">
                      &nbsp;
                      {data?.capital?.map((capital) => capital).join(", ")}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold mb-4">
                    Top level domain:
                    <span className="font-normal"> {data?.tld}</span>
                  </p>
                  <p className="text-[16px] font-semibold mb-4">
                    Currencies:
                    <span className="font-normal">
                      &nbsp;
                      {data?.currencies?.map((currency) => currency).join(", ")}
                    </span>
                  </p>
                  <p className="text-[16px] font-semibold mb-4">
                    Languages:
                    <span className="font-normal"> {data?.languages}</span>
                  </p>
                </div>
              </div>
              <div className="mt-5">
                {data?.borders.length === 0 ? null : (
                  <p className="text-[16px] font-semibold mb-6 md:mb-4 flex flex-wrap gap-3">
                    Border countries:
                    {data?.borders.map((border, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/${border}`}
                          className="font-normal px-2 py-1 bg-slate-700 text-white rounded-md"
                        >
                          {border}
                        </Link>
                      );
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
