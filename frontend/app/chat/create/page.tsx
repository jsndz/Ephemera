"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const Page: React.FC = () => {
  const router = useRouter();
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ephemera.onrender.com";
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io(siteUrl);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [siteUrl]);
  const handleGroupChat = () => {
    socket?.emit("createRoom");
    socket?.on("getRoomId", (roomId) => {
      router.push(`/chat/join/${roomId}`);
    });
  };
  return (
    <div>
      <section className="flex justify-center items-center bg-WHITE p-8  ">
        <Image src="/logo.svg" width={500} height={500} alt="Logo"></Image>
      </section>
      <section className="bg-WHITE p-8  text-center">
        <h1 className="text-2xl  mb-6">Create a Chat room</h1>
        <button className="button-create lg:inline-block py-2 px-6 bg-RED hover:bg-ORANGE text-sm text-white font-bold rounded-xl transition duration-200 ">
          one-on-one chat
        </button>
        <button
          onClick={() => {
            handleGroupChat();
          }}
          className="button-create lg:inline-block py-2 px-6 bg-RED hover:bg-ORANGE text-sm text-white font-bold rounded-xl transition duration-200 "
        >
          group chat
        </button>
      </section>
    </div>
  );
};

export default Page;
