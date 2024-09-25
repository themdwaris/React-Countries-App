import React from "react";
import { Link } from "react-router-dom";


const Header = ({theme}) => {

  const [isDark,setIsDark]=theme
  
  // useEffect(() => {
  //   setIsDark(JSON.parse(localStorage.getItem("isDark")));
  // }, []);

  return (
    <div
      className={`w-full px-8 py-6 leading-3 sticky top-0 z-10 ${
        isDark
          ? "bg-gray-800 text-gray-50"
          : "bg-gray-50 text-gray-800 border-b"
      }`}
    >
      <div className="max-w-6xl flex items-center justify-between mx-auto">
        <h1 className="font-semibold text-[21px] md:text-2xl">
          <Link to="/" className="flex items-center gap-1"><span>Where in the</span><ion-icon name="earth-outline"></ion-icon></Link>
        </h1>
        <div
          className="text-xl flex items-center cursor-pointer"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDark", !isDark);
          }}
        >
          <ion-icon name={`${isDark ? "sunny" : "moon"}-outline`}></ion-icon>
          &nbsp; <span className="text-base ">{isDark?"Light":"Dark"}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
