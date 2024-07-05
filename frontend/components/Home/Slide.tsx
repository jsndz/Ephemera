import Image from "next/image";
import React, { useState } from "react";

const Slide = () => {
  return (
    <div className="w-full max-w-2xl h-96 flex flex-col mt-24 lg:ml-40 items-center justify-center">
      <input
        type="radio"
        name="slider"
        id="item-1"
        defaultChecked
        className="hidden"
      />
      <input type="radio" name="slider" id="item-2" className="hidden" />
      <input type="radio" name="slider" id="item-3" className="hidden" />

      <div className="relative w-full h-full mb-5 flex justify-center items-center">
        <label
          htmlFor="item-1"
          id="song-1"
          className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer"
        >
          <Image
            src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80"
            alt="song"
            className="w-full h-full  object-cover rounded-full shadow-lg"
          />
        </label>
        <label
          htmlFor="item-2"
          id="song-2"
          className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer"
        >
          <Image
            src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
            alt="song"
            className="w-full h-full  object-cover rounded-full shadow-lg"
          />
        </label>
        <label
          htmlFor="item-3"
          id="song-3"
          className="absolute w-3/5 h-full transform transition-transform duration-300 cursor-pointer"
        >
          <Image
            src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
            alt="song"
            className="w-full h-full  object-cover rounded-full shadow-lg"
          />
        </label>
      </div>

      <div className="bg-black rounded-lg  min-w-lg pt-28"></div>

      <style jsx>{`
        #item-1:checked ~ .relative #song-3,
        #item-2:checked ~ .relative #song-1,
        #item-3:checked ~ .relative #song-2 {
          transform: translateX(-40%) scale(0.8);
          opacity: 0.4;
          z-index: 0;
        }
        #item-1:checked ~ .relative #song-2,
        #item-2:checked ~ .relative #song-3,
        #item-3:checked ~ .relative #song-1 {
          transform: translateX(40%) scale(0.8);
          opacity: 0.4;
          z-index: 0;
        }
        #item-1:checked ~ .relative #song-1,
        #item-2:checked ~ .relative #song-2,
        #item-3:checked ~ .relative #song-3 {
          transform: translateX(0) scale(1);
          opacity: 1;
          z-index: 1;
        }
        #item-2:checked ~ .bg-white #info-area {
          transform: translateY(-36px);
        }
        #item-3:checked ~ .bg-white #info-area {
          transform: translateY(-72px);
        }
      `}</style>
    </div>
  );
};

export default Slide;
