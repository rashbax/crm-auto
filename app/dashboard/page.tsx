"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language, Task } from "@/types";

export default function DashboardPage() {
  const [lang, setLang] = useState<Language>("ru");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setLang(storage.getLang());
    setTasks(storage.getTasks());
  }, []);

  const handleTaskComplete = (id: string) => {
    storage.deleteTask(id);
    setTasks(storage.getTasks());
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <div className="page-title">{getTranslation(lang, "dashboard_title")}</div>
          <div className="page-subtitle">
            {getTranslation(lang, "dashboard_subtitle")}
          </div>
        </div>
        <button className="btn-ghost">Analitika</button>
      </div>

      <div className="card-grid">
        <section className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                {getTranslation(lang, "dashboard_card_orders_title")}
              </div>
              <div className="card-subtitle">
                {getTranslation(lang, "dashboard_card_orders_subtitle")}
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="metric-main">9 508 873 ₽</div>
            <div className="metric-row">
              <span className="metric-label">
                {getTranslation(lang, "dashboard_revenue_label")}
              </span>
              <span className="metric-change negative">-35,28%</span>
              <span className="metric-label">• 12 283 dona</span>
            </div>

            <div
              style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}
            >
              {getTranslation(lang, "dashboard_chart_placeholder")}
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <div className="card-title">
              {getTranslation(lang, "dashboard_balance_card_title")}
            </div>
          </div>

          <div className="card-body">
            <div>
              <div className="card-subtitle">
                {getTranslation(lang, "dashboard_current_balance")}
              </div>
              <div className="metric-main" style={{ marginTop: 4 }}>
                2 088 841 ₽
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <span className="card-subtitle">
                {getTranslation(lang, "dashboard_accrued_november")}
              </span>
              <div className="metric-row">
                <span className="metric-main" style={{ fontSize: 18 }}>
                  793 167 ₽
                </span>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="card-title" style={{ fontSize: 13 }}>
                {getTranslation(lang, "dashboard_tasks_today")}
              </div>
              <div className="tasks-list">
                {tasks.slice(0, 3).map((task, idx) => (
                  <div key={task.id} className="task-item">
                    <div className="task-label">
                      <input
                        type="checkbox"
                        onChange={() => handleTaskComplete(task.id)}
                      />
                      <span>{task.title}</span>
                    </div>
                    <div className="task-counter">{idx === 0 ? "•" : "•"}</div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <>
                    <div className="task-item">
                      <div className="task-label">
                        <input type="checkbox" />
                        <span>{getTranslation(lang, "dashboard_task_discounts")}</span>
                      </div>
                      <div className="task-counter">62</div>
                    </div>
                    <div className="task-item">
                      <div className="task-label">
                        <input type="checkbox" />
                        <span>{getTranslation(lang, "dashboard_task_customers")}</span>
                      </div>
                      <div className="task-counter">2</div>
                    </div>
                    <div className="task-item">
                      <div className="task-label">
                        <input type="checkbox" />
                        <span>{getTranslation(lang, "dashboard_task_questions")}</span>
                      </div>
                      <div className="task-counter">2</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="card page-footer-card">
        <div className="card-header">
          <div className="card-title">{getTranslation(lang, "dashboard_summary_title")}</div>
          <span className="chip">{getTranslation(lang, "summary_chip_last28")}</span>
        </div>
        <div className="card-body">
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            {getTranslation(lang, "dashboard_summary_text")}
          </p>
        </div>
      </section>
    </Layout>
  );
}
