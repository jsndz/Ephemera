"use client";
import Foot from "@/components/Home/Foot";
import Hero from "@/components/Home/Hero";
import Info from "@/components/Home/Info";
import NavHome from "@/components/Home/NavHome";

export default function Home() {
  return (
    <div>
      <NavHome></NavHome>
      <Hero></Hero>
      <Info></Info>
      <Foot></Foot>
    </div>
  );
}
