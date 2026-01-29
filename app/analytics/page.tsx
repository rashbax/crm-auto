"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function AnalyticsPage() {
  const [lang, setLang] = useState<Language>("ru");

  useEffect(() => {
    setLang(storage.getLang());
  }, []);

  return (
    <Layout>
      <div className="page-header mb-3.5">
        <div>
          <div className="text-xl font-semibold">
            {getTranslation(lang, "analytics_title")}
          </div>
          <div className="text-[13px] text-[#6B7280]">
            {getTranslation(lang, "analytics_subtitle")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="text-sm text-[#6B7280] mb-1">
            {getTranslation(lang, "analytics_kpi_revenue_title")}
          </div>
          <div className="text-2xl font-bold">₽ 1,247,890</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="text-sm text-[#6B7280] mb-1">
            {getTranslation(lang, "analytics_kpi_orders_title")}
          </div>
          <div className="text-2xl font-bold">124</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="text-sm text-[#6B7280] mb-1">
            {getTranslation(lang, "analytics_kpi_avg_check_title")}
          </div>
          <div className="text-2xl font-bold">₽ 10,064</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="text-sm text-[#6B7280] mb-1">
            {getTranslation(lang, "analytics_kpi_margin_title")}
          </div>
          <div className="text-2xl font-bold">42%</div>
        </div>
      </div>
    </Layout>
  );
}
