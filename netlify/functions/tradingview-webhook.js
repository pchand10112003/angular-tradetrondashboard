let latestSignal = null;

exports.handler = async function (event) {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  // OPTIONS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK"
    };
  }

  // GET REQUEST
  if (event.httpMethod === "GET") {

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        latestSignal: latestSignal
      })
    };
  }

  // POST REQUEST FROM TRADINGVIEW
  try {

    const data = JSON.parse(event.body || "{}");

    latestSignal = data;

    console.log("=================================");
    console.log("TRADINGVIEW SIGNAL RECEIVED");
    console.log("=================================");
    console.log("Symbol :", data.symbol);
    console.log("Price  :", data.price);
    console.log("Signal :", data.signal);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Signal Received",
        data: data
      })
    };

  } catch (error) {

    console.log("WEBHOOK ERROR:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: error.message
      })
    };
  }
};