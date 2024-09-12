"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import axios from "axios";

export const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...chatMessages, { role: "user", content: userInput }];
    setChatMessages(newMessages);

    try {
      const response = await axios.post("/api/chat", { userMessage: userInput });
      const aiReply = response.data.reply;

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: aiReply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${chatOpen ? "w-96" : "w-auto"}`}>
      {chatOpen ? (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center">
            <CardTitle className="text-xl">AI Assistant</CardTitle>
            <Button size="icon" variant="ghost" className="ml-auto" onClick={() => setChatOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px] overflow-y-auto space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Ask me anything..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-grow text-base"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setChatOpen(true)}
        >
          Chat
        </Button>
      )}
    </div>
  );
}
