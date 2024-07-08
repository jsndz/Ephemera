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
    socket?.emit("message", message, id);
  };
  socket?.on("error", (message: string) => {
    setError(message);
  });
  useEffect(() => {
    if (!id) return;

    const newSocket = io(siteUrl);

    newSocket.emit("joinRoom", id);

    newSocket.on("message", (message) => {
      console.log("message", message);

      setInbox((prevInbox) => [...prevInbox, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [siteUrl, id]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        <div className="flex flex-col py-8 px-4 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center">
            <Image src="/logo.svg" width={400} height={400} alt="Logo"></Image>
            <div className="ml-2 font-bold text-2xl">{id}</div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  {error ? (
                    <div>Room doesn't exist {error}</div>
                  ) : (
                    <div className="grid grid-cols-12 gap-y-2">
                      {inbox.map((message, index) => {
                        return (
                          <div
                            className="col-start-1 col-end-8 p-3 rounded-lg"
                            key={index}
                          >
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                M
                              </div>
                              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{message}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-grow ml-4 justify-between">
                  <div className="relative w-full">
                    <input
                      type="text"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
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
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
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
      </div>
    </div>
  );
};

export default Page;
