const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("252ac6baf82444b199607c797e361e4e");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBMJ-qoYKSCGcYDJz25q5mBG70qcDMaY4w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function getNews() {
  const news = await newsapi.v2.topHeadlines({
    q: "a",
    // category: "",
    language: "en",
    country: "us",
    sortBy: "relevancy",
  });
  return news.articles;
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
    res.send(await getNews());
  });

  server.get("/api/summ", async (req, res) => {
    const news = await getNews();
    let text = news.map((article) => article.title).join("\n");
    text =
      "These Are Some News \n" + text + "\n Summarize Them in under 100 words, do not bold,italic or underline text in summary";
    const summary = await summarizeText(text);
    res.send(summary);
  });

  // Handle all other Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
