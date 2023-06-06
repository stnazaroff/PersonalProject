$(document).ready(function () {
  $("#fetchBtn").click(function () {
    const stock1 = $("#stock1").val();
    const stock2 = $("#stock2").val();

    if (stock1 && stock2 === "") {
      fetchStockInfo(stock1, "stock-info-1");
      clearStockInfo("stock-info-2");
    } else if (stock1 === "" && stock2) {
      fetchStockInfo(stock2, "stock-info-2");
      clearStockInfo("stock-info-1");
    } else if (stock1 && stock2) {
      fetchStockInfo(stock1, "stock-info-1");
      fetchStockInfo(stock2, "stock-info-2");
    }
  });

  function fetchStockInfo(stock, divId) {
    $.ajax({
      url: "/stockinfo/" + stock,
      type: "GET",
      success: function (result) {
        console.log(result);
        var stockInfoDiv = document.getElementById(divId);
        stockInfoDiv.innerHTML = `
            <h2>${stock}</h2>
            <p>Company Name: ${result.longName}</p>
            <p class="definition" data-definition="Cost to purchase one share of the company's stock">Stock Price: $${result.price}</p>
            <p class="definition" data-definition="Maxiumum price of stock within 1-year trading period">52-Week High: $${result.high}</p>
            <p class="definition" data-definition="Minimum price of stock within 1-year trading period">52-Week Low: $${result.low}</p>
            <p class="definition" data-definition="The total market value. How big and durable is the company?">Market Cap: $${result.marketCap}</p>
            <p class="definition" data-definition="Price per share/annual earnings per share. How big/small is the price compared to the company's earnings or profits?">P/E Ratio: ${result.peRatio}</p>
            <p>EPS: $${result.eps}</p>
            <p class = "definition" data-definition="price to earnings to growth raio. Used to determine the stock's value while also factoring in the company's expected earning's growth.">PEG Ratio: ${result.pegRatio}</p>
            <p class = "definition" data-definition="how much a company pays out in dividends each year compared to stock price. Annual dividends per share/current share price">Dividend Yield: ${result.dividendYield}</p>
            <p class="definition" data-definition="Stock price/book value per share. Market valuation of a company's (usually higher) vs. its &quot;book value&quot;. Under 1 is &quot;good&quot;; Over 1 is &quot;overvalued&quot;">Price to Book: ${result.pricetoBook}</p>
            `;
      },
      error: function (error) {
        console.error(error);
      },
    });
  }

  function clearStockInfo(divId) {
    var stockInfoDiv = document.getElementById(divId);
    stockInfoDiv.innerHTML = "";
  }
});