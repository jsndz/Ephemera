"use client";
import Foot from "@/components/Home/Foot";
import Hero from "@/components/Home/Hero";
import Info from "@/components/Home/Info";
import NavHome from "@/components/Home/NavHome";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ephemera.onrender.com");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <NavHome></NavHome>
      <Hero></Hero>
      <Info></Info>
      <Foot></Foot>
    </div>
  );
}
