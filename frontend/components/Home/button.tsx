import { useEffect, useState } from "react";
import Link from "next/link";

const ButtonComponent = () => {
  const [isIn, setIsIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsIn(true), 1000);
    const timer2 = setTimeout(() => setIsReady(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
      <Link href="/">
        <div
          className={`relative inline-block text-center text-white font-bold uppercase transition-all duration-400 ease-in-out 
            ${
              isIn
                ? "bg-gradient-to-r from-green-400 to-blue-500 p-[0.375em]"
                : ""
            } 
            ${isReady ? "hover:letter-spacing-wider" : ""}
          `}
        >
          <span className={`relative z-10 block bg-gray-800 px-7 py-2`}>
            Explore
          </span>
          <span
            className={`absolute inset-0 border-4 border-transparent transition-all duration-400 ease-in-out
              ${
                isIn
                  ? "border-l-green-400 border-r-blue-500 border-t-green-400 border-b-blue-500"
                  : ""
              }
            `}
          />
          <span
            className={`absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-400 ease-in-out
              ${isIn ? "w-full h-full opacity-0" : "w-0 h-0 opacity-100"}
            `}
          />
        </div>
      </Link>
    </div>
  );
};

export default ButtonComponent;
