"use item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
// Market Summary Component
export const MarketSummary = ({ Summary }: { Summary: string }) => (
  <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-8">
    <CardHeader>
      <CardTitle className="text-2xl">AI Market Summary</CardTitle>
      <Button
        size="icon"
        className="rounded-full w-14 h-14 bg-white-500 hover:bg-gray-600 text-white"
        onClick={() => alert("Chat with us!")}
      >
        <Volume2 className="h-7 w-7" />
      </Button>
    </CardHeader>
    <CardContent>
      <p className="text-lg">{Summary}</p>
    </CardContent>
  </Card>
);
