"use client";

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "@/lib/Features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {count}
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        IN
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        OUT
      </button>
    </main>
  );
}
