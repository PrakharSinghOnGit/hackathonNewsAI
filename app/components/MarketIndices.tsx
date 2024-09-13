"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Market Indices Component
export const MarketIndices = ({ Index }: { Index: any[] }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Market Indices
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex justify-between text-lg">
          <span>Nifty 50</span>
          <span className="text-green-600 dark:text-green-400">{Index[0]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Bank Nifty</span>
          <span className="text-green-600 dark:text-green-400">{Index[1]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Sensexs</span>
          <span className="text-green-600 dark:text-green-400">{Index[2]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Tata Motors</span>
          <span className="text-red-600 dark:text-red-400">{Index[3]}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);
