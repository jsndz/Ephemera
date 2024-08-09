import Link from "next/link";
import React from "react";
import "./GradientBorderBox.css";
const Info = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl p-4 rounded-lg  overflow-hidden lg:flex lg:items-center">
        <div className="relative mx-auto max-w-xl text-center p-10 bg-white   rounded-lg ">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Experience Secure Meetings.
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              No One will Know.{" "}
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Your data is stored nowhere!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/chat"
            >
              Get Started
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/chat"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
