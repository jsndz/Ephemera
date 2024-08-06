"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Peer } from "peerjs";
const Page: React.FC = () => {
  const router = useRouter();
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ephemera.onrender.com";

  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [inbox, setInbox] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(siteUrl);

    newSocket?.emit("registerP2P");
    newSocket?.on("getUserIdP2P", (userId) => {
      setUserId(userId);
    });
    newSocket?.on("messageRecipient", (message) => {
      console.log("message", message);
      setInbox((prevInbox) => [...prevInbox, message]);
    });

    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    const newPeer = new Peer(userId);
    setPeer(newPeer);
    newPeer.on("connection", (conn) => {
      conn.on("data", (data) => {
        setInbox((prevInbox: string[]) => [...prevInbox, data as string]);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
  }, [userId]);
  useEffect(() => {
    const conn = peer?.connect(recipientId);
    conn?.on("open", () => {
      conn.send("hi!");
    });
  }, [peer, recipientId]);
  socket?.on("error", (message: string) => {
    setError(message);
  });
  const handleMessaging = () => {
    const conn = peer?.connect(recipientId);
    conn?.on("open", () => {
      // conn.send(message);
    });
    conn?.on("data", (data) => {
      conn.send(message);

      setInbox((prevInbox: string[]) => [...prevInbox, message as string]);
    });
  };
  console.log("U", inbox);
  return (
    <div>
      <section className="flex justify-center items-center bg-WHITE p-8  ">
        <Image src="/logo.svg" width={500} height={500} alt="Logo"></Image>
      </section>
      <p>{userId}</p>
      <section className="bg-WHITE p-8  text-center">
        <h1 className="text-2xl  mb-6">Enter the ChatId </h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-warning w-full max-w-xs"
          onChange={(e) => {
            setRecipientId(e.target.value);
          }}
        />

        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {error ? (
                  <div>Room does not exist {error}</div>
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
                  onClick={handleMessaging}
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
      </section>
    </div>
  );
};

export default Page;
