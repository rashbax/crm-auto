"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

export default function OrdersPage() {
  const [lang, setLang] = useState<Language>("ru");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLang(storage.getLang());
  }, []);

  // Mock orders data
  const orders = [
    {
      id: "#54712",
      date: "16 ноя 2024, 14:23",
      marketplace: "Ozon",
      customer: "Олег К.",
      items: "3 товара",
      amount: 2_450,
      status: "new" as const,
    },
    {
      id: "#54711",
      date: "16 ноя 2024, 12:15",
      marketplace: "Wildberries",
      customer: "Мария С.",
      items: "1 товар",
      amount: 890,
      status: "processing" as const,
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700";
      case "processing":
        return "bg-yellow-50 text-yellow-700";
      case "shipped":
        return "bg-green-50 text-green-700";
      case "cancelled":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <Layout>
      <div className="page-header mb-3.5">
        <div>
          <div className="text-xl font-semibold">
            {getTranslation(lang, "orders_title")}
          </div>
          <div className="text-[13px] text-[#6B7280]">
            {getTranslation(lang, "orders_subtitle")}
          </div>
        </div>
        <Link
          href="/orders/new"
          className="rounded-full px-3.5 py-1.5 text-sm font-medium bg-[#005BFF] text-white hover:brightness-105"
        >
          {getTranslation(lang, "orders_new_button")}
        </Link>
      </div>

      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={getTranslation(lang, "orders_search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[260px] max-w-[360px] h-[34px] px-2.5 rounded-lg border border-[#E5E7EB] text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-[#E6F0FF] text-[#005BFF]">
            {getTranslation(lang, "orders_badge_total")}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm mt-2 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_id")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_date")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_marketplace")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_customer")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_items")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_amount")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_status")}
              </th>
              <th className="px-2.5 py-2 text-left font-medium text-[#6B7280] text-[13px] border-b border-[#e5e7eb]">
                {getTranslation(lang, "orders_th_actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#f3f4ff] border-b border-[#e5e7eb] last:border-0"
              >
                <td className="px-2.5 py-2">{order.id}</td>
                <td className="px-2.5 py-2 text-[#6B7280] text-[13px]">
                  {order.date}
                </td>
                <td className="px-2.5 py-2">{order.marketplace}</td>
                <td className="px-2.5 py-2">{order.customer}</td>
                <td className="px-2.5 py-2">{order.items}</td>
                <td className="px-2.5 py-2 font-medium">
                  ₽ {order.amount.toLocaleString()}
                </td>
                <td className="px-2.5 py-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {getTranslation(lang, `orders_status_${order.status}`)}
                  </span>
                </td>
                <td className="px-2.5 py-2">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-[13px] text-[#005BFF] hover:underline"
                  >
                    {getTranslation(lang, "orders_action_open")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
