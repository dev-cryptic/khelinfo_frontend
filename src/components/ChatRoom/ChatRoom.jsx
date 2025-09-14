import React, { useState, useEffect, useRef, useCallback } from "react";
import { database, ref, push, onChildAdded, off } from "../../firebase";

// Get user IP address
const getUserIP = async () => {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
};

const ChatRoom = ({ isOpen, toggleOpen, buttonRef }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [tempUsername, setTempUsername] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [banRemainingTime, setBanRemainingTime] = useState(0);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const abusiveWordsRef = useRef([]);
  const userIPRef = useRef(null);
  const bannedUntilRef = useRef(0);

  // Load abusive words from multiple languages
  useEffect(() => {
    const languageCodes = [
      "en", "hi", "es", "de", "fr", "it", "tr", "ru", "ko", "ja", "zh"
    ];

    Promise.all(
      languageCodes.map(code =>
        fetch(`https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/${code}`)
          .then(res => res.ok ? res.text() : "")
          .then(text => text.split("\n").map(word => word.trim().toLowerCase()))
      )
    ).then(results => {
      abusiveWordsRef.current = results.flat().filter(Boolean);
    });
  }, []);

  // Get IP
  useEffect(() => {
    getUserIP().then(ip => {
      userIPRef.current = ip;
    });
  }, []);

  // Firebase listener
  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const handleNewMessage = snapshot => {
      const msg = snapshot.val();
      setMessages(prev => [...prev, msg]);
    };
    onChildAdded(messagesRef, handleNewMessage);
    return () => off(messagesRef, "child_added", handleNewMessage);
  }, []);

  // Ban countdown
  useEffect(() => {
    if (banRemainingTime <= 0) return;
    const interval = setInterval(() => {
      setBanRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          bannedUntilRef.current = 0;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [banRemainingTime]);

  const containsAbuse = (text) => {
    const input = text.toLowerCase();
    return abusiveWordsRef.current.some(word => input.includes(word));
  };

  const sendMessage = async () => {
    const trimmed = message.trim();
    const now = Date.now();

    if (bannedUntilRef.current && now < bannedUntilRef.current) {
      const remaining = Math.ceil((bannedUntilRef.current - now) / 1000);
      setBanRemainingTime(remaining);
      alert(`\u{1F6AB} You are banned. Wait ${remaining} seconds.`);
      return;
    }

    if (!trimmed) return;

    if (containsAbuse(trimmed)) {
      bannedUntilRef.current = now + 10000;
      setBanRemainingTime(10);
      alert("\u{1F6D1} Abusive language detected. You are banned for 10 seconds.");
      return;
    }

    await push(ref(database, "messages"), {
      sender: username || "Guest",
      message: trimmed,
      createdAt: now,
    });
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const saveUsername = () => {
    const name = tempUsername.trim();
    if (name.length >= 3) {
      setUsername(name);
      localStorage.setItem("username", name);
    } else {
      alert("Minimum 3 characters");
    }
  };

  const toggleTheme = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem("theme", mode ? "dark" : "light");
  };

  const handleClickOutside = useCallback((e) => {
    if (
      chatRef.current &&
      !chatRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      toggleOpen(false);
    }
  }, [toggleOpen, buttonRef]);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div
        ref={chatRef}
        className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} w-80 rounded-xl shadow-2xl border border-gray-300 p-4 relative`}
      >
        <button
          className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full border"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!username ? (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Enter Your Name</h2>
            <input
              type="text"
              className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-200 border-gray-300 text-black"} w-full px-3 py-2 rounded-lg border focus:outline-none`}
              placeholder="Min 3 characters"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            <button
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              onClick={saveUsername}
            >
              Save Name
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-md font-semibold text-center mb-2">Hello, {username}</h3>

            {banRemainingTime > 0 && (
              <div className="text-red-500 text-center mb-2 font-semibold text-sm">
                🚫 Banned for {banRemainingTime} more second{banRemainingTime !== 1 ? "s" : ""}.
              </div>
            )}

            <div className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} h-48 overflow-y-auto p-3 rounded-lg border mb-2`}>
              {messages.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">Start chatting...</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === username ? "justify-end" : "justify-start"} mb-1`}
                  >
                    <div className={`${darkMode ? "bg-gray-600" : "bg-gray-200"} p-2 px-3 rounded-xl max-w-[70%] shadow`}>
                      <span className="block text-xs text-blue-400 font-semibold">
                        {msg.sender}
                      </span>
                      <span className="block text-sm">{msg.message}</span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex">
              <input
                className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"} flex-grow px-3 py-2 rounded-l-lg border focus:outline-none`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type..."
              />
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-2 py-2 rounded-r-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
