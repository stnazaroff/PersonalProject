$(document).ready(function () {
  $("#fetchBtn").click(function () {
    const stock1 = $("#stock1").val();
    const stock2 = $("#stock2").val();

    fetchStockInfo(stock1, "stock-info-1");
    fetchStockInfo(stock2, "stock-info-2");
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
            <p>Stock Price: $${result.price}</p>
            <p>52-Week High: $${result.high}</p>
            <p>52-Week Low: $${result.low}</p>
            <p>Market Cap: $${result.marketCap}</p>
            <p>P/E Ratio: ${result.peRatio}</p>
            <p>EPS: $${result.eps}</p>
            <p>PEG Ratio: ${result.pegRatio}</p>
            <p>Dividend Yield: ${result.dividendYield}</p>
            <p>Price to Book: ${result.pricetoBook}</p>


          `;
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
});
