"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Commodities Component
export const Commodities = ({ Commo }: { Commo: any }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Commodities
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex justify-between text-lg">
          <span>Gold</span>
          <span className="text-green-600 dark:text-green-400">{Commo[0]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Silver</span>
          <span className="text-red-600 dark:text-red-400">{Commo[1]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Crude Oil</span>
          <span className="text-green-600 dark:text-green-400">{Commo[2]}</span>
        </li>
        <li className="flex justify-between text-lg">
          <span>Natural Gas</span>
          <span className="text-red-600 dark:text-red-400">{Commo[3]}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);
