import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import AnimatedListItem from "./components/AnimatedListItem";
import { MessageData, generateMessage } from "@/utils/MessageGenerator";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-zinc-300">
      <div className="h-[400px] w-full max-w-lg">
        <EmailComponent />
      </div>
    </main>
  );
}

const EmailComponent = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const addMessage = () => {
    const newMessage = generateMessage();

    setMessages((prev) => [...prev, newMessage]);
  };

  const toggleMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => prev.filter((i) => i != id));
    } else {
      setSelectedMessages((prev) => [...prev, id]);
    }
  };

  const archiveMessages = () => {
    setMessages((prev) =>
      prev.filter((message) => !selectedMessages.includes(message.id))
    );
    setSelectedMessages([]);
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between w-full border-b-zinc-100 border-b-[1px] p-4">
        <button
          onClick={addMessage}
          className="text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2"
        >
          Add
        </button>
        <button
          onClick={archiveMessages}
          className="text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2"
        >
          Archive
        </button>
      </div>
      <div className="max-h-[400px] px-3 py-2 overflow-y-auto">
        <ul>
          <AnimatePresence initial={false}>
            {messages.length == 0 && (
              <AnimatedListItem>
                <h1 className="text-center font-semibold py-4">
                  You have no messages.
                </h1>
              </AnimatedListItem>
            )}
            {[...messages].reverse().map((message) => (
              <AnimatedListItem key={message.id}>
                <div className="py-0.5 transition">
                  <button
                    className={`flex flex-col w-full p-4 rounded-md transition-colors ${
                      selectedMessages.includes(message.id)
                        ? "bg-blue-400"
                        : "bg-white"
                    }`}
                    onClick={() => toggleMessage(message.id)}
                  >
                    <p
                      className={`font-medium transition-colors ${
                        selectedMessages.includes(message.id)
                          ? "text-white"
                          : "text-zinc-600"
                      }`}
                    >
                      {message.content[0]}
                    </p>
                    <span
                      className={`text-sm transition-colors ${
                        selectedMessages.includes(message.id)
                          ? "text-zinc-100"
                          : "text-zinc-400"
                      }`}
                    >
                      {message.content[1]}
                    </span>
                  </button>
                </div>
              </AnimatedListItem>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};
