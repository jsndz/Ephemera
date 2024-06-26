"use client";

import NavHome from "@/components/Home/NavHome";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    <NavHome />
  );
}
