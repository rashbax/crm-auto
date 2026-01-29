"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function Topbar() {
  const [lang, setLang] = useState<Language>("ru");
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const currentLang = storage.getLang();
    setLang(currentLang);
    setLoggedUser(storage.getLoggedUser());
  }, []);

  const handleLangChange = (newLang: Language) => {
    storage.setLang(newLang);
    setLang(newLang);
    // Keep behavior similar to original (re-apply i18n everywhere)
    window.location.reload();
  };

  return (
    <header className="topbar">
      <div className="brand-left">
        <div className="brand-logo">R&J</div>
        <div>
          <div className="brand-text-main">Rubi&Jons</div>
          <div className="brand-text-sub">
            {getTranslation(lang, "topbar_subtitle")}
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="lang-switch">
          <button
            className={`lang-btn ${lang === "ru" ? "active" : ""}`}
            onClick={() => handleLangChange("ru")}
          >
            RU
          </button>
          <button
            className={`lang-btn ${lang === "uz" ? "active" : ""}`}
            onClick={() => handleLangChange("uz")}
          >
            UZ
          </button>
        </div>
        <button className="btn-ghost">{getTranslation(lang, "topbar_help")}</button>
        <div className="avatar">{loggedUser.charAt(0).toUpperCase() || "N"}</div>
      </div>
    </header>
  );
}
