const yahooFinance = require("yahoo-finance2").default;
async function getStockData() {
  try {
    const niftyData = await yahooFinance.quote("^NSEI");
    const bankniftyData = await yahooFinance.quote("^NSEBANK");
    const sensex = await yahooFinance.quote("BSESN");
    const tatamotors = await yahooFinance.quote("TATAMOTORS.BO");
    const gold = await yahooFinance.quote("XAU");
    const silver = await yahooFinance.quote("XAG");
    const crudeOil = await yahooFinance.quote("CL");
    const natGas = await yahooFinance.quote("NG");
    const eurusd = await yahooFinance.quote("DXY");
    const gbpusd = await yahooFinance.quote("GBPUSD");
    const usdjpy = await yahooFinance.quote("JPY");
    const usdchf = await yahooFinance.quote("USDCHF=X");

    return {
      Index: [
        niftyData.regularMarketPrice,
        bankniftyData.regularMarketPrice,
        sensex.regularMarketPrice,
        tatamotors.regularMarketPrice,
      ],
      Commo: [
        gold.regularMarketPrice,
        silver.regularMarketPrice,
        crudeOil.regularMarketPrice,
        natGas.regularMarketPrice,
      ],
      Curr: [
        eurusd.regularMarketPrice,
        gbpusd.regularMarketPrice,
        usdjpy.regularMarketPrice,
        usdchf.regularMarketPrice,
      ],
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return {
      Index: [],
      Commo: [],
      Curr: [],
    };
  }
}

(async () => {
  console.log(await getStockData());
})();
