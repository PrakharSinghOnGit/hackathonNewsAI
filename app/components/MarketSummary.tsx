"use item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Market Summary Component
export const MarketSummary = ({ Summary }: { Summary: string }) => (
  <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-8">
    <CardHeader>
      <CardTitle className="text-2xl">AI Market Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-lg">{Summary}</p>
    </CardContent>
  </Card>
);
