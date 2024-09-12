"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsItem } from "./NewsItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// News Section Component
export const NewsSection = ({
  news: newsData,
  isLoading,
  error,
}: {
  news: any[];
  isLoading: boolean;
  error?: string;
}) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
        Industry Snapshot
      </CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch news. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <ul className="space-y-6">
          {newsData.map((item, index) => (
            <NewsItem key={index} item={item} />
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
