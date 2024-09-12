"use client";
// News Item Component
export const NewsItem = ({
  title,
  content,
  aiSummary,
}: {
  title: string;
  content: string;
  aiSummary: string;
}) => (
  <li className="mb-6">
    <h3 className="font-semibold text-xl text-purple-600 dark:text-purple-400 mb-2">
      {title}
    </h3>
    <p className="text-base text-gray-600 dark:text-gray-300 mb-2">{content}</p>
    <p className="text-sm text-indigo-600 dark:text-indigo-400 italic">
      {aiSummary}
    </p>
  </li>
);
