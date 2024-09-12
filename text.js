const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("252ac6baf82444b199607c797e361e4e");

newsapi.v2
  .topHeadlines({
    q: "a",
    language: "en",
    sortBy: "relevancy",
  })
  .then((response) => {
    require("fs").writeFileSync(
      "news.json",
      JSON.stringify(response, undefined, 2)
    );
  });

// newsapi.v2
//   .sources({
//     category: "technology",
//     language: "en",
//     country: "us",
//   })
//   .then((response) => {
//     console.log(response);
//     /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
//   });
