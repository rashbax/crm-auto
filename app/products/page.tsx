"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function ProductsPage() {
  const [lang, setLang] = useState<Language>("ru");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLang(storage.getLang());
  }, []);

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Футболка oversize Rubi&Jons",
      article: "RJ-001",
      sku: "RJ-001-BLK-M",
      price: 1_290,
      stock: 45,
      status: "active" as const,
    },
    {
      id: "2",
      name: "Футболка oversize Rubi&Jons",
      article: "RJ-001",
      sku: "RJ-001-WHT-L",
      price: 1_290,
      stock: 32,
      status: "active" as const,
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#ecfdf3] text-[#15803d]";
      case "draft":
        return "bg-[#f3f4f6] text-[#4b5563]";
      case "blocked":
        return "bg-[#fef2f2] text-[#b91c1c]";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <Layout>
      <div className="page-header mb-3.5">
        <div>
          <div className="text-xl font-semibold">
            {getTranslation(lang, "products_title")}
          </div>
          <div className="text-[13px] text-[#6B7280]">
            {getTranslation(lang, "products_subtitle")}
          </div>
        </div>
        <button className="rounded-full px-3.5 py-1.5 text-sm font-medium bg-[#005BFF] text-white hover:brightness-105">
          {getTranslation(lang, "products_new_button")}
        </button>
      </div>

      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={getTranslation(lang, "products_search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[260px] max-w-[360px] h-[34px] px-2.5 rounded-lg border border-[#E5E7EB] text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-[#E6F0FF] text-[#005BFF]">
            {getTranslation(lang, "products_active_badge")}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm mt-2 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_product")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_article")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_sku")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_price")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_stock")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_status")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "products_th_actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#f3f4ff] border-b border-[#e5e7eb] last:border-0"
              >
                <td className="px-2.5 py-2">{product.name}</td>
                <td className="px-2.5 py-2 text-[#6B7280] text-[13px]">
                  {product.article}
                </td>
                <td className="px-2.5 py-2 text-[#6B7280] text-[13px]">
                  {product.sku}
                </td>
                <td className="px-2.5 py-2 font-medium">
                  ₽ {product.price.toLocaleString()}
                </td>
                <td className="px-2.5 py-2">{product.stock}</td>
                <td className="px-2.5 py-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      product.status
                    )}`}
                  >
                    {getTranslation(lang, `status_${product.status}`)}
                  </span>
                </td>
                <td className="px-2.5 py-2">
                  <button className="text-[13px] text-[#005BFF] hover:underline">
                    {getTranslation(lang, "action_edit")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
