"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Top Movers Component
export const TopMovers = () => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Top Movers
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-green-600 dark:text-green-400">
            Gainers
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-lg">
              <span>AAPL</span>
              <span className="text-green-600 dark:text-green-400">+5.2%</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>GOOGL</span>
              <span className="text-green-600 dark:text-green-400">+3.8%</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>TSLA</span>
              <span className="text-green-600 dark:text-green-400">+2.9%</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-red-600 dark:text-red-400">
            Losers
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-lg">
              <span>META</span>
              <span className="text-red-600 dark:text-red-400">-2.1%</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>NFLX</span>
              <span className="text-red-600 dark:text-red-400">-1.7%</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>AMZN</span>
              <span className="text-red-600 dark:text-red-400">-0.9%</span>
            </li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);
