"use client";

import Hero from "@/components/Home/Hero";
import NavHome from "@/components/Home/NavHome";
import Info from "@/components/Home/Info";
import { useDispatch, useSelector } from "react-redux";

import Foot from "@/components/Home/Foot";
import "./WavyBackgroundPage.css";
import SineWaveBackground from "@/components/Home/BackGround";

export default function Home() {
  return <SineWaveBackground></SineWaveBackground>;
}

// <div>
//       <SineWaveBackground></SineWaveBackground>
//       <NavHome />
//       <Hero />
//       <Info />
//       <Foot></Foot>
//     </div>
