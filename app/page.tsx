"use client";

import { useState } from "react";
import { Bell, Search, Menu, MessageCircle, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MarketSummary } from "./components/MarketSummary";
import { NewsSection } from "./components/NewsSection";
import { TopMovers } from "./components/TopMovers";
import { MarketIndices } from "./components/MarketIndices";
import { Commodities } from "./components/Commodities";
import { Currencies } from "./components/Currencies";

export default function BullsEyeAggregator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial assistant. How can I help you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [summ, setSumm] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;
    console.log("User input:", userInput);
    let newMessages = [...chatMessages, { role: "user", content: userInput }];
    setChatMessages(newMessages);
    newMessages = [
      ...chatMessages,
      { role: "assistant", content: "thinking..." },
    ];
    setChatMessages(newMessages);
    const responseData = await sendMsgToBackend(userInput);
    chatMessages.pop();
    newMessages = [
      ...chatMessages,
      {
        role: "assistant",
        content: responseData.reply,
      },
    ];
    setChatMessages(newMessages);
    setUserInput("");
  };

  async function sendMsgToBackend(msg: string) {
    try {
      const response = await fetch("/api/msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }), // Send message as JSON
      });

      const responseData = await response.json();
      console.log("Response from backend:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error sending message to backend:", error);
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br ${
        darkMode ? "from-gray-900 to-gray-800" : "from-blue-50 to-indigo-100"
      } transition-colors duration-200`}
    >
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 sm:inline-block">
                BullsEye
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-base font-medium">
              <a
                className="text-gray-950 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                href="/markets"
              >
                Markets
              </a>
              <a
                className="text-gray-950 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                href="/news"
              >
                News
              </a>
              <a
                className="text-gray-950 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                href="/watchlist"
              >
                Watchlist
              </a>
              <a
                className="text-gray-950 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                href="/portfolio"
              >
                Portfolio
              </a>
            </nav>
          </div>
          <Button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search stocks, news..."
                  className="pl-10 pr-4 py-2 text-base md:w-[300px] lg:w-[400px]"
                />
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New market update available</DropdownMenuItem>
                <DropdownMenuItem>
                  Your watchlist stock is up by 5%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 p-8">
        <main className="flex-1 p-8 flex justify-center">
          <div className="container grid gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              <MarketSummary Summary={summ} />
              <NewsSection
                setSumm={setSumm}
                isLoading={isLoading}
                error={error}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className="space-y-8">
              <MarketIndices />
              <Commodities />
              <Currencies />
              <TopMovers />
            </div>
          </div>
        </main>
      </main>
      <footer className="border-t bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-base leading-loose text-muted-foreground md:text-left">
              © 2023 BullsEye. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <div
        className={`fixed bottom-4 right-4 z-50 ${
          chatOpen ? "w-96" : "w-auto"
        }`}
      >
        {chatOpen ? (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="text-xl">AI Assistant</CardTitle>
              <Button
                size="icon"
                variant="ghost"
                className="ml-auto"
                onClick={() => setChatOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[300px] overflow-y-auto space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Textarea
                    placeholder="Ask about markets, stocks, or financial advice..."
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
            <MessageCircle className="h-7 w-7" />
          </Button>
        )}
      </div>
    </div>
  );
}
