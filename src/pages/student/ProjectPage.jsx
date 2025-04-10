// ProjectPage.jsx
import React, { useState } from "react";
import { GitGraph, Code, Send, UploadCloud } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import AnalyzeAIButton from "../../components/atoms/AnalyzeAIButton";
ChartJS.register(ArcElement, Tooltip, Legend);

const members = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Carol" },
  { name: "Dave" },
  { name: "Eve" },
  { name: "Frank" },
];

const pieData = {
  labels: members.map((m) => m.name),
  datasets: [
    {
      data: [15, 10, 20, 25, 20, 10],
      backgroundColor: [
        "#005F73",
        "#0A9396",
        "#EE9B00",
        "#94D2BD",
        "#E9D8A6",
        "#001219",
      ],
      borderWidth: 1,
    },
  ],
};

const pieOptions = {
  plugins: { legend: { position: "bottom" } },
  maintainAspectRatio: false,
};

const milestones = [
  { label: "Frontend Development", date: "2025-05-01" },
  { label: "Backend Development", date: "2025-06-01" },
  { label: "Testing & QA", date: "2025-07-01" },
  { label: "Deployment", date: "2025-08-01" },
];

export default function ProjectPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with this project?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6">
      {/* Top Bar */}
      <div className="bg-secondary text-white rounded-lg p-4 text-lg font-semibold">
        Group Name&nbsp;:&nbsp;Project Name
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1️⃣ Repo & AI */}
        <div className="card flex flex-col h-full space-y-4">
          {/* Upload Repo */}
          <button className="w-full flex items-center justify-center p-3 bg-light border-2 border-secondary rounded-lg text-secondary hover:bg-secondary/10 transition">
            <GitGraph className="w-5 h-5 mr-2" /> Upload Repo Link
          </button>

          {/* Member Avatars */}
          <div className="flex flex-wrap justify-center gap-4">
            {members.map((m) => (
              <div key={m.name} className="flex flex-col items-center">
                <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-xs">
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="mt-1 text-xs text-dark">{m.name}</span>
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <div className="relative w-full h-full">
              <Pie
                data={pieData}
                options={pieOptions}
                key={JSON.stringify(pieData)}
              />
            </div>
          </div>

          {/* AI Analyze Button */}
          <AnalyzeAIButton />
        </div>

        {/* 2️⃣ Chat Interface */}
        <div className="card flex flex-col h-full">
          <h3 className="text-lg font-semibold text-dark mb-4">Doubt Solver</h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.from === "bot"
                    ? "bg-secondary/20 self-start"
                    : "bg-primary/20 self-end"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              className="flex-1 p-2 border border-secondary rounded-lg focus:ring-1 focus:ring-secondary"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3️⃣ Progress Timeline */}
        <div className="card flex flex-col h-full">
          <h3 className="text-lg font-semibold text-dark mb-4">
            Project Timeline
          </h3>
          <ul className="border-l-2 border-secondary pl-4 space-y-4 flex-1 overflow-y-auto">
            {milestones.map((m, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-3 top-1 bg-secondary w-3 h-3 rounded-full"></span>
                <div className="flex justify-between">
                  <span className="font-medium text-dark">{m.label}</span>
                  <span className="text-sm text-secondary">{m.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disabled Upload All Button */}
      <button
        disabled
        className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full opacity-50 cursor-not-allowed shadow-lg"
      >
        <UploadCloud className="w-6 h-6" />
      </button>
    </div>
  );
}
