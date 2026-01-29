"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import Topbar from "./Topbar";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch: localStorage is client-only.
    // First render matches server (null), then we decide after mount.
    const isAuthed = storage.isLoggedIn();
    setAuthed(isAuthed);
    setReady(true);
    if (!isAuthed) router.replace("/login");
  }, [router]);

  if (!ready || !authed) return null;

  return (
    <div className="app-shell">
      <Topbar />
      <Navigation />
      <main className="main">{children}</main>
    </div>
  );
}
