"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export function Chat() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Welcome! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.response || "Error: No response", sender: "bot" as const };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [...prev, { text: "Error: Could not connect to server", sender: "bot" as const }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sync = async () => {
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch("http://localhost:8000/check", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sync Result:", data);
    } catch (error) {
      console.error("Error syncing uploads:", error);
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };
  

  return (
    <div className="relative h-full w-full flex items-center justify-center pt-[10vh] flex-1 rounded-xl p-0">
      <div className="h-[calc(100vh-10rem)] w-screen flex items-center justify-center overflow-hidden">
        <div className="relative h-full w-[70vw] p-4">
          <div className="space-y-4 overflow-y-auto max-h-[65vh] no-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-5 py-3 b-2 rounded-lg w-fit max-w-[70%] ${
                  msg.sender === "user" ? "bg-black text-white self-end ml-auto mb-4" : "bg-transparent text-black self-start mb-4"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] w-[70vw] mb-[1rem] flex flex-col items-center justify-between absolute bottom-4 border border-black/20 border-opacity-50 rounded-2xl h-[7.5rem]">
        <div className="w-full flex flex-row items-center justify-between">
          <textarea
            className="w-full h-[6vh] pt-2 px-6 mt-2 rounded-lg bg-transparent text-black focus:outline-none resize-none"
            placeholder="Enter your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <Send onClick={handleSendMessage} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer mr-4 mt-2" size={35} />
        </div>
        <div className="w-full flex flex-row items-center pl-4 mb-4">
          <button
            onClick={sync}
            className="px-4 py-1 text-sm rounded-lg bg-black/70 text-white hover:bg-white hover:text-black/50 border border-white hover:border-black/50 transition duration-300"
            disabled={loading}
          >
            {loading ? "Syncing..." : "Sync New Uploads"}
          </button>
        </div>
      </div>
    </div>
  );
}
