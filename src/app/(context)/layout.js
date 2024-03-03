"use client";
import { Providers } from "@/redux/Providers";

export default function Layout({ children }) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  );
}
