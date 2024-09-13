const NEWS_API = "252ac6baf82444b199607c797e361e4e";
const GOOGLE_API = "AIzaSyCWBjP3hfLcBBYsL24s_pJqShynprZYv0Q";
const NEWS_LIMIT = 10;
const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(NEWS_API);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getNews(limit) {
  const news = await newsapi.v2.everything({
    q: "finance",
    language: "en",
    country: "us",
    sortBy: "relevancy",
  });
  let articles = news.articles.slice(0, limit);
  return articles;
}

const summarizeText = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    summary = result.response.text();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
  }
};

app.prepare().then(() => {
  const server = express();

  server.get("/api/news", async (req, res) => {
    const news = await getNews(NEWS_LIMIT);
    console.log(news.length);
    let text = news.map((article) => article.title).join("\n");
    text =
      "These Are Some News \n" +
      text +
      "\n Summarize Them in under 100 words, do not bold,italic or underline text in summary";
    const summary = await summarizeText(text);
    res.send({ news: news, summary: summary });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
