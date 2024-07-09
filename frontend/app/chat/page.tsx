"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [roomId, setRoomId] = useState("");
  return (
    <div>
      <section className="flex justify-center items-center bg-WHITE p-8  ">
        <Image src="/logo.svg" width={500} height={500} alt="Logo"></Image>
      </section>
      <section className="bg-WHITE p-8  text-center">
        <h1 className="text-2xl  mb-6">Create a Chat room</h1>
        <button className="button-create lg:inline-block py-2 px-6 bg-RED hover:bg-ORANGE text-sm text-white font-bold rounded-xl transition duration-200 ">
          <Link href="/chat/create">Create</Link>
        </button>
        <p className="my-4">OR</p>
        <h1 className="text-2xl mb-4">Join a Chat room</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-warning w-full max-w-xs"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
        <button className="button-join lg:inline-block py-2 px-6 bg-RED hover:bg-ORANGE text-sm text-white font-bold rounded-xl transition duration-200">
          <Link href={`/chat/join/${roomId}`}>Join</Link>
        </button>
        <div>
          <button className="button-create lg:inline-block py-2 px-6 bg-RED hover:bg-ORANGE text-sm text-white font-bold rounded-xl transition duration-200 ">
            <Link href="/chat/with"> one-on-one chat</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
