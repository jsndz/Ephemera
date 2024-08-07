"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [roomId, setRoomId] = useState("");

  return (
    <div className="min-h-screen bg-[#B2BBDA] flex flex-col justify-center items-center">
      <section className="flex justify-center items-center bg-[#FFFFFF] p-8 shadow-lg rounded-lg mb-8">
        <Image src="/logo.svg" width={300} height={300} alt="Logo" />
      </section>
      <section className="bg-[#FFFFFF] p-8 shadow-lg rounded-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#EA3A36] mb-6">
          Welcome to Our Chat Platform
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#EA3A36] mb-4">
            Create a New Chat Room
          </h2>
          <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200">
            <Link href="/chat/create">Create Room</Link>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#EA3A36] mb-4">
            Join an Existing Chat Room
          </h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            className="w-full max-w-xs mb-4 p-2 rounded-md border-2 border-[#EA3A36] focus:border-[#F27D2C] bg-[#E8E7D5]"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200">
            <Link href={`/chat/join/${roomId}`}>Join Room</Link>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200">
            <Link href="/chat/with">One-on-One Chat</Link>
          </button>
          <button className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200">
            <Link href="/chat/P2P/with">P2P Chat</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
