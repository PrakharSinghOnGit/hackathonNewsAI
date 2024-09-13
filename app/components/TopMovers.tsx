"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Top Movers Component
export const TopMovers = ({ Movers }: { Movers: any }) => (
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
              <span>{Movers.gain[0].name}</span>
              <span className="text-green-600 dark:text-green-400">
                {Movers.gain[0].chg}
              </span>
            </li>
            <li className="flex justify-between text-lg">
              <span>{Movers.gain[1].name}</span>
              <span className="text-green-600 dark:text-green-400">
                {Movers.gain[1].chg}
              </span>
            </li>
            <li className="flex justify-between text-lg">
              <span>{Movers.gain[2].name}</span>
              <span className="text-green-600 dark:text-green-400">
                {Movers.gain[2].chg}
              </span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-red-600 dark:text-red-400">
            Losers
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-lg">
              <span>{Movers.lose[0]}</span>
              <span className="text-red-600 dark:text-red-400">
                {Movers.lose[0].chg}
              </span>
            </li>
            <li className="flex justify-between text-lg">
              <span>{Movers.lose[1]}</span>
              <span className="text-red-600 dark:text-red-400">
                {Movers.lose[0].chg}
              </span>
            </li>
            <li className="flex justify-between text-lg">
              <span>{Movers.lose[2]}</span>
              <span className="text-red-600 dark:text-red-400">
                {Movers.lose[0].chg}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);
