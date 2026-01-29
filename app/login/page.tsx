"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("uz");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (storage.isLoggedIn()) {
      router.push("/dashboard");
      return;
    }
    setLang(storage.getLang());
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const creds = storage.getCredentials();

    if (username === creds.username && password === creds.password) {
      storage.setLoggedIn(username);
      router.push("/dashboard");
    } else {
      setError(getTranslation(lang, "login_error"));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="flex gap-2.5 mb-5">
          <button
            onClick={() => {
              storage.setLang("uz");
              setLang("uz");
            }}
            className={`px-3 py-1.5 rounded ${
              lang === "uz" ? "bg-[#005BFF] text-white" : "bg-white"
            }`}
          >
            UZ
          </button>
          <button
            onClick={() => {
              storage.setLang("ru");
              setLang("ru");
            }}
            className={`px-3 py-1.5 rounded ${
              lang === "ru" ? "bg-[#005BFF] text-white" : "bg-white"
            }`}
          >
            RU
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-5">
            {getTranslation(lang, "login_title")}
          </h2>

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm">
              {getTranslation(lang, "login_user")}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2.5 py-2 border border-gray-200 rounded mb-4"
              required
            />

            <label className="block mb-2 text-sm">
              {getTranslation(lang, "login_pass")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2.5 py-2 border border-gray-200 rounded mb-4"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 bg-[#005BFF] text-white rounded hover:brightness-105"
            >
              {getTranslation(lang, "login_btn")}
            </button>

            {error && (
              <div className="mt-4 text-red-500 text-sm">{error}</div>
            )}

            <p className="mt-4 text-xs text-gray-500">
              {getTranslation(lang, "login_hint")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
