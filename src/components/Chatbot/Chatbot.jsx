import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Add greeting message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 👋 I'm Khelbot, your sports assistant. I can answer questions about cricket, football, kabaddi, hockey, basketball, and more. What would you like to know?",
        },
      ]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const contents = [
        {
          type: "text",
          text:
            "You are Khelbot, a sports-specialized chatbot. Answer questions about all sports including cricket, football, kabaddi, hockey, basketball, and more.",
        },
        ...newMessages.map((msg) => ({
          type: "text",
          text: `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`,
        })),
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
      });

      const answer = response.text;
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Sorry, I ran into an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-lg flex flex-col p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">Khelbot</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-2 max-h-72 p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-xl max-w-[70%] text-sm break-words ${msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none shadow"
                  : "bg-gray-200 text-gray-800 rounded-bl-none shadow"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
          { loading && (
            <div className="flex justify-start items-center space-x-2">
              <span className="italic text-gray-500">Khelbot is typing</span>
              <span className="typing-dots flex space-x-1">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about any sport..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
