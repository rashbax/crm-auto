"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function FinancePage() {
  const [lang, setLang] = useState<Language>("ru");

  useEffect(() => {
    setLang(storage.getLang());
  }, []);

  return (
    <Layout>
      <div className="page-header mb-3.5">
        <div>
          <div className="text-xl font-semibold">
            {getTranslation(lang, "finance_title")}
          </div>
          <div className="text-[13px] text-[#6B7280]">
            {getTranslation(lang, "finance_subtitle")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 px-5 border border-[#E5E7EB] shadow-sm">
          <div className="text-[15px] font-semibold mb-4">
            {getTranslation(lang, "finance_balance_card_title")}
          </div>
          <div className="text-[26px] font-bold mb-2">₽ 342,500</div>
          <div className="text-sm text-[#6B7280]">
            {getTranslation(lang, "finance_balance_current_label")}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 px-5 border border-[#E5E7EB] shadow-sm">
          <div className="text-[15px] font-semibold mb-4">
            {getTranslation(lang, "finance_cashflow_card_title")}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[#6B7280]">
                {getTranslation(lang, "finance_cashflow_in_label")}
              </span>
              <span className="text-sm font-medium">₽ 450,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#6B7280]">
                {getTranslation(lang, "finance_cashflow_out_label")}
              </span>
              <span className="text-sm font-medium">₽ 107,500</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
