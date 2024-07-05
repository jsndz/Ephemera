"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const page = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io("http://localhost:3000");
    console.log("connected");
  }, []);
  return <div>dd</div>;
};

export default page;
