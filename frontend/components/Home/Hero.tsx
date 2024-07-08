import Image from "next/image";
import React from "react";
import Slide from "./Slide";
import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className=" text-black ">
        <div className="container mx-auto flex flex-col md:flex-row items-center  md:mt-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start pt-8 ">
            <h1 className="text-3xl md:text-5xl p-2 text-red-500 tracking-loose">
              Ephemera
            </h1>
            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
              <span>Private Meetings:</span> <br />
              <span className="whitespace-nowrap"> Secure and Transient</span>
            </h2>
            <p className="text-sm md:text-base text-orange-500 mb-4">
              Experience secure, login-free, and private meetings with Ephemera.
              Create a room ID and start your private communication instantly.
            </p>

            <Link
              href="/chat"
              className="bg-transparent hover:bg-BEIGE text-RED hover:text-ORANGE rounded shadow hover:shadow-lg py-2 px-4 border border-RED hover:border-transparent"
            >
              Explore Now
            </Link>
          </div>
          <Slide />
        </div>
      </div>
    </section>
  );
};

export default Hero;
