const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("252ac6baf82444b199607c797e361e4e");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBMJ-qoYKSCGcYDJz25q5mBG70qcDMaY4w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getNews() {
  const news = await newsapi.v2.topHeadlines({
    q: "a",
    language: "en",
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
      "These Are Some News \n" + text + "\n Summarize Them in under 100 words";
    const summary = await summarizeText(text);
    res.send(summary);
  });

  (async () => {
    console.log(
      await summarizeText(
        "Harvards Black enrollment drops after Supreme Court ruling - The Washington Post Danity Kanes Dawn Richard Sues Diddy for Sexual Abuse - Vulture Android apps are blocking sideloading and forcing Google Play versions instead - Ars Technica During Tuesday's debate, Harris was in command; Trump was incoherent - NPR Watch SpaceX Polaris Dawn astronauts conduct 1st private spacewalk early Sept. 12 - Space.com Shelter Inflation Makes Bigger Rate Cut Less Likely - The Wall Street Journal Harris and Trump shake hands at New York 9/11 remembrance ceremony on 23rd anniversary of attacks - CNN [Removed] Dave Grohl Hired a Divorce Lawyer Before Cheating Announcement - The Daily Beast 9/11 responders are getting dementia. They want the government to help. - The Washington Post Mpox in DR Congo: Medics plead for vaccines as rate of infections increases - BBC.com Speaker Mike Johnson yanks government funding bill amid growing GOP defections - NBC News Stocks swing after inflation data, Harris-Trump debate - Fox Business Popular fast-food burger chain files for Chapter 11 bankruptcy - TheStreet 3 massive Los Angeles-area wildfires have scorched more than 100,000 acres in a week - ABC News Hurricane Francine threatens Louisiana’s coast with strong winds and flooding - The Associated Press Blinken, UK's Lammy visit Ukraine in show of support at key juncture in war - Reuters.com Buffalo Bills vs. Miami Dolphins | 2024 Week 2 Game Preview - NFL Giant bubbles on the surface of a nearby star preview the fate of our sun - CNN ‘I just want to know about the dogs’: comedian Roy Wood Jr weighs in on Trumps pet-eating claim - CNN Summarize Them in under 100 words"
      )
    );
  })();

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
