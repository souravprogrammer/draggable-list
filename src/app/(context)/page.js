"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/header";
import Board from "@/components/common/board";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
}
