"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsItem } from "./NewsItem";
// News Section Component
export const NewsSection = ({ news }: { news: any[] }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        News
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-6">
        {news.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </ul>
    </CardContent>
  </Card>
);
