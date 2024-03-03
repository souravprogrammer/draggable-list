"use client";
import { Providers } from "@/redux/Providers";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <div>
      <Providers>{children}</Providers>
      <Toaster />
    </div>
  );
}
