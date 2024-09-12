"use client";
// News Item Component
export const NewsItem = ({ item }: { item: any }): any => (
  <li className="mb-6">
    <img src={item.urlToImage} alt="Img" />
    <h3 className="font-semibold text-xl text-purple-600 dark:text-purple-400 mb-2">
      {item.title}
    </h3>
    <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
      {item.content}
    </p>
  </li>
);
