const { MongoClient } = require("mongodb");

let client;

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: "Only POST allowed" })
      };
    }

    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "MONGODB_URI missing" })
      };
    }

    const body = JSON.parse(event.body);

    if (!body.symbol || !body.option || !body.sticke || !body.no_of_lot) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "All fields required" })
      };
    }

    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
    }

    const db = client.db("Trodern_DB");
    const collection = db.collection("adminboard");

    const now = new Date();

    const result = await collection.insertOne({
      symbol: body.symbol,
      option: body.option,
      sticke: body.sticke,
      no_of_lot: Number(body.no_of_lot),
      createdAt: now,
      modifiedAt: now
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Saved Successfully",
        id: result.insertedId
      })
    };

  } catch (error) {
    console.log("MongoDB Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message
      })
    };
  }
};