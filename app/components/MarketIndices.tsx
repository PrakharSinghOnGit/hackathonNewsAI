"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Market Indices Component
export const MarketIndices = () => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Market Indices
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex justify-between text-lg">
          <span>S&P 500</span>
          <span className="text-green-600 dark:text-green-400">+0.8%</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Dow Jones</span>
          <span className="text-green-600 dark:text-green-400">+0.5%</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Nasdaq</span>
          <span className="text-green-600 dark:text-green-400">+1.2%</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Russell 2000</span>
          <span className="text-red-600 dark:text-red-400">-0.3%</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);
