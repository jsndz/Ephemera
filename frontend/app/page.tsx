"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  // const [roomId, setRoomId] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient ? (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <section className="flex justify-center items-center bg-[#FFFFFF] p-8 shadow-lg rounded-lg mb-8">
            <Image src="/logo.svg" width={300} height={300} alt="Logo" />
          </section>
          <div className="flex w-full max-w-4xl">
            <section className="bg-[#FFFFFF] p-8 shadow-lg rounded-lg text-center w-1/2">
              {/* <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200"> */}
              <Link href="/chat">Chat</Link>

              {/* </button> */}
            </section>
            <section className="bg-[#FFFFFF] p-8 shadow-lg rounded-lg text-center w-1/2">
              {/* <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200"> */}

              <Link href="/groupchat">group Chat</Link>

              {/* </button> */}
            </section>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Page;
