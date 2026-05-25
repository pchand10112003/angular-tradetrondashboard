const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
};




const { MongoClient, ObjectId } = require("mongodb");

let client;

async function getCollection() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }

  const db = client.db("Trodern_DB");
  return db.collection("adminboard");
}

exports.handler = async (event) => {
  try {
    if (!process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: "MONGODB_URI missing"
        })
      };
    }

    const collection = await getCollection();

    if (event.httpMethod === "GET") {
      const savedData = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: savedData
        })
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};

    if (event.httpMethod === "POST") {
      if (!body.items || body.items.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: "Table data is empty"
          })
        };
      }

      const now = new Date();

      const insertData = body.items.map(item => ({
        type: body.type || "BUY",
        symbol: item.symbol,
        option: item.option,
        sticke: item.sticke,
        no_of_lot: Number(item.no_of_lot),
        createdAt: now
      }));

      await collection.insertMany(insertData);

      const savedData = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "All Details Saved Successfully",
          data: savedData
        })
      };
    }

    if (event.httpMethod === "PUT") {
      if (!body.id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: "ID required"
          })
        };
      }

      await collection.updateOne(
        { _id: new ObjectId(body.id) },
        {
          $set: {
            symbol: body.symbol,
            option: body.option,
            sticke: body.sticke,
            no_of_lot: Number(body.no_of_lot),
            modifiedAt: new Date()
          }
        }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Updated successfully"
        })
      };
    }

    if (event.httpMethod === "DELETE") {
      if (!body.id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: "ID required"
          })
        };
      }

      await collection.deleteOne({
        _id: new ObjectId(body.id)
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Deleted successfully"
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Method not allowed"
      })
    };

  } catch (error) {
  console.log("ADMINBOARD API ERROR:", error);

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