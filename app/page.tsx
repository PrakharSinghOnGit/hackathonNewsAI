import { useState, useEffect } from 'react'
import { Bell, Search, Menu, MessageCircle, X, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BullsEyeAggregator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI financial assistant. How can I help you today?' }
  ])
  const [userInput, setUserInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleSendMessage = () => {
    if (userInput.trim() === '') return

    const newMessages = [
      ...chatMessages,
      { role: 'user', content: userInput },
      { role: 'assistant', content: 'I\'m processing your request. Here\'s a simulated response based on your input: ' + userInput }
    ]
    setChatMessages(newMessages)
    setUserInput('')
  }

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-indigo-100'} transition-colors duration-200`}>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 sm:inline-block">BullsEye</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-blue-600 dark:hover:text-blue-400" href="/markets">Markets</a>
              <a className="transition-colors hover:text-blue-600 dark:hover:text-blue-400" href="/news">News</a>
              <a className="transition-colors hover:text-blue-600 dark:hover:text-blue-400" href="/watchlist">Watchlist</a>
              <a className="transition-colors hover:text-blue-600 dark:hover:text-blue-400" href="/portfolio">Portfolio</a>
            </nav>
          </div>
          <Button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search stocks, news..." className="pl-8 md:w-[300px] lg:w-[400px]" />
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New market update available</DropdownMenuItem>
                <DropdownMenuItem>Your watchlist stock is up by 5%</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px] py-8">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardHeader>
                <CardTitle>AI Market Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Based on today's market data and news, our AI predicts a cautiously optimistic outlook. 
                  Tech stocks are showing strength, particularly in the AI sector. The Federal Reserve's 
                  hints at a potential rate cut are positively influencing market sentiment. However, 
                  geopolitical tensions are creating some uncertainty in oil markets. Investors should 
                  watch for potential volatility in energy stocks and consider diversifying their portfolios.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Hot News</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">Tech Stocks Surge on AI Advancements</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Major tech companies see significant gains as AI capabilities expand...</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 italic">AI Summary: This news indicates a growing trend in AI investments, potentially leading to increased market valuations for tech companies with strong AI capabilities.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">Federal Reserve Hints at Potential Rate Cut</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Markets react positively to Fed's latest statement on monetary policy...</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 italic">AI Summary: A potential rate cut could stimulate economic growth and boost stock markets, particularly benefiting sectors sensitive to interest rates like real estate and utilities.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">Oil Prices Stabilize Amid Geopolitical Tensions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Crude oil markets find balance despite ongoing conflicts in key regions...</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 italic">AI Summary: While current prices are stable, ongoing geopolitical issues could lead to future volatility in oil markets. Investors should monitor international developments closely.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                  [Market Overview Chart Placeholder]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Top Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600 dark:text-green-400">Gainers</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>AAPL</span>
                        <span className="text-green-600 dark:text-green-400">+5.2%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>GOOGL</span>
                        <span className="text-green-600 dark:text-green-400">+3.8%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>TSLA</span>
                        <span className="text-green-600 dark:text-green-400">+2.9%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-600 dark:text-red-400">Losers</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>META</span>
                        <span className="text-red-600 dark:text-red-400">-2.1%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>NFLX</span>
                        <span className="text-red-600 dark:text-red-400">-1.7%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>AMZN</span>
                        <span className="text-red-600 dark:text-red-400">-0.9%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Market Indices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>S&P 500</span>
                    <span className="text-green-600 dark:text-green-400">+0.8%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dow Jones</span>
                    <span className="text-green-600 dark:text-green-400">+0.5%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Nasdaq</span>
                    <span className="text-green-600 dark:text-green-400">+1.2%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Russell 2000</span>
                    <span className="text-red-600 dark:text-red-400">-0.3%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Commodities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Gold</span>
                    <span className="text-green-600 dark:text-green-400">+0.3%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Silver</span>
                    <span className="text-red-600 dark:text-red-400">-0.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Crude Oil</span>
                    <span className="text-green-600 dark:text-green-400">+1.5%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Natural Gas</span>
                    <span className="text-red-600 dark:text-red-400">-0.7%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Currencies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>EUR/USD</span>
                    <span className="text-green-600 dark:text-green-400">+0.2%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>GBP/USD</span>
                    <span className="text-red-600 dark:text-red-400">-0.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>USD/JPY</span>
                    <span className="text-green-600 dark:text-green-400">+0.3%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>USD/CHF</span>
                    <span className="text-red-600 dark:text-red-400">-0.2%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 BullsEye. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <div className={`fixed bottom-4 right-4 z-50 ${chatOpen ? 'w-80' : 'w-auto'}`}>
        {chatOpen ? (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <Button size="icon" variant="ghost" className="ml-auto" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[300px] overflow-y-auto space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
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
                    className="flex-grow"
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button size="icon" className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setChatOpen(true)}>
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}