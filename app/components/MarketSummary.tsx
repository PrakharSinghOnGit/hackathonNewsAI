"use item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Market Summary Component
export const MarketSummary = () => (
  <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-8">
    <CardHeader>
      <CardTitle className="text-2xl">AI Market Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-lg">
        Based on today's market data and news, our AI predicts a cautiously
        optimistic outlook. Tech stocks are showing strength, particularly in
        the AI sector. The Federal Reserve's hints at a potential rate cut are
        positively influencing market sentiment. However, geopolitical tensions
        are creating some uncertainty in oil markets. Investors should watch for
        potential volatility in energy stocks and consider diversifying their
        portfolios.
      </p>
    </CardContent>
  </Card>
);
