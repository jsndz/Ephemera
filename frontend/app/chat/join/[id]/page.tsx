"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const Page: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inbox, setInbox] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ephemera.onrender.com";

  const { id } = useParams();

  const handleSendMessage = () => {
    if (message.trim()) {
      socket?.emit("message", message, id);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  useEffect(() => {
    if (!id) return;

    const newSocket = io(siteUrl);

    newSocket.emit("joinRoom", id);

    newSocket.on("message", (message) => {
      setInbox((prevInbox) => [...prevInbox, message]);
    });

    newSocket.on("error", (message: string) => {
      setError(message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [siteUrl, id]);

  return (
    <div className="flex flex-col h-screen bg-[#B2BBDA]">
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        <div className="flex flex-col py-8 px-4 bg-[#FFFFFF] flex-shrink-0 shadow-lg rounded-b-lg">
          <div className="flex flex-row items-center justify-center">
            <Image src="/logo.svg" width={300} height={300} alt="Logo" />
            <div className="ml-2 font-bold text-2xl text-[#EA3A36]">{id}</div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-[#E8E7D5] h-full p-4">
            <div className="flex flex-col h-full overflow-y-auto mb-4">
              {error ? (
                <div className="text-red-500">Error: {error}</div>
              ) : (
                <div className="flex flex-col gap-2">
                  {inbox.map((msg, index) => (
                    <div
                      className="bg-[#FFFFFF] p-3 rounded-lg shadow-md"
                      key={index}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#EA3A36] text-white flex items-center justify-center">
                          M
                        </div>
                        <div className="ml-3 text-sm bg-[#FFFFFF] py-2 px-4 shadow rounded-xl">
                          {msg}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-[#FFFFFF] w-full px-4 shadow-md">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded-xl focus:outline-none focus:border-[#F27D2C] pl-4 h-10"
                  placeholder="Type your message..."
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="ml-4 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl px-4 py-2"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
