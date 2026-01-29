"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { storage } from "@/lib/storage";
import { getTranslation } from "@/lib/translations";
import type { Language, Task } from "@/types";

export default function CRMPage() {
  const [lang, setLang] = useState<Language>("ru");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskRef, setNewTaskRef] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");

  useEffect(() => {
    setLang(storage.getLang());
    setTasks(storage.getTasks());
  }, []);

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) {
      alert("Avval vazifa nomini kiriting.");
      return;
    }

    storage.addTask({
      title: newTaskTitle,
      ref: newTaskRef,
      due: newTaskDue,
      notes: newTaskNotes,
    });

    setTasks(storage.getTasks());
    setNewTaskTitle("");
    setNewTaskRef("");
    setNewTaskDue("");
    setNewTaskNotes("");
    alert("Vazifa saqlandi va endi yo'qolmaydi ✅");
  };

  const handleTaskComplete = (id: string) => {
    storage.deleteTask(id);
    setTasks(storage.getTasks());
  };

  return (
    <Layout>
      <div className="page-header mb-3.5">
        <div>
          <div className="text-xl font-semibold">
            {getTranslation(lang, "crm_title")}
          </div>
          <div className="text-[13px] text-[#6B7280]">
            {getTranslation(lang, "crm_subtitle")}
          </div>
        </div>
        <button className="rounded-full px-3.5 py-1.5 text-sm font-medium bg-[#005BFF] text-white hover:brightness-105">
          {getTranslation(lang, "crm_new_task_title")}
        </button>
      </div>

      <div className="grid grid-cols-[260px_1.9fr] gap-4 mt-3">
        {/* Tasks List */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col overflow-hidden">
          <div className="p-2.5 px-3 border-b border-[#e5e7eb]">
            <div className="text-sm font-semibold">
              {getTranslation(lang, "crm_tasks_title")}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-2 px-2.5 border-b border-[#f3f4f6] hover:bg-[#f9fafb] cursor-pointer last:border-0"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-sm">
                    <input
                      type="checkbox"
                      onChange={() => handleTaskComplete(task.id)}
                      className="cursor-pointer"
                    />
                    <span>{task.title}</span>
                  </label>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="p-4 text-sm text-[#6B7280] text-center">
                {getTranslation(lang, "crm_task_discounts")}
              </div>
            )}
          </div>
        </div>

        {/* New Task Form */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4">
          <div className="text-[15px] font-semibold mb-4">
            {getTranslation(lang, "crm_new_task_title")}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#6B7280] mb-1">
                Vazifa nomi *
              </label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-sm"
                placeholder="Vazifa nomini kiriting"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7280] mb-1">
                Ma&apos;lumot
              </label>
              <input
                type="text"
                value={newTaskRef}
                onChange={(e) => setNewTaskRef(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-sm"
                placeholder="Ma'lumot"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7280] mb-1">
                Muddati
              </label>
              <input
                type="date"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7280] mb-1">
                Izohlar
              </label>
              <textarea
                value={newTaskNotes}
                onChange={(e) => setNewTaskNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-sm min-h-[80px] resize-y"
                placeholder="Izohlar"
              />
            </div>

            <button
              onClick={handleSaveTask}
              className="w-full py-2 bg-[#005BFF] text-white rounded-lg hover:brightness-105"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
