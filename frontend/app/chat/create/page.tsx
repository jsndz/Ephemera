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
    <div className="min-h-screen bg-[#B2BBDA] flex flex-col justify-center items-center">
      <section className="flex justify-center items-center bg-[#FFFFFF] p-8 shadow-lg rounded-lg mb-8">
        <Image src="/logo.svg" width={300} height={300} alt="Logo" />
      </section>
      <section className="bg-[#FFFFFF] p-8 shadow-lg rounded-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#EA3A36] mb-6">Start a Chat</h1>
        <p className="text-lg mb-6 text-[#EA3A36]">
          Create a group chat room with a single click.
        </p>
        <button
          onClick={handleGroupChat}
          className="w-full py-2 px-6 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl transition duration-200"
        >
          Create Group Chat
        </button>
      </section>
    </div>
  );
};

export default Page;
