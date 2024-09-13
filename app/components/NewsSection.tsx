"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsItem } from "./NewsItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
export const NewsSection = ({
  isLoading,
  error,
  setSumm,
  setIsLoading,
}: {
  isLoading: boolean;
  error?: string;
  setSumm: (data: string) => void;
  setIsLoading: (loading: boolean) => void;
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/news")
      .then((response) => response.json())
      .then((data) => {
        setData(data.news);
        setSumm(data.summary);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
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
            {data.map((item, index) => (
              <NewsItem key={index} item={item} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
