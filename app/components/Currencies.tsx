"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Currencies Component
export const Currencies = ({ Curr }: { Curr: any[] }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Currencies
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex justify-between text-lg">
          <span>EUR/USD</span>
          <span className="text-green-600 dark:text-green-400">{93.03}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>GBP/USD</span>
          <span className="text-red-600 dark:text-red-400">{110.28}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>USD/JPY</span>
          <span className="text-green-600 dark:text-green-400">{83.17}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>USD/CHF</span>
          <span className="text-red-600 dark:text-red-400">{83.71}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);
