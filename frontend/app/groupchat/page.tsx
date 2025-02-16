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
  const [isHost, setIsHost] = useState<boolean>(false);
  useEffect(() => {
    const newSocket = io(siteUrl);

    newSocket?.emit("registerP2P");
    newSocket?.on("getUserIdP2P", (userId) => {
      setUserId(userId);
    });
    newSocket?.on("messageRecipient", (message) => {
      setInbox((prevInbox) => [...prevInbox, message]);
    });

    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [siteUrl]);

  useEffect(() => {
    if (userId) {
      const newPeer = new Peer(userId);
      setPeer(newPeer);
      newPeer.on("connection", (conn) => {
        conn.on("data", (data) => {
          setInbox((prevInbox) => [...prevInbox, data as string]);
        });
        conn.on("open", () => {
          conn.send("hello!");
        });
      });
    }
  }, [userId]);

  useEffect(() => {
    if (peer && recipientId) {
      const conn = peer.connect(recipientId);

      conn.on("open", () => {
        conn.send(`${userId}`);
      });
    }
  }, [peer, recipientId]);

  socket?.on("error", (message: string) => {
    setError(message);
  });

  const handleMessaging = () => {
    if (peer && recipientId) {
      const conn = peer.connect(recipientId);
      conn.on("open", () => {
        conn.send(message);
        setInbox((prevInbox) => [...prevInbox, message]);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#B2BBDA] flex flex-col">
      <section className="flex justify-center items-center bg-[#FFFFFF] p-8 shadow-lg rounded-lg mb-8">
        <Image src="/logo.svg" width={300} height={300} alt="Logo" />
      </section>
      <section className="bg-[#FFFFFF] p-8 shadow-lg rounded-lg mx-auto w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#EA3A36] mb-6">
          Connect with a Peer
        </h1>
        <h1 className="text-3xl  text-[#EA3A36] mb-6">
          Your Id: {`${userId}`}
        </h1>
        <button
          onClick={() => {
            setIsHost(true);
          }}
        >
          be the host
        </button>
        {isHost ? (
          <div>Allow others to connect using your Peer ID.</div>
        ) : (
          <div></div>
        )}
        <p className="text-lg mb-6 text-[#EA3A36]">
          Enter the Peer ID to start messaging.
        </p>
        {!isHost && (
          <input
            type="text"
            placeholder="Enter Peer ID"
            className="w-full mb-4 p-2 rounded-md border-2 border-[#EA3A36] focus:border-[#F27D2C] bg-[#E8E7D5]"
            onChange={(e) => setRecipientId(e.target.value)}
          />
        )}
        <div className="flex flex-col h-96 bg-[#E8E7D5] rounded-lg p-4 overflow-y-auto">
          <div className="flex flex-col h-full">
            {error ? (
              <div className="text-red-500">Error: {error}</div>
            ) : (
              <div className="flex flex-col gap-2">
                {inbox.map((msg, index) => (
                  <div
                    className="bg-[#FFFFFF] p-3 rounded-lg shadow"
                    key={index}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#EA3A36] text-white flex items-center justify-center">
                        {userId[0]}
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
        </div>
        <div className="flex items-center mt-4 bg-[#FFFFFF] rounded-xl shadow-lg p-4">
          <input
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border rounded-xl p-2 border-[#EA3A36] focus:border-[#F27D2C] bg-[#E8E7D5] text-[#333]"
          />
          <button
            onClick={handleMessaging}
            className="ml-4 bg-[#EA3A36] hover:bg-[#F27D2C] text-white font-bold rounded-xl px-4 py-2"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
