"use client";

import Hero from "@/components/Home/Hero";
import NavHome from "@/components/Home/NavHome";
import Info from "@/components/Home/Info";
import { useDispatch, useSelector } from "react-redux";

import Foot from "@/components/Home/Foot";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <NavHome />
      <Hero />
      <Info />
      <Foot></Foot>
    </div>
  );
}
