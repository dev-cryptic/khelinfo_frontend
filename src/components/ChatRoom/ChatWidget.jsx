import { useState, useCallback, useRef } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import ChatRoom from "./ChatRoom";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      <ChatRoom isOpen={isOpen} toggleOpen={toggleOpen} buttonRef={buttonRef} />
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 bg-[#2354a8] hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Toggle Chat"
      >
        <IoChatbubblesSharp size={24} />
      </button>
    </>
  );
};

export default ChatWidget;
